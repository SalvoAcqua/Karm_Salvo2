import * as api from '../Api/corsa';

export const verifyDelivery = (userData) => async (dispatch) =>{
    await api.verifyDelivery(userData).then((res)=>{
        dispatch({type:'SET_RUN', payload:res.data});
        window.location.href("/SchermataGestioneCorsa");
    }).catch((err)=>{
        dispatch({type:'GET_ERROR', payload:err.response.data});
    });
};

export const pagamentoAggiuntivo = (userData) => async (dispatch) =>{
    //Simulo il prelievo dell'importo dalla carta di credito inserita dal cliente
};

export const assegnaLuogo = (userData) => async (dispatch) =>{

};

export const completaRilascio = (userData) => async (dispatch) =>{
    await api.completaRilascio(userData).then((res)=>{
    //distruggi Entity
    window.location.href("/HomePage");
    }).catch((err)=>{console.log(err.message)});
};