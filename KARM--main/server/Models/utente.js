import mongoose from 'mongoose';

const utenteSchema = mongoose.Schema({
    ruolo: {
        type: String,
        enum: ["Cliente", "Autista", "Addetto", "Admin"],
        default: "Cliente",
    },
    nome: String,
    cognome: String,
    sesso: String,
    dataNascita: Date,
    luogoNascita: String,
    provinciaNascita: String,
    CF: String,
    email: String,
    password: String,
    numeroPatente: String,
    tipoPatente: {
        type:String,
        enum:["AM","A","B"]
    },
    dataRilascioPatente: Date,
    dataScadenzaPatente: Date,
    enteRilascio: String,
    idParcheggio: String,   
});

const utente = mongoose.model('utente', utenteSchema);

export default utente;