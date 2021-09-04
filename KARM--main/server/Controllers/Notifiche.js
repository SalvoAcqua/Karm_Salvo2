import notifiche from "../Models/notifiche.js";
import utente from '../Models/utente.js';
import veicolo from '../Models/veicoli.js';
import prenotazione from '../Models/prenotazioni.js';

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
            await prenotazione.findOne({idAutista: autista._id,  $or: [{statoPrenotazione:"completa"},{statoPrenotazione:"in_corsa"}], $or: [{dataPartenza: { $lt: DataArrivo}, dataArrivo: { $gte: DataArrivo}}, {dataPartenza: { $lte: DataPartenza}, dataArrivo: { $gt: DataPartenza}}, {dataPartenza: { $gt: DataPartenza}, dataArrivo: { $lt: DataArrivo }},{dataPartenza:DataArrivo, oraPartenza: {$lt: Prenotazione.oraArrivo}},{dataArrivo:DataPartenza, oraArrivo: {$gt: Prenotazione.oraPartenza}}]}).then((corsa)=>{
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
    await notifiche.find({idUtente:req.body._id}).then(async(Notifiche)=>{  
        for(let notifica of Notifiche){
            await notifiche.findOneAndUpdate({_id:notifica._id},{letta:"true"})
            if(notifica.tipo=="accettaCorsa"){
                await prenotazione.findOne({_id:notifica.idPrenotazione}).then(async(Prenotazione)=>{
                    if(Prenotazione){
                        await utente.findOne({_id:Prenotazione.idCliente}).then((Utente)=>{
                            notificaAccettaCorsa={
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
                
            } else{
                NOTIFICHE.push(notifica);
            }
        }   
        return res.status(200).json(NOTIFICHE)
    }).catch((err)=>{return res.status(500).json(err.message)})
}




 