# Silk, Suede & 90s
### 90’s on Repeat

A full-stack playlist app to track favorite 90s R&B songs and artists.

I built this project to practice CRUD functionality and authentication with Passport. Users can create an account, log in, and manage their own playlist.

## Live Application

[Visit Silk, Suede & 90s](https://silkandsuede90s.onrender.com/)

<img width="400" height="400" alt="90&#39;s RnB" src="https://github.com/user-attachments/assets/419a5161-383d-4d53-bf0a-b95a1a085c14" />
<img width="400" height="400" alt="90&#39;s RnB2" src="https://github.com/user-attachments/assets/92ec6e66-17c0-46a9-9abc-7e6a8a93df76" />

## Features

- Sign up, log in, and log out.
- Add songs with a title, artist, and release year.
- View a personal playlist.
- Mark and unmark songs as favorites.
- Delete songs.
- Validate song information before saving.
- Use the app on desktop and smaller screens.

Each account has its own playlist. Users can only view, update, and delete their own songs.

This app stores song information. It does not stream music.

## CRUD Functionality

- **Create:** Add a song.
- **Read:** Display the logged-in user’s songs.
- **Update:** Change a song’s favorite status.
- **Delete:** Remove a song.

## Tools Used

- **HTML and EJS:** Build pages and display saved information.
- **CSS and Bootstrap:** Style the pages and create responsive layouts.
- **JavaScript:** Handle button clicks and send requests using fetch.
- **Node.js:** Run JavaScript on the server.
- **Express:** Handle routes, requests, and responses.
- **MongoDB Atlas:** Host the database.
- **Mongoose:** Define the user model and work with user accounts.
- **MongoDB Node.js driver:** Work with song documents and ObjectIds.
- **Passport and passport-local:** Handle email-and-password authentication.
- **bcrypt-nodejs:** Hash passwords and check them during login.
- **express-session:** Maintain login sessions.
- **connect-flash:** Display signup and login messages.
- **dotenv:** Load private settings from environment variables.
- **Nodemon:** Restart the development server after code changes.

## How It Works

When a user signs up, the app hashes their password before saving the account.

After login, Passport identifies the user. Each saved song includes that user’s ID. The app uses this ID when loading, updating, and deleting songs to keep playlists separate.

The server passes song information to EJS, which displays it on the profile page. Browser JavaScript sends requests when a user changes favorite status or deletes a song.

## Run Locally

1. Clone this repository and open the project folder.

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   MONGODB_DB_NAME=RnBPlaylist
   SESSION_SECRET=your_private_session_secret
   ```

   Use your own database credentials and a randomly generated session secret. Do not commit the `.env` file.

4. In MongoDB Atlas, allow your current IP address and make sure your database user has access to the database.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open [http://localhost:8080](http://localhost:8080).

## Main Files

- `server.js`: Configures Express, database connections, sessions, and Passport.
- `config/database.js`: Loads database settings.
- `config/passport.js`: Defines signup, login, and session authentication.
- `app/models/user.js`: Defines user information and password helper methods.
- `app/routes.js`: Handles authentication pages and song CRUD routes.
- `views/`: Contains EJS page templates.
- `public/main.js`: Handles favorite and delete button requests.
- `public/style.css`: Contains the custom styling and responsive rules.

## What I Learned

- How authentication differs from protecting a user’s individual data.
- How Passport handles signup, login, and sessions.
- How password hashing works.
- How to connect saved entries to a user’s ID.
- How to build CRUD routes with Express and MongoDB.
- How to validate submitted information.
- How to use Flexbox and media queries.
- How to keep credentials out of source code.

## Credits

- This project was adapted from the `savage-auth` starter provided through Resilient Coders coursework.
- The embedded Aaliyah “4 Page Letter” GIF is hosted on [GIPHY](https://giphy.com/).
- [View the GIF and its source attribution on GIPHY](https://giphy.com/gifs/blackground-aaliyah-4-page-letter-TIA6S9wO3RSsJQlACz).

The GIF is embedded for visual presentation. I do not claim ownership of the GIF or the underlying footage.
