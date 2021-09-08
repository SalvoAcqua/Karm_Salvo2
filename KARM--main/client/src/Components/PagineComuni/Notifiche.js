import React from "react"
import {Container,Row,Col,Button,Toast,Alert,Modal,ModalBody,Card,ListGroup,ListGroupItem} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {accettaCorsa, completaOperazione, rifiutaCorsa, rifiutaModifica,getTariffe} from '../../Actions/prenotazioni'
import {prendiNotifiche, eliminaNotifiche, modificaAccettata} from '../../Actions/notifiche'
import {convertiData, convertiDataEuropa, getOra} from '../gestioneDateTime';
import ModalHeader from "react-bootstrap/esm/ModalHeader";

function Notifiche(){
    const notifiche = useSelector((state)=>state.Notifiche.notifiche)
    const idUtente = useSelector((state)=>state.utenti.utente._id);
    const [showEliminaNotifica, setShowElimina] = useState({state:false,idNotifica:''})
    const [showAccettaCorsa,setShowAccCorsa]= useState({show:false,dati:''});
    const [showAccettaModifica,setShowAccModifica] = useState({show:false,dati:''})
    const [showCompleta,setShowCompleta] = useState({show:false,dati:''});
    const [showCompletaModifica,setShowCompletaModifica] = useState({show:false,dati:'',prezzo:0});
    const Err = useSelector((state)=>state.errori.error);
    const dispatch = useDispatch();

    var Tariffe={};
    var Prezzo = 0
    const prezzoDaPagare = (feriale,festivo,Prenotazione) => {
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
    };
    
    useEffect(()=>{
        dispatch(prendiNotifiche({_id:idUtente}))
    },[])

    const EliminaNotifica = async (idNotifica) => {
        await dispatch(eliminaNotifiche({idNotifica:idNotifica}))
        window.location.reload();
    }

    const AccettaCorsa = (idPrenotazione) =>{
        dispatch(accettaCorsa({idAutista:idUtente,idPrenotazione:idPrenotazione})).then(()=>{setShowAccCorsa({...showAccettaCorsa,show:false});}).catch((err)=>{
            
        })
    }

    const AccettaModifica = () =>{
    //showAccettaModifica.dati.idPrenotazione, e dati.datiti = {};
        dispatch(modificaAccettata({idPrenotazione:showAccettaModifica.dati.idPrenotazione,dati:showAccettaModifica.dati})).then(()=>{window.location.reload();}).catch((err)=>{
            
        })
    }

    const RifiutaModifica = () =>{
        dispatch(rifiutaModifica({idPrenotazione:showAccettaModifica.dati.idPrenotazione, idAutista:idUtente}))
    }
    
    const CompletaOperazione = (idPrenotazione) =>{
        dispatch(completaOperazione({idPrenotazione:idPrenotazione})).then(()=>{
            window.location.href="/SchermataRiepilogo"
        })
    }

    const RifiutaCorsa = (idPrenotazione) => {
        dispatch(rifiutaCorsa({idPrenotazione:idPrenotazione,idAutista:idUtente}))
    }

    const mostra = (notifica) =>{
        switch(notifica.tipo){
            case "cliente":
                return (
                <div style={{display:"flex", justifyContent:"center", marginTop:"15px"}}>
                <Toast show={true} style={{ maxWidth: "900px" }}>
                    <Toast.Header closeButton={false}>
                    <strong>Notifica</strong>
                    </Toast.Header>
                    <Toast.Body>{notifica.messaggio}</Toast.Body>
                    <Button onClick={()=>setShowElimina({show:true,idNotifica:notifica._id})} variant="danger">Elimina</Button>
                </Toast>
                </div>
                )
            case "autista":
                return(
                <div style={{display:"flex", justifyContent:"center", marginTop:"15px"}}>
                <Toast show={true} style={{ maxWidth: "900px" }}>
                    <Toast.Header closeButton={false}>
                    <strong>Notifica</strong>
                    </Toast.Header>
                    <Toast.Body>{notifica.messaggio}</Toast.Body>
                    <Button onClick={()=>setShowElimina({show:true,idNotifica:notifica._id})} variant="danger">Elimina</Button>
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
            case "completaCorsa":
                return(
                    <div style={{display:"flex", justifyContent:"center", marginTop:"7px", marginBottom:"7px"}}>
                    <a className="block" onClick={()=>{setShowCompleta({...showCompleta,show:true,dati:notifica})}}>
                    <Toast show={true} style={{ maxWidth: "900px" }}>
                        <Toast.Header closeButton={false}>
                        <strong>Notifica</strong>
                        </Toast.Header>
                        <Toast.Body>{notifica.messaggio}</Toast.Body>
                    </Toast>
                    </a>
                </div>
                )
            case "completaModifica":
                let Tariffe={};
                dispatch(getTariffe({idVeicolo: notifica.idVeicolo})).then((res)=>{
                    Tariffe={prFestivo: res.prFestivo, prFeriale: res.prFeriale};
                })
                let Sovrapprezzo = prezzoDaPagare(Tariffe.prFeriale, Tariffe.prFestivo, notifica.dati) - notifica.prezzo;
                return(
                    <div style={{display:"flex", justifyContent:"center", marginTop:"7px", marginBottom:"7px"}}>
                    <a className="block" onClick={()=>{setShowCompletaModifica({...showCompletaModifica,show:true,dati:notifica.dati,prezzo:Sovrapprezzo})}}>
                    <Toast show={true} style={{ maxWidth: "900px" }}>
                        <Toast.Header closeButton={false}>
                        <strong>Notifica</strong>
                        </Toast.Header>
                        <Toast.Body>{notifica.messaggio}</Toast.Body>
                    </Toast>
                    </a>
                </div>
                )
            case "accettaModifica":
                return(
                    <div style={{display:"flex", justifyContent:"center", marginTop:"7px", marginBottom:"7px"}}>
                    <a className="block" onClick={()=>{setShowAccModifica({...showAccettaModifica,show:true,dati:notifica})}}>
                    <Toast show={true} style={{ maxWidth: "900px" }}>
                        <Toast.Header closeButton={false}>
                        <strong>Notifica</strong>
                        </Toast.Header>
                        <Toast.Body>{notifica.messaggio}</Toast.Body>
                    </Toast>
                    </a>
                </div>
                )
                
            default:
                return(<div>..</div>)
        }
    }
    
    return(
        <div class="container notifiche">
            <Container >
            <Alert show={Err.accettata!=undefined} variant="danger">
                    <Alert.Heading>Siamo spiacenti!</Alert.Heading>
                    <p>Un autista ha già accettato questa prenotazione.</p><br/>
            </Alert>

            <Modal show={showEliminaNotifica.show} onHide={()=>setShowElimina({...showEliminaNotifica, show:false})} centered backdrop="static">
                    <ModalBody>
                        <Modal.Header >
                             <Modal.Title>Sei sicuro di voler eliminare questa notifica?</Modal.Title>
                         </Modal.Header>
                        <Container>
                            <br/>
                            <Row>
                                <Col>
                                    <Button variant="success" onClick={()=>{EliminaNotifica(showEliminaNotifica.idNotifica)}}>Conferma</Button>{' '}
                                </Col>
                                    
                                <Col>
                                    <Button variant="danger" onClick={()=>setShowElimina({...showEliminaNotifica, show:false})}>Annulla</Button>{' '}
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>

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
                    <Button variant="success" onClick={()=>{AccettaCorsa(showAccettaCorsa.dati.idPrenotazione)}}>Accetta</Button>{' '}
                </Col>
                                    
                <Col>
                    <Button variant="danger" onClick={()=>{RifiutaCorsa(showAccettaCorsa.dati.idPrenotazione)}}>Rifiuta</Button>{' '}
                </Col>
                </Row>
                </Row>
        
                        </Container>
                    </ModalBody>
                </Modal>

                <Modal show={showAccettaModifica.show} onHide={()=>{setShowAccModifica({...showAccettaModifica,show:false})}} centered backdrop="static">
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
                        <ListGroupItem>Date e ora Partenza : {convertiDataEuropa(new Date(showAccettaModifica.dati.dataPartenza))}, {showAccettaModifica.dati.oraPartenza}</ListGroupItem>
                        <ListGroupItem>Data e ora Arrivo : {convertiDataEuropa(new Date(showAccettaModifica.dati.dataArrivo))}, {showAccettaModifica.dati.oraArrivo}<br/></ListGroupItem>
                        <ListGroupItem>Via Partenza: {showAccettaModifica.dati.viaPartenza}<br/></ListGroupItem>
                        <ListGroupItem>Via Destinazione: {showAccettaModifica.dati.viaDestinazione}<br/></ListGroupItem>
                    </ListGroup>
                    <br/>
                </Card>
                <Row>
                <Col>
                    <Button variant="success" onClick={()=>{AccettaModifica(showAccettaModifica.dati)}}>Accetta</Button>{' '}
                </Col>
                                    
                <Col>
                    <Button variant="danger" onClick={()=>{RifiutaModifica(showAccettaModifica.dati)}}>Rifiuta</Button>{' '}
                </Col>
                </Row>
                </Row>
        
                        </Container>
                    </ModalBody>
                </Modal>

                <Modal show={showCompleta.show} onHide={()=>{setShowCompleta({...showCompleta,show:false})}} centered backdrop="static">
                    <ModalBody>
                        <ModalHeader closeButton>
                            <Modal.Title>
                                Completa la tua operazione, e preparati a partire con KARM!
                            </Modal.Title>
                        </ModalHeader>
                        <Row>
                            <Col>
                                <Button onClick={()=>{CompletaOperazione(showCompleta.dati.idPrenotazione)}}>
                                    Completa operazione
                                </Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>

                <Modal show={showCompletaModifica.show} onHide={()=>{setShowCompletaModifica({...showCompletaModifica,show:false})}} centered backdrop="static">
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
                                        <ListGroupItem>Date e ora Partenza : {convertiDataEuropa(new Date(showCompletaModifica.dati.dataPartenza))}, {showCompletaModifica.dati.oraPartenza}</ListGroupItem>
                                        <ListGroupItem>Data e ora Arrivo : {convertiDataEuropa(new Date(showCompletaModifica.dati.dataArrivo))}, {showCompletaModifica.dati.oraArrivo}<br/></ListGroupItem>
                                        <ListGroupItem>Via Partenza: {showCompletaModifica.dati.viaPartenza}<br/></ListGroupItem>
                                        <ListGroupItem>Via Destinazione: {showCompletaModifica.dati.viaDestinazione}<br/></ListGroupItem>
                                        <ListGroupItem variant="primary">Sovrapprezzo da pagare: {showCompletaModifica.prezzo>0 ? showCompletaModifica.prezzo : "0"}€</ListGroupItem>
                                    </ListGroup>
                                    <br/>
                                </Card>
                                <Row>
                                    <Col>
                                        <Button variant="success" onClick={()=>{}}>Completa Operazione</Button>{' '}
                                    </Col>
                                </Row>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>

                <br/>
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