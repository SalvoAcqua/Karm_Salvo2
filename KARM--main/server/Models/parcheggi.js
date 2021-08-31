import mongoose from 'mongoose';

const parcheggioSchema = mongoose.Schema({
    nome:String,
    indirizzo:String,
    nCivico:String,
    capienzaAuto:Number,
    autoPresenti:Number,
    capienzaMoto:Number,
    motoPresenti:Number,
    capienzaBici:Number,
    biciPresenti:Number,
    capienzaMonopattini:Number,
    monopattiniPresenti:Number
});

const parcheggio = mongoose.model('parcheggio', parcheggioSchema);

export default parcheggio;