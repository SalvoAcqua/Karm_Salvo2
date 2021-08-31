import axios from 'axios'

//Lista Clienti
export const takeClienti = () => {
    return axios.get('/Routers/GestioneAmministrazione/ListClienti');
}
//Lista Dipendenti
export const takeDipendenti = () => {
    return axios.get('/Routers/GestioneAmministrazione/ListDipendenti');
}

//Lista Veicoli
export const takeVeicoli = () => {
    return axios.get('/Routers/GestioneAmministrazione/ListVeicoli');
}

//Aggiungi Veicolo
export const addVeicolo = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/AddVeicolo',dati);
}

//Lista Parcheggi
export const takeParcheggi = () => {
    return axios.get('/Routers/GestioneAmministrazione/ListParcheggi');
}

//Lista Parcheggi Disponibili
export const takeParcheggiDisp = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/ListParcheggiDisponibili',dati);
}

//Modifica Parcheggio
export const changePark = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/ModificaParcheggio',dati);
}

//Rimuovi Veicolo
export const removeVehicle = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/RimuoviVeicolo',dati);
}

//Riattiva Veicolo
export const reactivate = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/RiattivaVeicolo',dati);
}

//Blocca Veicolo
export const blockVehicle = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/BloccaVeicolo',dati);
}

//Aggiungi Parcheggio
export const addParcheggio = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/AddParcheggio',dati);
}

//Modifica Tariffe
export const modifyTariffe = (dati) => {
    console.log(dati)
    return axios.post('/Routers/GestioneAmministrazione/ModificaTariffa',dati);
}

//Aggiungi Dipendente
export const addDipendente = (dati) => {
    return axios.post('/Routers/GestioneAccount/Registrazione',dati);
}

//Rimuovi Dipendente
export const removeEmployee = (dati) => {
    return axios.post('/Routers/GestioneAmministrazione/RimuoviDipendente',dati);
}