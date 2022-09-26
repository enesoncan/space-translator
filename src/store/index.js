import { createStore } from 'redux';
import { combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducer from './reducer';

export const rootReducer = combineReducers({
  globalState: reducer,
});

const store = createStore(rootReducer, composeWithDevTools());

export default store;
