import utente from '../Models/utente.js';
import veicolo from '../Models/veicoli.js';
import parcheggio from '../Models/parcheggi.js';
import prenotazione from '../Models/prenotazioni.js';
import {convertiData, getOra} from '../gestioneDateTime.js';

export const verifyDelivery = async (req,res) =>{
    let oraAttuale = new Date();
    let todayDate = new Date(convertiData(oraAttuale));
    await prenotazione.findOne({_id: req.body.cod, statoPrenotazione: "completa"}).then(async (Prenotazione)=>{
        if (Prenotazione){    
            let dataPartenza = new Date(Prenotazione.dataPartenza);
            let dataArrivo = new Date(Prenotazione.dataArrivo);
            let idVeicolo = Prenotazione.idVeicolo;
            
            if (dataPartenza.getTime()==dataArrivo.getTime()) {
                if (dataPartenza.getTime()==todayDate.getTime() && Prenotazione.oraPartenza<=getOra(oraAttuale) && Prenotazione.oraArrivo>getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else {
                    if (dataPartenza.getTime()<todayDate.getTime()){
                        await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                        return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                    } else if(dataPartenza.getTime()>todayDate.getTime()) {
                        return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                    } else if(Prenotazione.oraArrivo<=getOra(oraAttuale)) {
                        await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                        return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                    } else if (Prenotazione.oraPartenza>getOra(oraAttuale)) {
                        return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                    }
                }
            } else {
                if (dataPartenza.getTime()<todayDate.getTime() && dataArrivo.getTime()>todayDate.getTime()) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else if(dataPartenza.getTime()==todayDate.getTime() && Prenotazione.oraPartenza<=getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else if(dataArrivo.getTime()==todayDate.getTime() && Prenotazione.oraArrivo>getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "in_corsa"});
                    await veicolo.findOneAndUpdate({_id: idVeicolo},{statoVeicolo: "Occupato"});
                    return res.status(200).json(Prenotazione);
                } else if (dataPartenza.getTime()>todayDate.getTime()) {
                    return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                } else if (dataArrivo.getTime()<todayDate.getTime()) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                    return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                } else if (dataPartenza.getTime()==todayDate.getTime() && Prenotazione.oraPartenza>getOra(oraAttuale)) {
                    return res.status(400).json({ consegna: "Non e' possibile ritirare in anticipo il veicolo. Riprova più tardi"});
                } else if (dataArrivo.getTime()==todayDate.getTime() && Prenotazione.oraArrivo<getOra(oraAttuale)) {
                    await prenotazione.findOneAndUpdate({_id: req.body.cod},{statoPrenotazione: "terminata"});
                    return res.status(400).json({ consegna: "Questa prenotazione è scaduta"});
                } else {
                    return res.status(400).json({ consegna: "Errore"});
                }
            }
        } else {
            return res.status(400).json({ consegna: "Nessuna prenotazione valida individuata"});
        }
    }).catch((err)=> {return res.status(500).json(err.message)})
};

export const verifyRelease = async (req,res) =>{
    await prenotazione.findOne({_id: req.body.cod, statoPrenotazione: "in_corsa"}).then((Prenotazione)=>{
        if (Prenotazione) {
            return res.status(200).json({corsa: Prenotazione});
        } else {
            return res.status(400).json({rilascio: "Nessuna prenotazione valida individuata"});
        }
    }).catch((err)=> {return res.status(500).json(err.message)})
};

export const assegnaLuogo = async(req,res) =>{
    if (req.body.parch!=""){
        
        //decrementa capienza se parcheggio
    }else{
        //settaParchAssociato con via
    }
};

export const completaRilascio = async (req,res) => {
    //AggiornaStatoVeicolo
    //AggiornaStatoPrenotazione
};