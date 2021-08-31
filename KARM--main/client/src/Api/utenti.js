import axios from 'axios'

//Registrazione
export const registra = (dati) => {
 return axios.post('/Routers/GestioneAccount/Registrazione',dati);
};

//Login
export const login = (dati) => {
    return axios.post('/Routers/GestioneAccount/Login',dati);
};

//Modifica Password
export const modificaPassword = (dati) =>{
    return axios.post('/Routers/GestioneAccount/NuovaPassword',dati);
};

//Aggiorna Patente
export const registerLicense = (dati) =>{
    return axios.post('/Routers/GestioneAccount/AggiornaPatente',dati);
}

//Lista Metodi di Pagamento
export const takeMethods = (dati) => {
    return axios.post('/Routers/GestioneAccount/ListMetodiPagamento',dati);
}

//Elimina Metodo Pagamento
export const removeMethods = (dati) => {
    return axios.post('/Routers/GestioneAccount/RemoveMetodoPagamento',dati)
}

//Aggiungi Metodo Pagamento
export const addMethods = (dati) => {
    return axios.post('/Routers/GestioneAccount/AddMetodoPagamento',dati)
}

//Modifica Parcheggio Addetto
export const setPark = (dati) =>{
    return axios.post('/Routers/GestioneAccount/AggiornaParcheggio',dati);
};