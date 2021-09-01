import React from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {newInformation} from '../../Actions/prenotazioni';
import {getListaParcheggi} from '../../Actions/admin';
import {GoogleKey} from '../../api.js';
import classnames from "classnames";
import {GoogleMap, useLoadScript, Marker, InfoWindow} from '@react-google-maps/api';
import {formatRelative} from 'date-fns'


const mapContainerStyle = {
    width:"50vw",
    height:"70vh"
}
const center = {
    lat:38.115688,
    lng:13.361267
   
}

function SceltaParcheggi (){
    const [dati,setDati] = useState({parcheggioConsegna:'', parcheggioRilascio:'', datiConsegna:{}, datiRilascio:{}});
    const [errori,setErrori] = useState({parcheggioConsegna:true, parcheggioRilascio:true});
    const listaParcheggi = useSelector((state)=>state.AccountAdmin.listaParcheggi);
    const nuovaPrenotazione = useSelector((state)=>state.Prenotazioni);
    const user = useSelector((state) => state.utenti.utente);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(getListaParcheggi());
        
    },[])

    const completaOperazione = () =>{
        if(errori.parcheggioConsegna==false && errori.parcheggioRilascio==false){ 
            let DatiConsegna = {};
            let DatiRilascio = {};
            nuovaPrenotazione.prenotazione.cliente = user._id;
            nuovaPrenotazione.prenotazione.parcheggioConsegna = dati.parcheggioConsegna;
            nuovaPrenotazione.prenotazione.parcheggioRilascio = dati.parcheggioRilascio;
            for(let element of listaParcheggi){
                
                if(element._id==dati.parcheggioConsegna){
                     DatiConsegna = {
                        nome: element.nome,
                        indirizzo: element.indirizzo,
                        nCivico: element.nCivico
                    }
                    setDati({...dati,datiConsegna:DatiConsegna})
                }
                if(element._id==dati.parcheggioRilascio){
                     DatiRilascio = {
                        nome: element.nome,
                        indirizzo: element.indirizzo,
                        nCivico: element.nCivico
                    }
                    setDati({...dati,datiRilascio:DatiRilascio})
                }
                
            
            }
            nuovaPrenotazione.prenotazione.datiParcheggioConsegna = dati.datiConsegna;
            nuovaPrenotazione.prenotazione.datiParcheggioRilascio = dati.datiRilascio;
            dispatch(newInformation(nuovaPrenotazione.prenotazione));
            window.location.href="/SchermataRiepilogo"
        }
    }
    useEffect(()=>{
        if(dati.parcheggioConsegna!=""){
            setErrori({...errori,parcheggioConsegna:false});
        } else{
            setErrori({...errori,parcheggioConsegna:true});
        }
    },[dati.parcheggioConsegna])

    useEffect(()=>{
        if(dati.parcheggioRilascio!=""){
            setErrori({...errori,parcheggioRilascio:false});
        } else{
            setErrori({...errori,parcheggioRilascio:true});
        }
    },[dati.parcheggioRilascio])



    //Mappa
    const libraries = ["places"]
    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey:GoogleKey.REACT_GOOGLE_MAP_API_KEY,
        libraries
    })
    if(loadError) return "Errore caricamento Mappa" 
    if(!isLoaded) return "caricamento mappa"

   



    return (
        <div>
            <Container style={{margin:"20px"}}>
                <Row>
                    <Col>
                        <GoogleMap mapContainerStyle={mapContainerStyle} zoom={13} center={center}>
                        </GoogleMap>
                    </Col>   
                    <Col>
                        <label>Parcheggio di Partenza</label><br/>
                        <select type="text" id="parcheggioPartenza" name="parcheggioPartenza" onChange={(e)=>setDati({...dati,parcheggioConsegna:e.target.value})}title="Seleziona il parcheggio in cui si trova il veicolo">
                            <option value="" selected disabled>Parcheggio</option>
                            {listaParcheggi.length==0 ? "" : listaParcheggi.map((parcheggio)=>(
                                <option value={parcheggio._id}> {parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico} </option>
                            ))}
                        </select> <br/>
                        <span className={classnames({'green-convalid':!errori.parcheggioConsegna, 'red-convalid':errori.parcheggioConsegna})}> {errori.parcheggioConsegna ? "Voce obbligatoria per il completamento della prenotazione" : "OK"} </span>
                        <br/><br/>
                        <label>Parcheggio di Arrivo</label><br/>
                        <select type="text" id="parcheggioArrivo" name="parcheggioArrivo" onChange={(e)=>setDati({...dati,parcheggioRilascio:e.target.value})} title="Seleziona il parcheggio in cui si trova il veicolo"> <br/>
                            <option value="" selected disabled>Parcheggio</option>
                            {listaParcheggi.length==0 ? "" : listaParcheggi.map((parcheggio)=>(
                                <option value={parcheggio._id}> {parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico} </option>
                            ))}
                        </select> <br/>
                        <span className={classnames({'green-convalid':!errori.parcheggioRilascio, 'red-convalid':errori.parcheggioRilascio})}> {errori.parcheggioRilascio ? "Voce obbligatoria per il completamento della prenotazione" : "OK"} </span>
                        <span> </span>
                        <br/><br/>
                        <Button variant="success" onClick={()=>completaOperazione()}> Completa Operazione</Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SceltaParcheggi;