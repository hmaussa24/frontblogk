import { createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { logger } from "redux-logger"
import rootReducer from './reducers'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['Auth'],
}

const persistedReducer = persistReducer(persistConfig, rootReducer, applyMiddleware(logger))


const store = createStore(persistedReducer)
const persistor = persistStore(store)
export { store, persistor }
