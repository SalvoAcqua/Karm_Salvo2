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

//Get Tariffe
export const getTariffe = (dati) => {
    return axios.post("/Routers/Prenotazione/GetTariffe", dati);
}

//Annulla Prenotazione
export const deleteBooking = (dati) => {
    return axios.post("/Routers/Prenotazione/DeleteBooking", dati);
}

//Termina Prenotazione
export const terminaPrenotazione = (dati) => {
    return axios.post("/Routers/Prenotazione/TerminaPrenotazione", dati);
}

//Accetta Corsa
export const accettaCorsa = (dati) => {
    return axios.post("/Routers/Prenotazione/AccettaCorsa",dati)
}

//Completa Operazione
export const completaOperazione = (dati) => {
    return axios.post("/Routers/Prenotazione/DatiPrenotazione",dati);
}

//Paga Autista
export const pagaAutista = (dati) => {
    return axios.post("/Routers/Prenotazione/PagaAutista",dati);
}

//Rifiuta Corsa
export const rifiutaCorsa = (dati) => {
    return axios.post("/Routers/Prenotazione/RifiutaCorsa",dati);
}