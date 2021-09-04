import React from "react";
import {Container,Row,Col,Button,Alert,Modal,ModalBody} from "react-bootstrap";
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {verifyRelease, richiediNuovoVeicolo} from '../../Actions/corsa';
import classnames from "classnames";

function SchermataComunicaGuasto (){
    const [idPrenotazione,setIdPrenotazione] = useState("");
    const [indirizzo,setIndirizzo] = useState("");
    const sostituto = useSelector((state)=>state.Corsa.newVehicle);
    const Err = useSelector((state)=>state.errori.error);
    const dispatch = useDispatch();
    let Dati="";
    
    const onSubmit = (event) => {
        event.preventDefault();
        if (idPrenotazione!="") {
            Dati={cod: idPrenotazione};
            dispatch(verifyRelease(Dati));
        }
    }

    const Rimborso = () => {
        //rimborso leggi RAD + termina + statoveicolo
    }

    const NuovoVeicolo = () => {
        Dati={cod: idPrenotazione};
        dispatch(richiediNuovoVeicolo(Dati));
    }


    return (
        <div>
           <Container>
                <Modal show={Err.sostituto!=undefined} centered backdrop="static">
                    <ModalBody>
                        <Row>
                            <Button variant="secondary" size="lg" onClick={()=>window.location.href='/GestioneCorsa'}>
                                Conferma
                            </Button>
                        </Row>
                        <br/><br/>
                        <h3> Nuovo veicolo in arrivo: </h3>
                        <Row>
                            <br/><br/>
                            <p>Il nuovo veicolo arriverà nel posto da lei indicato</p><br/>
                            <p>Il veicolo in arrivo è: </p><br/>
                            <p>{sostituto.tipoVeicolo} {sostituto.modello}
                            {(sostituto.tipoVeicolo=="Autovettura"||sostituto.tipoVeicolo=="Moto") ? " , targa: " : ""}
                            {sostituto.targa}</p><br/>
                        </Row>
                        <br/><br/>
                        <h5>Inserisci l'indirizzo in cui ti trovi</h5>
                        <br/>
                        <Row>
                            <br/>
                            <input type="text" id="indirizzo" name="indirizzo" onChange={(e)=>setIndirizzo(e.target.value)} required/> <br/>
                            <span className={classnames({'green-convalid' : indirizzo!="", 'red-convalid' : indirizzo==""})}> {indirizzo=="" ? "Inserisci il posto in cui ti trovi" : "OK"} </span>
                            <br/><br/>
                        </Row>
                        <br/><br/>
                        <Row>
                            <Button variant="secondary" size="lg" onClick={()=>window.location.href='/GestioneCorsa'}>
                                Conferma
                            </Button>
                        </Row>
                    </ModalBody>
                </Modal>
                <Alert show={Err.guasto!=undefined} variant="danger">
                    <Alert.Heading>Errore!</Alert.Heading>
                    <p>Il sistema non ha individuato un veicolo che possa sostituire quello della sua prenotazione.</p>
                    <p>Procederemo con il rimborso sulla carta della prenotazione</p><br/>
                </Alert>
                <Modal show={Err.corsa!=undefined} centered backdrop="static">
                    <ModalBody>
                            <Row>
                                <Col>
                                    <Button onClick={()=>Rimborso()}>Termina e ottieni rimborso</Button>
                                </Col>
                                <Col>
                                    <Button onClick={()=>NuovoVeicolo()}>Richiedi nuovo veicolo</Button>
                                </Col>
                            </Row>
                    </ModalBody>
                </Modal>
                <Alert show={Err.rilascio!=undefined} variant="danger">
                    <Alert.Heading>Errore!</Alert.Heading>
                    <p>
                        Il codice inserito non risulta essere il codice di una prenotazione in corso
                    </p>
                </Alert>
                <form onSubmit={onSubmit}>
                        <Row>
                            <Button variant="secondary" size="lg" type="submit">
                                Avanti
                            </Button>
                        </Row>

                        <br/>
                        <h5>Inserisci il codice identificativo della prenotazione</h5>
                        <br/>
                        <Row>
                            <br/>
                            <input type="text" id="codPrenotazione" name="codPrenotazione" onChange={(e)=>setIdPrenotazione(e.target.value)} required/> <br/>
                            <span className={classnames({'green-convalid':idPrenotazione!="", 'red-convalid':idPrenotazione==""})}> {idPrenotazione=="" ? "Inserisci il codice identificativo della prenotazione" : "OK"} </span>
                            <br/><br/>
                        </Row>
                        <Row>
                            <Button variant="secondary" size="lg" type="submit">
                                Avanti
                            </Button>
                        </Row>
                        <br/><br/>
                    </form>
            </Container>
        </div>
    )
}

export default SchermataComunicaGuasto