import React from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {registerLicense} from '../../Actions/utenti';
import classnames from "classnames";
import {useDispatch, useSelector} from 'react-redux';
import {convertiData} from '../gestioneDateTime'

function AggiornaPatForm (){
    const [patente,setPatente] = useState({numeroPatente:'',tipoPatente:'',dataRilascio:'',dataScadenza:'', enteRilascio:''});
    const [errNumeroPatente, setErrNumeroPatente] = useState(true);
    const user = useSelector((state) => state.utenti.utente);
    const dispatch = useDispatch();
    const patternNumPat = /^[A-Z]{2}[\d]{7}[A-Z]$/;

    const onSubmit = (event) => {
        event.preventDefault();
        if(errNumeroPatente==false){
            const dati = {patente: patente, email: user.email};
            dispatch(registerLicense(dati));
        }
    }

    useEffect(()=>{
        if (patternNumPat.test(patente.numeroPatente)){
            document.getElementById("numeroPatente").style.borderColor="green";
            setErrNumeroPatente(false);
        } else {
            document.getElementById("numeroPatente").style.borderColor="red";
            setErrNumeroPatente(true);
        }
    },[patente.numeroPatente]);

    useEffect(()=>{
        if (patente.tipoPatente==""){
            document.getElementById("tipoPatente").style.borderColor="red";
        } else {
            document.getElementById("tipoPatente").style.borderColor="green";
        }
    },[patente.tipoPatente]);

    useEffect(()=>{
        if (patente.dataRilascio==""){
            document.getElementById("dataRilascio").style.borderColor="red";
        } else {
            document.getElementById("dataRilascio").style.borderColor="green";
        }
    },[patente.dataRilascio]);

    useEffect(()=>{
        if (patente.dataScadenza==""){
            document.getElementById("dataScadenza").style.borderColor="red";
        } else {
            document.getElementById("dataScadenza").style.borderColor="green";
        }
    },[patente.dataScadenza]);

    useEffect(()=>{
        if (patente.enteRilascio==""){
            document.getElementById("enteRilascio").style.borderColor="red";
        } else {
            document.getElementById("enteRilascio").style.borderColor="green";
        }
    },[patente.enteRilascio]);

    useEffect(()=>{
        if (user.numeroPatente!=undefined){
            document.getElementById("numeroPatente").value=user.numeroPatente;
            
            var select=document.getElementById("tipoPatente");
            select.removeAttribute("selected");
            for (var option of select.getElementsByTagName("option")){
                if (option.value==user.tipoPatente){
                    option.selected=true;
                }
            }

            var dataRilascio=document.getElementById("dataRilascio");
            dataRilascio.value=convertiData(new Date(user.dataRilascioPatente));

            var dataScadenza=document.getElementById("dataScadenza");
            dataScadenza.value=convertiData(new Date(user.dataScadenzaPatente));

            document.getElementById("enteRilascio").value=user.enteRilascio;
            
            setPatente({...patente,numeroPatente: user.numeroPatente,tipoPatente:user.tipoPatente, dataRilascio:user.dataRilascioPatente,dataScadenza:user.dataScadenzaPatente, enteRilascio:user.enteRilascio})
        }
    },[]);
    
    return (
        <div class="container">
           <Container >
                <form onSubmit={onSubmit}>
                <br/>
                    <Row>
                        <Button type="submit" size="lg" variant="success">Conferma</Button>{' '}         
                    </Row>
                    <br/>
                    <Row>
                        <h5>{user.numeroPatente == null ? "Inserisci" : "Modifica"} la tua patente</h5>
                        
                        <label htmlFor="numeroPatente">Numero Patente: </label> <br/>
                        <input type="text"  id="numeroPatente" name="numeroPatente" onChange={(e)=>{setPatente({...patente,numeroPatente: e.target.value.toUpperCase()})}}  pattern="^[A-Z]{2}[\d]{7}[A-Z]$" title="Inserisci il numero della patente" placeholder="AA0000000A" required/> <br/>
                        <span className={classnames({'green-convalid':!errNumeroPatente, 'red-convalid':errNumeroPatente})}> {errNumeroPatente && patente.numeroPatente=='' ? "Inserire il numero della patente" : (errNumeroPatente ? "Devi inserire 2 lettere, seguite da 7 cifre e infine un'altra lettera" : "OK")} </span>
                        <br/><br/>
                        
                        <label htmlFor="tipoPatente">Tipo Patente: </label> <br/>
                        <select type="text" id="tipoPatente" name="tipoPatente" onChange={(e)=>setPatente({...patente,tipoPatente: e.target.value})} title="Seleziona il tipo di patente" required>
                            <option value="" disabled selected>Tipo</option>
                            <option value="AM">AM</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                        </select><br/>
                        <span className={classnames({'green-convalid':patente.tipoPatente!='', 'red-convalid':patente.tipoPatente==''})}> {patente.tipoPatente=='' ? "Seleziona il tipo di patente" :  "OK"} </span>
                        <br/><br/>
                        
                        <label htmlFor="dataRilascio">Data Rilascio: </label> <br/>
                        <input type="date" id="dataRilascio" name="dataRilascio" onChange={(e)=>setPatente({...patente,dataRilascio: e.target.value})} title="Inserisci la data di rilascio della patente" required /> <br/>
                        <span className={classnames({'green-convalid':patente.dataRilascio!='', 'red-convalid':patente.dataRilascio==''})}> {patente.dataRilascio=='' ? "Inserire la data di rilascio" :  "OK"} </span>
                        <br/><br/>
                    
                        <label htmlFor="dataScadenza">Data Scadenza: </label> <br/>
                        <input type="date" id="dataScadenza" name="dataScadenza" onChange={(e)=>setPatente({...patente,dataScadenza: e.target.value})} title="Inserisci la data di scadenza della patente" required /> <br/>
                        <span className={classnames({'green-convalid':patente.dataScadenza!='', 'red-convalid':patente.dataScadenza==''})}> {patente.dataScadenza=='' ? "Inserire la data di scadenza" :  "OK"} </span>
                        <br/><br/>

                        <label htmlFor="enteRilascio">Ente Rilascio: </label> <br/>
                        <input type="text" id="enteRilascio" name="enteRilascio" onChange={(e)=>setPatente({...patente,enteRilascio: e.target.value})} title="Inserisci l'ente del rilascio della patente" required /> <br/>
                        <span className={classnames({'green-convalid':patente.enteRilascio!='', 'red-convalid':patente.enteRilascio==''})}> {patente.enteRilascio=='' ? "Inserire l'ente di rilascio" :  "OK"} </span>
                        <br/><br/>
                    </Row>

                    <Row>
                        <Button type="submit" size="lg" variant="success">Conferma</Button>{' '}         
                        <br/>
                    </Row>
                    <br/>    
                </form>
            </Container>
        </div>
    )
}

export default AggiornaPatForm