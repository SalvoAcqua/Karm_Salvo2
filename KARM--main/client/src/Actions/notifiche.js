import * as api from '../Api/notifiche';

export const prendiNonLette = (userData) => async (dispatch) => {
   return await api.prendiNonLette(userData).then((numero)=>{
       return numero.data;
   })
}

export const prendiNotifiche = (userData) => async (dispatch) => {
     await api.prendiNotifiche(userData).then((res)=>{
        dispatch({type:"LIST_NOTIFICHE",payload:res.data})
    }).catch((err)=>{console.log(err.message)})
 }