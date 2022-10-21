import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import TodoReducer from './Redux/Reducers/TodoReducer'
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import AuthReducer from './Redux/Reducers/Auth'


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  todo: TodoReducer,
  auth: AuthReducer
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>

    <App />
  </Provider>
);


