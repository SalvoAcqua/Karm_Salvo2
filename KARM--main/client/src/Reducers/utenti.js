const initialState = {
    isAuthenticated:false,
    utente:{}
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'SET_USER':
            return {...state,isAuthenticated: true, utente: action.payload};
        default:
            return state;
    }
}