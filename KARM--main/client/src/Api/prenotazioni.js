import axios from 'axios'

//Lista Veicoli
export const getListVehicle = (dati) => {
    return axios.post("/Routers/Prenotazione/ListaVeicoli", dati);
}

//Lista Prenotazioni Addetto
export const getPrenotazioniAddetto = (dati) => {
    return axios.post("/Routers/Prenotazione/ListaPrenotazioniAddetto", dati);
}

//Lista Prenotazioni Admin
export const getPrenotazioniAdmin = () => {
    return axios.post("/Routers/Prenotazione/ListaPrenotazioniAdmin");
}

//Lista Prenotazioni Autista
export const getPrenotazioniAutista = (dati) => {
    return axios.post("/Routers/Prenotazione/ListaPrenotazioniAutista", dati);
}

//Lista Prenotazioni Cliente
export const getPrenotazioniCliente = (dati) => {
    return axios.post("/Routers/Prenotazione/ListaPrenotazioniCliente", dati);
}

//Add Prenotazione
export const addPrenotazione = (dati) => {
    return axios.post("/Routers/Prenotazione/AddPrenotazione", dati);
}
