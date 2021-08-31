const initialState = {
    prenotazione:{},
    listaVeicoli:[],
    listaPrenotazioni:[]
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'SET_BOOKING':
            return {...state, prenotazione: action.payload};
        case 'SET_VEHICLE':
            return {...state, listaVeicoli: action.payload};
        case 'SET_BOOKINGS':
            return {...state, listaPrenotazioni: action.payload};
        default:
            return state;
    }
}