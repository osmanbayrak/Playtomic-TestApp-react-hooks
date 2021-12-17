'npm install' to get project dependencies
'npm start' to run project (it will be running in localhost:3000 by default)

Firebase API used for authentication and Fetching data.

Firebase auth service store the Json Web Token in browser storage (indexedDb)

On the firebase functions that send HTTP request to fetch data, they automaticly send the JWT in request header with as Bearer token