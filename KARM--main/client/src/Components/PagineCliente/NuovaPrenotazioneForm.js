import React from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {newInformation} from '../../Actions/prenotazioni';
import classnames from "classnames";
import {convertiData, getOra, emptyDate} from '../gestioneDateTime';
function NuovaPrenotazioneForm (){
    const [prenotazione,setPrenotazione] = useState({tipoVeicolo:'',indirizzoPa:'',dataPa:'',oraPa:'', indirizzoArr:'',dataArr:'',oraArr:'',disp:'',autista:''});
    
    const [errTipoVeicolo,setErrTipoVeicolo] = useState(true);
    const [errDataPartenza,setErrDataPartenza] = useState({val:true,mess:""});
    const [errDataArrivo,setErrDataArrivo] = useState({val:true,mess:""});
    const [errOraPartenza,setErrOraPartenza] = useState({val:true,mess:""});
    const [errOraArrivo,setErrOraArrivo] = useState({val:true,mess:""});
    const [altriErrori,setAltriErrori] = useState({indirizzoPa:true,indirizzoArr:true,disp:true});

    const user = useSelector((state) => state.utenti.utente);
   
    const dispatch = useDispatch();

    var today=convertiData(new Date()); //così ho la data di oggi formattata nel giusto modo per l'attributo min
    var tmp = new Date();
    tmp.setDate(tmp.getDate() + 3);
    tmp=convertiData(tmp);
    var after = new Date(tmp);
    

    const onSubmit= async (event) => {
        event.preventDefault();
        if (prenotazione.autista && prenotazione.dataPa.getTime()<after.getTime()){
            document.getElementById("dataPa").style.borderColor="red";
            document.getElementById("dataPa").focus();
            setErrDataPartenza({...errDataPartenza,val:true,mess:"Puoi richiedere la presenza di un autista inserendo una data di partenza distante almeno 3gg dalla data attuale"});
        }else if(!errTipoVeicolo && !errDataPartenza.val && !errDataArrivo.val && !errOraPartenza.val &&
            !errOraArrivo.val && !altriErrori.indirizzoPa && !altriErrori.indirizzoArr && !altriErrori.disp) {
                await dispatch(newInformation(prenotazione));
                window.location.href="/SceltaVeicolo";
        }
    }

    useEffect(()=>{
        //Per abilitare/disabilitare l'autista in caso di veicoli diversi da auto
        if (prenotazione.tipoVeicolo=="Autovettura"){
            document.getElementById("autista").removeAttribute("disabled");
        }else{
            prenotazione.autista=false;
            document.getElementById("autista").checked=false;
            document.getElementById("autista").disabled=true;
        }

        //Per controllare la patente
        switch (prenotazione.tipoVeicolo){
            case "Autovettura":
                if (user.tipoPatente!="B" && prenotazione.autista==false){
                    document.getElementById("tipoVeicolo").style.borderColor="red";
                    setErrTipoVeicolo(true);
                } else {
                    document.getElementById("tipoVeicolo").style.borderColor="green";
                    setErrTipoVeicolo(false);
                }
                break;
            case "Moto":
                if (user.tipoPatente!=null){
                    document.getElementById("tipoVeicolo").style.borderColor="green";
                    setErrTipoVeicolo(false);
                }else{
                    document.getElementById("tipoVeicolo").style.borderColor="red";
                    setErrTipoVeicolo(true);
                }
                break;
            case "":
                document.getElementById("tipoVeicolo").style.borderColor="red";
                setErrTipoVeicolo(true);
                break;
            default:
                document.getElementById("tipoVeicolo").style.borderColor="green";
                setErrTipoVeicolo(false);
                break;
        }
    },[prenotazione.tipoVeicolo, prenotazione.autista]);

    useEffect(()=>{
        //Per fare i confronti avrò bisogno di un tipo Date per usare il metodo getTime()
        //Inoltre, usando getTime() verranno restituiti i mm a partire da una certa data. Siccome nel form l'orario di default coincide
        //con l'orario di default di today(!=new Date()):
        const todayDate=new Date(today); 

        //Per ottenere l'orario istantaneo esatto invece (per confrontare l'ora del form con quella istantanea):
        const todayTime=new Date();

        //Per controllare date e ore
        if (emptyDate(prenotazione.dataPa)){
            document.getElementById("dataPa").style.borderColor="red";
            setErrDataPartenza({...errDataPartenza,val:true,mess:"Inserisci la data di partenza"});
            if (emptyDate(prenotazione.dataArr)){
                //entrambe le date vuote


                document.getElementById("dataArr").style.borderColor="red";
                setErrDataArrivo({...errDataArrivo,val:true,mess:"Inserisci la data d'arrivo"});
            } else {
                //solo data di partenza vuota


                if(prenotazione.dataArr.getTime()<todayDate.getTime()){
                    document.getElementById("dataArr").style.borderColor="red";
                    setErrDataArrivo({...errDataArrivo,val:true,mess:"Non puoi inserire una data precedente alla data odierna"});
                }else{
                    document.getElementById("dataArr").style.borderColor="green";
                    setErrDataArrivo({...errDataArrivo,val:false});
                }
            }  
        }else{
            if (emptyDate(prenotazione.dataArr)){
                //solo data d'arrivo vuota

                document.getElementById("dataArr").style.borderColor="red";
                setErrDataArrivo({...errDataArrivo,val:true,mess:"Inserisci la data d'arrivo"});
                if(prenotazione.dataPa.getTime()<todayDate.getTime()){
                    document.getElementById("dataPa").style.borderColor="red";
                    setErrDataPartenza({...errDataPartenza,val:true,mess:"Non puoi inserire una data precedente alla data odierna"});
                }else{
                    document.getElementById("dataPa").style.borderColor="green";
                    setErrDataPartenza({...errDataPartenza,val:false});
                }
            } else {
                //entrambe le date assumono un valore

                if(prenotazione.dataPa.getTime()<todayDate.getTime()){
                    document.getElementById("dataPa").style.borderColor="red";
                    setErrDataPartenza({...errDataPartenza,val:true,mess:"Non puoi inserire una data precedente alla data odierna"});
                    if (prenotazione.dataArr.getTime()<todayDate.getTime()){
                        document.getElementById("dataArr").style.borderColor="red";
                        setErrDataArrivo({...errDataArrivo,val:true,mess:"Non puoi inserire una data precedente alla data odierna"});
                    }else{
                        document.getElementById("dataArr").style.borderColor="green";
                        setErrDataArrivo({...errDataArrivo,val:false});
                    }
                }else{
                    document.getElementById("dataPa").style.borderColor="green";
                    setErrDataPartenza({...errDataPartenza,val:false});
                    if (prenotazione.dataArr.getTime()<prenotazione.dataPa.getTime()){
                        document.getElementById("dataArr").style.borderColor="red";
                        setErrDataArrivo({...errDataArrivo,val:true,mess:"Non puoi inserire una data precedente alla data di partenza"});
                    }else{
                        document.getElementById("dataArr").style.borderColor="green";
                        setErrDataArrivo({...errDataArrivo,val:false});
                    }
                }
            }
        }

        if (prenotazione.oraPa==0){
            document.getElementById("oraPa").style.borderColor="red";
            setErrOraPartenza({...errOraPartenza,val:true,mess:"Inserisci l'orario di partenza"});
            if (prenotazione.oraArr==0){
                //entrambe le ore vuote


                document.getElementById("oraArr").style.borderColor="red";
                setErrOraArrivo({...errOraArrivo,val:true,mess:"Inserisci l'orario d'arrivo"});
            } else {
                //solo ora di partenza vuota

                
                if(!emptyDate(prenotazione.dataArr) && prenotazione.dataArr.getTime()==todayDate.getTime() && prenotazione.oraArr<getOra(todayTime)){
                    document.getElementById("oraArr").style.borderColor="red";
                    setErrOraArrivo({...errOraArrivo,val:true,mess:"Non puoi inserire un orario precedente all'orario attuale"});
                }else{
                    document.getElementById("oraArr").style.borderColor="green";
                    setErrOraArrivo({...errOraArrivo,val:false});
                }
            }  
        }else{
            if (prenotazione.oraArr==0){
                //solo ora d'arrivo vuota

                document.getElementById("oraArr").style.borderColor="red";
                setErrOraArrivo({...errOraArrivo,val:true,mess:"Inserisci l'orario d'arrivo"});
                if(!emptyDate(prenotazione.dataPa) && prenotazione.dataPa.getTime()==todayDate.getTime() && prenotazione.oraPa<getOra(todayTime)){
                    document.getElementById("oraPa").style.borderColor="red";
                    setErrOraPartenza({...errOraPartenza,val:true,mess:"Non puoi inserire un orario precedente all'orario attuale"});
                }else{
                    document.getElementById("oraPa").style.borderColor="green";
                    setErrOraPartenza({...errOraPartenza,val:false});
                }
            } else {
                //entrambe le ore assumono un valore

                if(!emptyDate(prenotazione.dataPa) && prenotazione.dataPa.getTime()==todayDate.getTime() && prenotazione.oraPa<getOra(todayTime)){
                    document.getElementById("oraPa").style.borderColor="red";
                    setErrOraPartenza({...errOraPartenza,val:true,mess:"Non puoi inserire un orario precedente all'orario attuale"});
                    if (!emptyDate(prenotazione.dataArr) && prenotazione.dataArr.getTime()==todayDate.getTime() && prenotazione.oraArr<getOra(todayTime)){
                        document.getElementById("oraArr").style.borderColor="red";
                        setErrOraArrivo({...errOraArrivo,val:true,mess:"Non puoi inserire un orario precedente all'orario attuale"});
                    }else{
                        document.getElementById("oraArr").style.borderColor="green";
                        setErrOraArrivo({...errOraArrivo,val:false});
                    }
                }else{
                    document.getElementById("oraPa").style.borderColor="green";
                    setErrOraPartenza({...errOraPartenza,val:false});
                    if (!emptyDate(prenotazione.dataPa) && !emptyDate(prenotazione.dataArr) && prenotazione.dataPa.getTime()==prenotazione.dataArr.getTime() && prenotazione.oraArr<prenotazione.oraPa){
                        document.getElementById("oraArr").style.borderColor="red";
                        setErrOraArrivo({...errOraArrivo,val:true,mess:"Non puoi inserire un orario precedente all'orario di partenza"});
                    }else{
                        document.getElementById("oraArr").style.borderColor="green";
                        setErrOraArrivo({...errOraArrivo,val:false});
                    }
                }
            }
        }
    },[prenotazione.dataPa, prenotazione.dataArr, prenotazione.oraPa, prenotazione.oraArr, prenotazione.autista]);
    
    useEffect(()=>{
        //Per controllare l'indirizzo di partenza
        if (prenotazione.indirizzoPa==0){
            document.getElementById("indirizzoPa").style.borderColor="red";
            setAltriErrori({...altriErrori,indirizzoPa:true});
        } else {
            document.getElementById("indirizzoPa").style.borderColor="green";
            setAltriErrori({...altriErrori,indirizzoPa:false});
        }
    },[prenotazione.indirizzoPa]);

    useEffect(()=>{
        //Per controllare l'indirizzo d'arrivo
        if (prenotazione.indirizzoArr==0){
            document.getElementById("indirizzoArr").style.borderColor="red";
            setAltriErrori({...altriErrori,indirizzoArr:true});
        } else {
            document.getElementById("indirizzoArr").style.borderColor="green";
            setAltriErrori({...altriErrori,indirizzoArr:false})
        }
    },[prenotazione.indirizzoArr]);

    useEffect(()=>{
        //Per controllare la presenza di dispositivo mobile
        if (prenotazione.disp){
           setAltriErrori({...altriErrori,disp:false});
        } else {
            setAltriErrori({...altriErrori,disp:true});
        }
    },[prenotazione.disp]);

    return (
        <div>
           <Container>
                <form onSubmit={onSubmit}>
                    <br/>
                        <Row>
                            <Button type="submit" variant="success" size="lg">
                                Avanti
                            </Button>{' '}
                        </Row>
                    <br/>
                    <h5> Inserisci i dati per la tua nuova prenotazione </h5>
                    <Row>
                        <fieldset className="fieldstyle">
                            <legend class="h4">Tipologia Veicolo:</legend>
                            <select type="text" id="tipoVeicolo" name="tipoVeicolo" onChange={(e)=>setPrenotazione({...prenotazione,tipoVeicolo: e.target.value})} title="Scegli il tipo di veicolo da noleggiare" required>
                                <option value="" disabled selected>Tipo veicolo</option>
                                <option value="Autovettura">Autovettura</option>
                                <option value="Moto">Moto</option>
                                <option value="Bicicletta">Bicicletta</option>
                                <option value="Monopattino">Monopattino</option>
                            </select> <br/>
                            <span className={classnames({'green-convalid':!errTipoVeicolo, 'red-convalid':errTipoVeicolo})}> {errTipoVeicolo && prenotazione.tipoVeicolo=='' ? "Inserisci un veicolo" : (errTipoVeicolo ? "Verifica la patente inserita: Non puoi guidare questa tipologia di veicolo" : "OK")} </span>
                        </fieldset>
                    </Row>
                    <br/>
                    <Row>
                        <fieldset className="fieldstyle">
                            <legend class="h4">Partenza: </legend>
                            <label htmlFor="indirizzoPa">Indirizzo: </label> <br/>
                            <input type="text" id="indirizzoPa" name="indirizzoPa" size="30" onChange={(e)=>setPrenotazione({...prenotazione,indirizzoPa: e.target.value})} placeholder="Via Rossi, 25" title="Inserisci un indirizzo di partenza" required /> <br/>
                            <span className={classnames({'green-convalid':!altriErrori.indirizzoPa, 'red-convalid':altriErrori.indirizzoPa})}> {altriErrori.indirizzoPa ? "Inserisci un indirizzo di partenza" : "OK"} </span>
                            <br/>
                        
                            <label htmlFor="dataPa">Data: </label> <br/>
                            <input type="date" id="dataPa" name="dataPa" onChange={(e)=>setPrenotazione({...prenotazione,dataPa: new Date(e.target.value)})} title="Inserisci la data di partenza" min={today} required/> 
                            <br/>
                            <span className={classnames({'green-convalid':!errDataPartenza.val, 'red-convalid':errDataPartenza.val})}> {errDataPartenza.val ? errDataPartenza.mess : "OK"}</span>
                            <br/>

                            <label htmlFor="oraPa">Ora: </label> <br/>
                            <input type="time" id="oraPa" name="oraPa" onChange={(e)=>setPrenotazione({...prenotazione,oraPa: e.target.value})} title="Inserisci l'orario di partenza" required /> <br/>
                            <span className={classnames({'green-convalid':!errOraPartenza.val, 'red-convalid':errOraPartenza.val})}> {errOraPartenza.val ? errOraPartenza.mess : "OK"}</span>
                        </fieldset>
                    </Row>
                    <br/>
                    <Row>
                        <fieldset className="fieldstyle">
                            <legend class="h4">Arrivo: </legend>
                            <label htmlFor="indirizzoArr">Indirizzo: </label> <br/>
                            <input type="text" id="indirizzoArr" name="indirizzoArr" size="30" onChange={(e)=>setPrenotazione({...prenotazione,indirizzoArr: e.target.value})} placeholder="Via Rossi, 25" title="Inserisci un indirizzo d'arrivo" required /> <br/>
                            <span className={classnames({'green-convalid':!altriErrori.indirizzoArr, 'red-convalid':altriErrori.indirizzoArr})}> {altriErrori.indirizzoArr ? "Inserisci un indirizzo d'arrivo" : "OK"} </span>
                            <br/>
                        
                            <label htmlFor="dataArr">Data: </label> <br/>
                            <input type="date" id="dataArr" name="dataArr" onChange={(e)=>setPrenotazione({...prenotazione,dataArr: new Date(e.target.value)})} title="Inserisci la data di arrivo" min={prenotazione.dataPa==0 ? today : convertiData(new Date(prenotazione.dataPa))} required /> <br/>
                            <span className={classnames({'green-convalid':!errDataArrivo.val, 'red-convalid':errDataArrivo.val})}> {errDataArrivo.val ? errDataArrivo.mess : "OK"}</span>
                            <br/>

                            <label htmlFor="oraArr">Ora: </label> <br/>
                            <input type="time" id="oraArr" name="oraArr" onChange={(e)=>setPrenotazione({...prenotazione,oraArr: e.target.value})} title="Inserisci l'orario di arrivo" required /> <br/>
                            <span className={classnames({'green-convalid':!errOraArrivo.val, 'red-convalid':errOraArrivo.val})}> {errOraArrivo.val ? errOraArrivo.mess : "OK"}</span>
                        </fieldset>
                    </Row>
                    <br/>
                    <Row>
                        <fieldset className="fieldstyle">
                            <label htmlFor="disp">Hai a disposizione un dispositivo portatile? </label> &nbsp;
                            <input type="checkbox" id="disp" name="disp" onChange={(e)=>setPrenotazione({...prenotazione,disp: e.target.checked})} required /> <br/>
                            <span className={classnames({'green-convalid':!altriErrori.disp, 'red-convalid':altriErrori.disp})}> {altriErrori.disp ? "Voce obbligatoria per il completamento della prenotazione" : "OK"} </span>
                            <br/><br/>

                            <label htmlFor="autista">Richiedi la presenza di un autista? </label> &nbsp;
                            <input type="checkbox" id="autista" name="autista" onChange={(e)=>setPrenotazione({...prenotazione,autista: e.target.checked})} disabled/> <br/>
                        </fieldset>
                    </Row>
                    <br/>
                    <br/>
                        <Row>
                            
                            <Button type="submit" variant="success" size="lg">
                                Avanti
                            </Button>{' '}
                            
                        </Row>
                    <br/>       
                </form>
            </Container>
        </div>
    )
}

export default NuovaPrenotazioneForm