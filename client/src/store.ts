import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import rootReducer from './reducers/index.ts';

// Define the initial state
const initialState = {};

// Define the middleware
const middleware = [thunk];


// Create the store
const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
