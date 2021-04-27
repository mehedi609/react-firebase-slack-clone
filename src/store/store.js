import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { user_reducer } from '../reducers/userReducer';
import { channel_reducer } from '../reducers/channelReducer';

const rootReducer = combineReducers({
  user: user_reducer,
  channel: channel_reducer,
});

export const store = createStore(rootReducer, composeWithDevTools());
