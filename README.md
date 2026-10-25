# Savage Auth

A message board application with user authentication. Users can create an account, log in, post messages, and interact with posts.

Built as part of my software engineering coursework at Resilient Coders.

## Features

- User signup and login
- Session-based authentication
- Post messages
- Increase or decrease a message’s score
- Delete messages
- Store users and messages in MongoDB

## Tech Stack

- HTML, CSS, and JavaScript
- Node.js and Express
- MongoDB and Mongoose
- EJS templates
- Passport.js
- Express Session

## What I Worked On

- Updated database dependencies to resolve a connection error.
- Replaced the unsupported MongoDB collection `.save()` method with `.insertOne()` for message creation.
- Moved database credentials and the session secret into environment variables.
- Added an environment example file and setup instructions.

## Installation

1. Clone this repository and open its project folder.
2. Install dependencies:

   npm install

3. Copy `.env.example` to `.env`:

   cp .env.example .env

4. Update these values in `.env`:

   MONGODB_URI=your-mongodb-connection-string
   MONGODB_DB_NAME=your-database-name
   SESSION_SECRET=your-long-random-secret

   Percent-encode special characters in the database username and password.

5. Keep `.env` private. It is excluded from Git by `.gitignore`.

## Run Locally

Start the server:

    node server.js

Open http://localhost:8080 in your browser.

Create an account or log in to access the message board.

## Credits

Based on the Savage Auth starter project used in Resilient Coders coursework and adapted from Scotch.io’s authentication tutorial.

Updates by [Sushana Thomas](https://github.com/sushanathomas).