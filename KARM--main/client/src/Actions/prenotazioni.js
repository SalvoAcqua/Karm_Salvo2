import * as api from '../Api/prenotazioni';

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
        await api.addPrenotazione(userData).then((res)=>{
                window.location.href="/SchermataPrenotazioniCliente";
                dispatch({type:'SET_BOOKING', payload:""});   
        })       
}

//Nuova Prenotazione
export const newInformation = (userData) => async (dispatch) => {
        dispatch({type:'SET_BOOKING', payload: userData});
}

//Get Tariffe
export const getTariffe = (userData) => async (dispatch) => {
        return await api.getTariffe(userData).then((res)=>{
                return res.data;
        }).catch((err)=>{console.log(err.message)})
}

//Annulla Prenotazione
export const deleteBooking = (userData) => async (dispatch) => {
        return await api.deleteBooking(userData).then((res)=>{
                window.location.reload();
        }).catch((err)=>{console.log(err.messagge)});
}

//Termina Prenotazione
export const terminaPrenotazione = (userData) => async (dispatch) =>{
        return await api.terminaPrenotazione(userData).then((res)=>{
                window.location.reload();
        }).catch((err)=>{console.log(err.messagge)});
}

//Modifica Prenotazione_Veicolo
export const modifyVehicle = (userData) => async (dispatch) =>{
        await api.modifyVehicle(userData).then(async(res)=>{
                 dispatch({type:"SET_VEHICLE", payload: res.data.Veicoli});
                 dispatch({type:"SET_BOOKING", payload: res.data.Prenotazione});
        }).catch((err)=>{console.log(err.messagge)});
}

//Aggiorna Nuovo Veicolo per la modifica della prenotazione
export const completaNuovoVeicolo = (userData) => async (dispatch) =>{
        await api.completaNuovoVeicolo(userData).catch((err)=>{console.log(err.messagge)});
}

//Verifica Correttezza Modifica Arrivo
export const verifyArrive = (userData) => async (dispatch) =>{
        await api.verifyArrive(userData).then((res) =>{
               dispatch({type:'GET_ERROR', payload:res.data});
        }).catch((err)=>{
                dispatch({type:'GET_ERROR', payload:err.response.data});
        });
}

//Aggiorna Nuovo Arrivo per la modifica della prenotazione
export const completeModifyArrive = (userData) => async (dispatch) =>{
        await api.completeModifyArrive(userData).catch((err)=>{console.log(err.messagge)});
}

//Aggiorna Nuovo Arrivo con stato incompleta per prenotazioni con autista
export const aggiornaArrivoIncompleta = (userData) => async (dispatch) =>{
        await api.aggiornaArrivoIncompleta(userData).catch((err)=>{console.log(err.messagge)});
}

//Accetta Corsa
export const accettaCorsa = (userData) => async (dispatch) => {
        return await api.accettaCorsa(userData).then((res)=>{
                window.location.href="/SchermataPrenotazioniAutista"
        }).catch((err)=>{
                dispatch({type:'GET_ERROR', payload:err.response.data});
                return err;
        })
}

//Completa Operazione
export const completaOperazione = (userData) => async (dispatch) =>{
         return await api.completaOperazione(userData).then( (res)=>{
                 dispatch({type:'SET_BOOKING', payload: res.data});
        })
        //
}

//Paga Autista
export const pagaAutista = (userData) => async (dispatch) => {
        await api.pagaAutista(userData).then((res)=>{
                dispatch({type:'SET_BOOKING', payload: {}});
                
        })
        window.location.href="/SchermataPrenotazioniCliente"
}

//Rifiuta Corsa
export const rifiutaCorsa = (userData) => async (dispatch) => {
        await api.rifiutaCorsa(userData)
        window.location.href="/SchermataPrenotazioniAutista"
}

//Rifiuta Modifica
export const rifiutaModifica = (userData) => async(dispatch) =>{
        await api.rifiutaModifica(userData)
        window.location.href="/NotificheAutista"
}

//Completa Modifica
export const completaModifica = (userData) => async(dispatch) => {
        await api.completaModifica(userData)
        window.location.href="/SchermataPrenotazioniCliente"
}