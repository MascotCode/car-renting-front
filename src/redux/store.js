import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers/index';

export const store = configureStore({reducer:rootReducer});

// import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
// import { persistStore, persistReducer } from 'redux-persist'
// const persistConfig = {
//   key: 'root',
//   storage,
// }
// const persistedReducer = persistReducer(persistConfig, rootReducer)
// let persistor = persistStore(store)

// export { store, persistor }