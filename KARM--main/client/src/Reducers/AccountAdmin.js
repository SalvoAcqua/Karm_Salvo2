const initialState = {
    listaClienti: [],
    listaDipendenti: [],
    listaVeicoli: [],
    listaParcheggi:[],
    listaParcheggiDisp:[]
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'LISTA_CLIENTI':
            return {...state, listaClienti: action.payload};
        case 'LISTA_DIPENDENTI':
            return {...state, listaDipendenti: action.payload};
        case 'LISTA_VEICOLI':
            return {...state, listaVeicoli: action.payload};
        case 'LISTA_PARCHEGGI':
            return{...state, listaParcheggi: action.payload};
        case 'LISTA_PARCHEGGI_DISP':
            return{...state, listaParcheggiDisp: action.payload};
        default:
            return state;
    }
}