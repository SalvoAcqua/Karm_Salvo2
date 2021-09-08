import utente from '../Models/utente.js';
import parcheggi from '../Models/parcheggi.js'
import metodiPagamento from '../Models/metodiPagamento.js';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
//Genera OTP
function generateRandomOTP() {
    var sRnd = '';
    var sChrs = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    for (var i = 0; i < 7; i++) {
      var randomPoz = Math.floor(Math.random() * sChrs.length);
      sRnd += sChrs.substring(randomPoz, randomPoz + 1);
    }
    return sRnd;
  }
//Set EMAIL
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: 'team.karm2021@gmail.com',
    pass: 'Karm@2021' // naturally, replace both with your real credentials or an application-specific password
},tls: {rejectUnauthorized: false}
});

//Aggiungi Utente
export const registraUtente = async (req, res) => {
   await utente.findOne({ email: req.body.email })
    .then(async (user) => {
        if (user) {
          return res.status(400).json({ email: "Email già esistente" });
        } else {
            //Criptiamo la password
            let Utente = {}
            switch(req.body.ruolo){
                case "Autista":
                    Utente = {
                        ruolo: req.body.ruolo,
                        nome: req.body.nome,
                        cognome: req.body.cognome,
                        sesso: req.body.sesso,
                        dataNascita: req.body.dataNascita,
                        luogoNascita: req.body.luogoNascita,
                        provinciaNascita: req.body.provinciaNascita,
                        CF: req.body.CF,
                        numeroPatente: req.body.patente.numeroPatente,
                        tipoPatente: req.body.patente.tipoPatente,
                        dataRilascioPatente: req.body.patente.dataRilascio, 
                        dataScadenzaPatente: req.body.patente.dataScadenza, 
                        enteRilascio: req.body.patente.enteRilascio,
                        email: req.body.email,
                        password: req.body.password,
                    }
                    break;
                case "Addetto":
                    Utente = {
                        ruolo: req.body.ruolo,
                        nome: req.body.nome,
                        cognome: req.body.cognome,
                        sesso: req.body.sesso,
                        dataNascita: req.body.dataNascita,
                        luogoNascita: req.body.luogoNascita,
                        provinciaNascita: req.body.provinciaNascita,
                        CF: req.body.CF,
                        email: req.body.email,
                        password: req.body.password,
                        idParcheggio: req.body.parcheggioAssociato
                    }
                    break;
                default :
                    Utente = {
                        nome: req.body.nome,
                        cognome: req.body.cognome,
                        sesso: req.body.sesso,
                        dataNascita: req.body.dataNascita,
                        luogoNascita: req.body.luogoNascita,
                        provinciaNascita: req.body.provinciaNascita,
                        CF: req.body.CF,
                        email: req.body.email,
                        password: req.body.password
                    }
            }
            const newUser = new utente(Utente);
            newUser.save().then((user) => res.json(user)).catch((err)=>res.status(500).json(err.message))    
        }
    })
    .catch(err => {
        return res.status(500).json(err.message);
    })
}

//Accesso Utente
export const accessoUtente = async (req,res) => {
    const {email,password} = await req.body
    await utente.findOne({email}).then((user)=>{
        if(!user){
            return res.status(404).json({UserNotFound: "Utente non trovato"});   
        }
        else {
            bcrypt.compare(password,user.password).then(async (passwordCorretta)=>{
                if(!passwordCorretta){
                    return res.status(404).json({IncorretPassword: "La password non è corretta"});
                }   
                else{
                    if(user.ruolo=="Addetto"){
                        var Utente = {};
                        var parcheggio = {};
                        if (user.idParcheggio!=-1){
                            await parcheggi.findOne({_id: user.idParcheggio}).then((park)=>{
                                parcheggio={nome:park.nome, indirizzo:park.indirizzo, nCivico:park.nCivico};
                            });
                        } else {
                            parcheggio={nome:"", indirizzo:"", nCivico:""};
                        }
                        Utente = {
                            _id: user._id,
                            ruolo: user.ruolo,
                            nome: user.nome,
                            cognome: user.cognome,
                            sesso: user.sesso,
                            dataNascita: user.dataNascita,
                            luogoNascita: user.luogoNascita,
                            provinciaNascita: user.provinciaNascita,
                            CF: user.CF,
                            email: user.email,
                            password: user.password,
                            idParcheggio: user.idParcheggio,
                            nomeParcheggio: parcheggio.nome,
                            indirizzoParcheggio: parcheggio.indirizzo,
                            nCivicoParcheggio: parcheggio.nCivico
                        }
                        return res.status(200).json(Utente);
                    }
                    else if(user.ruolo=="Cliente"){
                        
                        await metodiPagamento.find({emailCliente: user.email}).then((metodi)=>{
                            return res.status(200).json({user,metodi});
                        })
                        
                    } else {
                        return res.status(200).json(user);
                    }
                }
            }).catch((err)=>{return res.status(500).json(err.message);})
        }
    }).catch((err)=>{ return res.status(500).json(err.message);});
} 

//Cambia Password
export const nuovaPassword = async (req,res) =>{
    await utente.findOneAndUpdate({email : req.body.email}, {password: req.body.nuovaPassword, $unset:{OTP:""}},{new:true}).then((user)=>{
        return res.json(user);
    }).catch((err)=> {return res.status(500).json(err.message)})
}

//Aggiungi metodo di pagamento
export const addMetodoPagamento = async (req,res) =>{
    const newMethod = new metodiPagamento ({
        emailCliente: req.body.email,
        numeroCarta: req.body.numeroCarta,
        intestatario: req.body.intestatario,
        dataScadenza: req.body.dataScadenza,
        CVV: req.body.cvv,
    });

    await newMethod.save().then((metodo) => {return res.status(200).json(metodo)}) .catch((err) => console.log(err));   
};


//prendi metodi di pagamento
export const getMetodiPagamento = async (req,res) => {
    await metodiPagamento.find({emailCliente : req.body.email}).then((pag)=>{
        return res.json(pag)
    }).catch((err)=> {return res.status(500).json(err.message)})
}

//rimuovi metodi di pagamento
export const removeMetodoPagamento = async (req,res) =>{
   await metodiPagamento.findOneAndRemove({_id: req.body.id}).then((pag)=>{
       return res.status(200).json(pag)
   }).catch((err)=>{return res.status(500).json(err.message)})
};

//aggiorna patente
export const aggiornaPatente = async (req,res) => {
    await utente.findOneAndUpdate({
        email : req.body.email}, 
        {numeroPatente: req.body.patente.numeroPatente,
         tipoPatente: req.body.patente.tipoPatente,
         dataRilascioPatente: req.body.patente.dataRilascio, 
         dataScadenzaPatente: req.body.patente.dataScadenza, 
         enteRilascio: req.body.patente.enteRilascio},
         {new:true}).then((pag)=>{
        return res.json(pag);
    }).catch((err)=> {return res.status(500).json(err.message)})
}

export const aggiornaParcheggio = async (req,res) => {
    await utente.findOneAndUpdate({_id: req.body.id},{idParcheggio: req.body.idParcheggio},{new:true}).then(async (user) => {
        var Utente = {};
        if (user.idParcheggio==-1){
            Utente = {
                _id: user._id,
                ruolo: user.ruolo,
                nome: user.nome,
                cognome: user.cognome,
                sesso: user.sesso,
                dataNascita: user.dataNascita,
                luogoNascita: user.luogoNascita,
                provinciaNascita: user.provinciaNascita,
                CF: user.CF,
                email: user.email,
                password: user.password,
                idParcheggio: user.idParcheggio,
                nomeParcheggio: "",
                indirizzoParcheggio: "",
                nCivicoParcheggio: ""
            }
        } else {
            await parcheggi.findOne({_id: req.body.idParcheggio}).then((parcheggio)=>{
                Utente = {
                    _id: user._id,
                    ruolo: user.ruolo,
                    nome: user.nome,
                    cognome: user.cognome,
                    sesso: user.sesso,
                    dataNascita: user.dataNascita,
                    luogoNascita: user.luogoNascita,
                    provinciaNascita: user.provinciaNascita,
                    CF: user.CF,
                    email: user.email,
                    password: user.password,
                    idParcheggio: user.idParcheggio,
                    nomeParcheggio: parcheggio.nome,
                    indirizzoParcheggio: parcheggio.indirizzo,
                    nCivicoParcheggio: parcheggio.nCivico
                }
            });
        }
        return res.status(200).json(Utente);
    }).catch((err) => {return res.status(500).json(err.message)})
}

export const recuperaPassword = async (req,res) => {
    await utente.findOne({email:req.body.email}).then((User)=>{
        if(User){
            let otp=generateRandomOTP();
           
      
        const mailOptions = {
            from: 'team.karm2021@gmail.com',
            to: User.email,
            subject: 'TeamKarm: Recupero Password',
            text: `${User.nome}, utilizza il seguente codice OTP per poter cambiare la tua password! : ${otp}`
        };
      
        transporter.sendMail(mailOptions, async (error, info) => {
            if (!error) {
            await utente.findOneAndUpdate({email:User.email},{OTP:otp},{new:true}).then((user)=>{
                return res.status(200).json(true);
            }).catch((err)=>{ return res.status(500).json(err)})
            } else {
                console.log(error);
                //res.status(500).json({email:"Non siamo riusciti a contattare questa email"});
            }
        });
        } else{
            res.status(400).json({email:"L'email inserita non ha un account registrato"});
        }
    })
    
}

export const controlloOTP = async (req,res) => {
    await utente.findOne({email:req.body.email, OTP:req.body.OTP}).then((user)=>{
        if(user){
            return res.status(200).json(true);
        } else{
            return res.status(400).json({otp:"Codice OTP non valido"});
        }
    }).catch((err)=>{
        return res.statu(500).json(err);
    })
}