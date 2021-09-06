import utente from '../Models/utente.js';
import veicolo from '../Models/veicoli.js';
import parcheggio from '../Models/parcheggi.js';
import prenotazione from '../Models/prenotazioni.js';
import { notificaAccettaCorsa, notificaCorsaAccettata, removeCompletaOperazione, notificaRifiutaCorsa} from './Notifiche.js';

export const addPrenotazione = async (req,res) => {
    let Prenotazione = {};
    if(req.body.autista==false){
        Prenotazione={
            statoPrenotazione:req.body.statoPrenotazione,
            idCliente:req.body.cliente,
            idVeicolo:req.body.veicolo,
            dataPartenza:req.body.dataPa,
            oraPartenza:req.body.oraPa,
            dataArrivo:req.body.dataArr,
            oraArrivo:req.body.oraArr,
            idParcheggioConsegna:req.body.parcheggioConsegna,
            idParcheggioRilascio:req.body.parcheggioRilascio,
            viaPartenza:req.body.viaFuoriStallo,
            viaDestinazione:'',
            numeroCartaPagamento:req.body.numeroCarta,
            prezzo:req.body.prezzo
        }
    }else{
        Prenotazione={
            idCliente:req.body.cliente,
            idVeicolo:req.body.veicolo,
            idAutista:"",
            dataPartenza:req.body.dataPa,
            oraPartenza:req.body.oraPa,
            dataArrivo:req.body.dataArr,
            oraArrivo:req.body.oraArr,
            viaPartenza:req.body.indirizzoPa,
            viaDestinazione:req.body.indirizzoArr,
            prezzo:req.body.prezzo
        }
    }
    const newPrenotazione = new prenotazione(Prenotazione);
    await newPrenotazione.save().then(async (prenotazione)=>{
        if(req.body.autista==true){
            notificaAccettaCorsa(prenotazione)
        }
        return res.status(200).json(prenotazione)
    }).catch((err)=>{return res.status(500).json(err.message)})
    
}

//Lista Veicoli
export const listaVeicoliPrenotazione = async (req,res) => {
   let Veicoli = [];
   await veicolo.find({tipoVeicolo:req.body.tipoVeicolo, statoVeicolo: { $ne: "Non Attivo"} }).then(async (veicoli)=>{
    let DataPartenza = new Date(req.body.dataPa);
    let DataArrivo = new Date(req.body.dataArr);    
    for (let veicolo of veicoli) {
            await prenotazione.findOne({idVeicolo: veicolo._id, $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, oraPartenza: {$lt: req.body.oraArr}},{dataArrivo:DataPartenza, oraArrivo: {$gt: req.body.oraPa}}]}).then((controlloPrenotazioni)=>{
                if(!controlloPrenotazioni){
                   Veicoli.push(veicolo) 
                } 
            }).catch((err)=>{res.status(500).json(err.message)});
        } 
    return res.status(200).json(Veicoli); 
   }).catch((err)=>{return res.status(500).json(err.message)});
}

//Lista Prenotazioni Addetto
export const listaPrenotazioniAddetto = async (req,res) => {
    let Prenotazioni = [];
    await prenotazione.find({$or: [{idParcheggioConsegna: req.body.idParcheggio},{idParcheggioRilascio: req.body.idParcheggio}]}).then(async(bookings)=>{
        if (bookings.length!=0){
            let Prenotazione={};
            for (let booking of bookings) {
                let idCliente=booking.idCliente;
                let idVeicolo=booking.idVeicolo;
                let idAutista=booking.idAutista;
                let idParchConsegna=booking.idParcheggioConsegna;
                let idParchRilascio=booking.idParcheggioRilascio;
                let nomeCliente="//";
                let cognomeCliente="//";
                let nomeAutista="//";
                let cognomeAutista="//";
                let tipoVeicolo="//";
                let targa="//";
                let nomeParcheggioPartenza="//";
                let nomeParcheggioArrivo="//";
                let indirizzoPartenza=booking.viaPartenza=="" ? "//" : booking.viaPartenza;
                let indirizzoArrivo=booking.viaDestinazione=="" ? "//" : booking.viaDestinazione;
                
                await utente.findOne({_id: idCliente}).then((cliente)=>{
                    nomeCliente=cliente.nome;
                    cognomeCliente=cliente.cognome;
                });
                if(idAutista!=undefined && idAutista!=""){
                    await utente.findOne({_id: idAutista}).then((autista)=>{
                        nomeAutista=autista.nome;
                        cognomeAutista=autista.cognome;
                    });
                }

                await veicolo.findOne({_id: idVeicolo}).then((Veicolo)=>{
                    tipoVeicolo=Veicolo.tipoVeicolo;
                    targa=Veicolo.targa;
                });

                if (idParchConsegna!=undefined) {    
                    await parcheggio.findOne({_id: idParchConsegna}).then((ParchConsegna)=>{
                        nomeParcheggioPartenza=ParchConsegna.nome;
                    });
                }

                if (idParchRilascio!=undefined){
                    await parcheggio.findOne({_id: idParchRilascio}).then((ParchRilascio)=>{
                        nomeParcheggioArrivo=ParchRilascio.nome;
                    });
                }

                Prenotazione={
                    _id: booking._id,
                    nomeCliente: nomeCliente,
                    cognomeCliente: cognomeCliente,
                    tipoVeicolo: tipoVeicolo,
                    targa: targa,
                    nomeAutista: nomeAutista,
                    cognomeAutista: cognomeAutista,
                    dataPartenza: booking.dataPartenza,
                    oraPartenza: booking.oraPartenza,
                    dataArrivo: booking.dataArrivo,
                    oraArrivo: booking.oraArrivo,
                    nomeParcheggioPartenza: nomeParcheggioPartenza,
                    nomeParcheggioArrivo: nomeParcheggioArrivo,
                    indirizzoPartenza: indirizzoPartenza,
                    indirizzoArrivo: indirizzoArrivo,
                    statoPrenotazione: booking.statoPrenotazione
                };
                Prenotazioni.push(Prenotazione);
            }
        }
        return res.status(200).json(Prenotazioni);
    }).catch((err)=>{return res.status(500).json(err.message)});
 }

//Lista Prenotazioni Admin
export const listaPrenotazioniAdmin = async (req,res) => {
    let Prenotazioni = [];
    await prenotazione.find().then(async(bookings)=>{
        if (bookings.length!=0){
            let Prenotazione={};
            for (let booking of bookings) {
                let idCliente=booking.idCliente;
                let idVeicolo=booking.idVeicolo;
                let idAutista=booking.idAutista;
                let idParchConsegna=booking.idParcheggioConsegna;
                let idParchRilascio=booking.idParcheggioRilascio;
                let nomeCliente="//";
                let cognomeCliente="//";
                let nomeAutista="//";
                let cognomeAutista="//";
                let tipoVeicolo="//";
                let targa="//";
                let nomeParcheggioPartenza="//";
                let nomeParcheggioArrivo="//";
                let indirizzoPartenza=booking.viaPartenza=="" ? "//" : booking.viaPartenza;
                let indirizzoArrivo=booking.viaDestinazione=="" ? "//" : booking.viaDestinazione;
                let prezzo = booking.prezzo;
                
                await utente.findOne({_id: idCliente}).then((cliente)=>{
                    nomeCliente=cliente.nome;
                    cognomeCliente=cliente.cognome;
                });

                if(idAutista!=undefined && idAutista!=""){
                    await utente.findOne({_id: idAutista}).then((autista)=>{
                        nomeAutista=autista.nome;
                        cognomeAutista=autista.cognome;
                    });
                }

                await veicolo.findOne({_id: idVeicolo}).then((Veicolo)=>{
                    tipoVeicolo=Veicolo.tipoVeicolo;
                    targa=Veicolo.targa;
                });

                if (idParchConsegna!=undefined) {    
                    await parcheggio.findOne({_id: idParchConsegna}).then((ParchConsegna)=>{
                        nomeParcheggioPartenza=ParchConsegna.nome;
                    });
                }

                if (idParchRilascio!=undefined){
                    await parcheggio.findOne({_id: idParchRilascio}).then((ParchRilascio)=>{
                        nomeParcheggioArrivo=ParchRilascio.nome;
                    });
                }

                Prenotazione={
                    _id: booking._id,
                    nomeCliente: nomeCliente,
                    cognomeCliente: cognomeCliente,
                    tipoVeicolo: tipoVeicolo,
                    targa: targa,
                    nomeAutista: nomeAutista,
                    cognomeAutista: cognomeAutista,
                    dataPartenza: booking.dataPartenza,
                    oraPartenza: booking.oraPartenza,
                    dataArrivo: booking.dataArrivo,
                    oraArrivo: booking.oraArrivo,
                    nomeParcheggioPartenza: nomeParcheggioPartenza,
                    nomeParcheggioArrivo: nomeParcheggioArrivo,
                    indirizzoPartenza: indirizzoPartenza,
                    indirizzoArrivo: indirizzoArrivo,
                    statoPrenotazione: booking.statoPrenotazione,
                    prezzo:prezzo
                };
                Prenotazioni.push(Prenotazione);
            }
        }
        return res.status(200).json(Prenotazioni);
    }).catch((err)=>{return res.status(500).json(err.message)});
}

//Lista Prenotazioni Autista
export const listaPrenotazioniAutista = async (req,res) => {
    let Prenotazioni = [];
    await prenotazione.find({idAutista: req.body._id}).then(async(bookings)=>{
        if (bookings.length!=0){
            let Prenotazione={};
            for (let booking of bookings) {
                let idCliente=booking.idCliente;
                let idVeicolo=booking.idVeicolo;
                let idParchConsegna=booking.idParcheggioConsegna;
                let idParchRilascio=booking.idParcheggioRilascio;
                let nomeCliente="//";
                let cognomeCliente="//";
                let tipoVeicolo="//";
                let targa="//";
                let nomeParcheggioPartenza="//";
                let nomeParcheggioArrivo="//";
                let indirizzoPartenza=booking.viaPartenza=="" ? "//" : booking.viaPartenza;
                let indirizzoArrivo=booking.viaDestinazione=="" ? "//" : booking.viaDestinazione;
                
                await utente.findOne({_id: idCliente}).then((cliente)=>{
                    nomeCliente=cliente.nome;
                    cognomeCliente=cliente.cognome;
                });
                await veicolo.findOne({_id: idVeicolo}).then((Veicolo)=>{
                    tipoVeicolo=Veicolo.tipoVeicolo;
                    targa=Veicolo.targa;
                });
                
                if (idParchConsegna!=undefined) {    
                    await parcheggio.findOne({_id: idParchConsegna}).then((ParchConsegna)=>{
                        nomeParcheggioPartenza=ParchConsegna.nome;
                    });
                }

                if (idParchRilascio!=undefined){
                    await parcheggio.findOne({_id: idParchRilascio}).then((ParchRilascio)=>{
                        nomeParcheggioArrivo=ParchRilascio.nome;
                    });
                }

                Prenotazione={
                    _id: booking._id,
                    nomeCliente: nomeCliente,
                    cognomeCliente: cognomeCliente,
                    tipoVeicolo: tipoVeicolo,
                    targa: targa,
                    dataPartenza: booking.dataPartenza,
                    oraPartenza: booking.oraPartenza,
                    dataArrivo: booking.dataArrivo,
                    oraArrivo: booking.oraArrivo,
                    nomeParcheggioPartenza: nomeParcheggioPartenza,
                    nomeParcheggioArrivo: nomeParcheggioArrivo,
                    indirizzoPartenza: indirizzoPartenza,
                    indirizzoArrivo: indirizzoArrivo,
                    statoPrenotazione: booking.statoPrenotazione
                };
                Prenotazioni.push(Prenotazione);
            }
        }
        return res.status(200).json(Prenotazioni);
    }).catch((err)=>{return res.status(500).json(err.message)});
}

//Lista Prenotazioni Cliente
export const listaPrenotazioniCliente = async (req,res) => {
    let Prenotazioni = [];
    await prenotazione.find({idCliente: req.body._id}).then(async(bookings)=>{
        if (bookings.length!=0){
            let Prenotazione={};
            for (let booking of bookings) {
                let idVeicolo=booking.idVeicolo;
                let idAutista=booking.idAutista;
                let idParchConsegna=booking.idParcheggioConsegna;
                let idParchRilascio=booking.idParcheggioRilascio;
                let nomeAutista="//";
                let cognomeAutista="//";
                let tipoVeicolo="//";
                let targa="//";
                let nomeParcheggioPartenza="//";
                let nomeParcheggioArrivo="//";
                let indirizzoPartenza=booking.viaPartenza=="" ? "//" : booking.viaPartenza;
                let indirizzoArrivo=booking.viaDestinazione=="" ? "//" : booking.viaDestinazione;
                let prezzo = booking.prezzo;
                
                //idAutista puo' essere undefined se non si e' richiesto l'autista o "" se nessun autista ha ancora accettato
                if(idAutista!=undefined && idAutista!=""){
                    await utente.findOne({_id: idAutista}).then((autista)=>{
                        nomeAutista=autista.nome;
                        cognomeAutista=autista.cognome;
                    });
                }
                await veicolo.findOne({_id: idVeicolo}).then((Veicolo)=>{
                    tipoVeicolo=Veicolo.tipoVeicolo;
                    targa=Veicolo.targa;
                });
                  
                if(idParchConsegna!=undefined){    
                    await parcheggio.findOne({_id: idParchConsegna}).then((ParchConsegna)=>{
                        nomeParcheggioPartenza=ParchConsegna.nome;
                    });
                }
                      
                if (idParchRilascio!=undefined){
                    await parcheggio.findOne({_id: idParchRilascio}).then((ParchRilascio)=>{
                        nomeParcheggioArrivo=ParchRilascio.nome;
                    });
                }

                Prenotazione={
                    _id: booking._id,
                    tipoVeicolo: tipoVeicolo,
                    targa: targa,
                    nomeAutista: nomeAutista,
                    cognomeAutista: cognomeAutista,
                    dataPartenza: booking.dataPartenza,
                    oraPartenza: booking.oraPartenza,
                    dataArrivo: booking.dataArrivo,
                    oraArrivo: booking.oraArrivo,
                    nomeParcheggioPartenza: nomeParcheggioPartenza,
                    nomeParcheggioArrivo: nomeParcheggioArrivo,
                    indirizzoPartenza: indirizzoPartenza,
                    indirizzoArrivo: indirizzoArrivo,
                    statoPrenotazione: booking.statoPrenotazione,
                    prezzo:prezzo
                };
                Prenotazioni.push(Prenotazione);
            }
        }
        return res.status(200).json(Prenotazioni);
    }).catch((err)=>{return res.status(500).json(err.message)});
}

//Get Tariffe
export const getTariffe = async (req,res) => {
    await veicolo.findOne({_id: req.body.idVeicolo}).then((veicolo)=>{
        let tariffe = {prFestivo: veicolo.prezzoFestivo, prFeriale: veicolo.prezzoFeriale};
        return res.status(200).json(tariffe); 
    }).catch((err)=>{return res.status(500).json(err.message)});
}

//Accetta corsa
export const accettaCorsa = async (req,res) => {
    await prenotazione.findOneAndUpdate({_id:req.body.idPrenotazione, idAutista:""},{idAutista:req.body.idAutista},{new:true}).then((Prenotazione)=>{
        if(!Prenotazione){
            return res.status(400).json({accettata:"Ci dispiace, ma la corsa è già stata accettata"})
        } else{
            notificaCorsaAccettata(Prenotazione._id)
        }
        return res.status(200).json({success:true});
    })
}

//Annulla Prenotazione
export const deleteBooking = async (req,res) => {
    await prenotazione.findOneAndRemove({_id: req.body.id}).then((Prenotazione)=>{
        return res.status(200).json(Prenotazione);
    }).catch((err)=>{
        return res.status(500).json(err.message);
    });
}

//Termina Prenotazione
export const terminaPrenotazione = async (req,res) => {
    await prenotazione.findOneAndUpdate({_id: req.body.id},{statoPrenotazione: "terminata"}).then((Prenotazione)=>{
        return res.status(200).json(Prenotazione);
    }).catch((err)=>{
        return res.status(500).json(err.message);
    });
}

//Modifica Prenotazione_Veicolo
export const modifyVehicle = async (req,res) => {
    let TipoVeicolo = "";
    await veicolo.find({_id: req.body.prenotazione.idVeicolo}).then((Veicolo)=>{
        TipoVeicolo = Veicolo.tipoVeicolo;
    });
    let Veicoli = [];
    await veicolo.find({tipoVeicolo: TipoVeicolo, statoVeicolo: { $ne: "Non Attivo"} }).then(async (veicoli)=>{
        let DataPartenza = new Date(req.body.prenotazione.dataPartenza);
        let DataArrivo = new Date(req.body.prenotazione.dataArrivo);    
        for (let vehicle of veicoli) {
            await prenotazione.findOne({idVeicolo: vehicle._id, $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, oraPartenza: {$lt: req.body.prenotazione.oraArrivo}},{dataArrivo:DataPartenza, oraArrivo: {$gt: req.body.prenotazione.oraPartenza}}]}).then((controlloPrenotazioni)=>{
                if(!controlloPrenotazioni){
                    Veicoli.push(vehicle); 
                } 
            }).catch((err)=>{res.status(500).json(err.message)});
        } 
        return res.status(200).json(Veicoli);
    });
}

//Dati Prenotazione
export const datiPrenotazione = async (req,res) => {
    let PRENOTAZIONE={}
    await prenotazione.findOne({_id:req.body.idPrenotazione}).then((Prenotazione)=>{
        PRENOTAZIONE = {
            _id:Prenotazione._id,
            dataArr : Prenotazione.dataArrivo,
            dataPa : Prenotazione.dataPartenza,
            oraArr : Prenotazione.oraArrivo,
            oraPa : Prenotazione.oraPartenza,
            prezzo : Prenotazione.prezzo,
            indirizzoArr : Prenotazione.viaDestinazione,
            indirizzoPa : Prenotazione.viaPartenza,
            autista:true
        }
        return res.status(200).json(PRENOTAZIONE);
    }).catch((err)=>{res.status(500).json(err.message)})
}

//Paga Autista
export const pagaAutista = async (req,res) =>{
    console.log(req.body)
    await prenotazione.findByIdAndUpdate({_id:req.body.idPrenotazione},{statoPrenotazione:"completa",numeroCarta:req.body.numeroCarta,mancia:req.body.mancia}).then((Prenotazione)=>{
        removeCompletaOperazione(req.body.idPrenotazione);
        return res.status(200).json({success: true})
    })
}

//Rifiuta Corsa
export const rifiutaCorsa = async (req,res) => {
    notificaRifiutaCorsa(req.body.idPrenotazione,req.body.idAutista)
    return res.status(200).json({success:true})
}