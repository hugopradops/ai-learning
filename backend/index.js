import express from 'express';
import cors from 'cors';
import requestIp from 'request-ip';
import knex from "knex";

// Content moderation logic
const inappropriateWords = [
    "crazy", "offensive", "inappropriate", "violent", "hate", "racist", "sexist", 
    "abuse", "harassment", "threat", "kill", "murder", "terrorist", "bomb", 
    "explosive", "illegal", "drugs", "weapon", "gun", "knife", "porn", "explicit", 
    "nudity", "swear", "curse", "profanity", "slur", "discrimination", "bully", 
    "harm", "self-harm", "suicide", "death", "crime", "fraud", "scam", "spam", 
    "malware", "virus", "phishing", "hacking", "exploit", "dark web", "blackmail"
];

const AI_SERVER = process.env.AI_SERVER || 'http://localhost:5000/api/query';
const PORT = 3000;

const db = knex({
    client: 'better-sqlite3', // or 'better-sqlite3'
    connection: {
        filename: './aicheck.sqlite',
    },
});


const app = express();

// Enable CORS for frontend communication
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());


app.get('/', (req, res) => {
    res.send('Backend server is running');
});


app.post('/api/query', async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
    }

    const containsInappropriateContent = inappropriateWords.some(word => 
        promptInput.toLowerCase().includes(word)
    );

    if (containsInappropriateContent) {
        return res.status(200).json({
            model: 'gemma3:12b',
            created_at: new Date().toISOString(),
            response: 'Your prompt contains inappropriate content. Please revise it.',
            done: true,
            done_reason: 'inappropriate content',
        });
    }

    const ip = requestIp.getClientIp(req).replace("::ffff:", "");

    try {
        const attempts = await db.select('number_of_attempts', 'last_updated_date').from('login_attempts').where('ip', ip).first();

        const lastUpdatedDate = attempts ? attempts.last_updated_date : null;
        const numberOfExecutions = attempts ? attempts.number_of_attempts : 0;

        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);

        if (lastUpdatedDate && lastUpdatedDate > oneHourAgo && numberOfExecutions >= 5) {
            return res.status(200).json({
                model: 'gemma3:12b',
                created_at: now.toISOString(),
                response: 'Too many requests. Please try again after one hour.',
                done: true,
                done_reason: 'locked out',
            });
        }

        

        const updatedExecutions = lastUpdatedDate && lastUpdatedDate <= oneHourAgo ? 1 : numberOfExecutions + 1;
        await db('login_attempts')
            .insert({
                ip: ip,
                number_of_attempts: updatedExecutions,
                last_updated_date: now,
            })
            .onConflict('ip') // Specify the column to check for conflicts
            .merge();

        // Here you would send the prompt to the other computer's API and return the response
        const response = await fetch(AI_SERVER, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ model: "gemma3:12b", prompt, stream: false }),
        });

        console.log('Response from other computer:', response.status, response.statusText);

        const responseData = await response.json();
        res.json(responseData);

    } catch (error) {
        console.error('Error processing the request:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Start the Express server
app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});