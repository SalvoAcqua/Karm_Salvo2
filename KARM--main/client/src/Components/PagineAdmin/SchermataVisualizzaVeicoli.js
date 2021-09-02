import React from "react"
import {Container,Row,Col,Button,Modal,ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getListaVeicoli, getListaParcheggiDisp, changePark, removeVehicle, reactivate, blockVehicle} from "../../Actions/admin";
import Table from 'react-bootstrap/Table';
import classnames from "classnames";
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import SettingsBackupRestoreIcon from '@material-ui/icons/SettingsBackupRestore';
import TimeToLeaveIcon from '@material-ui/icons/TimeToLeave';
import DeleteIcon from '@material-ui/icons/Delete';

function SchermataVisualizzaVeicoli (){
    const [confermaEliminazione,setConfermaEliminazione] = useState({show:false,veicolo:{}});
    const [showErrEliminazione,setShowErrEliminazione] = useState(false);
    const [modificaParcheggio,setModificaParcheggio] = useState({show:false,veicolo:{}});
    const [parcheggio,setParcheggio] = useState("");
    const [showErrRiattivazione,setShowErrRiattivazione] = useState(false);
    const [confermaBlocca,setConfermaBlocca] = useState({show:false,veicolo:{}});
    const [showErrBlocca,setShowErrBlocca] = useState(false);
    const listaVeicoli = useSelector((state)=>state.AccountAdmin.listaVeicoli);
    const listaParcheggiDisp = useSelector((state)=>state.AccountAdmin.listaParcheggiDisp);
    const dispatch = useDispatch();
    
    const deleteVehicle = (veicolo) => {
        const dati = {veicolo: veicolo};
        dispatch(removeVehicle(dati));
    }
    
    const clickModificaParcheggio = (veicolo) => {
        setModificaParcheggio({...modificaParcheggio, show:true, veicolo:veicolo});
        let Veicolo = {tipo: veicolo.tipo};
        dispatch(getListaParcheggiDisp(Veicolo));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if (parcheggio!=""){
            let dati={veicolo:modificaParcheggio.veicolo, nuovoParcheggio:parcheggio};
            dispatch(changePark(dati));
        }
    }

    const clickRiattivazione = (veicolo) => {
        const dati = {id: veicolo._id};
        dispatch(reactivate(dati));
    }

    const clickBlockVehicle = (veicolo) => {
        const dati = {veicolo: veicolo};
        dispatch(blockVehicle(dati));
    }
    
    useEffect(()=>{
        dispatch(getListaVeicoli());
    },[])

    return (
        <div>
            <Container className="container" style={{marginTop:"20px", textAlign:"center"}}>
                <Modal show={showErrEliminazione || showErrRiattivazione || showErrBlocca} onHide={()=>{setShowErrEliminazione(false); setShowErrRiattivazione(false); setShowErrBlocca(false)}} centered backdrop="static">
                    <Modal.Header closeButton>
                            <Modal.Title style={{color:"red"}}>Errore</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <h1 style={{color:"red"}}>Non puoi {showErrEliminazione ? "rimuovere" : (showErrRiattivazione ? "riattivare" : "bloccare")}  questo veicolo!</h1>
                        <p style={{color:"red"}}>Assicurati che lo stato del veicolo {showErrEliminazione||showErrRiattivazione ? "sia Non Attivo, in caso blocca il veicolo" : "sia Libero"}</p>
                    </ModalBody>
                </Modal>

                <Modal show={confermaBlocca.show} onHide={()=>setConfermaBlocca({...confermaBlocca, show:false})} centered backdrop="static">
                    <Modal.Header >
                             <Modal.Title>Sei sicuro di voler bloccare questo veicolo?</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                            <Row>
                                <p>{confermaBlocca.veicolo.tipo} di {confermaBlocca.veicolo.parcAssociato}</p>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="success" onClick={()=>clickBlockVehicle(confermaBlocca.veicolo)}>Conferma</Button>
                                </Col>
                                <Col>
                                    <Button variant="danger" onClick={()=>setConfermaBlocca({...confermaBlocca, show:false})}>Annulla</Button>
                                </Col>
                            </Row>
                    </ModalBody>
                </Modal>

                <Modal show={confermaEliminazione.show} onHide={()=>setConfermaEliminazione({...confermaEliminazione, show:false})} centered backdrop="static">
                    <Modal.Header >
                             <Modal.Title>Vuoi eliminare questo veicolo?</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                            <Row>
                                <p>{confermaEliminazione.veicolo.tipo} di {confermaEliminazione.veicolo.parcAssociato}</p>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="success" onClick={()=>deleteVehicle(confermaEliminazione.veicolo)}>Conferma</Button>
                                </Col>
                                    
                                <Col>
                                    <Button variant="danger" onClick={()=>setConfermaEliminazione({...confermaEliminazione, show:false})}>Annulla</Button>
                                </Col>
                            </Row>
                    </ModalBody>
                </Modal>

                <Modal show={modificaParcheggio.show} onHide={()=>setModificaParcheggio({...modificaParcheggio, show:false})} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Seleziona il nuovo parcheggio</Modal.Title>
                    </Modal.Header>
                    <ModalBody>
                        <form onSubmit={onSubmit}>
                            <Row>
                                <div style={{backgroundColor:"#dcdcdc", marginBottom:"10px", border:"solid"}}>
                                    <label class="h6">Verranno mostrati soltanto i parcheggi disponibili in base alla capienza</label>
                                </div>
                            </Row>
                            <br/>
                            <Row>
                                <select type="text" id="parcheggio" name="parcheggio" onChange={(e)=>setParcheggio(e.target.value)} title="Seleziona il parcheggio in cui si trova il veicolo"> <br/>
                                    <option value="" selected disabled>Parcheggio</option>
                                    {listaParcheggiDisp.length==0 ? <option value="-1" disabled>Nessun parcheggio disponibile</option> :
                                    listaParcheggiDisp.map((parcheggio)=>{
                                        if(parcheggio.nome!=modificaParcheggio.veicolo.parcAssociato){
                                            return (<option value={parcheggio._id}>{parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico}</option>)
                                        }
                                    }
                                    )}
                                </select>
                                <span className={classnames({'green-convalid':parcheggio!="", 'red-convalid':parcheggio==""})}> {parcheggio=="" ? "Seleziona il parcheggio" : "OK"} </span>
                                <br/><br/>
                            </Row>
                            <Row>
                                <Button variant="secondary" type="submit">
                                    Avanti
                                </Button>
                            </Row>
                        </form>
                    </ModalBody>
                </Modal>

                <Row  style={{marginTop:"20px"}}>
                    <Col>
                        <div style={{backgroundColor:"#dcdcdc", marginBottom:"10px", border:"solid"}}>
                            <label>In caso di veicoli fuori stallo, verrà mostrata la via nei Parcheggi Associati</label>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Button variant="secondary" size="lg" href="/InserisciVeicolo">
                        Inserisci veicolo
                    </Button>
                </Row>
                <br/>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                <th>Tipo</th>    
                                <th>Modello</th>
                                <th>Marca</th>
                                <th>Cilindrata</th>
                                <th>N.Posti</th>
                                <th>N.Porte</th>
                                <th>Targa</th>
                                <th>Parcheggio Associato</th>
                                <th>Stato</th>
                                <th>Prezzo Festivo</th>
                                <th>Prezzo Feriale</th>
                                <th style={{color:"orange"}}>Blocca</th>
                                <th style={{color:"green"}}>Riattiva</th>
                                <th style={{color:"blue"}}>Modifica Parcheggio</th>
                                <th style={{color:"red"}}>Rimuovi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaVeicoli.length==0 ? 
                                    <tr> 
                                        <td> Non ci sono veicoli registrati</td>
                                    </tr> : listaVeicoli.map((veicolo) => (
                                    <tr>
                                        <td>{veicolo.tipo}</td>
                                        <td>{veicolo.modello!=undefined ? veicolo.modello : "//"}</td>
                                        <td>{veicolo.marca!=undefined ? veicolo.marca : "//"}</td>
                                        <td>{veicolo.cilindrata!=undefined ? veicolo.cilindrata : "//"}</td>
                                        <td>{veicolo.posti!=undefined ? veicolo.posti : "//"}</td>
                                        <td>{veicolo.porte!=undefined ? veicolo.porte : "//"}</td>
                                        <td>{veicolo.targa!=undefined ? veicolo.targa : "//"}</td>
                                        <td>{veicolo.viaFuoriStallo!="" ? veicolo.viaFuoriStallo : veicolo.parcAssociato}</td>
                                        <td>{veicolo.stato}</td>
                                        <td>{veicolo.prFestivo}</td>
                                        <td>{veicolo.prFeriale}</td>
                                        <td>
                                            <Button variant="secondary" onClick={()=>veicolo.stato=="Libero" ? setConfermaBlocca({...confermaBlocca, show:true, veicolo:veicolo}) : setShowErrBlocca(true)}>
                                                <NotInterestedIcon/>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="secondary" onClick={()=>veicolo.stato=="Non Attivo" ? clickRiattivazione(veicolo) : setShowErrRiattivazione(true)}>
                                                <SettingsBackupRestoreIcon/>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="secondary" onClick={()=>clickModificaParcheggio(veicolo)}>
                                                <TimeToLeaveIcon/>
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="secondary" onClick={()=> veicolo.stato=="Non Attivo" ? setConfermaEliminazione({...confermaEliminazione, show:true, veicolo:veicolo}) : setShowErrEliminazione(true)}>
                                                <DeleteIcon/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                        </Table>
                    </Col>
                </Row>
                <Row>
                    <Button variant="secondary" size="lg" href="/InserisciVeicolo">
                        Inserisci veicolo
                    </Button>
                </Row>
                <br/>
            </Container>
        </div>
    )
}

export default SchermataVisualizzaVeicoli