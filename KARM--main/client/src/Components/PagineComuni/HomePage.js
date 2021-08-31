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

function HomePage () {
    const user = useSelector((state)=>state.utenti.utente)
    const Ruolo = useSelector((state)=>state.utenti.utente.ruolo)
    switch(Ruolo){
        case "Autista":
            return (
                <div class="container">
                    <Container>
                        <Row className="justifyCenter">
                            <Col>
                                <Button  className="button" variant="secondary" size="lg" href="/SchermataGestioneCorsa">
                                    GESTIONE CORSA
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            break;
        case "Admin":
            return (
                <div class="container">
                    <Container>
                        <Row className="justifyCenter">
                            <Col>
                                <Button  className="button" variant="secondary" size="lg" href="/SchermataGestioneCorsa">
                                    GESTIONE CORSA
                                </Button>
                            </Col>
                            <Col>
                                <Button  className="button" variant="secondary" size="lg" href="/GestioneAmministrazione">
                                    GESTIONE AMMINISTRAZIONE
                                </Button>
                            </Col>
                        </Row>
                    </Container>   
                </div>
            )
            break;
        case "Addetto":
            return (
                <div class="container">
                    <Container>
                        <Row className="justifyCenter">
                            <Col>
                                <Button  className="button" variant="secondary" size="lg" href="/SchermataGestioneCorsa">
                                    GESTIONE CORSA
                                </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            break;
        default:
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
                                <h4>Noleggia il mezzo che fa per te per muoverti in città!</h4>
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
                            <Button className="button" variant="secondary" size="lg" href="/SchermataGestioneCorsa"> 
                                Gestione Corsa
                            </Button> 
                        </Col>
                        <Col md="3">
                            <Button className="button" variant="secondary" size="lg" href="/NuovaPrenotazione"> 
                                Nuova Prenotazione
                            </Button>
                        </Col>
                    </Row>
                </div>
            )
    }
}

export default HomePage;