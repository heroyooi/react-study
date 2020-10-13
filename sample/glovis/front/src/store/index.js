import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import AsyncStorage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: ['counter'] // place to select which state you want to persist
};
const persistedReducer = persistReducer(persistConfig, rootReducer);
export function initializeStore(initialState = {}) {
  return createStore(persistedReducer, initialState, composeWithDevTools(applyMiddleware(thunk)));
}
