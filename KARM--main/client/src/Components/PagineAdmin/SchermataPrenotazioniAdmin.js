import React from "react"
import {Container,Row,Col,Button,Modal,ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPrenotazioniAdmin,deleteBooking,terminaPrenotazione,modifyVehicle} from "../../Actions/prenotazioni";
import Table from 'react-bootstrap/Table';
import BrushSharpIcon from '@material-ui/icons/BrushSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import {convertiDataEuropa,convertiData,getOra} from '../gestioneDateTime';

function SchermataPrenotazioniAdmin (){
    const [annullamento,setAnnullamento] = useState({prenotazione: {}, show: false});
    const [modifica,setModifica] = useState({prenotazione: {}, show: false});
    const listaPrenotazioni = useSelector((state) => state.Prenotazioni.listaPrenotazioni);
    const dispatch = useDispatch();
    
    const checkModifica = (Prenotazione) => {
        let oraAttuale = new Date();
        let todayDate = new Date(convertiData(oraAttuale));
        let dataPartenza = new Date(Prenotazione.dataPartenza);
        if (((todayDate.setDate(todayDate.getDate()+1))<dataPartenza.getTime())||((todayDate.setDate(todayDate.getDate()+1))==dataPartenza.getTime() && getOra(oraAttuale)<getOra(Prenotazione.oraPartenza))) {
            setModifica({...modifica, show: true, prenotazione: Prenotazione}); 
        } else if ((todayDate.getTime()==dataPartenza.getTime() && getOra(oraAttuale)>getOra(Prenotazione.oraPartenza)) || todayDate.getTime()>dataPartenza.getTime()) {
            //mess o notifica da mandare
            const dati = {id: Prenotazione._id};
            dispatch(terminaPrenotazione(dati));
        } else {
            //mess o notifica di errore
            window.location.reload();
        }
    };

    const modificaVeicolo = (Prenotazione) => {
        const Dati = {prenotazione: Prenotazione};
        dispatch(modifyVehicle(Dati));
        window.location.href="/ModificaPrenotazioneVeicoloAdmin";
    };

    const modificaArrivo = (Prenotazione) => {

    };
    
    const DeleteBooking = (Prenotazione) => {
        let oraAttuale = new Date();
        let todayDate = new Date(convertiData(oraAttuale));
        let dataPartenza = new Date(Prenotazione.dataPartenza);
        if (((todayDate.setDate(todayDate.getDate()+1))<dataPartenza.getTime())||((todayDate.setDate(todayDate.getDate()+1))==dataPartenza.getTime() && getOra(oraAttuale)<getOra(Prenotazione.oraPartenza))) {
            //Puoi fare rimborso
            //email
            //notifiche da rimuovere
            //notifica da mandare
            const dati = {id: Prenotazione._id};
            dispatch(deleteBooking(dati));
        } else if ((todayDate.getTime()==dataPartenza.getTime() && getOra(oraAttuale)>getOra(Prenotazione.oraPartenza)) || todayDate.getTime()>dataPartenza.getTime()) {
            //notifica da mandare
            const dati = {id: Prenotazione._id};
            dispatch(terminaPrenotazione(dati));
        } else {
            //email
            //notifiche da rimuovere
            //notifica da mandare
            const dati = {id: Prenotazione._id};
            dispatch(deleteBooking(dati));
        }
    };
    
    useEffect(()=>{
        dispatch(getPrenotazioniAdmin());
    },[])

    return (
        <div>            
            <Modal show={modifica.show} onHide={()=>setModifica({...modifica, show:false})} centered backdrop="static">
                <Modal.Header >
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
                                            <Button variant="secondary" style={{visibility: (prenotazione.statoPrenotazione!="terminata" && prenotazione.statoPrenotazione!="in_corsa") ? "visible" : "hidden"}} onClick={()=>checkModifica(prenotazione)}>
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