# AiteBet

## Instructions to run
1. `npm install` at project root folder
2. Create a new `.env` file at the root of the project folder, take a look at `.env.example` to see what information is needed
3. Create a new database off of ElephantSQL or your local PostGres DB, place the connection string into the `.env` file.
4. Grab a free API key from the [ODDs API](https://the-odds-api.com/) and place the api key into the  `.env` file
5. `npm run dev` to start the development server. Front-end runs on localhost:8081; backend runs on localhost:8080

## Technologies
1. React
2. React-Router
3. React-Context-API for state management
4. axios
5. Express.js
6. Postgres

## Stretch Features
* Rework bets to play against house or a group; utilize the spreads, actualy odds, +/-
* Users can accept a bet against another user
* Real time tracking of games 
