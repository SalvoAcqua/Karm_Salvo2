import {React} from "react";
import {Container,Row,Col, Button, Modal, ModalBody, Alert} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getListaDipendenti, removeEmployee} from '../../Actions/admin'
import DeleteIcon from '@material-ui/icons/Delete';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

function SchermataVisualizzaDipendenti () {
    const [confermaEliminazione,setConfermaEliminazione] = useState({show:false, dipendente:{}});
    const err = useSelector((state)=>state.errori.error);
    const listaDipendenti = useSelector((state)=>state.AccountAdmin.listaDipendenti);
    const dispatch = useDispatch();

    const deleteEmployee = (dipendente) => {
        const dati = {dipendente: dipendente};
        dispatch(removeEmployee(dati));
    }
    
    useEffect( ()=>{
        dispatch(getListaDipendenti());
    },[])
    
    return(
        <div>
            <Container className="container pag" style={{marginTop:"20px"}}>
                <Modal show={confermaEliminazione.show} onHide={()=>setConfermaEliminazione({...confermaEliminazione, show:false})} centered backdrop="static">
                    <Modal.Header >
                             <Modal.Title>Sei sicuro di voler eliminare questo dipendente?</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                            <Row>
                                <div style={{ background: "white", border:"1px dotted", marginBottom:"10px"}}>
                                    <span>{confermaEliminazione.dipendente.ruolo} : {confermaEliminazione.dipendente.nome} {confermaEliminazione.dipendente.cognome}</span> <br/>
                                    <span>Codice Fiscale : {confermaEliminazione.dipendente.CF}</span>
                                </div>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="success" onClick={()=>deleteEmployee(confermaEliminazione.dipendente)}>Conferma</Button>
                                </Col>      
                                <Col>
                                    <Button variant="danger" onClick={()=>{setConfermaEliminazione({...confermaEliminazione, show:false}); window.location.reload()}}>Annulla</Button>
                                </Col>
                                <br/><br/>
                            </Row>
                            <Row>
                                <Alert show={err.rimozioneAutista!=undefined} variant="danger">
                                    <Alert.Heading>Errore!</Alert.Heading>
                                        <span> L'account dell'autista selezionato non può essere rimosso.</span> <br/>
                                        <span> Assicurati che non ci siano delle prenotazioni associate a questo profilo</span> <br/>
                                </Alert>
                            </Row>
                    </ModalBody>
                </Modal>

                <Row>
                    <Button variant="outline-secondary" onClick={()=>{window.location.href='/GestioneAmministrazione'}}>
                            <ArrowLeftRoundedIcon/>Indietro
                    </Button>
                </Row>
                <br/>

                <br/>
                <h3>Dipendenti</h3>
                
                <Row  style={{marginTop:"20px"}}>
                    <Button variant="secondary" size="lg" href="/InserisciDipendente">
                        Inserisci dipendente
                    </Button>
                </Row>
                <br/>
                <Row>
                    <Col> 
                        <Table striped bordered hover size="sm" responsive>
                        <thead>
                                <tr>
                                <th>Ruolo</th>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Sesso</th>
                                <th>Data di Nascita</th>
                                <th>Provincia di Nascita</th>
                                <th>Luogo di Nascita</th>
                                <th>Codice Fiscale</th>
                                <th>Numero Patente</th>
                                <th>Parcheggio Associato</th>
                                <th>E-mail </th>
                                <th></th>
                                </tr>
                        </thead>
                        <tbody>
                            {listaDipendenti.length==0 ? 
                                <tr> 
                                    <td> Non ci sono Dipendenti registrati</td>
                                </tr> : listaDipendenti.map((dipendente) => (
                                <tr>
                                    <td>{dipendente.ruolo}</td>
                                    <td>{dipendente.nome}</td>
                                    <td>{dipendente.cognome}</td>
                                    <td>{dipendente.sesso}</td>
                                    <td>{dipendente.dataNascita.slice(0,10)}</td>
                                    <td>{dipendente.provinciaNascita}</td>
                                    <td>{dipendente.luogoNascita}</td>
                                    <td>{dipendente.CF.toUpperCase()}</td>
                                    <td>{dipendente.numeroPatente==undefined ? "//" : dipendente.numeroPatente}</td>
                                    <td>{dipendente.nomeParcheggio==undefined ? "//" : dipendente.nomeParcheggio}</td>
                                    <td>{dipendente.email}</td>
                                    <td>
                                        <Button variant="secondary" onClick={()=>setConfermaEliminazione({...confermaEliminazione, show:true, dipendente:dipendente})}>
                                            <DeleteIcon/>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row  style={{marginTop:"20px"}}>
                    <Button variant="secondary" size="lg" href="/InserisciDipendente">
                        Inserisci dipendente
                    </Button>
                </Row>
            </Container>
        </div>
    )
}

export default SchermataVisualizzaDipendenti