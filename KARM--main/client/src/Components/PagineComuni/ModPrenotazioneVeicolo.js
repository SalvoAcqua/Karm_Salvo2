import React from "react";
import {Container,Row,Col,Button,Card,ListGroup,ListGroupItem} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {completaNuovoVeicolo} from "../../Actions/prenotazioni";
import Autovettura from '../../Images/AutovetturaVeicolo.jpeg';
import Moto from '../../Images/MotoVeicolo.jpg';
import Bicicletta from '../../Images/BiciclettaVeicolo.jpeg';
import Monopattino from '../../Images/MonopattinoVeicolo.jpeg';

function ModPrenotazioneVeicolo (){
    
    const [showCard,setShowCard] = useState({show: false, veicolo: {}});
    const ListaVeicoli = useSelector ((state) => state.Prenotazioni.listaVeicoli);
    const Prenotazione = useSelector ((state) => state.Prenotazioni.prenotazione);
    const user = useSelector ((state) => state.utenti.utente);
    const dispatch = useDispatch();
    
    const completaModifica = (idPrenotazione, idVeicolo, sovrapprezzo) => {
        if (Prenotazione.idAutista!=undefined && Prenotazione.idAutista!="") {
            //notifica per l'autista
        }
        //Notifica per il cliente
        let Dati = {idPrenotazione: idPrenotazione, idVeicolo: idVeicolo, sovrapprezzo: sovrapprezzo};
        dispatch(completaNuovoVeicolo(Dati));
        if (user.ruolo=="Admin") {
            window.location.href='/SchermataPrenotazioniAdmin';
        } else {
            window.location.href='/SchermataPrenotazioniCliente';
        }
    }
    
    var Prezzo = 0
    const prezzoDaPagare = (feriale,festivo) => {
        let data = new Date(Prenotazione.dataPartenza);
        do {
            if(data.getDay()==0 || data.getDay()==6){
                Prezzo += Number(festivo);
            } else {
                Prezzo += Number(feriale);
            }
            data.setDate(data.getDate()+1)
        } while(data<=new Date(Prenotazione.dataArrivo));
        return Prezzo;
    }
    
    if (showCard.show) {
        let Sovrapprezzo = prezzoDaPagare(showCard.veicolo.prezzoFeriale,showCard.veicolo.prezzoFestivo) - Prenotazione.prezzo;
        return (
            <div >
                <Container>
                    <Card className="card" style={{width: '100%', backgroundColor: "rgb(214, 214, 214)" }}>
                        <Card.Body>
                            <Card.Title>Riepilogo Modifica</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Tipo Veicolo: {showCard.veicolo.tipoVeicolo}</ListGroupItem>
                            <ListGroupItem>Modello : {showCard.veicolo.modello==undefined ? "//" : showCard.veicolo.modello}</ListGroupItem>
                            <ListGroupItem>Marca : {showCard.veicolo.marca==undefined ? "//" : showCard.veicolo.marca}</ListGroupItem>
                            <ListGroupItem>Cilindrata : {showCard.veicolo.cilindrata==undefined ? "//" : showCard.veicolo.cilindrata}</ListGroupItem>
                            <ListGroupItem>Targa : {showCard.veicolo.targa==undefined ? "//" : showCard.veicolo.targa}</ListGroupItem>
                            <ListGroupItem>Descrizione: {showCard.veicolo.descrizione}</ListGroupItem>
                            <ListGroupItem variant="primary">Sovrapprezzo da pagare: {Sovrapprezzo>0 ? Sovrapprezzo : "0"}€</ListGroupItem>  
                        </ListGroup>
                        <Button variant="secondary" onClick={()=>completaModifica(Prenotazione._id, showCard.veicolo._id, Sovrapprezzo)}>Avanti</Button>
                        <br/>
                    </Card>
                </Container>
            </div>
        );
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
                                            <Button variant="secondary" onClick={()=>setShowCard({...showCard, show: true, veicolo: veicolo})}>Seleziona</Button>
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
                                            <Button variant="secondary" onClick={()=>setShowCard({...showCard, show: true, veicolo: veicolo})}>Seleziona</Button>
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
                                            <Button variant="secondary" onClick={()=>setShowCard({...showCard, show: true, veicolo: veicolo})}>Seleziona</Button>
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
                                            <Button variant="secondary" onClick={()=>setShowCard({...showCard, show: true, veicolo: veicolo})}>Seleziona</Button>
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