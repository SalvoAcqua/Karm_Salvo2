import utente from '../Models/utente.js';
import veicolo from '../Models/veicoli.js';
import parcheggio from '../Models/parcheggi.js';
import prenotazione from '../Models/prenotazioni.js';
import {convertiData, getOra} from '../gestioneDateTime.js';

export const verifyDelivery = async (req,res) =>{
    let todayTime = new Date();
    let todayDate = new Date(convertiData(todayTime));
    let flag = false;
    await prenotazione.find({idVeicolo: req.body.cod, statoPrenotazione: "completa"}).then(async (Prenotazioni)=>{
        for(let Prenotazione of Prenotazioni){
            let dataPartenza = new Date(Prenotazione.dataPartenza)
            if (dataPartenza.getTime()==todayDate.getTime() && oraPartenza<getOra(todayTime) && !flag){
                flag=true;
                let idBooking = Prenotazione._id;
                await prenotazione.findOneAndUpdate({_id: idBooking},{statoPrenotazione: "in_corsa"});
                await veicolo.findOneAndUpdate({_id: req.body.cod},{statoVeicolo: "Occupato"});
                return res.json(Prenotazione);
            }
        }
        return res.status(400).json({ consegna: "Nessuna prenotazione e' associata a questo veicolo in questo momento"});
    }).catch((err)=> {return res.status(500).json(err.message)})
};
