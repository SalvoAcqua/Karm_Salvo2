import React from "react"
import {Container,Row,Col,Button,Toast,Alert,Modal,ModalBody,Card,ListGroup,ListGroupItem} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {prendiNotifiche} from '../../Actions/notifiche'
import {convertiData, convertiDataEuropa} from '../gestioneDateTime';

function Notifiche(){
    const notifiche = useSelector((state)=>state.Notifiche.notifiche)
    const idUtente = useSelector((state)=>state.utenti.utente._id);
    const [showAccettaCorsa,setShowAccCorsa]= useState({show:false,dati:''});
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(prendiNotifiche({_id:idUtente}))
    },[])

    const mostra = (notifica) =>{
        switch(notifica.tipo){
            case "cliente" :
                return (
                <div style={{display:"flex", justifyContent:"center", marginTop:"15px"}}>
                <Toast show={true} style={{ maxWidth: "900px" }}>
                    <Toast.Header closeButton={false}>
                    <strong>Notifica</strong>
                    </Toast.Header>
                    <Toast.Body>{notifica.messaggio}</Toast.Body>
                </Toast>
                </div>
                )
            case "accettaCorsa":
                return(
                <div style={{display:"flex", justifyContent:"center", marginTop:"7px", marginBottom:"7px"}}>
                    <a className="block" onClick={()=>{setShowAccCorsa({...showAccettaCorsa,show:true,dati:notifica})}}>
                    <Toast show={true} style={{ maxWidth: "900px" }}>
                        <Toast.Header closeButton={false}>
                        <strong>Notifica</strong>
                        </Toast.Header>
                        <Toast.Body>{notifica.nome}{notifica.cognome} ha richiesto una corsa!</Toast.Body>
                    </Toast>
                    </a>
                </div>
                )
                break;
            default:
                return(<div>ciao</div>)
        }
    }

    return(
        <div>
            <Container>

            <Modal show={showAccettaCorsa.show} onHide={()=>{setShowAccCorsa({...showAccettaCorsa,show:false})}} centered backdrop="static">
                    <ModalBody>
                        <Modal.Header closeButton >
                             <Modal.Title>Riepilogo</Modal.Title>
                         </Modal.Header>
                        <Container>

                <Row>
                <Card className="card" style={{width: '60%', backgroundColor: "rgb(214, 214, 214)" }}>
                    <Card.Body>
                        <Card.Title>Riepilogo Prenotazione</Card.Title>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>Date e ora Partenza : {convertiDataEuropa(new Date(showAccettaCorsa.dati.dataPartenza))}, {showAccettaCorsa.dati.oraPartenza}</ListGroupItem>
                        <ListGroupItem>Data e ora Arrivo : {convertiDataEuropa(new Date(showAccettaCorsa.dati.dataArrivo))}, {showAccettaCorsa.dati.oraArrivo}<br/></ListGroupItem>
                        <ListGroupItem>Via Partenza: {showAccettaCorsa.dati.viaPartenza}<br/></ListGroupItem>
                        <ListGroupItem>Via Destinazione: {showAccettaCorsa.dati.viaDestinazione}<br/></ListGroupItem>
                    </ListGroup>
                    <br/>
                </Card>
                <Row>
                <Col>
                    <Button variant="success">Accetta</Button>{' '}
                </Col>
                                    
                <Col>
                    <Button variant="danger">Rifiuta</Button>{' '}
                </Col>
                </Row>
                </Row>
        
                        </Container>
                    </ModalBody>
                </Modal>


                {notifiche.length==0 ?  
                    <Alert variant="warning">
                        Non hai nessuna notifica!
                    </Alert> : notifiche.map((notifica)=>(
                        mostra(notifica)
                    ))}
            </Container>
        </div>
    )
}

export default Notifiche;