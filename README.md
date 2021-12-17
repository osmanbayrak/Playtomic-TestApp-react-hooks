'npm install' to get project dependencies
'npm start' to run project (it will be running in localhost:3000 by default)

This project build with 'React(Hook) - Redux' architecture.
All components are functional components.
State management in functional components has been taken care of thanks to reacthook.
Redux data flow done thanks to '@reduxjs/toolkit' library.

Firebase API used for authentication and Fetching data.

Firebase auth service store the Json Web Token in browser storage (indexedDb)

On the firebase functions that send HTTP request to fetch data, they automaticly send the JWT in request header with as Bearer token