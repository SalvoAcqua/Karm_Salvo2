import utente from '../Models/utente.js';
import veicolo from '../Models/veicoli.js';
import parcheggio from '../Models/parcheggi.js';
import prenotazione from '../Models/prenotazioni.js';
import { response } from 'express';

//Lista Clienti
export const getClienti = async (req,res) =>{
    await utente.find({ruolo: "Cliente"}).then((clienti)=>{
        const listaClienti = [];
        for(let cliente of clienti){
            const Utente = {nome:cliente.nome, cognome:cliente.cognome, sesso: cliente.sesso, dataNascita: cliente.dataNascita, email: cliente.email, CF: cliente.CF}
            listaClienti.push(Utente)
        }
        return res.json(listaClienti)
    }).catch((err)=> {return res.status(500).json(err.message)})
};

//Lista Dipendenti
export const getDipendenti = async (req,res) => {
    await utente.find({$or: [{ ruolo: "Autista" }, { ruolo: "Addetto" }]}).then(async (dipendenti)=>{
        let listaDipendenti = [];
        let Utente = {};
        for(let dipendente of dipendenti){
            if (dipendente.ruolo=="Addetto"){
                let NomeParcheggio="Nessun Parcheggio";
                if (dipendente.idParcheggio!="-1") {
                    await parcheggio.findOne({_id: dipendente.idParcheggio}).then((parcheggio)=>{
                        NomeParcheggio=parcheggio.nome;
                    });
                }
                Utente = {
                    _id:dipendente._id,
                    ruolo:dipendente.ruolo,
                    nome:dipendente.nome,
                    cognome:dipendente.cognome,
                    sesso: dipendente.sesso,
                    dataNascita: dipendente.dataNascita,
                    provinciaNascita: dipendente.provinciaNascita,
                    luogoNascita: dipendente.luogoNascita,
                    CF: dipendente.CF,
                    nomeParcheggio: NomeParcheggio,
                    email: dipendente.email
                }
            } else {
                Utente = {
                    _id:dipendente._id,
                    ruolo:dipendente.ruolo,
                    nome:dipendente.nome,
                    cognome:dipendente.cognome,
                    sesso: dipendente.sesso,
                    dataNascita: dipendente.dataNascita,
                    provinciaNascita: dipendente.provinciaNascita,
                    luogoNascita: dipendente.luogoNascita,
                    CF: dipendente.CF,
                    numeroPatente: dipendente.numeroPatente,
                    email: dipendente.email
                }
            }
            listaDipendenti.push(Utente);
        }
        return res.json(listaDipendenti)
    }).catch((err)=> {return res.status(500).json(err.message)})
};

//Lista Veicoli
export const getVeicoli = async (req,res) => {
    await veicolo.find().then((veicoli)=>{
        const listaVeicoli = [];
        for(let veicolo of veicoli){
            const Veicolo = {_id:veicolo._id, tipo:veicolo.tipoVeicolo, modello:veicolo.modello, marca:veicolo.marca, cilindrata:veicolo.cilindrata, 
                posti:veicolo.nPosti, porte:veicolo.nPorte, targa:veicolo.targa, parcAssociato:veicolo.parcheggioAssociato,viaFuoriStallo:veicolo.viaFuoriStallo,
                descrizione:veicolo.descrizione, stato:veicolo.statoVeicolo, prFestivo:veicolo.prezzoFestivo, prFeriale:veicolo.prezzoFeriale}
            listaVeicoli.push(Veicolo)
        }
        return res.json(listaVeicoli)
    }).catch((err)=> {return res.status(500).json(err.message)})
};

//Lista parcheggi
export const getParcheggi = async (req,res) => {
    await parcheggio.find({}).then((parcheggi)=>{
        return res.json(parcheggi)
    }).catch((err)=> {return res.status(500).json(err.message)})
};

//Lista parcheggi disponibili
export const getParcheggiDisp = async (req,res) => {
    switch(req.body.tipo){
        case "Autovettura":
            let nAutovetture = "";
            let capAutovetture = 0;
            await veicolo.find({tipoVeicolo: "Autovettura"}).then((Autovetture)=>{nAutovetture=Autovetture.length});
            await parcheggio.find().then((Parcheggi)=>{
                for (let Parcheggio of Parcheggi){
                    capAutovetture+=Parcheggio.capienzaAuto;
                }
            });
            if (nAutovetture<capAutovetture){
                await parcheggio.find({ $expr: { $gt: [ "$capienzaAuto" , "$autoPresenti" ] } }).then((parcheggi)=>{
                    return res.status(200).json(parcheggi)
                }).catch((err)=> {return res.status(500).json(err.message)})
            } else {
                return res.status(200).json([])
            }
            break;
        case "Moto":
            let nMoto = "";
            let capMoto = 0;
            await veicolo.find({tipoVeicolo: "Moto"}).then((Moto)=>{nMoto=Moto.length});
            await parcheggio.find().then((Parcheggi)=>{
                for (let Parcheggio of Parcheggi){
                    capMoto+=Parcheggio.capienzaMoto;
                }
            });
            if (nMoto<capMoto){
                await parcheggio.find({ $expr: { $gt: [ "$capienzaMoto" , "$motoPresenti" ] } }).then((parcheggi)=>{
                    return res.status(200).json(parcheggi)
                }).catch((err)=> {return res.status(500).json(err.message)})
            } else {
                return res.status(200).json([])
            }
            break;
        case "Bicicletta":
            let nBici = "";
            let capBici = 0;
            await veicolo.find({tipoVeicolo: "Bicicletta"}).then((Bici)=>{nBici=Bici.length});
            await parcheggio.find().then((Parcheggi)=>{
                for (let Parcheggio of Parcheggi){
                    capBici+=Parcheggio.capienzaBici;
                }
            });
            if (nBici<capBici){
                await parcheggio.find({ $expr: { $gt: [ "$capienzaBici" , "$biciPresenti" ] } }).then((parcheggi)=>{
                    return res.status(200).json(parcheggi)
                }).catch((err)=> {return res.status(500).json(err.message)})
            } else {
                return res.status(200).json([])
            }
            break;
        default:
            let nMonopattini = "";
            let capMonopattini = 0;
            await veicolo.find({tipoVeicolo: "Monopattino"}).then((Monopattini)=>{nMonopattini=Monopattini.length});
            await parcheggio.find().then((Parcheggi)=>{
                for (let Parcheggio of Parcheggi){
                    capMonopattini+=Parcheggio.capienzaMonopattini;
                }
            });
            if (nMonopattini<capMonopattini){
                await parcheggio.find({ $expr: { $gt: [ "$capienzaMonopattini" , "$monopattiniPresenti" ] } }).then((parcheggi)=>{
                    return res.status(200).json(parcheggi)
                }).catch((err)=> {return res.status(500).json(err.message)})
            } else {
                return res.status(200).json([])
            }
            break;
    }
};

//Aggiungi Veicolo
export const addVeicolo = async (req,res) => {
    let Veicolo = {};
    let parche='';
    let auto='';
    let moto='';
    let bici='';
    let monopattini='';
    await parcheggio.findOne({_id:req.body.parcheggioAssociato}).then((parking)=>{
        parche=parking.nome;
        auto=parking.autoPresenti;
        moto=parking.motoPresenti;
        bici=parking.biciPresenti;
        monopattini=parking.monopattiniPresenti;
    })
    switch(req.body.tipoVeicolo){
        case "Autovettura":
            Veicolo = {
                tipoVeicolo: req.body.tipoVeicolo,
                modello: req.body.modello,
                marca: req.body.marca,
                cilindrata: req.body.cilindrata,
                nPosti: req.body.nPosti,
                nPorte: req.body.nPorte,
                targa: req.body.targa,
                parcheggioAssociato: parche,
                descrizione: req.body.descrizione,
                prezzoFestivo:req.body.prezzoFestivo,
                prezzoFeriale:req.body.prezzoFeriale
            }
            await parcheggio.findOneAndUpdate({_id:req.body.parcheggioAssociato}, {autoPresenti: auto+1});
            break;
        case "Moto":
            Veicolo = {
                tipoVeicolo: req.body.tipoVeicolo,
                modello: req.body.modello,
                marca: req.body.marca,
                cilindrata: req.body.cilindrata,
                targa: req.body.targa,
                parcheggioAssociato: parche,
                descrizione: req.body.descrizione,
                prezzoFestivo:req.body.prezzoFestivo,
                prezzoFeriale:req.body.prezzoFeriale
            }
            await parcheggio.findOneAndUpdate({_id:req.body.parcheggioAssociato}, {motoPresenti: moto+1});
            break;
        case "Bicicletta":
            Veicolo = {
                tipoVeicolo: req.body.tipoVeicolo,
                parcheggioAssociato: parche,
                descrizione: req.body.descrizione,
                prezzoFestivo:req.body.prezzoFestivo,
                prezzoFeriale:req.body.prezzoFeriale
            }
            await parcheggio.findOneAndUpdate({_id:req.body.parcheggioAssociato}, {biciPresenti: bici+1});
            break;
        default:
            Veicolo = {
                tipoVeicolo: req.body.tipoVeicolo,
                parcheggioAssociato: parche,
                descrizione: req.body.descrizione,
                prezzoFestivo:req.body.prezzoFestivo,
                prezzoFeriale:req.body.prezzoFeriale
            }
            await parcheggio.findOneAndUpdate({_id:req.body.parcheggioAssociato}, {monopattiniPresenti: monopattini+1});
            break;
    }
    const newVeicolo = new veicolo(Veicolo);
    await newVeicolo.save().then((mezzo) => {return res.status(200).json(mezzo)}) .catch((err) => console.log(err));
};

//Rimuovi Veicolo
export const removeVehicle = async (req,res) =>{
    await veicolo.findOneAndRemove({_id: req.body.veicolo._id}).then((veicolo)=>{
        res.json(veicolo);
    }).catch((err)=>{return res.status(500).json(err.message)})
    switch (req.body.veicolo.tipo) {
        case "Autovettura":   
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {autoPresenti: -1}})
            break;
        case "Moto":
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {motoPresenti: -1}})
            break;
        case "Bicicletta":
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {biciPresenti: -1}})
            break;
        default:
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {monopattiniPresenti: -1}})
            break;
    }
 };

//Riattiva Veicolo
 export const reactivate = async (req,res) =>{
    await veicolo.findOneAndUpdate({_id:req.body.id},{statoVeicolo: "Libero"}).then((veicolo)=>{
        return res.status(200).json(veicolo);
    }).catch((err)=>{return res.status(500).json(err.message)})
};

//Blocca Veicolo
export const blockVehicle = async (req,res) =>{
    await prenotazione.find({idVeicolo: req.body.veicolo._id, $or: [{ statoPrenotazione: "completa" }, { statoPrenotazione: "incompleta" }]}).then(async (prenotazioni)=>{
        if (prenotazioni.length!=0){
            for (let Prenotazione of prenotazioni) {
                let DataPartenza = new Date(Prenotazione.dataPartenza);
                let DataArrivo = new Date(Prenotazione.dataArrivo);
                let nessunVeicoloSostituto=true;
                switch (req.body.veicolo.tipo) {
                    case "Autovettura":
                        await veicolo.find({_id: {$ne: req.body.veicolo._id}, tipoVeicolo: req.body.veicolo.tipo, modello: req.body.veicolo.modello, cilindrata:req.body.veicolo.cilindrata, nPosti: req.body.veicolo.posti, statoVeicolo: {$ne: "Non Attivo" }}).then(async (Veicoli)=>{
                            for (let Veicolo of Veicoli) {
                                let idPossibileSostituto=Veicolo._id;
                                await prenotazione.findOne({idVeicolo: idPossibileSostituto, statoPrenotazione: {$ne: "terminata"}, $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, oraPartenza: {$lt: req.body.oraArrivo}},{dataArrivo:DataPartenza, oraArrivo: {$gt: req.body.oraPartenza}}]}).then(async (corsa)=>{
                                    if(!corsa){
                                        nessunVeicoloSostituto=false;
                                        await prenotazione.findOneAndUpdate({_id: Prenotazione._id},{idVeicolo: idPossibileSostituto}).catch((err)=>{return res.status(500).json(err.message)})
                                    }
                                }).catch((err)=>{return res.status(500).json(err.message)})
                            }
                            if (nessunVeicoloSostituto){
                                //rimborso + email
                            }
                        }).catch((err)=>{return res.status(500).json(err.message)})
                        break;
                    case "Moto":
                        await veicolo.find({_id: {$ne: req.body.veicolo._id}, tipoVeicolo: req.body.veicolo.tipo, modello: req.body.veicolo.modello, cilindrata:req.body.veicolo.cilindrata, statoVeicolo: {$ne: "Non Attivo" }}).then(async (Veicoli)=>{
                            for (let Veicolo of Veicoli) {
                                let idPossibileSostituto=Veicolo._id;
                                await prenotazione.findOne({idVeicolo: idPossibileSostituto, statoPrenotazione: {$ne: "terminata"}, $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, oraPartenza: {$lt: req.body.oraArrivo}},{dataArrivo:DataPartenza, oraArrivo: {$gt: req.body.oraPartenza}}]}).then(async (corsa)=>{
                                    if(!corsa){
                                        nessunVeicoloSostituto=false;
                                        await prenotazione.findOneAndUpdate({_id: Prenotazione._id},{idVeicolo: idPossibileSostituto}).catch((err)=>{return res.status(500).json(err.message)})
                                    }
                                }).catch((err)=>{return res.status(500).json(err.message)})
                            }
                            if (nessunVeicoloSostituto){
                                //rimborso + email
                            }
                        }).catch((err)=>{return res.status(500).json(err.message)})
                        break;
                    case "Bicicletta":
                        await veicolo.find({_id: {$ne: req.body.veicolo._id}, tipoVeicolo: req.body.veicolo.tipo, statoVeicolo: {$ne: "Non Attivo" }}).then(async (Veicoli)=>{
                            for (let Veicolo of Veicoli) {
                                let idPossibileSostituto=Veicolo._id;
                                await prenotazione.findOne({idVeicolo: idPossibileSostituto, statoPrenotazione: {$ne: "terminata"}, $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, oraPartenza: {$lt: req.body.oraArrivo}},{dataArrivo:DataPartenza, oraArrivo: {$gt: req.body.oraPartenza}}]}).then(async (corsa)=>{
                                    if(!corsa){
                                        nessunVeicoloSostituto=false;
                                        await prenotazione.findOneAndUpdate({_id: Prenotazione._id},{idVeicolo: idPossibileSostituto}).catch((err)=>{return res.status(500).json(err.message)})
                                    }
                                }).catch((err)=>{return res.status(500).json(err.message)})
                            }
                            if (nessunVeicoloSostituto){
                                //rimborso + email
                            }
                        }).catch((err)=>{return res.status(500).json(err.message)})
                        break;
                    default:
                        await veicolo.find({_id: {$ne: req.body.veicolo._id}, tipoVeicolo: req.body.veicolo.tipo, statoVeicolo: {$ne: "Non Attivo" }}).then(async (Veicoli)=>{
                            for (let Veicolo of Veicoli) {
                                let idPossibileSostituto=Veicolo._id;
                                await prenotazione.findOne({idVeicolo: idPossibileSostituto, statoPrenotazione: {$ne: "terminata"}, $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, oraPartenza: {$lt: req.body.oraArrivo}},{dataArrivo:DataPartenza, oraArrivo: {$gt: req.body.oraPartenza}}]}).then(async (corsa)=>{
                                    if(!corsa){
                                        nessunVeicoloSostituto=false;
                                        await prenotazione.findOneAndUpdate({_id: Prenotazione._id},{idVeicolo: idPossibileSostituto}).catch((err)=>{return res.status(500).json(err.message)})
                                    }
                                }).catch((err)=>{return res.status(500).json(err.message)})
                            }
                            if (nessunVeicoloSostituto){
                                //rimborso + email
                            }
                        }).catch((err)=>{return res.status(500).json(err.message)})
                        break;
                }
            }
        }
    }).catch((err)=>{return res.status(500).json(err.message)})

    await veicolo.findOneAndUpdate({_id: req.body.veicolo._id}, {statoVeicolo:"Non Attivo"}).then((veicolo)=>{
        res.json(veicolo);
    })
};

// Modifica Parcheggio
export const changePark = async (req,res) => {
    let parche='';
    await parcheggio.findOne({_id:req.body.nuovoParcheggio}).then((parking)=>{
        parche=parking.nome;
    })
    await veicolo.findOneAndUpdate({_id: req.body.veicolo._id},{parcheggioAssociato: parche}).then((veicolo)=>{
        res.json(veicolo);
    }).catch((err)=>{return res.status(500).json(err.message)})
    switch(req.body.veicolo.tipo){
        case "Autovettura":
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {autoPresenti: -1}})
            await parcheggio.findOneAndUpdate({_id: req.body.nuovoParcheggio},{ $inc: {autoPresenti: 1}})
            break;
        case "Moto":
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {motoPresenti: -1}})
            await parcheggio.findOneAndUpdate({_id: req.body.nuovoParcheggio},{ $inc: {motoPresenti: 1}})
            break;
        case "Bicicletta":
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {biciPresenti: -1}})
            await parcheggio.findOneAndUpdate({_id: req.body.nuovoParcheggio},{ $inc: {biciPresenti: 1}})
            break;
        default:
            await parcheggio.findOneAndUpdate({nome: req.body.veicolo.parcAssociato},{ $inc: {monopattiniPresenti: -1}})
            await parcheggio.findOneAndUpdate({_id: req.body.nuovoParcheggio},{ $inc: {monopattiniPresenti: 1}})
            break;
    }
};

 //Modifica Tariffa
export const modificaTariffa = async (req,res) =>{
    await veicolo.findOneAndUpdate({_id:req.body.id},{prezzoFestivo:req.body.prezzoFestivo, prezzoFeriale:req.body.prezzoFeriale}).then((veicolo)=>{
        return res.status(200).json(veicolo);
    }).catch((err)=>{return res.status(500).json(err.message)})
};

 //Aggiungi Parcheggio
 export const addParcheggio = async (req,res) =>{
     await parcheggio.findOne({$or: [{ nome: req.body.nome }, { indirizzo:req.body.indirizzo, nCivico:req.body.nCivico }]}).then((parking)=>{
         if(parking){
            return res.status(400).json({ parcheggio: "Parcheggio già esistente per questo indirizzo o nome" });
         } else{
             const newParcheggio = new parcheggio({
                 nome:req.body.nome,
                 indirizzo:req.body.indirizzo,
                 nCivico:req.body.nCivico,
                 capienzaAuto:req.body.capienzaAuto,
                 autoPresenti:req.body.autoPresenti,
                 capienzaMoto:req.body.capienzaMoto,
                 motoPresenti:req.body.motoPresenti,
                 capienzaBici:req.body.capienzaBici,
                 biciPresenti:req.body.biciPresenti,
                 capienzaMonopattini:req.body.capienzaMonopattini,
                 monopattiniPresenti:req.body.monopattiniPresenti,
             })

             newParcheggio.save().then((parcheggio) =>{return res.status(200).json(parcheggio)}).catch((err)=>res.status(500).json(err.message)) 
         }
     }).catch(err => {
        return res.status(500).json(err.message);
    })
 };

//Rimuovi Dipendente
export const removeEmployee = async (req,res) =>{
    if (req.body.dipendente.ruolo=="Autista") {
        await prenotazione.findOne({statoPrenotazione:{ $ne: "terminata"}, idAutista: req.body.dipendente._id}).then(async (booking)=>{
            if(booking){
                return res.status(400).json({rimozioneAutista:true});
            }else{
                await utente.findOneAndRemove({_id: req.body.dipendente._id}).then((dipendente)=>{
                    return res.status(200).json(dipendente);
                }).catch((err)=>{return res.status(500).json(err.message)})
            }
        }).catch((err)=>{return res.status(500).json(err.message)})
    } else {
        await utente.findOneAndRemove({_id: req.body.dipendente._id}).then((dipendente)=>{
            return res.status(200).json(dipendente);
        }).catch((err)=>{return res.status(500).json(err.message)})
    }
 };