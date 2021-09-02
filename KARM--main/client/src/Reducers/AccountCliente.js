const initialState = {
    listaMetodi: [],
    metodoPagamento: {}
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'ADD_METODOPAGMENTO':
            state.listaMetodi.push(action.payload);
            return {...state};
        case 'LISTA_METODIPAGAMENTO':
            return {...state, listaMetodi: action.payload}
        case 'REMOVE_METODOPAGAMENTO':
            const index = state.listaMetodi.indexOf(action.payload.pag._id);
            state.listaMetodi.splice(index,1);
            return{...state}
        default:
            return state;
    }
}