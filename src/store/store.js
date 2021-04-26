import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user_reducer } from '../reducers/userReducer';

const rootReducer = combineReducers({
  user: user_reducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
