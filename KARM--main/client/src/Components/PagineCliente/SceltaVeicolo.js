import React from "react";
import {Container,Row,Col, Button, Card, ListGroup, ListGroupItem} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {listVehicle} from '../../Actions/prenotazioni'
import Bicicletta from '../../Images/BiciclettaVeicolo.jpeg'
import Monopattino from '../../Images/MonopattinoVeicolo.jpeg'
import Autovettura from '../../Images/AutovetturaVeicolo.jpeg'
import Moto from '../../Images/MotoVeicolo.jpg'
import {addPrenotazione, newInformation} from '../../Actions/prenotazioni';

function SceltaVeicolo(){
    const nuovaPrenotazione = useSelector((state)=>state.Prenotazioni);
    const utente = useSelector((state)=>state.utenti.utente)
    const dispatch = useDispatch();

    const prenota = (idVeicolo) =>{
        if(nuovaPrenotazione.prenotazione.autista==true){
            nuovaPrenotazione.prenotazione.cliente=utente._id;
            nuovaPrenotazione.prenotazione.veicolo=idVeicolo;
            dispatch(addPrenotazione(nuovaPrenotazione.prenotazione));
        } else {
            nuovaPrenotazione.prenotazione.veicolo=idVeicolo;
            dispatch(newInformation(nuovaPrenotazione.prenotazione));
        }
    }

    useEffect(()=>{
        dispatch(listVehicle(nuovaPrenotazione.prenotazione));
    },[])

    switch(nuovaPrenotazione.prenotazione.tipoVeicolo){
        case "Autovettura":
        return(
            <div>
                <Container>
                    <Row>
                {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
                    <Col>
                    <Card style={{ width: '20rem' }} bg="light" border="info">
                    <Card.Img variant="top" src={Autovettura} alt="immagine" />
                    <Card.Body>
                        <Card.Title>Descrizione:</Card.Title>
                        <Card.Text>
                            {veicolo.descrizione}
                        </Card.Text>
                        <ListGroup className="list-group-flush" style={{marginBottom:"10px"}}>
                            <ListGroupItem variant="info">Modello: {veicolo.modello} - Marca: {veicolo.marca}</ListGroupItem>
                            <ListGroupItem variant="info">Cilindrata: {veicolo.cilindrata} - Nposti: {veicolo.nPosti} - Nporte: {veicolo.nPorte}</ListGroupItem>
                            <ListGroupItem variant="info">Prezzo Festivo: {veicolo.prezzoFestivo}€ - Prezzo Feriale : {veicolo.prezzoFeriale}€</ListGroupItem>
                        </ListGroup>
                        <Button variant="primary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
                </Row>
                </Container>
            </div>
        )
        case "Moto":
            return(
                <div>
                    <Container>
                        <Row>
                    {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
                        <Col>
                        <Card style={{ width: '18rem' }} bg="light" border="info">
                        <Card.Img variant="top" src={Moto} alt="immagine" />
                        <Card.Body>
                            <Card.Title>Descrizione:</Card.Title>
                            <Card.Text>
                                {veicolo.descrizione}
                            </Card.Text>
                            <ListGroup className="list-group-flush" style={{marginBottom:"10px"}}>
                                <ListGroupItem variant="info">Modello: {veicolo.modello} - Marca: {veicolo.marca}</ListGroupItem>
                                <ListGroupItem variant="info">Cilindrata: {veicolo.cilindrata}</ListGroupItem>
                                <ListGroupItem variant="info">Prezzo Festivo: {veicolo.prezzoFestivo}€ - Prezzo Feriale : {veicolo.prezzoFeriale}€</ListGroupItem>
                            </ListGroup>
                            <Button variant="primary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                        </Card.Body>
                        </Card>
                    </Col>
                    ))}
                    </Row>
                    </Container>
                </div>
            )
        case "Bicicletta":
            return (
                <div>
                <Container>
                    <Row>
                {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
                    <Col>
                    <Card style={{ width: '18rem' }} bg="light" border="info">
                    <Card.Img variant="top" src={Bicicletta} alt="immagine" />
                    <Card.Body>
                        <Card.Title>Descrizione:</Card.Title>
                        <Card.Text>
                            {veicolo.descrizione}
                        </Card.Text>
                        <ListGroup className="list-group-flush" style={{marginBottom:"10px"}}>
                            <ListGroupItem variant="info">Prezzo Festivo: {veicolo.prezzoFestivo}€ - Prezzo Feriale : {veicolo.prezzoFeriale}€</ListGroupItem>
                        </ListGroup>
                        <Button variant="primary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
                </Row>
                </Container>
            </div>
            )
        default:
            return (
                <div>
                <Container>
                    <Row>
                {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
                    <Col>
                    <Card style={{ width: '18rem' }} bg="light" border="info">
                    <Card.Img variant="top" src={Monopattino} alt="immagine" />
                    <Card.Body>
                        <Card.Title>Descrizione:</Card.Title>
                        <Card.Text>
                            {veicolo.descrizione}
                        </Card.Text>
                        <ListGroup className="list-group-flush" style={{marginBottom:"10px"}}>
                            <ListGroupItem variant="info">Prezzo Festivo: {veicolo.prezzoFestivo}€ - Prezzo Feriale : {veicolo.prezzoFeriale}€</ListGroupItem>
                        </ListGroup>
                        <Button variant="primary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                    </Card.Body>
                    </Card>
                </Col>
                ))}
                </Row>
                </Container>
            </div>
            )
    }
} 

export default SceltaVeicolo
