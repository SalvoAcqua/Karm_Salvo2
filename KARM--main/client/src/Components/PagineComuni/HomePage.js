import React from "react";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import Carousel from 'react-bootstrap/Carousel'
import {Container,Row,Col,Button} from "react-bootstrap";

import moto from '../../Images/moto.png';
import monopattino from '../../Images/monopattino.jpeg';
import auto from '../../Images/auto.jpeg';
import bici from '../../Images/biciclette.jpeg';
import citta from '../../Images/strada.jpeg';
import admin from '../../Images/admin.jpeg';
import amm from '../../Images/amm.jpeg';
import corsa from '../../Images/corsa.jpeg';
import porta from '../../Images/porta.jpg';
import autista from '../../Images/autista.jpeg';
import areaParch from '../../Images/areaParc.jpg';
import parch from '../../Images/parch.jpeg';

function HomePage () {
    const user = useSelector((state)=>state.utenti.utente)
    const Ruolo = useSelector((state)=>state.utenti.utente.ruolo)
    switch(Ruolo){
        case "Cliente":
            return (
                <div class="container" style={{marginTop:"15px"}} >
                    <Carousel variant="dark" class="carosello">
                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={citta}
                                alt="Mezzo"
                            />
                            <Carousel.Caption>
                                <h4>Noleggia il mezzo che fa per te e muoverti in città!</h4>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={auto}
                                alt="Auto"
                            />
                            <Carousel.Caption>
                                <h4>Noleggio Auto</h4>
                                <h6>Qui trovi l'auto adatta alle tue esigenze!</h6>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={bici}
                                alt="Bici"
                            />
                            <Carousel.Caption>
                                <h4>Noleggio Bici</h4>
                                <h6>Scegli la bici adatta a te!</h6>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={moto}
                                alt="Moto"
                            />
                            <Carousel.Caption>
                                <h4>Noleggio Moto</h4>
                                <h6>La moto adatta ai tuoi confort la trovi qui!</h6>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={monopattino}
                                alt="Monopattino"
                            />
                            <Carousel.Caption>
                                <h4>Noleggio Monopattino</h4>
                                <h6>Attraversa velocemente la città, scegli il monopattino che preferisci</h6>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <br/>
                    <Row className="justifyCenter">
                        <Col md="3">
                            <Button className="button" variant="secondary" size="lg" href="/GestioneCorsa"> 
                                GESTIONE CORSA
                            </Button> 
                        </Col>
                        <Col md="3">
                            <Button className="button" variant="secondary" size="lg" href="/NuovaPrenotazione"> 
                                NUOVA PRENOTAZIONE
                            </Button>
                        </Col>
                    </Row>
                    <br/>
                </div>
            )
            break;
        case "Admin":
            return (
                <div>
                    <Carousel variant="dark" class="carosello">
                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={admin}
                                alt="Amministratore"
                            />
                            <Carousel.Caption>
                                <h4>Benvenuto Admin</h4>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={corsa}
                                alt="Corsa"
                            />
                            <Carousel.Caption>
                                <h3>Qui gestisci le corse della tua azienda</h3>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={amm}
                                alt="Amministrazione"
                            />
                            <Carousel.Caption>
                                <h3>Puoi gestire l'amministrazione</h3>
                                <h5>Inserisci veicoli, parcheggi e dipendenti</h5>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <br/>
                    <Container>
                        <Row className="justifyCenter row text-center">
                            <Col class="col text-center">
                                <Button  className="button" variant="secondary" size="lg" href="/GestioneCorsa">
                                    GESTIONE CORSA
                                </Button>
                            </Col>
                        </Row>
                        <Row className="justifyCenter row text-center">
                            <Col class="col text-center">
                                <Button  className="button" variant="secondary" size="lg" href="/GestioneAmministrazione">
                                    GESTIONE AMMINISTRAZIONE
                                </Button>
                            </Col>
                        </Row>
                    </Container>   
                    <br/>
                </div>
            )
            break;
        case "Addetto":
            return (
                <div class="container">
                    <Carousel variant="dark" class="carosello">
                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={areaParch}
                                alt="areaParcheggio"
                            />
                            <Carousel.Caption>
                                <h4>Benvenuto Admin</h4>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={parch}
                                alt="Parcheggio"
                            />
                            <Carousel.Caption>
                                <h4>Garantisci la consegna e il rilascio dei veicoli</h4>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                    <br/> 
                    <Container style={{marginBottom:"30px"}}>
                        <Row className="justifyCenter row text-center autista">
                            <Col class="col text-center">
                                <Button  className="button" variant="secondary" size="lg">
                                    GESTIONE CORSA
                                </Button>
                            </Col>
                        </Row>
                        <br/>
                    </Container>
                </div>
            )
            break;
        default:
            //AUTISTA
            return (
                <div class="container autista">
                    <Carousel variant="dark" class="carosello">
                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={autista}
                                alt="Autista"
                            />
                            <Carousel.Caption>
                                <h4>Benvenuto Autista</h4>
                            </Carousel.Caption>
                        </Carousel.Item>

                        <Carousel.Item data-interval="1000">
                            <img
                                className="d-block w-100"
                                src={porta}
                                alt="Porta"
                            />
                            <Carousel.Caption>
                                <h4>Accompagna i passeggeri dove desiderano</h4>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>

                    <br/>
                    <Container>
                        <Row className="justifyCenter row text-center">
                            <Col class="col text-center">
                                <Button  className="button" variant="secondary" size="lg">
                                    GESTIONE CORSA
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                    <br/>
                </div>
            )
    }
}

export default HomePage;