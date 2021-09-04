const initialState = {
    notifiche:[],
};

export default (state=initialState, action) => {
    switch(action.type){
        case 'LIST_NOTIFICHE':
            return {...state, notifiche: action.payload};
        default:
            return state;
    }
}