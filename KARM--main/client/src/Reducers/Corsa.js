const initialState = {
    corsa:{},
    newVehicle:{}
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'SET_RUN':
            return {...state, corsa: action.payload};
        case 'SET_NEW_VEHICLE':
            return {...state, newVehicle: action.payload};    
        default:
            return state;
    }
}