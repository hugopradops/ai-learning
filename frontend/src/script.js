// This file contains the JavaScript code that handles the API request.

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('promptForm');
    const responseContainer = document.getElementById('responseContainer');
    const submitButton = form.querySelector('button[type="submit"]');
    const resetButton = document.getElementById('resetButton');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const promptInput = document.getElementById('promptInput').value;

        // Content moderation logic
        const inappropriateWords = [
            "crazy", "offensive", "inappropriate", "violent", "hate", "racist", "sexist", 
            "abuse", "harassment", "threat", "kill", "murder", "terrorist", "bomb", 
            "explosive", "illegal", "drugs", "weapon", "gun", "knife", "porn", "explicit", 
            "nudity", "swear", "curse", "profanity", "slur", "discrimination", "bully", 
            "harm", "self-harm", "suicide", "death", "crime", "fraud", "scam", "spam", 
            "malware", "virus", "phishing", "hacking", "exploit", "dark web", "blackmail"
        ];

        const containsInappropriateContent = inappropriateWords.some(word => 
            promptInput.toLowerCase().includes(word)
        );

        if (containsInappropriateContent) {
            responseContainer.innerHTML = `<p style="color: red;">Error: Your prompt contains inappropriate content. Please revise it.</p>`;
            return;
        }

        // Show loading indicator and disable the button
        responseContainer.innerHTML = '<p>Loading...</p>';
        submitButton.disabled = true;


        try {
            // Update the fetch URL to point to the backend
            const response = await fetch(server, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: promptInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Format the response for better readability
            const formattedResponse = `
                <p><strong>Response:</strong></p>
                <pre><code>${data.response}</code></pre>
                <p><strong>Model:</strong> ${data.model}</p>
                <p><strong>Created At:</strong> ${new Date(data.created_at).toLocaleString()}</p>
                <p><strong>Done:</strong> ${data.done}</p>
                <p><strong>Reason:</strong> ${data.done_reason}</p>
            `;

            responseContainer.innerHTML = formattedResponse;
        } catch (error) {
            responseContainer.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
        } finally {
            // Re-enable the button
            submitButton.disabled = false;
        }
    });

    // Reset button functionality
    resetButton.addEventListener('click', () => {
        document.getElementById('promptInput').value = '';
        responseContainer.innerHTML = '';
    });
});
