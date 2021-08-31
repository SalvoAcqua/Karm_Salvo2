const initialState = {
    listaMetodi: [],
    metodoPagamento: {}
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'ADD_METODOPAGMENTO':
            state.metodoPagamento=action.payload;
            state.listaMetodi.push(state.metodoPagamento);
            state.metodoPagamento={};
            return {...state};
        case 'LISTA_METODIPAGAMENTO':
            /*for(let i=0;i<action.payload.length;i++){
                state.listaMetodi.push(action.payload[i]);
            }*/
            return {...state, listaMetodi: action.payload}
        case 'REMOVE_METODOPAGAMENTO':
            const index = state.listaMetodi.indexOf(action.payload.pag._id);
            state.listaMetodi.splice(index,1);
            return{...state}
        default:
            return state;
    }
}