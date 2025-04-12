# Country Match Dating App

## Overview
The Country Match Dating App is a platform designed to help users find potential matches based on their location, ethnicity, hobbies, and activities. The app includes a sophisticated matching system that considers multiple categories to ensure compatibility. Additionally, it features a chat system for users to communicate and a reporting mechanism to handle abusive behavior.

## Features
- **User Registration and Profile Management**: Users can create accounts, manage their profiles, and set preferences for matching.
- **Location-Based Matching**: The app allows users to find matches nearby based on their country.
- **Customizable Chat Preferences**: Users can select chat preferences based on ethnicity, hobbies, and activities.
- **Matching System**: Users are considered a good match if they align on three categories.
- **Blocking Feature**: Users can block one person at a time to prevent abusive behavior.
- **Reporting Mechanism**: Users can report abusive behavior, ensuring a safe environment.

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
├── .gitignore
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
4. Create a `.env` file based on the `.env.example` file and configure your environment variables.

## Usage
1. Start the application:
   ```
   npm start
   ```
2. Access the application at `http://localhost:3000`.

## Testing
To run the tests, use the following command:
```
npm test
```

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.