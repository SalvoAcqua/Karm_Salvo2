import axios from 'axios'

//Dimmi se la consegna e' corretta
export const verifyDelivery = (dati) => {
    return axios.post('/Routers/GestioneCorsa/verifyDelivery', dati);
}