import React from "react"
import {Container,Row,Col,Button,Card,ListGroup,ListGroupItem} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {} from "../../Actions/prenotazioni";
import Autovettura from '../../Images/AutovetturaVeicolo.jpeg';
import Moto from '../../Images/MotoVeicolo.jpg';
import Bicicletta from '../../Images/BiciclettaVeicolo.jpeg';
import Monopattino from '../../Images/MonopattinoVeicolo.jpeg';

function ModPrenotazioneVeicolo (){
    
    const ListaVeicoli = useSelector ((state) => state.Prenotazioni.listaVeicoli);
    const dispatch = useDispatch();

    const aggiornaVeicolo = (idVeicolo) => {

    }
    
    if (ListaVeicoli.length==0) {
        return (
        <div>            
            <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                <br/>
                <h1>Scegli il nuovo veicolo per la prenotazione</h1> <br/><br/>
                <p>Non ci sono veicoli disponbili</p>
            </Container>
        </div>
        )
    } else {
        switch (ListaVeicoli[0].tipoVeicolo){
            case "Autovettura":
                return (
                    <div>            
                        <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                            <br/>
                            <h3>Scegli l'auto che preferisci</h3>
                            <br/>
                            <Row>
                                {ListaVeicoli.map((veicolo)=>(
                                <Col>
                                    <Card style={{ width: '18rem', backgroundColor: "rgb(214, 214, 214)"}} border="secondary">
                                        <Card.Img variant="top" src={Autovettura} alt="immagine"/>
                                        <Card.Body>
                                            <Card.Title>Descrizione:</Card.Title>
                                            <Card.Text>
                                                {veicolo.descrizione}
                                            </Card.Text>
                                            <ListGroup className="list-group-flush" style={{marginBottom:"10px"}}>
                                                <ListGroupItem variant="light">Modello: {veicolo.modello} <br/> Marca: {veicolo.marca}</ListGroupItem>
                                                <ListGroupItem variant="light">Cilindrata: {veicolo.cilindrata} <br/> N Posti: {veicolo.nPosti} <br/> N Porte: {veicolo.nPorte}</ListGroupItem>
                                                <ListGroupItem variant="light">Prezzo Festivo: {veicolo.prezzoFestivo}€ <br/> Prezzo Feriale: {veicolo.prezzoFeriale}€</ListGroupItem>
                                                <ListGroupItem variant="warning">Fuori Stallo: {veicolo.viaFuoriStallo=="" ? "No" : veicolo.viaFuoriStallo}</ListGroupItem>
                                            </ListGroup>
                                            <Button variant="secondary" onClick={()=>aggiornaVeicolo(veicolo._id)}>Seleziona</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                ))}
                            </Row>
                            <br/>
                        </Container>
                    </div>
                );
                break;
            case "Moto":
                return (
                    <div>            
                        <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                            <br/>
                            <h3>Scegli la moto che preferisci</h3>
                            <br/>
                            <Row>
                                {ListaVeicoli.map((veicolo)=>(
                                <Col>
                                    <Card style={{ width: '18rem', backgroundColor: "rgb(214, 214, 214)"}} border="secondary">
                                        <Card.Img variant="top" src={Moto} alt="immagine" />
                                        <Card.Body>
                                            <Card.Title>Descrizione:</Card.Title>
                                            <Card.Text>
                                                {veicolo.descrizione}
                                            </Card.Text>
                                            <ListGroup className="list-group-flush" style={{marginBottom:"10px"}}>
                                                <ListGroupItem variant="light">Modello: {veicolo.modello} <br/> Marca: {veicolo.marca}</ListGroupItem>
                                                <ListGroupItem variant="light">Cilindrata: {veicolo.cilindrata}</ListGroupItem>
                                                <ListGroupItem variant="light">Prezzo Festivo: {veicolo.prezzoFestivo}€ <br/> Prezzo Feriale: {veicolo.prezzoFeriale}€</ListGroupItem>
                                                <ListGroupItem variant="warning">Fuori Stallo: {veicolo.viaFuoriStallo=="" ? "No" : veicolo.viaFuoriStallo}</ListGroupItem>                                    </ListGroup>
                                            <Button variant="secondary" onClick={()=>aggiornaVeicolo(veicolo._id)}>Seleziona</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                ))}
                            </Row>
                            <br/>
                        </Container>
                    </div>
                );
                break;
            case "Bicicletta":
                return (
                    <div>            
                        <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                            <br/>
                            <h3>Scegli la bicicletta che preferisci</h3>
                            <br/>
                            <Row>
                                {ListaVeicoli.map((veicolo)=>(
                                <Col>
                                    <Card  style={{ width: '18rem', backgroundColor: "rgb(214, 214, 214)"}} border="secondary">
                                        <Card.Img variant="top" src={Bicicletta} alt="immagine" />
                                        <Card.Body>
                                            <Card.Title>Descrizione:</Card.Title>
                                            <Card.Text>
                                                {veicolo.descrizione}
                                            </Card.Text>
                                            <ListGroup className="list-group-flush" style={{marginBottom:"10px"}}>
                                                <ListGroupItem variant="light">Prezzo Festivo: {veicolo.prezzoFestivo}€ <br/> Prezzo Feriale: {veicolo.prezzoFeriale}€</ListGroupItem>
                                                <ListGroupItem variant="warning">Fuori Stallo: {veicolo.viaFuoriStallo=="" ? "No" : veicolo.viaFuoriStallo}</ListGroupItem>                                </ListGroup>
                                            <Button variant="secondary" onClick={()=>aggiornaVeicolo(veicolo._id)}>Seleziona</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                ))}
                            </Row>
                            <br/>
                        </Container>
                    </div>
                );
                break;
            default:
                return (
                    <div>            
                        <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                            <br/>
                            <h3>Scegli il monopattino che preferisci</h3>
                            <br/>
                            <Row>
                                {ListaVeicoli.map((veicolo)=>(
                                <Col>
                                    <Card style={{ width: '18rem', backgroundColor: "rgb(214, 214, 214)"}} border="secondary" >
                                        <Card.Img variant="top" src={Monopattino} alt="immagine" />
                                        <Card.Body>
                                            <Card.Title>Descrizione:</Card.Title>
                                            <Card.Text>
                                                {veicolo.descrizione}
                                            </Card.Text>
                                            <ListGroup className="list-group-flush " style={{marginBottom:"10px", background:"white"}}>
                                                <ListGroupItem variant="light">Prezzo Festivo: {veicolo.prezzoFestivo}€ <br/> Prezzo Feriale: {veicolo.prezzoFeriale}€</ListGroupItem>
                                                <ListGroupItem variant="warning">Fuori Stallo: {veicolo.viaFuoriStallo=="" ? "No" : veicolo.viaFuoriStallo}</ListGroupItem>
                                            </ListGroup>
                                            <Button variant="secondary" onClick={()=>aggiornaVeicolo(veicolo._id)}>Seleziona</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                                ))}
                            </Row>
                            <br/>
                        </Container>
                    </div>
                );
                break;
        }
    }
}

export default ModPrenotazioneVeicolo