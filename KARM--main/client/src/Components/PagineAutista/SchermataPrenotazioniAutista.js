import React from "react"
import {Container,Row,Col, Button,Modal,ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPrenotazioniAutista,deleteBooking,terminaPrenotazione} from "../../Actions/prenotazioni";
import Table from 'react-bootstrap/Table';
import DeleteIcon from '@material-ui/icons/Delete';
import {convertiData,getOra,convertiDataEuropa} from '../gestioneDateTime';

function SchermataPrenotazioniAutista (){
    const Utente = useSelector((state)=>state.utenti.utente);
    const [annullamento,setAnnullamento] = useState({prenotazione: {}, show: false});
    //const [modifica,setModifica] = useState({prenotazione: {}, show: false});
    const user = useSelector ((state)=>state.utenti.utente);
    const listaPrenotazioni = useSelector((state)=>state.Prenotazioni.listaPrenotazioni);
    const dispatch = useDispatch();
    
    const DeleteBooking = (Prenotazione) => {
        let oraAttuale = new Date();
        let todayDate = new Date(convertiData(oraAttuale));
        let dataPartenza = new Date(Prenotazione.dataPartenza);
        if (((todayDate.setDate(todayDate.getDate()+4))<dataPartenza.getTime())||((todayDate.setDate(todayDate.getDate()+4))==dataPartenza.getTime() && getOra(oraAttuale)<getOra(Prenotazione.oraPartenza))) {
            //rimborso
            const dati = {id:Prenotazione._id, ruolo:Utente.ruolo, idUtente:Utente._id};
            dispatch(deleteBooking(dati));
        } else if ((todayDate.getTime()==dataPartenza.getTime() && getOra(oraAttuale)>getOra(Prenotazione.oraPartenza)) || todayDate.getTime()>dataPartenza.getTime()) {
            const dati = {id: Prenotazione._id};
            dispatch(terminaPrenotazione(dati));
        } else {
            window.location.reload();
        }
    };
    
    useEffect(()=>{
        const dati = {_id: user._id}
        dispatch(getPrenotazioniAutista(dati));
    },[])

    return (
        <div>
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
                <h3>Le tue prenotazioni</h3>
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
                                <th>Data Partenza</th>
                                <th>Ora Partenza</th>
                                <th>Data Arrivo</th>
                                <th>Ora Arrivo</th>
                                <th>Luogo Partenza</th>
                                <th>Luogo Arrivo</th>
                                <th>Stato Prenotazione</th>
                                <th>Prezzo</th>
                                <th style={{color:"red"}}>Annulla Prenotazione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaPrenotazioni.length==0 ? 
                                    <tr> 
                                        <td> Non ci sono prenotazioni associate al tuo profilo</td>
                                    </tr> : listaPrenotazioni.map((prenotazione) => (
                                    <tr>
                                        <td>{prenotazione._id}</td>
                                        <td>{prenotazione.nomeCliente}</td>
                                        <td>{prenotazione.cognomeCliente}</td>
                                        <td>{prenotazione.tipoVeicolo}</td>
                                        <td>{prenotazione.targa!=undefined ? prenotazione.targa : "//"}</td>
                                        <td>{convertiDataEuropa(new Date(prenotazione.dataPartenza))}</td>
                                        <td>{prenotazione.oraPartenza}</td>
                                        <td>{convertiDataEuropa(new Date(prenotazione.dataArrivo))}</td>
                                        <td>{prenotazione.oraArrivo}</td>
                                        <td>{prenotazione.nomeParcheggioPartenza=="//" ? prenotazione.indirizzoPartenza : prenotazione.nomeParcheggioPartenza}</td>
                                        <td>{prenotazione.nomeParcheggioArrivo=="//" ? prenotazione.indirizzoArrivo : prenotazione.nomeParcheggioArrivo}</td>
                                        <td>{prenotazione.statoPrenotazione}</td>
                                        <td>{prenotazione.prezzo}€</td>
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

export default SchermataPrenotazioniAutista