import { combineReducers } from 'redux';
import utenti from './utenti';
import errori from './errori';
import AccountCliente from './AccountCliente';
import AccountAdmin from './AccountAdmin';
import Prenotazioni from './Prenotazioni';



export default combineReducers({
    utenti,
    errori,
    AccountCliente,
    AccountAdmin,
    Prenotazioni
})

