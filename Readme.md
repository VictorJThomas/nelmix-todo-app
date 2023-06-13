# TO-DO List for Tech Test

## Features

This app has the follow features:

 - Account Management.
 - Access as a Guest.
 - Data saving in local storage for Guest Users.
 - Registry for all the users who accessed to the app.
 - DB connection.

## Technologies

This app has been created using the following techs:

- React.
- TypeScript.
- Node.js.
- Express.js.
- Redux.
- MongoDB.
- Material UI.

## Endpoints

The app has the follow endpoinds (most of these will locally start at port 3000): 

### Private Enpoints:

- Get All Users
    `http://localhost:8000/api/user/registry` method: GET

- Login 
    `http://localhost:8000/api/auth/login` method: POST

- Sign Up
    `http://localhost:8000/api/auth/register` method: POST

- Get All Tasks 
    `http://localhost:8000/api/task/` method: GET

- Create new Task
    `http://localhost:8000/api/task/` method: POST

- Update Task
    `http://localhost:8000/api/task/:taskId` method: PUT

- Delete Task
    `http://localhost:8000/api/task/:taskId` method: DELETE

### Public API:

This app make use of a public API from backendless.com to manage Guest profiles.

- API: 
    `https://api.backendless.com/`

## Enviroment Variables needed

These are needed only in the backend.

`MONGO_URL='MONGO_DB_CONNECTION'`
`PORT='PORT'`
`JWT_SECRET='A_SECRET_MESSAGE'`

## How To Run

This project has two folders (server and client).

To run server for development:

`cd .\client\`
`npm run dev`

To run client for development:

`cd .\client\`
`npm run dev`