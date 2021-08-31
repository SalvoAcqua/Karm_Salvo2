import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
//import {configureStore} from '@reduxjs/toolkit'
import App from './App';


import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './Reducers';
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"

const persistConfig = {
    key: "karm",
    storage,
    whitelist: ["utenti","AccountCliente","AccountAdmin","Prenotazioni"],
    blacklist: ["errori"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, compose(applyMiddleware(thunk)));
const persistor = persistStore(store)

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App / >
        </PersistGate>
    </Provider>,   
    document.getElementById('root')
);