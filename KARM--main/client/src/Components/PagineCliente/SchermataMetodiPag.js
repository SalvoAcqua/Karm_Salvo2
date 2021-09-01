import React from "react"
import {Container,Row,Col,Button,Modal,ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { getMetodiDiPagamento, removeMetodoDiPagamento, addMetodoDiPagamento } from "../../Actions/utenti";
import Table from 'react-bootstrap/Table'
import classnames from "classnames";
import DeleteIcon from '@material-ui/icons/Delete';
import {convertiData} from '../gestioneDateTime';

function SchermataMetodiPag (){
    const [confermaEliminazione,setConfermaEliminazione] = useState({show:false, id:'',numeroCarta:''});
    const [show,setShow] = useState(false);
    const [dati,setDati] = useState({numeroCarta:'',intestatario:'',dataScadenza:'', cvv:''})
    const [errNumeroCarta,setErrNumeroCarta] = useState(true);
    const [errIntestatario,setErrIntestatario] = useState(true);
    const [errCvv,setErrCvv] = useState(true);
    const [errDataScadenza,setErrDataScadenza] = useState(true)
    const emailUtente = useSelector((state)=>state.utenti.utente.email);
    const listaMetodiPag = useSelector((state)=>state.AccountCliente.listaMetodi);
    const dispatch = useDispatch();
    const patternNumber = /^[0-9]+$/;
    const patternAlfa = /[0-9]/;

    var today=convertiData(new Date());

    const onSubmit = (event) =>{
        event.preventDefault();
        let controlla = false;
        if(errNumeroCarta==true || errIntestatario==true || errCvv==true) {
            controlla = true;
        }
        if (controlla==false){
            const newMethod = {
                email: emailUtente,
                numeroCarta: dati.numeroCarta,
                intestatario : dati.intestatario,
                dataScadenza: dati.dataScadenza,
                cvv: dati.cvv
            }
            dispatch(addMetodoDiPagamento(newMethod))
        }
    }

    useEffect(()=>{
        const datiEmail = {email: emailUtente}
        dispatch(getMetodiDiPagamento(datiEmail));
    },[]);

    useEffect(()=>{
        if(patternNumber.test(dati.numeroCarta) && (dati.numeroCarta.length==13 || dati.numeroCarta.length==16 )){ 
            setErrNumeroCarta(false);       
        } else{
            setErrNumeroCarta(true);  
        }
    },[dati.numeroCarta])
    useEffect(()=>{
        if(!patternAlfa.test(dati.intestatario) && dati.intestatario!=''){ 
            setErrIntestatario(false);       
        } else{
            setErrIntestatario(true);  
        }
    },[dati.intestatario])
    useEffect(()=>{
        if(patternNumber.test(dati.cvv) && dati.cvv.length==3){ 
            setErrCvv(false);       
        } else{
            setErrCvv(true);  
        }
    },[dati.cvv])

    /*useEffect(()=>{
        if(dati.dataScadenza!=''){
            setErrDataScadenza(false);
        } else{
            setErrDataScadenza(true);
        }
    },[dati.dataScadenza])*/

    const deleteMethod = (idCarta) => {
        const datiCarta = {id: idCarta}
        dispatch(removeMetodoDiPagamento(datiCarta));
    }


    return (
        <div className="container pag">
            <Container >
                <Modal show={confermaEliminazione.show} onHide={()=>setConfermaEliminazione({...confermaEliminazione, show:false})} centered backdrop="static">
                    <ModalBody>
                        <Modal.Header >
                             <Modal.Title>Sei sicuro di voler eliminare questo metodo?</Modal.Title>
                         </Modal.Header>
                        <Container>
                            <br/>
                            <Row>
                                <Col>
                                 <p> N.Carta: {confermaEliminazione.numeroCarta}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <Button variant="success" onClick={()=>{deleteMethod(confermaEliminazione.id)}}>Conferma</Button>{' '}
                                </Col>
                                    
                                <Col>
                                    <Button variant="danger" onClick={()=>setConfermaEliminazione({...confermaEliminazione, show:false})}>Annulla</Button>{' '}
                                </Col>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>

                <Modal show={show} onHide={()=>setShow(false)} centered backdrop="static">
                    <Modal.Header closeButton>
                        <Modal.Title>Inserisci i dati della carta</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row>
                                <form onSubmit={onSubmit}>
                                    <label htmlFor="number">Numero Carta</label><br/>
                                    <input name="numeroCarta" id="numeroCarta" type="text" onChange={(e)=>setDati({...dati,numeroCarta:e.target.value})} required/> <span style={{color:"blue"}}>{dati.numeroCarta.startsWith(3) ? "American Express" : (dati.numeroCarta.startsWith(4) ? "Visa" : (dati.numeroCarta.startsWith(5) ? "MasterCard" : (dati.numeroCarta.startsWith(6)? "Discover Card" : "")))}</span>
                                    <br/>
                                    <span className={classnames({'red-convalid':errNumeroCarta, 'green-convalid':!errNumeroCarta})}> {dati.numeroCarta=='' ? "Inserisci il numero della carta" : (errNumeroCarta ? "Il numero di carta deve avere 13 o 16 numeri" : "OK")}</span>
                                    <br/>
                                    <label htmlFor="text">Intestatario </label> <br/>
                                    <input name="intestatario" id="intestatario" type="text"  onChange={(e)=>setDati({...dati,intestatario:e.target.value})}  
                                                required/>
                                    <br />
                                    <span className={classnames({'red-convalid':errIntestatario, 'green-convalid':!errIntestatario})}> {dati.intestatario=='' ? "Inserisci l'intestatario" : (errIntestatario ? "L'intestatario non deve contenere numeri " : "OK")}</span>
                                    <br /> 
                                    <label htmlFor="number">CVV </label> <br/>
                                    <input name="cvv" id="cvv" type="text" minLength="3" maxLength="3" onChange={(e)=>setDati({...dati,cvv:e.target.value})}  
                                                required/>
                                    <br />
                                    <span className={classnames({'red-convalid':errCvv, 'green-convalid':!errCvv})}> {dati.cvv=='' ? "Inserisci il codice identificativo" : (errCvv ? "Il codice identificativo deve contenere 3 numeri" : "OK")}</span>
                                    <br /> 
                                    <br/>
                                    <label htmlFor="date">Data di scadenza </label> <br/>
                                    <input name="dataScadenza" id="dataScadenza" min={today} type="date" onChange={(e)=>setDati({...dati,dataScadenza:e.target.value})}  
                                                required/>
                                    <br />
                                    <span className={classnames({'green-convalid':dati.dataScadenza!='', 'red-convalid':dati.dataScadenza==''})}> {dati.dataScadenza=='' ? "Inserisci la tua data di Nascita" : "OK"} </span>
                                    <br /> 
                                    <br/>
                                    <Button type="submit" variant="secondary">
                                    Inserisci
                                    </Button>
                                </form>
                            </Row>
                        </Container> 
                    </Modal.Body>
                </Modal>

                <Row style={{marginTop:"20px"}}>
                    <Button variant="secondary" size="lg" onClick={()=>setShow(true)}>
                        Inserisci Nuovo Metodo di Pagamento
                    </Button>
                </Row>
                
                <br/>
                <h5>Metodi di Pagamento</h5>
                <br/>

                <Row>
                    <Col>
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                <th>N.Carta</th>
                                <th>Intestatario</th>
                                <th>Data Scadenza</th>
                                <th>CVV</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaMetodiPag.length==0 ? 
                                    <tr> 
                                        <td> Non hai metodi di pagamento</td>
                                    </tr> : listaMetodiPag.map((metodoPag) => (
                                    <tr>
                                        <td>{metodoPag.numeroCarta}</td>
                                        <td>{metodoPag.intestatario}</td>
                                        <td>{metodoPag.dataScadenza.slice(0,10)}</td>
                                        <td>{metodoPag.CVV}</td>
                                        <td>
                                            <Button variant="secondary" onClick={()=>setConfermaEliminazione({show:true, id:metodoPag._id,numeroCarta:metodoPag.numeroCarta})}>
                                                <DeleteIcon/>
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

                <Row style={{marginTop:"20px"}}>
                    <Button variant="secondary" size="lg" onClick={()=>setShow(true)}>
                        Inserisci Nuovo Metodo di Pagamento
                    </Button>
                </Row>
                <br/>
            </Container>
        </div>
    )
}

export default SchermataMetodiPag