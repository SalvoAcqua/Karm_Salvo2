import {React} from "react";
import {Container,Row,Col, Button,Modal,ModalBody,Alert} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getListaParcheggi,addParcheggio} from '../../Actions/admin'
import classnames from "classnames";

function SchermataVisualizzaParcheggi () {
    const listaParcheggi = useSelector((state)=>state.AccountAdmin.listaParcheggi);
    const errore = useSelector((state)=>(state.errori.error));
    const [show,setShow] = useState(false);
    const [dati,setDati] = useState({nome:'',indirizzo:'',nCivico:'',capienzaAuto:'',capienzaMoto:'',capienzaBici:'',capienzaMonopattini:''})
    const [err,setErr] = useState({capienzaAuto:true,capienzaMoto:true,capienzaBici:true,capienzaMonopattini:true});
    const dispatch = useDispatch();

    const onSubmit = (event) =>{
        event.preventDefault();
        const newParcheggio = {...dati,
                            autoPresenti:0,
                            motoPresenti:0,
                            biciPresenti:0,
                            monopattiniPresenti:0
                        };
        dispatch(addParcheggio(newParcheggio))
    }

    useEffect(()=>{
        dispatch(getListaParcheggi());
    },[]);

    useEffect(()=>{
        if(dati.capienzaAuto=="" || dati.capienzaAuto<0){
            setErr({...err,capienzaAuto:true});
        }else{
            setErr({...err,capienzaAuto:false});
        }
    },[dati.capienzaAuto]);

    useEffect(()=>{
        if(dati.capienzaMoto=="" || dati.capienzaMoto<0){
            setErr({...err,capienzaMoto:true});
        }else{
            setErr({...err,capienzaMoto:false});
        }
    },[dati.capienzaMoto]);

    useEffect(()=>{
        if(dati.capienzaBici=="" || dati.capienzaBici<0){
            setErr({...err,capienzaBici:true});
        }else{
            setErr({...err,capienzaBici:false});
        }
    },[dati.capienzaBici]);

    useEffect(()=>{
        if(dati.capienzaMonopattini=="" || dati.capienzaMonopattini<0){
            setErr({...err,capienzaMonopattini:true});
        }else{
            setErr({...err,capienzaMonopattini:false});
        }
    },[dati.capienzaMonopattini]);
   
    return(
        <div>
            <Modal show={show} onHide={()=>setShow(false)} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci i dati del parcheggio</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <form onSubmit={onSubmit}>
                                <Row>
                                    <Col>
                                    <label htmlFor="text">Nome Parcheggio</label><br/>
                                    <input name="nome" id="nome" type="text" onChange={(e)=>setDati({...dati,nome:e.target.value})} required/> <br/>
                                    <span className={classnames({'red-convalid':dati.nome=='', 'green-convalid':dati.nome!=''})}> {dati.nome=='' ? "Inserisci il nome" : "OK"}</span>
                                    <br/>
                                </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="text">Indirizzo Parcheggio</label><br/>
                                        <input name="indirizzo" id="indirizzo" type="text" onChange={(e)=>setDati({...dati,indirizzo:e.target.value.toUpperCase()})} required/> <br/>
                                        <span className={classnames({'red-convalid':dati.indirizzo=='', 'green-convalid':dati.indirizzo!=''})}> {dati.indirizzo=='' ? "Inserisci l'indirizzo" : "OK"}</span>

                                        <br/>
                                    </Col>
                                    <Col>
                                        <label htmlFor="text">Numero civico</label><br/>
                                        <input name="nCivico" id="nCivico" type="text" size="5" onChange={(e)=>setDati({...dati,nCivico:e.target.value})} required/> <br/>
                                        <span className={classnames({'red-convalid':dati.nCivico=='', 'green-convalid':dati.nCivico!=''})}> {dati.nCivico=='' ? "Inserisci il numero civico" : "OK"}</span>
                                        <br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="text">Capienza Auto</label><br/>
                                        <input name="capienzaAuto" id="capienzaAuto" type="number" size="5" min="0" onChange={(e)=>setDati({...dati,capienzaAuto:e.target.value})} required/> <br/>
                                        <span className={classnames({'red-convalid':err.capienzaAuto, 'green-convalid':!err.capienzaAuto})}> {err.capienzaAuto && dati.capienzaAuto=='' ? "Inserisci la capienza" : (err.capienzaAuto ? "Numero non valido" : "OK")}</span>
                                        <br/>
                                    </Col>
                                    <Col>
                                        <label htmlFor="text">Capienza Moto</label><br/>
                                        <input name="capienzaMoto" id="capienzaMoto" type="number" size="5" min="0" onChange={(e)=>setDati({...dati,capienzaMoto:e.target.value})} required/> <br/>
                                        <span className={classnames({'red-convalid':err.capienzaMoto, 'green-convalid':!err.capienzaMoto})}> {err.capienzaMoto && dati.capienzaMoto=='' ? "Inserisci la capienza" : (err.capienzaMoto ? "Numero non valido" : "OK")}</span>
                                        <br/>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <label htmlFor="text">Capienza Bici</label><br/>
                                        <input name="capienzaBici" id="capienzaBici" type="number" size="5" min="0" onChange={(e)=>setDati({...dati,capienzaBici:e.target.value})} required/> <br/>
                                        <span className={classnames({'red-convalid':err.capienzaBici, 'green-convalid':!err.capienzaBici})}> {err.capienzaBici && dati.capienzaBici=='' ? "Inserisci la capienza" : (err.capienzaBici ? "Numero non valido" : "OK")}</span>
                                        <br/>
                                    </Col>
                                    <Col>
                                        <label htmlFor="text">Capienza Monopattino</label><br/>
                                        <input name="capienzaMonopattini" id="capienzaMonopattini" type="number" size="5" min="0" onChange={(e)=>setDati({...dati,capienzaMonopattini:e.target.value})} required/> <br/>
                                        <span className={classnames({'red-convalid':err.capienzaMonopattini, 'green-convalid':!err.capienzaMonopattini})}> {err.capienzaMonopattini && dati.capienzaMonopattini=='' ? "Inserisci la capienza" : (err.capienzaMonopattini ? "Numero non valido" : "OK")}</span>
                                        <br/>
                                    </Col>
                                </Row>
                                <Button type="submit" variant="secondary">
                                Inserisci
                                </Button>
                            </form>
                        </Row>
                        <Row>
                            <Alert show={errore.parcheggio!=undefined} variant="danger">
                                <Alert.Heading>Errore!</Alert.Heading>
                                    <p>
                                        {errore.parcheggio}
                                    </p>
                            </Alert>
                        </Row>
                    </Container> 
                 </Modal.Body>
             </Modal> 
            <Container style={{marginTop:"20px"}}>
                <Row style={{marginTop:"20px"}}>
                    <Col style={{display:"flex", justifyContent:"end"}}>
                        <Button onClick={()=>setShow(true)}>
                            Inserisci un nuovo parcheggio
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col> 
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                <th>Nome</th>
                                <th>Indirizzo</th>
                                <th>N.civico</th>
                                <th>Posti auto occupati</th>
                                <th>Posti moto occupati</th>
                                <th>Posti bici occupati</th>
                                <th>Posti monopattini occupati</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaParcheggi.length==0 ? 
                                <tr> 
                                    <td> Non ci sono Parcheggi registrati</td>
                                </tr> : listaParcheggi.map((parcheggio) => (
                                <tr>
                                    <td>{parcheggio.nome}</td>
                                    <td>{parcheggio.indirizzo}</td>
                                    <td>{parcheggio.nCivico}</td>
                                    <td>{parcheggio.autoPresenti}/{parcheggio.capienzaAuto}</td>
                                    <td>{parcheggio.motoPresenti}/{parcheggio.capienzaMoto}</td>
                                    <td>{parcheggio.biciPresenti}/{parcheggio.capienzaBici}</td>
                                    <td>{parcheggio.monopattiniPresenti}/{parcheggio.capienzaMonopattini}</td>
                                </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default SchermataVisualizzaParcheggi





