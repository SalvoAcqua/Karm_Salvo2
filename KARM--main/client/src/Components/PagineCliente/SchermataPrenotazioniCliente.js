import React from "react"
import {Container,Row,Col,Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getPrenotazioniCliente} from "../../Actions/prenotazioni";
import Table from 'react-bootstrap/Table';
import classnames from "classnames";
import BrushSharpIcon from '@material-ui/icons/BrushSharp';
import DeleteIcon from '@material-ui/icons/Delete';
import {convertiDataEuropa} from '../gestioneDateTime';

function SchermataPrenotazioniCliente (){
    const user = useSelector ((state)=>state.utenti.utente);
    const listaPrenotazioni = useSelector((state)=>state.Prenotazioni.listaPrenotazioni);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        const dati = {_id: user._id};
        dispatch(getPrenotazioniCliente(dati));
    },[])

    return (
        <div>
            <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                <th>Codice Prenotazione</th>
                                <th>Tipo Veicolo</th>
                                <th>Targa Veicolo</th>
                                <th>Nome Autista</th>
                                <th>Cognome Autista</th>
                                <th>Data Partenza</th>
                                <th>Ora Partenza</th>
                                <th>Data Arrivo</th>
                                <th>Ora Arrivo</th>
                                <th>Nome Parcheggio Partenza</th>
                                <th>Nome Parcheggio Arrivo</th>
                                <th>Indirizzo Partenza</th>
                                <th>Indirizzo Arrivo</th>
                                <th>Stato Prenotazione</th>
                                <th> Prezzo </th>
                                <th style={{color:"blue"}}>Modifica Prenotazione</th>
                                <th style={{color:"red"}}>Annulla Prenotazione</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaPrenotazioni.length==0 ? 
                                    <tr> 
                                        <td> Non hai effettuato ancora alcuna prenotazione</td>
                                    </tr> : listaPrenotazioni.map((prenotazione) => (
                                    <tr>
                                        <td>{prenotazione._id}</td>
                                        <td>{prenotazione.tipoVeicolo}</td>
                                        <td>{prenotazione.targa!=undefined ? prenotazione.targa : "//"}</td>
                                        <td>{prenotazione.nomeAutista}</td>
                                        <td>{prenotazione.cognomeAutista}</td>
                                        <td>{convertiDataEuropa(new Date(prenotazione.dataPartenza))}</td>
                                        <td>{prenotazione.oraPartenza}</td>
                                        <td>{convertiDataEuropa(new Date(prenotazione.dataArrivo))}</td>
                                        <td>{prenotazione.oraArrivo}</td>
                                        <td>{prenotazione.nomeParcheggioPartenza}</td>
                                        <td>{prenotazione.nomeParcheggioArrivo}</td>
                                        <td>{prenotazione.indirizzoPartenza}</td>
                                        <td>{prenotazione.indirizzoArrivo}</td>
                                        <td>{prenotazione.statoPrenotazione}</td>
                                        <td>{prenotazione.prezzo}€</td>
                                        <td>
                                            <Button variant="secondary" style={{visibility:prenotazione.statoPrenotazione!="terminata" ? "visible" : "hidden"}} onClick={()=>{}}>
                                                <BrushSharpIcon/>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="secondary" style={{visibility:prenotazione.statoPrenotazione!="terminata" ? "visible" : "hidden"}} onClick={()=>{}}>
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

export default SchermataPrenotazioniCliente