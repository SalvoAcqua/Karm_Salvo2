import veicolo from '../Models/veicoli.js';
import parcheggio from '../Models/parcheggi.js';
import prenotazione from '../Models/prenotazioni.js';
import {cercaSostituto} from './GestioneAmministrazione.js';
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
        let nomeParcNuovo="";
        await parcheggio.findOne({_id: req.body.parch}).then((ParcheggioNuovo)=>{nomeParcNuovo= ParcheggioNuovo.nome});
        await veicolo.findOne({_id: req.body.idVeicolo}).then(async (Veicolo)=>{
            switch (Veicolo.tipoVeicolo){
                case "Autovettura":
                    await parcheggio.findOne({_id: req.body.parch}).then(async (Parcheggio)=>{
                        if (Parcheggio.autoPresenti<Parcheggio.capienzaAuto) {
                            await parcheggio.findOneAndUpdate({_id: req.body.parch},{ $inc: {autoPresenti: +1}});
                            await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: nomeParcNuovo, viaFuoriStallo: ""});
                            return res.status(200).json(Parcheggio);
                        } else {
                            await parcheggio.find({_id: {$ne: req.body.parch}}).then(async (Parcheggi)=>{
                                for (let Ospitante of Parcheggi) {
                                    if (Ospitante.autoPresenti<Ospitante.capienzaAuto) {
                                        await parcheggio.findOneAndUpdate({_id: Ospitante._id},{ $inc: {autoPresenti: +1}});
                                        await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: Ospitante.nome, viaFuoriStallo: ""});
                                        return res.status(200).json(Ospitante);
                                    }
                                }
                            })
                        }
                    })
                    if (Veicolo.parcheggioAssociato!="") {    
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {autoPresenti: -1}});
                    }
                    break;
                case "Moto":
                    await parcheggio.findOne({_id: req.body.parch}).then(async (Parcheggio)=>{
                        if (Parcheggio.motoPresenti<Parcheggio.capienzaMoto) {
                            await parcheggio.findOneAndUpdate({_id: req.body.parch},{ $inc: {motoPresenti: +1}});
                            await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: nomeParcNuovo, viaFuoriStallo: ""});
                            return res.status(200).json(Parcheggio);
                        } else {
                            await parcheggio.find({_id: {$ne: req.body.parch}}).then(async (Parcheggi)=>{
                                for (let Ospitante of Parcheggi) {
                                    if (Ospitante.motoPresenti<Ospitante.capienzaMoto) {
                                        await parcheggio.findOneAndUpdate({_id: Ospitante._id},{ $inc: {motoPresenti: +1}});
                                        await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: Ospitante.nome, viaFuoriStallo: ""});
                                        return res.status(200).json(Ospitante);
                                    }
                                }
                            })
                        }
                    })
                    if (Veicolo.parcheggioAssociato!="") {    
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {motoPresenti: -1}});
                    }
                case "Bicicletta":
                    await parcheggio.findOne({_id: req.body.parch}).then(async (Parcheggio)=>{
                        if (Parcheggio.biciPresenti<Parcheggio.capienzaBici) {
                            await parcheggio.findOneAndUpdate({_id: req.body.parch},{ $inc: {biciPresenti: +1}});
                            await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: nomeParcNuovo, viaFuoriStallo: ""});
                            return res.status(200).json(Parcheggio);
                        } else {
                            await parcheggio.find({_id: {$ne: req.body.parch}}).then(async (Parcheggi)=>{
                                for (let Ospitante of Parcheggi) {
                                    if (Ospitante.biciPresenti<Ospitante.capienzaBici) {
                                        await parcheggio.findOneAndUpdate({_id: Ospitante._id},{ $inc: {biciPresenti: +1}});
                                        await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: Ospitante.nome, viaFuoriStallo: ""});
                                        return res.status(200).json(Ospitante);
                                    }
                                }
                            })
                        }
                    })
                    if (Veicolo.parcheggioAssociato!="") {    
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {biciPresenti: -1}});
                    }
                    break;
                default:
                    await parcheggio.findOne({_id: req.body.parch}).then(async (Parcheggio)=>{
                        if (Parcheggio.monopattiniPresenti<Parcheggio.capienzaMonopattini) {
                            await parcheggio.findOneAndUpdate({_id: req.body.parch},{ $inc: {monopattiniPresenti: +1}});
                            await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: nomeParcNuovo, viaFuoriStallo: ""});
                            return res.status(200).json(Parcheggio);
                        } else {
                            await parcheggio.find({_id: {$ne: req.body.parch}}).then(async (Parcheggi)=>{
                                for (let Ospitante of Parcheggi) {
                                    if (Ospitante.monopattiniPresenti<Ospitante.capienzaMonopattini) {
                                        await parcheggio.findOneAndUpdate({_id: Ospitante._id},{ $inc: {monopattiniPresenti: +1}});
                                        await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: Ospitante.nome, viaFuoriStallo: ""});
                                        return res.status(200).json(Ospitante);
                                    }
                                }
                            })
                        }
                    })
                    if (Veicolo.parcheggioAssociato!="") {    
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {monopattiniPresenti: -1}});
                    }
                    break;
            }
        })   
    } else {
        await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{parcheggioAssociato: "", viaFuoriStallo: req.body.ind}).then(async (Veicolo)=>{
            if (Veicolo.parcheggioAssociato!=""){
                switch (Veicolo.tipoVeicolo){
                    case "Autovettura":
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {autoPresenti: -1}});
                        break;
                    case "Moto":
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {motoPresenti: -1}});
                        break;
                    case "Bicicletta":
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {biciPresenti: -1}});
                        break;
                    default:
                        await parcheggio.findOneAndUpdate({nome: Veicolo.parcheggioAssociato},{ $inc: {monopattiniPresenti: -1}});
                        break;
                }
            }
        }).catch((err)=> {return res.status(500).json(err.message)})
    }
};

export const completaRilascio = async (req,res) => {
    await veicolo.findOneAndUpdate({_id: req.body.idVeicolo},{statoVeicolo: "Libero"}).then(async (Veicolo)=>{
        await prenotazione.findOneAndUpdate({_id: req.body._id},{statoPrenotazione: "terminata"}).then((Prenotazione)=>{
            return res.status(200).json(Prenotazione);
        }).catch((err)=> {return res.status(500).json(err.message)});
    }).catch((err)=> {return res.status(500).json(err.message)});
    
};

export const richiediNuovoVeicolo = async (req,res) => {
    let Prenotazione={};
    let Veicolo={};
    await prenotazione.findOne({_id: req.body.cod}).then((booking)=>{
        Prenotazione=booking;
    }).catch((err)=> {return res.status(500).json(err.message)});
    await veicolo.findOne({_id: Prenotazione.idVeicolo}).then((vehicle)=>{
        Veicolo=vehicle;
    }).catch((err)=> {return res.status(500).json(err.message)});
    let ris={};
    await cercaSostituto(Prenotazione,Veicolo).then((risposta)=>{
        ris=risposta;
    });
    if (ris.sostituibile){
        await prenotazione.findOneAndUpdate({_id: req.body.cod},{idVeicolo: ris.sostituto._id});
        await veicolo.findOneAndUpdate({_id: ris.sostituto._id},{statoVeicolo: "Occupato"});
        disattivaVeicolo(Veicolo);
        return res.status(200).json({sostituto: ris.sostituto});
    } else {
        //rimborsa+termina+disattivaVeicolo();
        return res.status(400).json({guasto: "Nessun veicolo individuato"});
    }
};

const disattivaVeicolo = async (Veicolo) => {
    await veicolo.findOneAndUpdate({_id: Veicolo._id},{statoVeicolo: "Non Attivo"});
}