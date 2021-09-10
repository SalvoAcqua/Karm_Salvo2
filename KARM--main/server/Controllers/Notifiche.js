import notifiche from "../Models/notifiche.js";
import utente from '../Models/utente.js';
import veicolo from '../Models/veicoli.js';
import prenotazione from '../Models/prenotazioni.js';
import {convertiDataEuropa} from '../gestioneDateTime.js';

export const notificaAccettaCorsa = async (Prenotazione) => {
    
    let DataPartenza = new Date(Prenotazione.dataPartenza);
    let DataArrivo = new Date(Prenotazione.dataArrivo);
    let Notifica = {
        tipo:"accettaCorsa",
        idPrenotazione:Prenotazione._id
        }
    let newNotifica;
    let flag=0;
    await utente.find({ruolo:"Autista"}).then(async (autisti)=>{
        for (let autista of autisti ) {
            await prenotazione.findOne({idAutista: autista._id,  $or: [{statoPrenotazione:"completa"},{statoPrenotazione:"in_corsa"}], $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, dataPartenza:{$gt: DataPartenza} ,oraPartenza: {$lt: Prenotazione.oraArrivo}},{dataPartenza:DataArrivo, dataPartenza:DataPartenza,dataArrivo:{$gt:DataArrivo},oraPartenza: {$lt: Prenotazione.oraArrivo},oraPartenza: {$gt: Prenotazione.oraPartenza}},{dataPartenza:DataArrivo, dataPartenza:DataPartenza, dataArrivo:DataPartenza ,oraArrivo: {$gte: Prenotazione.oraArrivo}, oraPartenza:{$lt: Prenotazione.oraArrivo}},{dataPartenza:DataArrivo, dataPartenza: DataPartenza ,dataArrivo:DataPartenza, oraPartenza: {$lte: Prenotazione.oraPartenza}, oraArrivo:{$gt: Prenotazione.oraPartenza}},{dataPartenza:DataArrivo, dataPartenza: DataPartenza , dataArrivo:DataPartenza, oraPartenza: {$gte: Prenotazione.oraPartenza}, oraArrivo:{$lte: Prenotazione.oraArrivo}},{dataArrivo:DataPartenza, dataArrivo:{$lt: DataArrivo}, oraArrivo: {$gt: Prenotazione.oraPartenza}},{dataArrivo:DataPartenza, dataArrivo:DataArrivo, dataPartenza:{$lt: DataPartenza}, oraArrivo: {$gt: Prenotazione.oraPartenza}}]}).then((corsa)=>{
                if(!corsa){
                    flag=1;
                    Notifica.idUtente=autista._id;
                    newNotifica = new notifiche(Notifica);
                    newNotifica.save();
                }
            }).catch((err)=>{console.log(err)})
        }
        if(flag==0){
            notificaNessunAutista(Prenotazione.idCliente,Prenotazione._id) ;
        }
    }).catch((err)=>{notificaNessunAutista(Prenotazione.idCliente,Prenotazione._id)});
};

export const notificaNessunAutista = async (idCliente,idPrenotazione) =>{
    let Notifica = {
        tipo:"cliente",
        idUtente:idCliente,
        messaggio:`Siamo spiacenti, ma non è stato trovato nessun autista per la prenotazione richiesta con codice ${idPrenotazione}`
        }
    await prenotazione.findOneAndRemove({_id:idPrenotazione})
    const newNotifica = new notifiche(Notifica);
    newNotifica.save();
}

export const prendiNonLette = async (req,res) => {
    await notifiche.find({idUtente:req.body._id, letta:"false"}).then((notifiche)=>{
        if(notifiche){    
            return res.status(200).json(notifiche.length)
        } else{
            return res.status(200).json(0)
        }
    })
}

export const prendiNotifiche = async (req,res) => {
    let NOTIFICHE=[];
    let notificaAccettaCorsa={}
    let notificaCompletaCorsa={}
    let notificaCompletaModifica={}
    await notifiche.find({idUtente:req.body._id}).then(async(Notifiche)=>{  
        for(let notifica of Notifiche){
            await notifiche.findOneAndUpdate({_id:notifica._id},{letta:"true"})
            switch(notifica.tipo){
                case "accettaModifica":
                    await prenotazione.findOne({_id:notifica.idPrenotazione}).then((Prenotazione)=>{
                        if(Prenotazione){
                                notificaAccettaCorsa={
                                    idNotifica:notifica._id,
                                    idPrenotazione:notifica.idPrenotazione,
                                    letta:notifica.letta,
                                    tipo:notifica.tipo,
                                    messaggio:notifica.messaggio,
                                    dataPartenza:Prenotazione.dataPartenza,
                                    dataArrivo:notifica.dati.dataArr,
                                    oraPartenza:Prenotazione.oraPartenza,
                                    oraArrivo:notifica.dati.oraArr,
                                    viaPartenza:Prenotazione.viaPartenza,
                                    viaDestinazione:notifica.dati.ind,
                                }
                                NOTIFICHE.push(notificaAccettaCorsa);
                        }
                    }).catch((err)=>{console.log(err)})
                    break;
                case "accettaCorsa":
                    await prenotazione.findOne({_id:notifica.idPrenotazione}).then(async(Prenotazione)=>{
                        if(Prenotazione){
                            await utente.findOne({_id:Prenotazione.idCliente}).then((Utente)=>{
                                notificaAccettaCorsa={
                                    idNotifica:notifica._id,
                                    idPrenotazione:notifica.idPrenotazione,
                                    letta:notifica.letta,
                                    tipo:notifica.tipo,
                                    nome:Utente.nome,
                                    cognome:Utente.cognome,
                                    dataPartenza:Prenotazione.dataPartenza,
                                    dataArrivo:Prenotazione.dataArrivo,
                                    oraPartenza:Prenotazione.oraPartenza,
                                    oraArrivo:Prenotazione.oraArrivo,
                                    viaPartenza:Prenotazione.viaPartenza,
                                    viaDestinazione:Prenotazione.viaDestinazione,
                                }
                                NOTIFICHE.push(notificaAccettaCorsa);
                            })
                        }
                    }).catch((err)=>{console.log(err)})
                    break;
                case "completaCorsa":
                    await prenotazione.findOne({_id:notifica.idPrenotazione}).then(async(Prenotazione)=>{
                        await utente.findOne({_id:Prenotazione.idAutista}).then((Utente)=>{
                            notificaCompletaCorsa={
                                idNotifica:notifica._id,
                                idPrenotazione:notifica.idPrenotazione,
                                tipo:notifica.tipo,
                                idVeicolo:Prenotazione.idVeicolo,
                                messaggio:`L'autista ${Utente.nome} ${Utente.cognome} ha accettato la tua corsa`
                            }
                            
                        })
                    })
                    NOTIFICHE.push(notificaCompletaCorsa);
                    break;
                case "completaModifica":
                        await prenotazione.findOne({_id:notifica.idPrenotazione}).then(async(Prenotazione)=>{
                            await utente.findOne({_id:Prenotazione.idCliente}).then((Utente)=>{
                                notificaCompletaModifica={
                                    idNotifica:notifica._id,
                                    idPrenotazione:notifica.idPrenotazione,
                                    tipo:notifica.tipo,
                                    dati:notifica.dati,
                                    idVeicolo: Prenotazione.idVeicolo,
                                    prezzo:Prenotazione.prezzo,
                                    messaggio:`L'autista ha accettato la tua modifica`
                                }
                            })
                        })
                        NOTIFICHE.push(notificaCompletaModifica);
                    break;
                default:
                    NOTIFICHE.push(notifica);
            }   
        }
        return res.status(200).json(NOTIFICHE)
    }).catch((err)=>{return res.status(500).json(err.message)})
}

//Notifica corsa accettata
export const notificaCorsaAccettata = async (idPrenotazione) =>{
    await notifiche.find({idPrenotazione:idPrenotazione}).then(async (Notifiche)=>{
        for( let Notifica of Notifiche) {
            await notifiche.findOneAndRemove({_id:Notifica._id})
        }
    })
    await prenotazione.findOne({_id:idPrenotazione}).then((Prenotazione)=>{
        let NOTIFICA = {
            letta:false,
            tipo:"completaCorsa",
            idUtente:Prenotazione.idCliente,
            idPrenotazione:idPrenotazione
        }
        let newNotifica = new notifiche(NOTIFICA)
        newNotifica.save();
    })
}

//Rimuovi completa operazione
export const removeCompletaOperazione = async (id) =>{
    await notifiche.findOneAndRemove({tipo:"completaCorsa",idPrenotazione:id})
}

//Rifiuta Corsa
export const notificaRifiutaCorsa = async (idPrenotazione,idAutista) =>{
    await notifiche.findOneAndRemove({tipo:"accettaCorsa",idPrenotazione:idPrenotazione,idUtente:idAutista})
    await notifiche.find({tipo:"accettaCorsa",idPrenotazione:idPrenotazione}).then(async(Notifiche)=>{
        if(Notifiche.length==0){
            await prenotazione.findOne({_id:idPrenotazione}).then((Prenotazione)=>{
                notificaNessunAutista(Prenotazione.idCliente,idPrenotazione)
            })
        }
    })
}

//Notifiche Annulla Prenotazione
export const annullaPrenotazione = async (ruolo, idUtente, Prenotazione) =>{
    let Notifica = {}
    let newNotifica
    if(ruolo=="Autista"){
        Notifica = {
            tipo:"cliente",
            idUtente:Prenotazione.idCliente,
            messaggio:`Siamo spiacenti, ma l'Autista ha annullato la tua prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza}.
                       Verrà effettuato il rimborso sulla carta con cui hai pagato`
        }
        newNotifica = new notifiche(Notifica);
        newNotifica.save();
        Notifica = {
            tipo:"autista",
            idUtente:idUtente,
            messaggio:`Hai annullato con successo la prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza}`
        }
        newNotifica = new notifiche(Notifica);
        newNotifica.save();
    }
    else if(ruolo=="Cliente"){
        Notifica = {
            tipo:"cliente",
            idUtente:idUtente,
            messaggio:`Hai annullato con successo la prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza}\nSe hai annullato la prenotazione prima delle 24 ore dalla partenza ti sarà effettuato il rimborso`
        }
        newNotifica = new notifiche(Notifica);
        newNotifica.save();
        if(Prenotazione.idAutista!=undefined){
            if(Prenotazione.idAutista!=""){
                Notifica = {
                    tipo:"autista",
                    idUtente:Prenotazione.idAutista,
                    messaggio:`Siamo spiacenti, ma il Cliente ha annullato la tua prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza}.`
                }
                newNotifica = new notifiche(Notifica);
                newNotifica.save();
            } else {
                await notifiche.find({idPrenotazione:Prenotazione._id}).then(async (Notifiche)=>{
                    for( let notifica of Notifiche) {
                        await notifiche.findOneAndRemove({_id:notifica._id})
                    }
                })
            }
        }
    } else {
        Notifica = {
            tipo:"cliente",
            idUtente:Prenotazione.idCliente,
            messaggio:`La prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza} è stata annullata\n\nSe hai annullato la prenotazione prima delle 24 ore dalla partenza ti sarà effettuato il rimborso`
        }
        newNotifica = new notifiche(Notifica);
        newNotifica.save();
        if(Prenotazione.autista!=undefined){
            if(Prenotazione.idAutista!=""){
                Notifica = {
                    tipo:"autista",
                    idUtente:Prenotazione.idAutista,
                    messaggio:`Siamo spiacenti, ma l'amminnistratore ha annullato la tua prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza}`
                }
                newNotifica = new notifiche(Notifica);
                newNotifica.save();
            } else {
                await notifiche.find({idPrenotazione:Prenotazione._id}).then(async (Notifiche)=>{
                    for( let notifica of Notifiche) {
                        await notifiche.findOneAndRemove({_id:notifica._id})
                    }
                })
            }
        }

    }
}

//Elimina notifica
export const eliminaNotifica = async (req,res) =>{
    await notifiche.findByIdAndRemove({_id:req.body.idNotifica}).then((notifica)=>{
        return res.status(200).json({succes:true})
    }).catch((err)=>{return res.status(500).json(err)})
}

//Blocca Veicolo
export const bloccaVeicolo = async (Prenotazione,flag) =>{
    let Notifica={};
    let newNotifica
    if(flag==0){
        Notifica = {
            tipo:"cliente",
            idUtente:Prenotazione.idCliente,
            messaggio:`La prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza} ha subito un cambio di veicolo per un guasto.
                      E' stato trovato un nuovo veicolo con le stesse caratteristiche principali`
        }
        newNotifica = new notifiche(Notifica);
        newNotifica.save();
        if(Prenotazione.idAutista!=undefined && Prenotazione.idAutista!=""){
            Notifica = {
                tipo:"autista",
                idUtente:Prenotazione.idAutista,
                messaggio:`La prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza} ha subito un cambio di veicolo per un guasto.
                          E' stato trovato un nuovo veicolo con le stesse caratteristiche principali`
            }
            newNotifica = new notifiche(Notifica);
            newNotifica.save();
        }
        
    } else {
        Notifica = {
            tipo:"cliente",
            idUtente:Prenotazione.idCliente,
            messaggio:`La prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza} è stata annullata per un guasto al veicolo.
                      Non abbiamo trovato un nuovo veicolo con le stesse caratteristiche principali, ti sarà effettuato il rimborso nella carta con cui hai prenotato`
        }
        newNotifica = new notifiche(Notifica);
        newNotifica.save();
        if(Prenotazione.idAutista!=undefined && Prenotazione.idAutista!=""){
            Notifica = {
                tipo:"autista",
                idUtente:Prenotazione.idAutista,
                messaggio:`La prenotazione in data ${convertiDataEuropa(new Date(Prenotazione.dataPartenza))}-${Prenotazione.oraPartenza} è stata annullata per un guasto al veicolo.`
            }
            newNotifica = new notifiche(Notifica);
            newNotifica.save();
        } else if(Prenotazione.idAutista==""){
            await notifiche.find({idPrenotazione:Prenotazione._id}).then(async (Notifiche)=>{
                for( let NOTIFICA of Notifiche) {
                    await notifiche.findOneAndRemove({_id:NOTIFICA._id})
                }
            })
        }
    }
}

export const notificaAccettaModifica = async (Prenotazione,idAutista) => {
    let Notifica = {
        tipo:"accettaModifica",
        idPrenotazione:Prenotazione.id,
        idUtente:idAutista,
        messaggio:`Il cliente con la prenotazione con codice ${Prenotazione.id} ha richiesto una modifica alla corsa`,
        dati: Prenotazione    
    }

    let newNotifica = new notifiche(Notifica);
    newNotifica.save();
}

//Notifica Modifica Accettata
export const notificaModificaAccettata = async (req,res) =>{
    await prenotazione.findOne({_id:req.body.idPrenotazione}).then((Prenotazione)=>{
        let NOTIFICA = {
            letta:false,
            tipo:"completaModifica",
            idUtente:Prenotazione.idCliente,
            idPrenotazione:Prenotazione._id,
            dati:req.body.dati
        }
        let newNotifica = new notifiche(NOTIFICA)
        newNotifica.save();
    })
    console.log(req.body)
    await notifiche.findOneAndRemove({idPrenotazione:req.body.idPrenotazione,tipo:"accettaModifica"})
    return res.status(200).json({success:true});
}

export const notificaModificaRifiutata = async (req,res) =>{
    
}

//RifiutaModifica
export const notificaRifiutaModifica = async (idPrenotazione,idAutista,idCliente) =>{
    await notifiche.findOneAndRemove({tipo:"accettaModifica",idPrenotazione:idPrenotazione})
    let NOTIFICA = {
        letta:false,
        tipo:"cliente",
        idUtente:idCliente,
        messaggio:`Siamo spiacenti, ma l'autista ha rifiutato la tua richiesta di modifica per la corsa ${idPrenotazione}`
    }
    let newNotifica = new notifiche(NOTIFICA)
    newNotifica.save();
    
}

//Notifica Completa Modifica
export const notificaCompletaModifica = async(idprenotazione) =>{
    await notifiche.findOneAndRemove({idPrenotazione:idprenotazione, tipo:"completaModifica"})
}