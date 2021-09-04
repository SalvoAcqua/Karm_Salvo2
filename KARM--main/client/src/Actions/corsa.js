import * as api from '../Api/corsa';

export const verifyDelivery = (userData) => async (dispatch) =>{
    await api.verifyDelivery(userData).then((res)=>{
        window.location.href="/GestioneCorsa";
    }).catch((err)=>{
        dispatch({type:'GET_ERROR', payload:err.response.data});
    });
};

export const verifyRelease = (userData) => async (dispatch) =>{
    await api.verifyRelease(userData).then((res)=>{
        dispatch({type:'SET_RUN', payload:res.data.corsa}); //Inserisco i dati della corsa in Reducers/Corsa/corsa
        dispatch({type:'GET_ERROR', payload:res.data}); //Rendo visibile il modal in RilascioForm
    }).catch((err)=>{
        dispatch({type:'GET_ERROR', payload:err.response.data}); //Rendo visibile l'alert in RilascioForm
    });
};

export const pagamentoAggiuntivo = (userData) => async (dispatch) =>{
    //Simulo il prelievo dell'importo dalla carta di credito inserita dal cliente
};

export const assegnaLuogo = (userData) => async (dispatch) =>{
    await api.assegnaLuogo(userData).catch((err)=>{console.log(err.message)});
};

export const completaRilascio = (userData) => async (dispatch) =>{
    await api.completaRilascio(userData).then((res)=>{
        window.location.href="/HomePage";
    }).catch((err)=>{console.log(err.message)});
};

export const richiediNuovoVeicolo = (userData) => async (dispatch) =>{
    await api.richiediNuovoVeicolo(userData).then((res)=>{
        dispatch({type: 'SET_NEW_VEHICLE', payload:res.data.sostituto});
        dispatch({type:'GET_ERROR', payload:res.data});
    }).catch((err)=>{
        dispatch({type:'GET_ERROR', payload:err.response.data});
    });
};
