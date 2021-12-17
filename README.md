'npm install' to get project dependencies.

'npm start' to run project (it will be running in localhost:3000 by default)

This project build with 'React(Hooks) - Redux' architecture.

In the folder structure of the project you wont see reducers or actions folder. There is Slice files instead of them.  CreateSlice comes with the package redux-toolkit. It is a function that accepts an initial state, an object full of reducer functions, and a “slice name”, and automatically generates action creators and action types that correspond to the reducers and state.

Firebase API used for authentication and Fetching data.

Firebase auth service store the Json Web Token in browser storage (indexedDb)

On the firebase functions that send HTTP request to fetch data, they automaticly send the JWT in request header as Bearer token
