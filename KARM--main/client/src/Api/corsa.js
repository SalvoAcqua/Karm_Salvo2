import axios from 'axios'

//Dimmi se la consegna e' corretta
export const verifyDelivery = (dati) => {
    return axios.post('/Routers/GestioneCorsa/verifyDelivery', dati);
}

//Dimmi se il rilascio e' corretto
export const verifyRelease = (dati) => {
    return axios.post('/Routers/GestioneCorsa/verifyRelease', dati);
}

//Assegna il parchAssociato ad un veicolo dopo che e' stato rilasciato
export const assegnaLuogo = (dati) => {
    return axios.post('/Routers/GestioneCorsa/assegnaLuogo', dati);
}

//Completa Rilascio
export const completaRilascio = (dati) => {
    return axios.post('/Routers/GestioneCorsa/completaRilascio', dati);
}

//Richiedi Nuovo Veicolo
export const richiediNuovoVeicolo = (dati) => {
    return axios.post('/Routers/GestioneCorsa/richiediNuovoVeicolo', dati);
}

//Rimborsa Termina e Disattiva
export const rimborso = (dati) => {
    return axios.post('/Routers/GestioneCorsa/rimborso', dati);
}