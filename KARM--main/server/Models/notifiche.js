import mongoose from 'mongoose';

const notificheSchema = mongoose.Schema({
    idUtente: String,
    tipo: {
        type: String,
        enum:["accettaCorsa","accettaModifica","comunicaRitardo","completaCorsa","completaModifica","rifiutaModifica","cliente","autista"]
    },
    messaggio: String,
    letta: {
        type: String,
        enum: ["false","true"],
        default : "false"
    },
    idPrenotazione: String,
    dati:{}
});

const notifiche = mongoose.model('notifiche', notificheSchema);

export default notifiche;