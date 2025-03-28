# AI Learning Backend

## Overview
This project is an AI Learning Backend built with Node.js, Express, and Drizzle ORM. It provides an API for interacting with an AI model and manages user requests while tracking usage through a SQLite database.

## Project Structure
```
ai-learning-backend
├── src
│   ├── index.js          # Entry point of the application
│   ├── db
│   │   ├── drizzle.ts    # Drizzle ORM configuration and initialization
│   │   ├── schema.ts     # Database schema definitions
│   │   └── migrations     # Directory for database migration files
│   └── routes
│       └── api.js        # API route definitions
├── package.json           # npm configuration file
├── tsconfig.json          # TypeScript configuration file
└── README.md              # Project documentation
```

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-learning-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Database Setup**
   - Ensure you have SQLite installed.
   - The database will be initialized automatically when the application starts.

4. **Run the application**
   ```bash
   npm start
   ```

5. **Access the API**
   - The API will be available at `http://localhost:3000`.
   - Use tools like Postman or curl to interact with the API endpoints defined in `src/routes/api.js`.

## Usage Guidelines
- The API allows users to send prompts to the AI model and receive responses.
- Rate limiting is implemented to prevent abuse; users are limited to a certain number of requests per hour based on their IP address.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.