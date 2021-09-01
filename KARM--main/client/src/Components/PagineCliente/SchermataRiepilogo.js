import React from 'react';
import {Container,Row,Col, Button, Card, ListGroupItem, ListGroup, Modal, ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getMetodiDiPagamento, removeMetodoDiPagamento, addMetodoDiPagamento } from "../../Actions/utenti";
import ModalHeader from 'react-bootstrap/esm/ModalHeader';

function SchermataRiepilogo() {
    const nuovaPrenotazione = useSelector((state)=>state.Prenotazioni);
    const user = useSelector((state)=>state.utenti.utente);
    const [showPagamento,setShowPagamento] = useState(false);
    const [showMetodo,setShowMetodo] = useState(false);
    const listaMetodiPag = useSelector((state)=>state.AccountCliente.listaMetodi);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getMetodiDiPagamento(user.email));
    },[])
    return(
        <div>
            <Container>
                <Modal show={showPagamento} onHide={()=>setShowPagamento(false)} centered backdrop="static">
                    <ModalBody>
                        <Modal.Header>
                            <Modal.Title>

                            </Modal.Title>
                        </Modal.Header>
                    </ModalBody>
                </Modal>
                <Row>
                <Card className="card" style={{width: '60%', backgroundColor: "rgb(214, 214, 214)" }}>
                    <Card.Body>
                        <Card.Title>Riepilogo Prenotazione</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Tipo Veicolo: {nuovaPrenotazione.prenotazione.tipoVeicolo}</ListGroupItem>
                        <ListGroupItem>Date e ora Partenza : {nuovaPrenotazione.prenotazione.dataPa.slice(0,10)}, {nuovaPrenotazione.prenotazione.oraPa}</ListGroupItem>
                        <ListGroupItem>Data e ora Arrivo : {nuovaPrenotazione.prenotazione.dataArr.slice(0,10)}, {nuovaPrenotazione.prenotazione.oraArr}<br/></ListGroupItem>
                        <ListGroupItem>Parcheggio Consegna : {nuovaPrenotazione.prenotazione.datiParcheggioConsegna.nome}- {nuovaPrenotazione.prenotazione.datiParcheggioConsegna.indirizzo},{nuovaPrenotazione.prenotazione.datiParcheggioConsegna.nCivico}<br/></ListGroupItem>
                        <ListGroupItem>Parcheggio Rilascio : {nuovaPrenotazione.prenotazione.datiParcheggioRilascio.nome}- {nuovaPrenotazione.prenotazione.datiParcheggioRilascio.indirizzo},{nuovaPrenotazione.prenotazione.datiParcheggioRilascio.nCivico} <br/></ListGroupItem>
                        <ListGroupItem>Presenza Autista: No <br/></ListGroupItem>
                    </ListGroup>
                    <br/>
                </Card>
                </Row>
                <Row>
                    <Button size="lg" variant="success" onClick={()=>setShowPagamento(true)}>Procedi al Pagamento</Button>
                </Row>
                
            </Container>
        </div>
    )
}

export default SchermataRiepilogo