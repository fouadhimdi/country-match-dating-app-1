# Country Match Dating App

## Overview
The Country Match Dating App is a platform designed to help users find potential matches based on their location, ethnicity, hobbies, and activities. The app allows users to connect with others nearby and engage in meaningful conversations while providing features to block users and report abuse.

## Features
- User registration and profile management
- Matchmaking based on user preferences
- Chat functionality for matched users
- Reporting and blocking features for user safety
- Location-based matching

## Project Structure
```
country-match-dating-app
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── services
│   ├── utils
│   └── index.js
├── public
│   ├── assets
│   └── index.html
├── tests
│   ├── unit
│   └── integration
├── package.json
├── .env.example
└── README.md
```

## Installation
1. Clone the repository:
   ```
   git clone https://github.com/yourusername/country-match-dating-app.git
   ```
2. Navigate to the project directory:
   ```
   cd country-match-dating-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Configuration
1. Create a `.env` file based on the `.env.example` template and fill in the required environment variables.
2. Set up your database connection in `src/config/database.js`.

## Running the Application
To start the application, run:
```
npm start
```
The server will start on the specified port, and you can access the API endpoints.

## Testing
To run the tests, use:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.