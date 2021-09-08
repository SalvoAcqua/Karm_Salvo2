import React from "react";
import {Container,Row,Col, Button,Alert} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {newInformation} from '../../Actions/prenotazioni';
import {getListaParcheggi} from '../../Actions/admin';
import {GoogleKey} from '../../api.js';
import classnames from "classnames";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import {formatRelative} from 'date-fns'
import Mappa from '../Mappa/Mappa.js'
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

function SceltaParcheggi (){
    const [datiConsegna,setDatiConsegna] = useState({parcheggioConsegna:''});
    const [showFuoriStallo,setShowFuoriStallo] = useState("none");
    const [showParcheggio,setShowParcheggio] = useState("block");
    const [datiRilascio,setDatiRilascio]=useState({parcheggioRilascio:''})
    const [errori,setErrori] = useState({parcheggioConsegna:true, parcheggioRilascio:true});
    const listaParcheggi = useSelector((state)=>state.AccountAdmin.listaParcheggi);
    const nuovaPrenotazione = useSelector((state)=>state.Prenotazioni);
    const user = useSelector((state) => state.utenti.utente);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getListaParcheggi());
        if(nuovaPrenotazione.prenotazione.viaFuoriStallo!=''){
            setShowFuoriStallo("block");
            setShowParcheggio("none")
        }
    },[])

    const completaOperazione = async () =>{
        if((errori.parcheggioConsegna==false || nuovaPrenotazione.prenotazione.viaFuoriStallo!='') && errori.parcheggioRilascio==false){ 
            if(nuovaPrenotazione.prenotazione.viaFuoriStallo==''){
                let DatiConsegna = {};
                let DatiRilascio = {};
                nuovaPrenotazione.prenotazione.cliente = user._id;
                nuovaPrenotazione.prenotazione.parcheggioConsegna = datiConsegna.parcheggioConsegna;
                nuovaPrenotazione.prenotazione.parcheggioRilascio = datiRilascio.parcheggioRilascio;
                for(let element of listaParcheggi){
                    if(element._id==datiConsegna.parcheggioConsegna){
                        DatiConsegna = {
                            nome: element.nome,
                            indirizzo: element.indirizzo,
                            nCivico: element.nCivico
                        }
                    }
                    if(element._id==datiRilascio.parcheggioRilascio){
                        DatiRilascio = {
                            nome: element.nome,
                            indirizzo: element.indirizzo,
                            nCivico: element.nCivico
                        }
                    }
                }
                nuovaPrenotazione.prenotazione.datiParcheggioConsegna = DatiConsegna;
                nuovaPrenotazione.prenotazione.datiParcheggioRilascio = DatiRilascio;
            } else {
                let DatiRilascio = {};
                nuovaPrenotazione.prenotazione.cliente = user._id;
                nuovaPrenotazione.prenotazione.parcheggioRilascio = datiRilascio.parcheggioRilascio;
                for(let element of listaParcheggi){
                    if(element._id==datiRilascio.parcheggioRilascio){
                        DatiRilascio = {
                            nome: element.nome,
                            indirizzo: element.indirizzo,
                            nCivico: element.nCivico
                        }
                    }
                }
                nuovaPrenotazione.prenotazione.datiParcheggioRilascio = DatiRilascio;
            }
            await dispatch(newInformation(nuovaPrenotazione.prenotazione)).then(()=>{
                window.location.href="/SchermataRiepilogo"
            });
            
        } else{
            console.log(errori)
        }
    }
    useEffect(()=>{
        if(datiConsegna.parcheggioConsegna!=""){
            setErrori({...errori,parcheggioConsegna:false});
        } else{
            setErrori({...errori,parcheggioConsegna:true});
        }
    },[datiConsegna.parcheggioConsegna])

    useEffect(()=>{
        if(datiRilascio.parcheggioRilascio!=""){
            setErrori({...errori,parcheggioRilascio:false});
        } else{
            setErrori({...errori,parcheggioRilascio:true});
        }
    },[datiRilascio.parcheggioRilascio])
   
    return (
        
        <div class="container" >
            <Container style={{margin:"20px"}}>

                <Row>
                    <Col>
                        <Button variant="outline-secondary" onClick={()=>{window.history.back()}}>
                            <ArrowLeftRoundedIcon/>Indietro
                        </Button>
                    </Col>
                </Row>
                <br/>
                
                <Row>
                    <Col>
                        <Mappa/>
                    </Col>

                    <Col>
                    <Alert style={{display:showFuoriStallo}} variant="primary" id="FuoriStallo">
                        Hai scelto un veicolo fuori stallo! La consegna avverrà in {nuovaPrenotazione.prenotazione.viaFuoriStallo}
                    </Alert>
                        <div style={{display:showParcheggio}}><br/>
                        <label >Parcheggio di Partenza</label><br/>
                        <select type="text" id="Partenza" name="parcheggioPartenza" onChange={(e)=>setDatiConsegna({...datiConsegna,parcheggioConsegna:e.target.value})}title="Seleziona il parcheggio in cui si trova il veicolo">
                            <option value="" selected disabled>Parcheggio</option>
                            {listaParcheggi.length==0 ? "" : listaParcheggi.map((parcheggio)=>(
                                <option value={parcheggio._id}> {parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico} </option>
                            ))}
                        </select> <br/>
                        <span className={classnames({'green-convalid':!errori.parcheggioConsegna, 'red-convalid':errori.parcheggioConsegna})}> {errori.parcheggioConsegna ? "Voce obbligatoria per il completamento della prenotazione" : "OK"} </span>
                        </div>
                        <label>Parcheggio di Arrivo</label><br/>
                        <select type="text" id="parcheggioArrivo" name="parcheggioArrivo" onChange={(e)=>setDatiRilascio({...datiRilascio,parcheggioRilascio:e.target.value})} title="Seleziona il parcheggio in cui si trova il veicolo"> <br/>
                            <option value="" selected disabled>Parcheggio</option>
                            {listaParcheggi.length==0 ? "" : listaParcheggi.map((parcheggio)=>(
                                <option value={parcheggio._id}> {parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico} </option>
                            ))}
                        </select> <br/>
                        <span className={classnames({'green-convalid':!errori.parcheggioRilascio, 'red-convalid':errori.parcheggioRilascio})}> {errori.parcheggioRilascio ? "Voce obbligatoria per il completamento della prenotazione" : "OK"} </span>
                        <span> </span>
                        <br/><br/>
                        <Row>
                            <Button variant="success" size="lg" onClick={()=>completaOperazione()}> Completa Operazione</Button>
                        </Row>
                        <br/>
                    </Col>
                </Row>
                
            </Container>
        </div>
    )
}

export default SceltaParcheggi;