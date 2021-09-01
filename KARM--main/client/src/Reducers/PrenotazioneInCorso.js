const initialState = {
    corsa:{},
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'SET_RUN':
            return {...state, corsa: action.payload};
        default:
            return state;
    }
}