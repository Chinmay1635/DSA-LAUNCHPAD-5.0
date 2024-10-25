
# DSA Launchpad 5.0 Game

Welcome to the **DSA Launchpad 5.0 Game Platform**! This platform was developed for the **WCE ACM Student Chapter** event, DSA Launchpad 5.0, to engage students in learning Data Structures and Algorithms through interactive games.

## Deployed Project

Check out the live project here: [DSA Launchpad 5.0](https://dsa-launchpad-5.netlify.app/)


## Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Games Available](#games-available)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Running the Project](#running-the-project)
- [Tech Stack](#tech-stack)
- [APIs](#apis)
  - [User Creation & Authentication](#user-creation--authentication)
  - [Score Update](#score-update)
  - [Leaderboard](#leaderboard)
- [Contributing](#contributing)


## Project Overview

This platform provides users with an engaging way to learn DSA through hands-on game-based challenges. Users land on a login page, and upon successful login, they can navigate to the home page displaying all available games. By clicking "Play Game," they can begin an interactive session with one of the following games, tailored for foundational DSA topics.

## Features

- **User Authentication**: Users must log in to access games and track scores.
- **Predefined Games**: Each game includes multiple levels with unique DSA challenges.
- **Score Tracking and Leaderboards**: Users' scores are tracked and stored in the database, and leaderboards for each game are available.
- **Responsive Design**: Accessible on various devices for a seamless experience.

## Games Available

1. **Build Binary Search Tree**: Users will drag and drop nodes to construct a BST, enhancing their understanding of tree structures.
2. **Tower of Hanoi**: This game focuses on recursion concepts, challenging users to solve the classic Tower of Hanoi problem.
3. **Match the Card - Time Complexity**: A memory game centered on matching time complexity terms with their definitions, reinforcing key algorithmic concepts.

## Getting Started

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Chinmay1635/DSA-LAUNCHPAD-5.0.git
   ```
2. Navigate to the project directory and install dependencies:
   ```bash
   cd DSA-LAUNCHPAD-5.0
   npm install
   ```

### Running the Project

1. Set up environment variables:
   - Configure `JWT_SECRET`, `DATABASE_URL`, and other sensitive information in a `.env` file.
2. Start the backend server:
   ```bash
   npm start
   ```
3. Start the frontend by deploying to Netlify or using a local static server.

## Tech Stack

- **Frontend**: 
  ![HTML](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
  ![CSS](https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white) 
  ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) 
  ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)

- **Backend**: 
  ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node-dot-js&logoColor=white) 
  ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)

- **Database**: 
  ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)

- **Authentication**: 
  ![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

- **Hosting**: 
  ![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white) 
  ![Netlify](https://img.shields.io/badge/Netlify-00C7B7?style=for-the-badge&logo=netlify&logoColor=white)


## APIs

### User Creation & Authentication

- **POST** `/registerUser`: Register a new user.
- **POST** `/loginUser`: Authenticate a user and store a JWT token in the browser's cookies.

### Score Update

- **POST** `/updateScore`: Updates the score for a specific level within a specific game.

### Leaderboard

- **GET** `/leaderboard/:gameName`: Retrieves the leaderboard for a given game, showing users with the highest scores.

## Contributing

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit.
4. Open a pull request describing your updates.

