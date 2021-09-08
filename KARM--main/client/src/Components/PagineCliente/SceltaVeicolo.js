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

    var Prezzo = 0
    const prezzoDaPagare = (feriale,festivo) => {
        let data = new Date(nuovaPrenotazione.prenotazione.dataPa);
        do {
            if(data.getDay()==0 || data.getDay()==6){
                Prezzo += Number(festivo);
            } else {
                Prezzo += Number(feriale);
            }
            data.setDate(data.getDate()+1)
        } while(data<=new Date(nuovaPrenotazione.prenotazione.dataArr));
        return Prezzo;
    }

    const prenota = async (idVeicolo) =>  {
         let feriale = 0;
         let festivo = 0;
         let viaFuoriStallo = "";
        nuovaPrenotazione.listaVeicoli.map((veicolo)=>{
            if(veicolo._id==idVeicolo){
                feriale=veicolo.prezzoFeriale;
                festivo=veicolo.prezzoFestivo;
                viaFuoriStallo=veicolo.viaFuoriStallo=='' ? "" : veicolo.viaFuoriStallo;
            } 
        });
        nuovaPrenotazione.prenotazione.prezzo=prezzoDaPagare(feriale,festivo);
        if(nuovaPrenotazione.prenotazione.autista==true){
            nuovaPrenotazione.prenotazione.cliente=utente._id;
            nuovaPrenotazione.prenotazione.veicolo=idVeicolo;
            dispatch(addPrenotazione(nuovaPrenotazione.prenotazione));
        } else {
            nuovaPrenotazione.prenotazione.prezzoFeriale=feriale;
            nuovaPrenotazione.prenotazione.prezzoFestivo=festivo;
            nuovaPrenotazione.prenotazione.veicolo=idVeicolo;
            nuovaPrenotazione.prenotazione.viaFuoriStallo=viaFuoriStallo;
            await dispatch(newInformation(nuovaPrenotazione.prenotazione)).then(()=>{
                window.location.href="/SceltaParcheggi"
            })
            
        }
    }

    useEffect(()=>{
        dispatch(listVehicle(nuovaPrenotazione.prenotazione));
    },[])

    switch(nuovaPrenotazione.prenotazione.tipoVeicolo){
        case "Autovettura":
        return(
            <div>
                <Container class="container profilo">
                    <br/>
                    <h3>Scegli l'auto che preferisci</h3>
                    <br/>

                    <Row>
                        {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
                            <Col>
                            <Card style={{ width: '18rem', backgroundColor: "rgb(214, 214, 214)"}} border="secondary">
                            <Card.Img variant="top" src={Autovettura} alt="immagine" />
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
                                <Button variant="secondary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        ))}
                </Row>
                <br/>
                </Container>
            </div>
        )
        case "Moto":
            return(
                <div>
                    <Container class="container profilo">

                        <br/>
                        <h3>Scegli la moto che preferisci</h3>
                        <br/>

                        <Row>
                            {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
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
                                    <Button variant="secondary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                                </Card.Body>
                                </Card>
                            </Col>
                            ))}
                    </Row>
                    <br/>
                    </Container>
                </div>
            )
        case "Bicicletta":
            return (
                <div>
                <Container class="container profilo">
                    <br/>
                    <h3>Scegli la bicicletta che preferisci</h3>
                    <br/>

                    <Row>
                        {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
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
                                <Button variant="secondary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                <br/>
                </Container>
            </div>
            )
        default:
            //MONOPATTINO
            return (
                <div>
                <Container class="container profilo">

                    <br/>
                    <h3>Scegli il monopattino che preferisci</h3>
                    <br/>

                    <Row>
                        {nuovaPrenotazione.listaVeicoli.map((veicolo)=>(
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
                                <Button variant="secondary" onClick={()=>prenota(veicolo._id)}>Seleziona</Button>
                            </Card.Body>
                            </Card>
                        </Col>
                        ))}
                    </Row>
                    <br/>
                </Container>
            </div>
            )
    }
} 

export default SceltaVeicolo
