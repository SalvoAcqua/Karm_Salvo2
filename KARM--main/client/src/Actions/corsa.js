import * as api from '../Api/corsa';

export const verifyDelivery = (userData) => async (dispatch) =>{
    await api.verifyDelivery(userData).then((res)=>{
        dispatch({type:'GET_ERROR', payload:res.data});
    }).catch((err)=>{console.log(err.message)});
}