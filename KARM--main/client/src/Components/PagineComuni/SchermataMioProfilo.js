import React from 'react'
import {Container,Row,Col,Button} from "react-bootstrap";
import {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

function SchermataMioProfilo () {
    const user = useSelector((state)=>state.utenti.utente)
    
    switch(user.ruolo){
        case "Autista":
            return (
                <div class="container profilo " >
                    <Container>
                        <Row>
                            <Col>
                                <br/>
                                <h3> GESTISCI IL TUO PROFILO</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="card" style={{width: '60%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Body>
                                    <Card.Title>{user.nome} {user.cognome}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Ruolo: {user.ruolo}</ListGroupItem>
                                    <ListGroupItem>Email : {user.email}</ListGroupItem>
                                    <ListGroupItem>Numero Patente : {user.numeroPatente} </ListGroupItem>
                                </ListGroup>
                                <br/>
                            </Card>

                            <Card style={{ width: '30%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Img class="img-profilo" variant="top" src="http://artischiano.it/wp-content/uploads/2015/03/765-default-avatar_4.png" />
                            </Card>
                        </Row>
                        <Row>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/ModificaPassword"> Cambia Password </Button> 
                            </Col>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/AggiornaPatenteAutista"> Inserisci o Aggiorna patente </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            break;
        case "Admin":
            return (
                <div class="container profilo">
                    <Container>
                        <Row>
                            <Col>
                                <br/>
                                <h3> GESTISCI IL TUO PROFILO</h3>
                            </Col>
                        </Row>
                        <Row>
                            <Card className="card" style={{width: '60%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Body>
                                    <Card.Title>{user.nome} {user.cognome}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Ruolo: {user.ruolo}</ListGroupItem>
                                </ListGroup>
                                <br/>
                            </Card>
                            
                            <Card style={{ width: '30%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Img class="img-profilo" variant="top" src="http://artischiano.it/wp-content/uploads/2015/03/765-default-avatar_4.png"/>
                            </Card>
                        </Row>
                        <Row >
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/ModificaPassword">Cambia Password  </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            break;
        case "Addetto":
            return (
                <div class="container profilo">
                    <Container>
                        <Row>
                            <Col>
                                <br/>
                                <h3> GESTISCI IL TUO PROFILO</h3>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Card className="card" style={{width: '60%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Body>
                                    <Card.Title>{user.nome} {user.cognome}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Ruolo: {user.ruolo}</ListGroupItem>
                                    <ListGroupItem>Email : {user.email}</ListGroupItem>
                                    <ListGroupItem>Parcheggio : {user.idParcheggio==-1 ? "Nessun Parcheggio" : user.nomeParcheggio + ", " + user.indirizzoParcheggio + " " + user.nCivicoParcheggio} </ListGroupItem>
                                </ListGroup>
                                <br/>
                            </Card>
                            
                            <Card style={{ width: '30%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Img class="img-profilo" variant="top" src="http://artischiano.it/wp-content/uploads/2015/03/765-default-avatar_4.png"/>
                            </Card>
                        </Row>
                        <Row>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/ModificaPassword"> Cambia Password </Button> 
                            </Col>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/ModificaParcheggioAddetto"> Modifica Parcheggio Associato </Button> 
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            break;
        default:
            return (
                <div class="container profilo">
                    <Container>
                        <Row>
                            <Col>
                                <br/>
                                <h3> GESTISCI IL TUO PROFILO</h3>
                            </Col>
                        </Row>

                        <br/>
                        <Row>
                            <Card style={{ width: '30%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Img class="img-profilo" variant="top" src={user.sesso == null ? "http://artischiano.it/wp-content/uploads/2015/03/765-default-avatar_4.png" : "http://www.spec-chir.it/wp-content/uploads/2016/10/Blank_woman_placeholder.svg-263x263.png"} />
                            </Card>

                            <Card className="card" style={{width: '60%', backgroundColor: "rgb(214, 214, 214)" }}>
                                <Card.Body>
                                    <Card.Title>{user.nome} {user.cognome}</Card.Title>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Ruolo: {user.ruolo}</ListGroupItem>
                                    <ListGroupItem>Email : {user.email}</ListGroupItem>
                                    <ListGroupItem>Numero Patente : {user.numeroPatente!=undefined ? user.numeroPatente : "Nessuna patente inserita"} <br/></ListGroupItem>
                                </ListGroup>
                                <br/>
                            </Card>
                        </Row>

                        <Row>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/AggiornaPatenteCliente"> Inserisci o Aggiorna Patente </Button>
                            </Col>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/MetodiDiPagamento"> I Miei Metodi di Pagamento  </Button>
                            </Col>
                        </Row>

                        <Row>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/ModificaPassword"> Cambia Password </Button> 
                            </Col>
                            <Col class="col text-center">
                                <Button className="button" variant="secondary" href="/AggiornaEmail"> Cambia Email </Button>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )
            break;
    }
}
export default SchermataMioProfilo;
