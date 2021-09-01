import utente from '../Models/utente.js';
import veicolo from '../Models/veicoli.js';
import parcheggio from '../Models/parcheggi.js';
import prenotazione from '../Models/prenotazioni.js';
import {convertiData, getOra} from '../gestioneDateTime.js';

export const verifyDelivery = async (req,res) =>{
    let todayTime = new Date();
    let todayDate = new Date(convertiData(todayTime));
    await prenotazione.findOne({_id: req.body.cod, statoPrenotzione: "completa"}).then(async (Prenotazione)=>{
        if (Prenotazione){    
            let dataPartenza = new Date(Prenotazione.dataPartenza);
            let dataArrivo = new Date(Prenotazione.dataArrivo);
            let idVeicolo = Prenotazione.idVeicolo;
            
            if (dataPartenza.getTime()==dataArrivo.getTime()) {
                if (dataPartenza.getTime()==todayDate.getTime() && getOra(oraPartenza)<=getOra(oraAttuale) && getOra(oraArrivo)>getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else {
                    if (dataPartenza.getTime()<todayDate.getTime()){
                        await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                        return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                    } else if(dataPartenza.getTime()>todayDate.getTime()) {
                        return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                    } else if(getOra(oraArrivo)<=getOra(oraAttuale)) {
                        await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                        return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                    } else if (getOra(oraPartenza)>getOra(oraAttuale)) {
                        return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                    }
                }
            } else {
                if (dataPartenza.getTime()<todayDate.getTime() && dataArrivo.getTime()>todayDate.getTime()) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else if(dataPartenza.getTime()==todayDate.getTime() && getOra(oraPartenza)<=getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else if(dataArrivo.getTime()==todayDate.getTime() && getOra(oraArrivo)>getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else if (dataPartenza.getTime()>todayDate.getTime()) {
                    return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                } else if (dataArrivo.getTime()<todayDate.getTime()) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                    return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                } else if (dataPartenza.getTime()==todayDate.getTime() && getOra(oraPartenza)>getOra(oraAttuale)) {
                    return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                } else if (dataArrivo.getTime()==todayDate.getTime() && getOra(oraArrivo)<getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                    return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                }
            }
        } else {
            return res.status(400).json({ consegna: "Nessuna prenotazione valida individuata"});
        }
    }).catch((err)=> {return res.status(500).json(err.message)})
};

export const completaRilascio = async (req,res) => {
    //AggiornaStatoVeicolo
    //AggiornaStatoPrenotazione
};