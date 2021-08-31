import * as api from '../Api/utenti';
//Registrazione Utente
export const registerUser = (userData) => async (dispatch) => {
    try{
        await api.registra(userData).then((res) =>{
           window.location.href="/"
        }).catch((err)=>{
            dispatch({type:'GET_ERROR',payload: err.response.data})
        })
        
        
    } catch(error){
        console.log(error.message);
    }
}
//Login Utente
export const loginUser = (userData) => async (dispatch) => {
    try{
        await api.login(userData).then((res) =>{
            dispatch({type:'SET_USER', payload: res.data});
            console.log(res.data)
            window.location.href="/HomePage"
        }).catch((err)=>{
            dispatch({type:'GET_ERROR',payload: err.response.data})
        })

    } catch (error) {
        console.log(error.message);
    }
}

//Logout Utente
export const logoutUser = () => async (dispatch) => {
    localStorage.removeItem("persist:karm");
    window.location.href="/"
}

//Modifica Password Utente
export const modificaPass = (userData) => async (dispatch) => {
    await api.modificaPassword(userData).then((res)=>{
        dispatch({type:'SET_USER', payload: res.data});
        window.location.href="/SchermataMioProfilo"
    }).catch((err)=>{console.log(err.message)})
}

//Inserisci/Modifica Patente Utente
export const registerLicense = (userData) => async (dispatch) => {
    await api.registerLicense(userData).then((res)=>{
        dispatch({type:'SET_USER', payload: res.data});
        window.location.href="/SchermataMioProfilo"
    }).catch((err)=>{console.log(err.message)})
}

//Lista Metodi di Pagamento
export const getMetodiDiPagamento = (userData) => async (dispatch) => {
    await api.takeMethods(userData).then((res)=>{
        dispatch({type:'LISTA_METODIPAGAMENTO',payload: res.data});
    }).catch((err)=>{console.log(err.message)})
}

//Rimuovi Metodo di Pagamento
export const removeMetodoDiPagamento = (userData) => async (dispatch) => {
    await api.removeMethods(userData).then((res)=>{
        window.location.reload();
    }).catch((err)=>{console.log(err.message)})
}

//Aggiungi Metodo di Pagamento
export const addMetodoDiPagamento = (userData) => async (dispatch) => {
    await api.addMethods(userData).then((res)=>{
        window.location.reload();
    }).catch((err)=>{console.log(err.message)})
}

//Modifica Parcheggio addetto
export const setPark = (userData) => async (dispatch) => {
    await api.setPark(userData).then((res)=>{
        dispatch({type:'SET_USER', payload: res.data});
        window.location.href="/SchermataMioProfilo"
    }).catch((err)=>{console.log(err.message)})
}