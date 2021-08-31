import * as api from '../Api/admin';

export const getListaClienti = () => async (dispatch) =>{
    await api.takeClienti().then((res)=>{
        dispatch({type:'LISTA_CLIENTI', payload:res.data});
    }).catch((err)=>{console.log(err.message)});
}

export const getListaDipendenti = () => async (dispatch) =>{
    await api.takeDipendenti().then((res)=>{
        dispatch({type:'LISTA_DIPENDENTI', payload:res.data});
    }).catch((err)=>{console.log(err.message)});
}

export const getListaVeicoli = () => async (dispatch) =>{
    await api.takeVeicoli().then((res)=>{
        dispatch({type:'LISTA_VEICOLI', payload:res.data});
    }).catch((err)=>{console.log(err.message)});
}

export const addVeicolo = (userData) => async(dispatch) => {
    await api.addVeicolo(userData).then((res)=>{
        window.location.href="/VisualizzaVeicoli";
    }).catch((err)=>{
        console.log(err.message);
    });
}

export const getListaParcheggi = () => async (dispatch) => {
    await api.takeParcheggi().then((res)=>{
        dispatch({type:'LISTA_PARCHEGGI', payload:res.data});
    }).catch((err)=>{console.log(err.message)});
}

export const getListaParcheggiDisp = (userData) => async (dispatch) => {
    await api.takeParcheggiDisp(userData).then((res)=>{
        dispatch({type:'LISTA_PARCHEGGI_DISP', payload:res.data});
    }).catch((err)=>{console.log(err.message)});
}

export const changePark = (userData) => async(dispatch) => {
    await api.changePark(userData).then((res)=>{
        window.location.reload();
    }).catch((err)=>{
        console.log(err.message);
    });
};

export const reactivate = (userData) => async(dispatch) => {
    await api.reactivate(userData).then((res) => {
        window.location.reload();
    }).catch((err)=>{
        console.log(err.message);
    });
}

export const removeVehicle = (userData) => async (dispatch) => {
    await api.removeVehicle(userData).then((res)=>{
        window.location.reload();
    }).catch((err)=>{console.log(err.message)})
}

export const blockVehicle = (userData) => async(dispatch) => {
    await api.blockVehicle(userData).then((res)=>{
        window.location.reload();
    }).catch((err)=>{console.log(err.message)})
}

export const addParcheggio = (userData) => async(dispatch) => {
    await api.addParcheggio(userData).then((res)=>{
        window.location.reload();
    }).catch((err)=>{
        dispatch({type:'GET_ERROR',payload: err.response.data})
    });
}

export const modifyTariffe = (userData) => async(dispatch) =>{
    await api.modifyTariffe(userData).then((veicolo)=>{
        window.location.reload();
    }).catch((err)=>{console.log(err.message)});
};

export const addDipendente = (userData) => async(dispatch) => {
    await api.addDipendente(userData).then((res)=>{
        window.location.href="/VisualizzaDipendenti";
    }).catch((err)=>{
        dispatch({type:'GET_ERROR',payload: err.response.data});
    });
};

export const removeEmployee = (userData) => async (dispatch) => {
    await api.removeEmployee(userData).then((res)=>{
        window.location.reload();
    }).catch((err)=>{
        dispatch({type:'GET_ERROR',payload: err.response.data});
    });
}