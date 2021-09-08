import axios from 'axios'

//Prendi non lette
export const prendiNonLette = (dati) => {
    return axios.post("/Routers/Notifiche/prendiNonLette",dati);
}
//Prendi notifiche
export const prendiNotifiche = (dati) => {
    return axios.post("/Routers/Notifiche/prendiNotifiche",dati);
}

//Elimina Notifiche
export const eliminaNotifiche = (dati) =>{
    return axios.post("/Routers/Notifiche/eliminaNotifiche",dati);
}

//Notifica modifica accettata
export const modificaAccettata = (dati) =>{
    return axios.post("/Routers/Notifiche/AccettaModifica",dati);
}