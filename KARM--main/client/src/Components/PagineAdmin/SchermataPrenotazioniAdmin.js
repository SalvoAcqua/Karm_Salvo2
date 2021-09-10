import React from "react"
import {Container,Row,Col,Button,Alert,Modal,ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPrenotazioniAdmin,deleteBooking,terminaPrenotazione,modifyVehicle,newInformation} from "../../Actions/prenotazioni";
import Table from 'react-bootstrap/Table';
import BrushSharpIcon from '@material-ui/icons/BrushSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import {convertiDataEuropa,convertiData,getOra} from '../gestioneDateTime';

function SchermataPrenotazioniAdmin (){
    const Utente = useSelector((state)=>state.utenti.utente);
    const [errModifica,setErrModifica] = useState({show: false, mess: ""});
    const [annullamento,setAnnullamento] = useState({prenotazione: {}, show: false});
    const [modifica,setModifica] = useState({prenotazione: {}, show: false});
    const listaPrenotazioni = useSelector((state) => state.Prenotazioni.listaPrenotazioni);
    const dispatch = useDispatch();
    
    const checkModifica = (Prenotazione) => {
        let oraAttuale = new Date();
        let todayDate = new Date(convertiData(oraAttuale));
        let TodayDate = new Date(convertiData(oraAttuale));
        let dataPartenza = new Date(Prenotazione.dataPartenza);
        if (((todayDate.setDate(todayDate.getDate()+1))<dataPartenza.getTime())||((todayDate.setDate(todayDate.getDate()+1))==dataPartenza.getTime() && getOra(oraAttuale)<getOra(Prenotazione.oraPartenza))) {
            setModifica({...modifica, show: true, prenotazione: Prenotazione}); 
        } else if ((oraAttuale.getTime()==dataPartenza.getTime() && getOra(oraAttuale)>getOra(Prenotazione.oraPartenza)) || TodayDate.getTime()>dataPartenza.getTime()) {
            setErrModifica({...errModifica, show: true, mess: "La prenotazione è già scaduta"});
            const dati = {id: Prenotazione._id};
            dispatch(terminaPrenotazione(dati));
        } else {
            setErrModifica({...errModifica, show: true, mess: "Impossibile modificare la prenotazione a meno di 24h dalla consegna"});
            window.location.reload();
        }
    };

    const modificaVeicolo = async (Prenotazione) => {
        const Dati = {prenotazione: Prenotazione};
        await dispatch(modifyVehicle(Dati));
        window.location.href="/ModificaPrenotazioneVeicoloAdmin";
    };

    const modificaArrivo = async (Prenotazione) => {
        await dispatch(newInformation(Prenotazione));
        window.location.href="/ModificaPrenotazioneArrivoAdmin";
    };
    
    const DeleteBooking = (Prenotazione) => {
        let oraAttuale = new Date();
        let todayDate = new Date(convertiData(oraAttuale));
        let dataPartenza = new Date(Prenotazione.dataPartenza);
        if (((todayDate.setDate(todayDate.getDate()+1))<dataPartenza.getTime())||((todayDate.setDate(todayDate.getDate()+1))==dataPartenza.getTime() && getOra(oraAttuale)<getOra(Prenotazione.oraPartenza))) {
            const dati = {id:Prenotazione._id, ruolo:Utente.ruolo, idUtente:Utente._id,rimborso:true};
            dispatch(deleteBooking(dati));
        } else if ((oraAttuale.getTime()==dataPartenza.getTime() && getOra(oraAttuale)>getOra(Prenotazione.oraPartenza)) || oraAttuale.getTime()>dataPartenza.getTime()) {
            const dati = {id: Prenotazione._id};
            dispatch(terminaPrenotazione(dati));
        } else {
            const dati = {id:Prenotazione._id, ruolo:Utente.ruolo, idUtente:Utente._id};
            dispatch(deleteBooking(dati));
        }
    };
    
    useEffect(()=>{
        dispatch(getPrenotazioniAdmin());
    },[])

    return (
        <div>            
            <Alert show={errModifica.show} variant="danger">
                <Alert.Heading>Errore!</Alert.Heading>
                    <p>
                        {errModifica.mess}
                    </p>
            </Alert>
            
            <Modal show={modifica.show} onHide={()=>setModifica({...modifica, show:false})} centered backdrop="static">
                <Modal.Header closeButton>
                            <Modal.Title>Modifica Prenotazione</Modal.Title>
                </Modal.Header>
                <ModalBody>
                        <Row>
                            <p>Codice Prenotazione: {modifica.prenotazione._id}</p>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="secondary" onClick={()=>modificaVeicolo(modifica.prenotazione)}>Modifica Veicolo</Button>
                            </Col>
                            <Col>
                                <Button variant="secondary" onClick={()=>modificaArrivo(modifica.prenotazione)}>Modifica Arrivo</Button>
                            </Col>
                        </Row>
                </ModalBody>
            </Modal>
            
            <Modal show={annullamento.show} onHide={()=>setAnnullamento({...annullamento, show:false})} centered backdrop="static">
                <Modal.Header >
                            <Modal.Title>Sei sicuro di voler annullare questa prenotazione?</Modal.Title>
                </Modal.Header>
                <ModalBody>
                        <Row>
                            <p>Codice Prenotazione: {annullamento.prenotazione._id}</p>
                        </Row>
                        <Row>
                            <Col>
                                <Button variant="success" onClick={()=>DeleteBooking(annullamento.prenotazione)}>Conferma</Button>
                            </Col>
                            <Col>
                                <Button variant="danger" onClick={()=>setAnnullamento({...annullamento, show:false})}>Annulla</Button>
                            </Col>
                        </Row>
                </ModalBody>
            </Modal>

            <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                <br/>
                <h3>Prenotazioni dell'Azienda</h3>
                <br/>

                <Row>
                    <Col>
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                <th>Codice Prenotazione</th>
                                <th>Nome Cliente</th>    
                                <th>Cognome Cliente</th>
                                <th>Tipo Veicolo</th>
                                <th>Targa Veicolo</th>
                                <th>Nome Autista</th>
                                <th>Cognome Autista</th>
                                <th>Data Partenza</th>
                                <th>Ora Partenza</th>
                                <th>Data Arrivo</th>
                                <th>Ora Arrivo</th>
                                <th>Luogo Partenza</th>
                                <th>Luogo Arrivo</th>
                                <th>Prezzo</th>
                                <th>Stato Prenotazione</th>
                                <th style={{color:"blue"}}>Modifica Prenotazione</th>
                                <th style={{color:"red"}}>Annulla Prenotazione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaPrenotazioni.length==0 ? 
                                    <tr> 
                                        <td> Non ci sono prenotazioni registrate</td>
                                    </tr> : listaPrenotazioni.map((prenotazione) => (
                                    <tr>
                                        <td>{prenotazione._id}</td>
                                        <td>{prenotazione.nomeCliente}</td>
                                        <td>{prenotazione.cognomeCliente}</td>
                                        <td>{prenotazione.tipoVeicolo}</td>
                                        <td>{prenotazione.targa!=undefined ? prenotazione.targa : "//"}</td>
                                        <td>{prenotazione.nomeAutista}</td>
                                        <td>{prenotazione.cognomeAutista}</td>
                                        <td>{convertiDataEuropa(new Date(prenotazione.dataPartenza))}</td>
                                        <td>{prenotazione.oraPartenza}</td>
                                        <td>{convertiDataEuropa(new Date(prenotazione.dataArrivo))}</td>
                                        <td>{prenotazione.oraArrivo}</td>
                                        <td>{prenotazione.nomeParcheggioPartenza=="//" ? prenotazione.indirizzoPartenza : prenotazione.nomeParcheggioPartenza}</td>
                                        <td>{prenotazione.nomeParcheggioArrivo=="//" ? prenotazione.indirizzoArrivo : prenotazione.nomeParcheggioArrivo}</td>
                                        <td>{prenotazione.prezzo}€</td>
                                        <td>{prenotazione.statoPrenotazione}</td>
                                        <td>
                                            <Button variant="secondary" style={{visibility: prenotazione.statoPrenotazione=="completa" ? "visible" : "hidden"}} onClick={()=>{checkModifica(prenotazione)}}>
                                                <BrushSharpIcon/>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="secondary" style={{visibility: (prenotazione.statoPrenotazione!="terminata" && prenotazione.statoPrenotazione!="in_corsa") ? "visible" : "hidden"}} onClick={()=>{setAnnullamento({...annullamento, show: true, prenotazione: prenotazione})}}>
                                                <DeleteIcon/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SchermataPrenotazioniAdmin