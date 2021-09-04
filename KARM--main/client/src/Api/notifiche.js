import axios from 'axios'

export const prendiNonLette = (dati) => {
    return axios.post("/Routers/Notifiche/prendiNonLette",dati);
}

export const prendiNotifiche = (dati) => {
    return axios.post("/Routers/Notifiche/prendiNotifiche",dati);
}