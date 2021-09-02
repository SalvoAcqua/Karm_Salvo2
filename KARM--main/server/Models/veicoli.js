import mongoose from 'mongoose';

const veicoloSchema = mongoose.Schema({
    tipoVeicolo: {
        type: String,
        enum: ["Autovettura", "Moto", "Bici", "Monopattino"]
    },
    modello: String,
    marca: String,
    cilindrata: Number,
    nPosti: Number,
    nPorte: Number,
    targa: String,
    parcheggioAssociato: String,
    viaFuoriStallo:{
        type: String,
        default:""
    },
    descrizione: String,
    statoVeicolo: {
        type:String,
        enum: ["Non Attivo","Occupato","Libero"],
        default:"Libero"
    },
    prezzoFestivo:Number,
    prezzoFeriale:Number  
});

const veicolo = mongoose.model('veicolo', veicoloSchema);

export default veicolo;