import React from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListaParcheggi, addDipendente} from '../../Actions/admin';
import classnames from "classnames";
import {convertiData, emptyDate} from '../gestioneDateTime';
import CodiceFiscale from "codice-fiscale-js";

function InserisciDipendenteForm (){
    const [dipendente,setDipendente] = useState({ruolo:'',nome:'',cognome:'',dataNascita:'', sesso:'',luogoNascita:'',
        provinciaNascita:'',CF:'',numeroPatente:'',dataRilascio:'',dataScadenza:'',enteRilascio:'',parcheggioAssociato:'',email:'',password:'',confermaPassword:''});
      
    const [errRuolo,setErrRuolo] = useState(true);
    const [errNome,setErrNome] = useState(true);
    const [errCognome,setErrCognome] = useState(true);
    const [errDataNascita,setErrDataNascita] = useState(true);
    const [errSesso,setErrSesso] = useState(true);
    const [errProvNascita,setErrProvNascita] = useState(true);
    const [errLuogoNascita,setErrLuogoNascita] = useState(true);
    const [errCF,setErrCF] = useState(true);
    const [errNPatente,setErrNPatente] = useState(true);
    const [errDataRilascio,setErrDataRilascio] = useState(true);
    const [errDataScadenza,setErrDataScadenza] = useState(true);
    const [errEnteRilascio,setErrEnteRilascio] = useState(true);
    const [errParcAssociato,setErrParcAssociato] = useState(true);
    const [errEmail,setErrEmail] = useState({val:true,mess:''});
    const [errPass,setErrPass] = useState(true);
    const [errConfPass,setErrConfPass] = useState(true);
    
    const listaParcheggi = useSelector((state)=>state.AccountAdmin.listaParcheggi);
    const errori = useSelector((state) => (state.errori));
    const patternAlfa = /[0-9]/;
    const patternNumPat=/^[A-Z]{2}[\d]{7}[A-Z]$/;
    const patternEmail = /[A-z0-9\.\+_-]+@[A-z0-9\._-]+\.[A-z]{2,6}/;
    const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$/;
    var today=convertiData(new Date()); //così ho la data di oggi formattata nel giusto modo per l'attributo max
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        let Dipendente = {};
        if (dipendente.ruolo=="Autista") {
            Dipendente = {
                ruolo:dipendente.ruolo,
                nome:dipendente.nome,
                cognome:dipendente.cognome,
                dataNascita:dipendente.dataNascita,
                sesso:dipendente.sesso,
                luogoNascita:dipendente.luogoNascita,
                provinciaNascita:dipendente.provinciaNascita,
                CF:dipendente.CF,
                patente:{
                    numeroPatente:dipendente.numeroPatente,
                    tipoPatente:"B",
                    dataRilascio:dipendente.dataRilascio,
                    dataScadenza:dipendente.dataScadenza,
                    enteRilascio:dipendente.enteRilascio
                },
                email:dipendente.email,
                password:dipendente.password
            }
        }
        else{
            Dipendente = {
                ruolo:dipendente.ruolo,
                nome:dipendente.nome,
                cognome:dipendente.cognome,
                dataNascita:dipendente.dataNascita,
                sesso:dipendente.sesso,
                luogoNascita:dipendente.luogoNascita,
                provinciaNascita:dipendente.provinciaNascita,
                CF:dipendente.CF,
                parcheggioAssociato:dipendente.parcheggioAssociato,
                email:dipendente.email,
                password:dipendente.password
            }
        }

        if ((dipendente.ruolo=="Autista" && !errRuolo && !errNome && !errCognome && !errDataNascita && !errSesso &&
            !errProvNascita && !errLuogoNascita && !errCF && !errNPatente && !errDataRilascio &&
            !errDataScadenza && !errEnteRilascio && !errEmail.val && !errPass && !errConfPass) || (dipendente.ruolo=="Addetto" && 
            !errRuolo && !errNome && !errCognome && !errDataNascita && !errSesso &&
            !errProvNascita && !errLuogoNascita && !errCF && !errParcAssociato && !errEmail.val && !errPass && !errConfPass)) {
            dispatch(addDipendente(Dipendente));
        }
    }

    useEffect(()=>{
        dispatch(getListaParcheggi());
    },[]);
    
    useEffect(()=>{
        switch (dipendente.ruolo){
            case "Autista":
                for (var element of document.getElementsByClassName("add")){
                    element.style="display:none";
                    if (element.getElementsByTagName("input").length!=0){
                        for(var input of element.getElementsByTagName("input")){
                            if (input.type=="radio"){
                                input.checked=false;
                            }else{
                                input.value="";
                            }
                        }
                    }
                    if (element.getElementsByTagName("select").length!=0) {
                        var select=element.getElementsByTagName("select")[0];
                        select.removeAttribute("selected");
                        select.getElementsByClassName("preselected")[0].selected=true;
                    }
                }
                for (var element of document.getElementsByClassName("aut")){
                    element.style="display:block";
                    if (element.getElementsByTagName("input").length!=0){
                        for(var input of element.getElementsByTagName("input")){
                            if (input.type=="radio"){
                                input.checked=false;
                            }else{
                                input.value="";
                            }
                        }
                    }
                    if (element.getElementsByTagName("select").length!=0) {
                        var select=element.getElementsByTagName("select")[0];
                        select.removeAttribute("selected");
                        select.getElementsByClassName("preselected")[0].selected=true;
                    }
                }
                break;
            case "Addetto":
                for (var element of document.getElementsByClassName("aut")){
                    element.style="display:none";
                    if (element.getElementsByTagName("input").length!=0){
                        for(var input of element.getElementsByTagName("input")){
                            if (input.type=="radio"){
                                input.checked=false;
                            }else{
                                input.value="";
                            }
                        }
                    } 
                    if (element.getElementsByTagName("select").length!=0) {
                        var select=element.getElementsByTagName("select")[0];
                        select.removeAttribute("selected");
                        select.getElementsByClassName("preselected")[0].selected=true;
                    }
                }
                for (var element of document.getElementsByClassName("add")){
                    element.style="display:block";
                    if (element.getElementsByTagName("input").length!=0){
                        for(var input of element.getElementsByTagName("input")){
                            if (input.type=="radio"){
                                input.checked=false;
                            }else{
                                input.value="";
                            }
                        }
                    }
                    if (element.getElementsByTagName("select").length!=0) {
                        var select=element.getElementsByTagName("select")[0];
                        select.removeAttribute("selected");
                        select.getElementsByClassName("preselected")[0].selected=true;
                    }
                }
                break;
            default:
                for (var element of document.getElementsByClassName("aut")){
                    element.style="display:none";
                }
                for (var element of document.getElementsByClassName("add")){
                    element.style="display:none";
                }
                break;
        }

        setDipendente({...dipendente,nome:'',cognome:'',dataNascita:'', sesso:'',luogoNascita:'',provinciaNascita:'',
        CF:'',numeroPatente:'',tipoPatente:'',dataRilascio:'',dataScadenza:'',enteRilascio:'',parcheggioAssociato:'',
        email:'',password:'',confermaPassword:''});

        if(dipendente.ruolo==""){
            setErrRuolo(true);
            document.getElementById("ruolo").style.borderColor="red";
        }else{
            setErrRuolo(false);
            document.getElementById("ruolo").style.borderColor="green";
        }
    },[dipendente.ruolo]);
        
    useEffect(()=>{
        if(dipendente.nome=="" || patternAlfa.test(dipendente.nome)){
            setErrNome(true);
            document.getElementById("nome").style.borderColor="red";
        }else{
            setErrNome(false);
            document.getElementById("nome").style.borderColor="green";
        }
    },[dipendente.nome]);

    useEffect(()=>{
        if(dipendente.cognome=="" || patternAlfa.test(dipendente.cognome)){
            setErrCognome(true);
            document.getElementById("cognome").style.borderColor="red";
        }else{
            setErrCognome(false);
            document.getElementById("cognome").style.borderColor="green";
        }
    },[dipendente.cognome]);

    useEffect(()=>{
        const todayDate=new Date(today);

        if(emptyDate(dipendente.dataNascita) || dipendente.dataNascita.getTime()>todayDate.getTime()){
            setErrDataNascita(true);
            document.getElementById("dataNascita").style.borderColor="red";
        }else{
            setErrDataNascita(false);
            document.getElementById("dataNascita").style.borderColor="green";
        }
    },[dipendente.dataNascita]);

    useEffect(()=>{
        if(dipendente.sesso==""){
            setErrSesso(true);
        }else{
            setErrSesso(false);
        }
    },[dipendente.sesso]);

    useEffect(()=>{
        if(dipendente.provinciaNascita==""){
            setErrProvNascita(true);
            document.getElementById("provinciaNascita").style.borderColor="red";
        }else{
            setErrProvNascita(false);
            document.getElementById("provinciaNascita").style.borderColor="green";
        }
    },[dipendente.provinciaNascita]);

    useEffect(()=>{
        if(dipendente.luogoNascita=="" || patternAlfa.test(dipendente.luogoNascita)){
            setErrLuogoNascita(true);
            document.getElementById("luogoNascita").style.borderColor="red";
        }else{
            setErrLuogoNascita(false);
            document.getElementById("luogoNascita").style.borderColor="green";
        }
    },[dipendente.luogoNascita]);

    useEffect(()=>{
        try{
            var data = new Date(dipendente.dataNascita);
            var cf = new CodiceFiscale({
                name: dipendente.nome,
                surname: dipendente.cognome,
                gender: dipendente.sesso,
                day: data.getDate(),
                month: data.getMonth() + 1,
                year: data.getFullYear(),
                birthplace: dipendente.luogoNascita,
                birthplaceProvincia: dipendente.provinciaNascita,
            })
            if (cf == dipendente.CF.toUpperCase()){
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
    },[dipendente.nome,dipendente.cognome,dipendente.sesso,dipendente.dataNascita,dipendente.provinciaNascita,dipendente.luogoNascita,dipendente.CF]);

    useEffect(()=>{
        if (patternNumPat.test(dipendente.numeroPatente)){
            document.getElementById("numeroPatente").style.borderColor="green";
            setErrNPatente(false);
        } else {
            document.getElementById("numeroPatente").style.borderColor="red";
            setErrNPatente(true);
        }
    },[dipendente.numeroPatente]);

    useEffect(()=>{
        if (emptyDate(dipendente.dataRilascio)){
            document.getElementById("dataRilascio").style.borderColor="red";
            setErrDataRilascio(true);
        } else {
            document.getElementById("dataRilascio").style.borderColor="green";
            setErrDataRilascio(false);
        }
    },[dipendente.dataRilascio]);

    useEffect(()=>{
        if (emptyDate(dipendente.dataScadenza)){
            document.getElementById("dataScadenza").style.borderColor="red";
            setErrDataScadenza(true);
        } else {
            document.getElementById("dataScadenza").style.borderColor="green";
            setErrDataScadenza(false);
        }
    },[dipendente.dataScadenza]);

    useEffect(()=>{
        if (dipendente.enteRilascio==""){
            document.getElementById("enteRilascio").style.borderColor="red";
            setErrEnteRilascio(true);
        } else {
            document.getElementById("enteRilascio").style.borderColor="green";
            setErrEnteRilascio(false);
        }
    },[dipendente.enteRilascio]);

    useEffect(()=>{
        if(dipendente.parcheggioAssociato==""){
            document.getElementById("parcAssociato").style.borderColor="red";
            setErrParcAssociato(true);
        }else{
            document.getElementById("parcAssociato").style.borderColor="green";
            setErrParcAssociato(false);
        }
    },[dipendente.parcheggioAssociato]);

    useEffect(()=>{
        if (patternEmail.test(dipendente.email) && errori.error.email==undefined){
            document.getElementById("email").style.borderColor="green";
            setErrEmail({...errEmail,val:false,mess:''});
        } else {
            document.getElementById("email").style.borderColor="red";
            if (!patternEmail.test(dipendente.email)) {
                setErrEmail({...errEmail,val:true,mess:"Cio' che hai inserito non costituisce un e-mail valida"});
            } else {
                setErrEmail({...errEmail,val:true,mess:"L'email inserita e' gia' presente"});
                //resettare errori.error.email=undefined;
            }
        }
    },[dipendente.email,errori.error.email]);

    useEffect(()=>{
        if (patternPassword.test(dipendente.password)){
            document.getElementById("password").style.borderColor="green";
            setErrPass(false);
        } else {
            document.getElementById("password").style.borderColor="red";
            setErrPass(true);
        }
    },[dipendente.password]);

    useEffect(()=>{
        if (dipendente.password==dipendente.confermaPassword && dipendente.confermaPassword!=""){
            document.getElementById("confermaPassword").style.borderColor="green";
            setErrConfPass(false);
        } else {
            document.getElementById("confermaPassword").style.borderColor="red";
            setErrConfPass(true);
        }
    },[dipendente.password,dipendente.confermaPassword]);


    return (
        <div>
           <Container>
                <h1> Inserisci i dati per la registrazione del nuovo dipendente </h1>
                <form onSubmit={onSubmit}>
                    <fieldset className="fieldstyle">
                        <legend>Ruolo Dipendente:</legend>
                        <select type="text" id="ruolo" name="ruolo" onChange={(e)=>setDipendente({...dipendente,ruolo: e.target.value})} title="Seleziona il ruolo del dipendente" required>
                            <option value="" disabled selected>Ruolo Dipendente</option>
                            <option value="Autista">Autista</option>
                            <option value="Addetto">Addetto al Parcheggio</option>
                        </select><br/>
                        <span className={classnames({'green-convalid':!errRuolo, 'red-convalid':errRuolo})}> {errRuolo ? "Seleziona il ruolo del dipendente" : "OK"} </span>
                        <br/>
                    </fieldset>
                    <br/><br/>
                    <fieldset className="fieldstyle aut add">
                        <legend>Dati Anagrafici: </legend>
                        <label htmlFor="nome">Nome: </label> <br/>
                        <input type="text" id="nome" name="nome" onChange={(e)=>setDipendente({...dipendente,nome: e.target.value})} title="Inserisci il nome del dipendente" /> <br/>
                        <span className={classnames({'green-convalid':!errNome, 'red-convalid':errNome})}> {errNome && dipendente.nome=="" ? "Inserisci il nome del dipendente" : (errNome ? "Non puoi inserire un valore contenente un numero" : "OK")} </span>
                        <br/><br/>

                        <label htmlFor="cognome">Cognome: </label> <br/>
                        <input type="text" id="cognome" name="cognome" onChange={(e)=>setDipendente({...dipendente,cognome: e.target.value})} title="Inserisci il cognome del dipendente" /> <br/>
                        <span className={classnames({'green-convalid':!errCognome, 'red-convalid':errCognome})}> {errCognome && dipendente.cognome=="" ? "Inserisci il cognome del dipendente" : (errCognome ? "Non puoi inserire un valore contenente un numero" : "OK")} </span>
                        <br/><br/>

                        <label htmlFor="dataNascita">Data di Nascita: </label> <br/>
                        <input type="date" id="dataNascita" name="dataNascita" onChange={(e)=>setDipendente({...dipendente,dataNascita: new Date(e.target.value)})} title="Inserisci la data di nascita del dipendente" max={today}/> <br/>
                        <span className={classnames({'green-convalid':!errDataNascita, 'red-convalid':errDataNascita})}> {errDataNascita && emptyDate(dipendente.dataNascita) ? "Inserisci la data di nascita del dipendente" : (errDataNascita ? "Non puoi inserire una data successiva ad oggi" : "OK")} </span>
                        <br/><br/>
                        
                        <label> Sesso:  <br/>
                            <input type="radio" name="sesso" onChange={(e)=>setDipendente({...dipendente,sesso: e.target.value})} value="M"/> M 
                        </label> 
                        <label>
                            <input type="radio" name="sesso" onChange={(e)=>setDipendente({...dipendente,sesso: e.target.value})} value="F"/> F
                        </label><br/>
                        <span className={classnames({'green-convalid':!errSesso, 'red-convalid':errSesso})}> {errSesso ? "Inserisci il sesso del dipendente" : "OK"} </span>
                        <br/><br/>
                          
                        <label htmlFor="provinciaNascita">Provincia di Nascita: </label><br/>
                            <select id="provinciaNascita" name="provinciaNascita" onChange={(e)=>setDipendente({...dipendente,provinciaNascita: e.target.value})} title="Seleziona la provincia di nascita del dipendente">
                                <option value="" class="preselected" disabled selected>Provincia di Nascita</option>                   
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
                        <span className={classnames({'green-convalid':!errProvNascita, 'red-convalid':errProvNascita})}> {errProvNascita ? "Inserisci la provincia di nascita del dipendente" : "OK"} </span>
                        <br/><br/>

                        <label htmlFor="luogoNascita">Luogo di Nascita: </label> <br/>
                        <input type="text" id="luogoNascita" name="luogoNascita" onChange={(e)=>setDipendente({...dipendente,luogoNascita: e.target.value})} title="Inserisci il luogo di nascita del dipendente"/> <br/>
                        <span className={classnames({'green-convalid':!errLuogoNascita, 'red-convalid':errLuogoNascita})}> {errLuogoNascita && dipendente.luogoNascita=="" ? "Inserisci il luogo di nascita del dipendente" : (errDataNascita ? "Non puoi inserire un valore contenente un numero" : "OK")} </span>
                        <br/><br/>
                        
                        <label htmlFor="CF">Codice Fiscale: </label> <br/>
                        <input type="text" id="CF" name="CF" onChange={(e)=>setDipendente({...dipendente,CF: e.target.value})} title="Inserisci il codice fiscale del dipendente"/> <br/>
                        <span className={classnames({'green-convalid':!errCF, 'red-convalid':errCF})}> {errCF && dipendente.CF=="" ? "Inserisci il codice fiscale del dipendente" : (errCF ? "Il codice fiscale non combacia coi dati inseriti" : "OK")} </span>
                        <br/><br/>
                    </fieldset>
                    <br/><br/>
                    <fieldset className="fieldstyle aut">
                        <legend>Patente: </legend>
                        <label htmlFor="numeroPatente">Numero Patente: </label> <br/>
                        <input type="text" id="numeroPatente" name="numeroPatente" onChange={(e)=>{setDipendente({...dipendente,numeroPatente: e.target.value.toUpperCase()})}}  pattern="^[A-Z]{2}[\d]{7}[A-Z]$" title="Inserisci il numero della patente" placeholder="AA0000000A"/> <br/>
                        <span className={classnames({'green-convalid':!errNPatente, 'red-convalid':errNPatente})}> {errNPatente && dipendente.numeroPatente=="" ? "Inserisci il numero della patente" : (errNPatente ? "Devi inserire 2 lettere, seguite da 7 cifre e infine un'altra lettera" : "OK")} </span>
                        <br/><br/>
                        
                        <label htmlFor="dataRilascio">Data Rilascio: </label> <br/>
                        <input type="date" id="dataRilascio" name="dataRilascio" onChange={(e)=>setDipendente({...dipendente,dataRilascio: e.target.value})} title="Inserisci la data di rilascio della patente"/> <br/>
                        <span className={classnames({'green-convalid':!errDataRilascio, 'red-convalid':errDataRilascio})}> {errDataRilascio ? "Inserisci la data di rilascio della patente" : "OK"} </span>
                        <br/><br/>
                    
                        <label htmlFor="dataScadenza">Data Scadenza: </label> <br/>
                        <input type="date" id="dataScadenza" name="dataScadenza" onChange={(e)=>setDipendente({...dipendente,dataScadenza: e.target.value})} title="Inserisci la data di scadenza della patente"/> <br/>
                        <span className={classnames({'green-convalid':!errDataScadenza, 'red-convalid':errDataScadenza})}> {errDataScadenza ? "Inserisci la data di scadenza della patente" : "OK"} </span>
                        <br/><br/>

                        <label htmlFor="enteRilascio">Ente Rilascio: </label> <br/>
                        <input type="text" id="enteRilascio" name="enteRilascio" onChange={(e)=>setDipendente({...dipendente,enteRilascio: e.target.value})} title="Inserisci l'ente del rilascio della patente"/> <br/>
                        <span className={classnames({'green-convalid':!errEnteRilascio, 'red-convalid':errEnteRilascio})}> {errEnteRilascio ? "Inserisci l'ente del rilascio della patente" : "OK"} </span>
                        <br/><br/>
                    </fieldset>
                    <br/><br/>
                    <fieldset className="fieldstyle add">
                        <legend>Parcheggio Associato: </legend>
                        <select type="text" id="parcAssociato" name="parcAssociato" onChange={(e)=>setDipendente({...dipendente,parcheggioAssociato: e.target.value})} title="Seleziona il parcheggio associato all'addetto">
                            <option value="" class="preselected" disabled selected>Parcheggio Associato</option>
                                {listaParcheggi.map((parcheggio)=>
                                    <option value={parcheggio._id}>{parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico}</option>
                                )}
                        </select><br/>
                        <span className={classnames({'green-convalid':!errParcAssociato, 'red-convalid':errParcAssociato})}> {errParcAssociato ? "Inserisci il parcheggio associato all'addetto" : "OK"} </span>
                        <br/><br/>
                    </fieldset>
                    <br/><br/>
                    <fieldset className="fieldstyle aut add">        
                        <legend>Credenziali:</legend>
                        <label htmlFor="email">E-mail </label><br/>
                        <input type="email" id="email" name="email" onChange={(e)=>setDipendente({...dipendente,email: e.target.value})} maxLength="40" title="Inserisci l'email del dipendente"/><br/>
                        <span className={classnames({'green-convalid':!errEmail.val, 'red-convalid':errEmail.val})}> {errEmail.val && dipendente.email=="" ? "Inserisci l'email del dipendente" : (errEmail.val ? errEmail.mess : "OK")} </span>
                        <br/><br/>

                        <label htmlFor="password">Password </label> <br/>
                        <input type="password" id="password" name="password" onChange={(e)=>setDipendente({...dipendente,password: e.target.value})}
                            title="Almeno 8 caratteri di cui una lettera maiuscola, un numero e un carattere speciale tra '# $ ^ + = ! * ( ) @ % &'" maxLength="40"
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$"/>
                            <br/>
                        <span className={classnames({'green-convalid':!errPass, 'red-convalid':errPass})}> {errPass && dipendente.password=="" ? "Inserisci la password" : (errPass ? "Devi inserire almeno 8 caratteri di cui una lettera maiuscola, un numero e un carattere speciale tra '# $ ^ + = ! * ( ) @ % &'" : "OK")} </span>
                        <br/><br/>

                        <label htmlFor="confermaPassword">Conferma password </label><br/>
                        <input type="password" id="confermaPassword" name="confermaPassword" onChange={(e)=>setDipendente({...dipendente,confermaPassword: e.target.value})}
                            maxLength="40" title="Reinserisci la password"/><br/> 
                        <span className={classnames({'green-convalid':!errConfPass, 'red-convalid':errConfPass})}> {errConfPass && dipendente.confermaPassword=="" ? "Reinserisci la password" : (errConfPass ? "Le password non coincidono" : "OK")} </span>
                        <br/><br/>
                    </fieldset>
                    <br/><br/>
                    <Button type="submit" variant="success" >Avanti</Button>{' '}
                </form>
            </Container>
        </div>
    )
}

export default InserisciDipendenteForm