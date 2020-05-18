import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import bookingSeatReducer from './reducer'


const rootReducer = combineReducers({ 
                    "bookingSeatReducer": bookingSeatReducer 
                  });

let composeEnhancers = compose;

if (process.env.NODE_ENV !== "production") {
  composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
}

const enhancer = composeEnhancers(applyMiddleware());

const store = createStore(rootReducer, enhancer);

export default store;