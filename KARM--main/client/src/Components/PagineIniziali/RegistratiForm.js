import React from "react";
import {Container,Row,Col,Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {registerUser} from '../../Actions/utenti'
import classnames from "classnames";
import CodiceFiscale from "codice-fiscale-js";

function RegistratiForm() {
   const [dati,setDati] = useState({ruolo:"Cliente", nome:'',cognome:'',sesso:'', dataNascita:'', luogoNascita:'', provinciaNascita:'',CF:'',email:'',password:'',confermaPassword:''});
   const dispatch = useDispatch();
   const [err,setErr] = useState({nome:true,cognome:true,sesso:true, dataNascita:true, luogoNascita:true, provinciaNascita:true,email:true,password:true});
   const [errCF,setErrCF] = useState(true)
   const [errConfermaPass,setConfermaPass] = useState(true)
   const errori = useSelector((state) => (state.errori))
   
   const patternAlfa = /[0-9]/;
   const patternEmail = /[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6}/;
   const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$/;

   const onSubmit = (event) =>{
    event.preventDefault();
        let controlla = false;
        if(errCF==true || errConfermaPass==true){
            controlla=true;
        }
        if(controlla==false){
        const nuovoUtente = dati;
        dispatch(registerUser(nuovoUtente));
        }  
    }
    useEffect(()=>{
        if (!patternAlfa.test(dati.nome) && dati.nome!=''){
            document.getElementById("nome").style.borderColor="green";
            setErr({...err,nome:false});
        } else {
            document.getElementById("nome").style.borderColor="red";
            setErr({...err,nome:true});
        }
    },[dati.nome]);

    useEffect(()=>{
        if (!patternAlfa.test(dati.cognome) && dati.cognome!=''){
            document.getElementById("cognome").style.borderColor="green";
            setErr({...err,cognome:false});
        } else {
            document.getElementById("cognome").style.borderColor="red";
            setErr({...err,cognome:true});
        }
    },[dati.cognome]);
    
    useEffect(()=>{
        if(dati.sesso!=''){
            setErr({...err, sesso:false});
        } else{
            setErr({...err, sesso:true});
        }
    },[dati.sesso])

    useEffect(()=>{
        if(dati.dataNascita!=''){
            document.getElementById("dataNascita").style.borderColor="green";
            setErr({...err, dataNascita:false});
        } else{
            document.getElementById("dataNascita").style.borderColor="red";
            setErr({...err, dataNascita:true});
        }
    },[dati.dataNascita])

    useEffect(()=>{
        if(dati.provinciaNascita!=''){
            setErr({...err, provinciaNascita:false});
        } else{
            setErr({...err, provinciaNascita:true});
        }
    },[dati.provinciaNascita])

    useEffect(()=>{
        if (!patternAlfa.test(dati.luogoNascita) && dati.luogoNascita!=''){
            document.getElementById("luogoNascita").style.borderColor="green";
            setErr({...err,luogoNascita:false});
        } else {
            document.getElementById("luogoNascita").style.borderColor="red";
            setErr({...err,luogoNascita:true});
        }
    },[dati.luogoNascita])

    useEffect(()=>{
        if (patternEmail.test(dati.email) && errori.error.email==undefined){
            document.getElementById("email").style.borderColor="green";
            setErr({...err, email:false});
            
        } else {
            document.getElementById("email").style.borderColor="red";
            setErr({...err, email:true});
        }
    },[dati.email,errori.error.email])

    useEffect(()=>{
        if (patternPassword.test(dati.password)){
            document.getElementById("password").style.borderColor="green";
            setErr({...err, password:false});
        } else {
            document.getElementById("password").style.borderColor="red";
            setErr({...err, password:true});
        }
    },[dati.password])

    useEffect(()=>{
        if (dati.password==dati.confermaPassword && dati.confermaPassword!=''){
            document.getElementById("confermaPassword").style.borderColor="green";
            setConfermaPass(false);
        } else {
            document.getElementById("confermaPassword").style.borderColor="red";
            setConfermaPass(true);
        }
    },[dati.password,dati.confermaPassword])

    useEffect(()=>{
        try{
            var data = new Date(dati.dataNascita);
            var cf = new CodiceFiscale({
                name: dati.nome,
                surname: dati.cognome,
                gender: dati.sesso,
                day: data.getDate(),
                month: data.getMonth() + 1,
                year: data.getFullYear(),
                birthplace: dati.luogoNascita,
                birthplaceProvincia: dati.provinciaNascita,
            })
            if (cf == dati.CF.toUpperCase()){
                document.getElementById("CF").style.borderColor="green";
                setErrCF(false);
            } else {
                document.getElementById("CF").style.borderColor="red";
                setErrCF(true);
            }
        } catch(err) {
            document.getElementById("CF").style.borderColor="red";
            setErrCF(true);
            console.log(err.message)
            };  
    },[dati.nome,dati.cognome,dati.sesso,dati.dataNascita,dati.provinciaNascita,dati.luogoNascita,dati.CF]);
        return(
            <Container class="container">
                <div className="dist-nav">
                    <form onSubmit={onSubmit}>
                    <br/>
                        <Row>
                            <Button type="submit" variant="secondary" size="lg">
                                Registrati
                            </Button>{' '}
                        </Row>
                        <Row>
                            <h5>
                            <br/>
                                Inserisci i tuoi dati
                            </h5>
                        </Row>
                        <Row>
                            <fieldset className="fieldstyle">
                                <legend class="h4">Dati Anagrafici:</legend>

                                <label htmlFor="nome" color="white" >Nome: </label> <br/>
                                <input type="text" size="50" id="nome" name="nome" value={dati.nome} onChange={(e)=>setDati({...dati,nome: e.target.value})} required autoFocus/> <br/>
                                <span className={classnames({'green-convalid':!err.nome, 'red-convalid':err.nome})} > {err.nome && dati.nome=='' ? "Inserisci il tuo nome" : (err.nome ? "Il nome deve contenere solo lettere" : "OK" )} </span>
                                <br/> <br/>
                                <label htmlFor="cognome">Cognome: </label> <br/>
                                <input type="text" size="50" id="cognome" name="cognome" value={dati.cognome} onChange={(e)=>setDati({...dati,cognome: e.target.value})} title="Il cognome deve contenere solo lettere" required /> <br/>
                                <span className={classnames({'green-convalid':!err.cognome, 'red-convalid':err.cognome})}> {err.cognome && dati.cognome=='' ? "Inserisci il tuo cognome" : (err.cognome ? "Il cognome deve contenere solo lettere" : "OK" )} </span>
                                <br /><br/>

                                <label> Sesso:  <br/>
                                    <input type="radio" name="sesso" value={dati.sesso} onChange={(e)=>setDati({...dati,sesso: e.target.value})} value= "M" cheched = "checked" required/> M 
                                </label> 
                                <label>
                                    <input type="radio" name="sesso" value={dati.sesso} onChange={(e)=>setDati({...dati,sesso: e.target.value})} value= "F" /> F
                                </label>
                                <span className={classnames({'green-convalid':!err.sesso, 'red-convalid':err.sesso})}> {err.sesso ? "Inserisci il tuo sesso" : "OK"} </span>
                                <br /> <br/>

                                <label htmlFor="dataNascita">Data di Nascita: </label><br/>
                                <input type="date" size="50" id="dataNascita" name="dataNascita" value={dati.dataNascita} onChange={(e)=>setDati({...dati,dataNascita: e.target.value})} placeholder="Inserisci la tua data di nascita" required/> <br/> 
                                <span className={classnames({'green-convalid':!err.dataNascita, 'red-convalid':err.dataNascita})}> {err.dataNascita ? "Inserisci la tua data di Nascita" : "OK"} </span>
                                <br /><br/>

                                <label htmlFor="provinciaNascita">Provincia di Nascita: </label><br/>
                                <select id="provinciaNascita" name="provinciaNascita" value={dati.provinciaNascita} onChange={(e)=>setDati({...dati,provinciaNascita: e.target.value})} required>
                                    <option value="" disabled selected>Provincia di Nascita</option>                   
                                    <option value="ag">Agrigento</option>
                                    <option value="al">Alessandria</option>
                                    <option value="an">Ancona</option>
                                    <option value="ao">Aosta</option>
                                    <option value="ar">Arezzo</option>
                                    <option value="ap">Ascoli Piceno</option>
                                    <option value="at">Asti</option>
                                    <option value="av">Avellino</option>
                                    <option value="ba">Bari</option>
                                    <option value="bt">Barletta-Andria-Trani</option>
                                    <option value="bl">Belluno</option>
                                    <option value="bn">Benevento</option>
                                    <option value="bg">Bergamo</option>
                                    <option value="bi">Biella</option>
                                    <option value="bo">Bologna</option>
                                    <option value="bz">Bolzano</option>
                                    <option value="bs">Brescia</option>
                                    <option value="br">Brindisi</option>
                                    <option value="ca">Cagliari</option>
                                    <option value="cl">Caltanissetta</option>
                                    <option value="cb">Campobasso</option>
                                    <option value="ci">Carbonia-iglesias</option>
                                    <option value="ce">Caserta</option>
                                    <option value="ct">Catania</option>
                                    <option value="cz">Catanzaro</option>
                                    <option value="ch">Chieti</option>
                                    <option value="co">Como</option>
                                    <option value="cs">Cosenza</option>
                                    <option value="cr">Cremona</option>
                                    <option value="kr">Crotone</option>
                                    <option value="cn">Cuneo</option>
                                    <option value="en">Enna</option>
                                    <option value="fm">Fermo</option>
                                    <option value="fe">Ferrara</option>
                                    <option value="fi">Firenze</option>
                                    <option value="fg">Foggia</option>
                                    <option value="fc">Forl&igrave;-Cesena</option>
                                    <option value="fr">Frosinone</option>
                                    <option value="ge">Genova</option>
                                    <option value="go">Gorizia</option>
                                    <option value="gr">Grosseto</option>
                                    <option value="im">Imperia</option>
                                    <option value="is">Isernia</option>
                                    <option value="sp">La spezia</option>
                                    <option value="aq">L'aquila</option>
                                    <option value="lt">Latina</option>
                                    <option value="le">Lecce</option>
                                    <option value="lc">Lecco</option>
                                    <option value="li">Livorno</option>
                                    <option value="lo">Lodi</option>
                                    <option value="lu">Lucca</option>
                                    <option value="mc">Macerata</option>
                                    <option value="mn">Mantova</option>
                                    <option value="ms">Massa-Carrara</option>
                                    <option value="mt">Matera</option>
                                    <option value="vs">Medio Campidano</option>
                                    <option value="me">Messina</option>
                                    <option value="mi">Milano</option>
                                    <option value="mo">Modena</option>
                                    <option value="mb">Monza e della Brianza</option>
                                    <option value="na">Napoli</option>
                                    <option value="no">Novara</option>
                                    <option value="nu">Nuoro</option>
                                    <option value="og">Ogliastra</option>
                                    <option value="ot">Olbia-Tempio</option>
                                    <option value="or">Oristano</option>
                                    <option value="pd">Padova</option>
                                    <option value="pa">Palermo</option>
                                    <option value="pr">Parma</option>
                                    <option value="pv">Pavia</option>
                                    <option value="pg">Perugia</option>
                                    <option value="pu">Pesaro e Urbino</option>
                                    <option value="pe">Pescara</option>
                                    <option value="pc">Piacenza</option>
                                    <option value="pi">Pisa</option>
                                    <option value="pt">Pistoia</option>
                                    <option value="pn">Pordenone</option>
                                    <option value="pz">Potenza</option>
                                    <option value="po">Prato</option>
                                    <option value="rg">Ragusa</option>
                                    <option value="ra">Ravenna</option>
                                    <option value="rc">Reggio di Calabria</option>
                                    <option value="re">Reggio nell'Emilia</option>
                                    <option value="ri">Rieti</option>
                                    <option value="rn">Rimini</option>
                                    <option value="rm">Roma</option>
                                    <option value="ro">Rovigo</option>
                                    <option value="sa">Salerno</option>
                                    <option value="ss">Sassari</option>
                                    <option value="sv">Savona</option>
                                    <option value="si">Siena</option>
                                    <option value="sr">Siracusa</option>
                                    <option value="so">Sondrio</option>
                                    <option value="ta">Taranto</option>
                                    <option value="te">Teramo</option>
                                    <option value="tr">Terni</option>
                                    <option value="to">Torino</option>
                                    <option value="tp">Trapani</option>
                                    <option value="tn">Trento</option>
                                    <option value="tv">Treviso</option>
                                    <option value="ts">Trieste</option>
                                    <option value="ud">Udine</option>
                                    <option value="va">Varese</option>
                                    <option value="ve">Venezia</option>
                                    <option value="vb">Verbano-Cusio-Ossola</option>
                                    <option value="vc">Vercelli</option>
                                    <option value="vr">Verona</option>
                                    <option value="vv">Vibo valentia</option>
                                    <option value="vi">Vicenza</option>
                                    <option value="vt">Viterbo</option>
                                </select> <br/>
                                <span className={classnames({'green-convalid':!err.provinciaNascita, 'red-convalid':err.provinciaNascita})}> {err.provinciaNascita ? "Seleziona la tua provincia di nascita" : "OK"} </span>
                                <br /> <br/>

                                <label htmlFor="luogoNascita">Luogo di Nascita: </label> <br/>
                                <input type="text" size="50" id="luogoNascita" name="luogoNascita" value={dati.luogoNascita} onChange={(e)=>setDati({...dati,luogoNascita: e.target.value})} required/> <br/>
                                <span className={classnames({'green-convalid':!err.luogoNascita, 'red-convalid':err.luogoNascita})}> {err.luogoNascita && dati.luogoNascita=='' ? "Inserisci il tuo luogo di nascita" : (err.luogoNascita ? "Il luogo nascita deve contenere solo lettere" : "OK" )} </span>
                                <br /> <br/>

                                <label htmlFor="CF">Codice Fiscale: </label> <br/>
                                <input type="text" size="50" id="CF" name="CF" value={dati.CF} onChange={(e)=>setDati({...dati,CF: e.target.value})} title="il codice fiscale non combacia coi dati inseriti" required/> <br/>
                                <span className={classnames({'green-convalid':!errCF, 'red-convalid':errCF})}> {errCF && dati.CF=='' ? "Inserisci il tuo Codice Fiscale" : (errCF ? "Il Codice Fiscale non combacia coi dati inseriti" : "OK" )} </span>
                                </fieldset>
                        </Row>
                        <br/><br />
                        <Row>
                            <fieldset className="fieldstyle">
                                <legend class="h4">Autenticazione:</legend>
                                <label htmlFor="email">E-mail </label><br/>
                                <input name="email" value={dati.email} onChange={(e)=>setDati({...dati,email: e.target.value})} id="email" type="email" size="50" maxLength="40" required/><br />
                                <span className={classnames({'green-convalid':!err.email, 'red-convalid':(err.email || errori.error.email!=undefined)})}> {err.email && errori.error.email==undefined ? "Inserisci l'email con cui ti vuoi registrare" :(errori.error.email!=undefined ? errori.error.email : "OK")} </span>
                                <br /><br/>

                                <label htmlFor="password">Password </label> <br/>
                                <input name="password" value={dati.password} onChange={(e)=>setDati({...dati,password: e.target.value})} id="password" type="password" 
                                    title="Almeno 8 caratteri di cui una lettera maiuscola, un numero e un carattere speciale tra '# $ ^ + = ! * ( ) @ % &'" 
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$" 
                                    size="50" maxLength="40" required
                                /><br />
                                <span className={classnames({'green-convalid':!err.password, 'red-convalid':err.password})}> {err.password ? "Inserisci la password con cui ti vuoi registrare" : "OK"} </span>
                                <br /> <br/>

                                <label htmlFor="confermaPassword">Conferma password </label><br/>
                                <input  name="confermaPassword" value={dati.confermaPassword} onChange={(e)=>setDati({...dati,confermaPassword: e.target.value})} id="confermaPassword" type="password" size="50" maxLength="40" required/><br/> 
                                <span className={classnames({'green-convalid':!errConfermaPass, 'red-convalid':errConfermaPass})}> {errConfermaPass && dati.confermaPassword=='' ? "Conferma la tua password" : (errConfermaPass ? "Le password non corrispondono" : "OK" )} </span>
                                <br/>
                            </fieldset>
                            <br/>
                        </Row>
                        <br/>
                        <Row>
                            <Button type="submit" variant="secondary" size="lg">
                                Registrati
                            </Button>{' '}
                        </Row>
                        <br/><br/>
                    </form>
                </div>
            
            </Container>
            
        );   
}

export default RegistratiForm;