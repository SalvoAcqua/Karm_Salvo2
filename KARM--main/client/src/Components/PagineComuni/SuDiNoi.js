import React from "react";
import {Container,Row,Col,Button, Card, CardGroup, ListGroup, ListGroupItem} from "react-bootstrap";
import EuroIcon from '@material-ui/icons/Euro';
import EmojiTransportationIcon from '@material-ui/icons/EmojiTransportation';
import GroupIcon from '@material-ui/icons/Group';
import mezzi from '../../Images/mezzi.jpg'
import prezzi from '../../Images/prezzi.jpg'
import team from '../../Images/team.jpg'

function SuDiNoi () {
    return(
        <div class="container">
            <br/>
            <h3 style={{fontStyle:"normal", color:"black"}}>KARM ha come priorità il cliente e un servizio di qualità. </h3>
            <br/>
            <h5>Il nostro obiettivo non è solo quello di garantire il miglior prezzo ai nostri clienti,</h5>
            <h5>bensì anche il miglior servizio possibile.</h5>
            <Row>  
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title style={{textAlign:"center", color:"black"}}>PREZZI IMBATTIBILI</Card.Title>
                            <Row>
                                <Button variant="secondary">
                                    <EuroIcon/>
                                </Button>
                            </Row>

                            <Card.Img variant="top" src={prezzi} alt="Prezzi"/>
                            <br/>

                            <Card.Text>
                                <p style={{fontStyle:"italic"}}>La nostra attenzione per le tariffe ci differenzia dai nostri concorrenti. Ci impegnamo per avere i prezzi più competitivi sul mercato.</p>
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>  
                        <Card.Body>  
                            <Card.Title style={{textAlign:"center", color:"black"}}>NOI</Card.Title>
                                <Row>
                                    <Button variant="secondary">
                                        <GroupIcon/>
                                    </Button>
                                </Row>    
                            <Card.Img variant="top"src={team}  alt="Team"/>
                            <br/>
                            <Card.Text>
                                    Il nostro gruppo e' stato creato da quattro studenti universitari nell'Anno Accademico 2020/21
                            </Card.Text>
                        </Card.Body>
                    </Card>

                    <Card>
                        <Card.Body>
                            <Card.Title style={{textAlign:"center", color:"black"}}>I NOSTRI SERVIZI</Card.Title>
                            <Row>
                                <Button variant="secondary">
                                    <EmojiTransportationIcon/>
                                </Button>
                            </Row>

                            <Card.Img variant="top" src={mezzi} alt="Mezzi"/>
                            <br/>
                            <Card.Text>
                                Ti proponiamo anche un'ampia scelta di auto, moto, biciclette e monopattini a noleggio.
                                Potrai muoverti ovunque tu voglia.
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Row>
            <br/>
        </div>
    );
}

export default SuDiNoi;