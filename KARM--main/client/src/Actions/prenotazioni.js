import * as api from '../Api/prenotazioni';

//Nuova Prenotazione
export const newBooking = (userData) => (dispatch) => {
        dispatch({type:'SET_BOOKING', payload: userData});
        window.location.href="/SceltaVeicolo"
}

//Lista Veicoli
export const listVehicle = (userData) => async (dispatch) => {
        await api.getListVehicle(userData).then((res)=>{
                dispatch({type:"SET_VEHICLE", payload: res.data});
        }).catch((err)=>{console.log(err.message)})
}

//Lista Prenotazioni Addetto
export const getPrenotazioniAddetto = (userData) => async (dispatch) => {
        await api.getPrenotazioniAddetto(userData).then((res)=>{
                dispatch({type:"SET_BOOKINGS", payload: res.data});
        }).catch((err)=>{console.log(err.message)})
}

//Lista Prenotazioni Admin
export const getPrenotazioniAdmin = () => async (dispatch) => {
        await api.getPrenotazioniAdmin().then((res)=>{
                dispatch({type:"SET_BOOKINGS", payload: res.data});
        }).catch((err)=>{console.log(err.message)})
}

//Lista Prenotazioni Autista
export const getPrenotazioniAutista = (userData) => async (dispatch) => {
        await api.getPrenotazioniAutista(userData).then((res)=>{
                dispatch({type:"SET_BOOKINGS", payload: res.data});
        }).catch((err)=>{console.log(err.message)})
}

//Lista Prenotazioni Cliente
export const getPrenotazioniCliente = (userData) => async (dispatch) => {
        await api.getPrenotazioniCliente(userData).then((res)=>{
                dispatch({type:"SET_BOOKINGS", payload: res.data});
        }).catch((err)=>{console.log(err.message)})
}

//Add prenotazione
export const addPrenotazione = (userData) => async (dispatch) => {
        if(userData.autista==true){
            await api.addPrenotazione(userData).then((res)=>{
            dispatch({type:'SET_BOOKING', payload:""});
            window.location.href="/HomePage"
            })
        }
}

//Utilizzato per settare le informazioni aggiunti sulla nuova prenotazione
export const newInformation = (userData) => (dispatch) => {
        dispatch({type:'SET_BOOKING', payload: userData});
        window.location.href="/SceltaParcheggi"
}