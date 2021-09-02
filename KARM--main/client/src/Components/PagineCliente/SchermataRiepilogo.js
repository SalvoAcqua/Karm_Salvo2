import React from 'react';
import {Container,Row,Col, Button, Card, ListGroupItem, ListGroup, Modal, ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMetodoDiPagamento } from "../../Actions/utenti";
import {addPrenotazione} from "../../Actions/prenotazioni"
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import classnames from "classnames";
import {convertiData} from '../gestioneDateTime';

function SchermataRiepilogo() {
    const nuovaPrenotazione = useSelector((state)=>state.Prenotazioni);
    const [numeroCarta,setNumeroCarta] = useState('')
    const [dati,setDati] = useState({numeroCarta:'',intestatario:'',dataScadenza:'', cvv:''})
    const [errNumeroCarta,setErrNumeroCarta] = useState(true);
    const [errIntestatario,setErrIntestatario] = useState(true);
    const [errCvv,setErrCvv] = useState(true);
    const user = useSelector((state)=>state.utenti.utente);
    const [showPagamento,setShowPagamento] = useState(false);
    const [showMetodo,setShowMetodo] = useState(false);
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
                email: user.email,
                numeroCarta: dati.numeroCarta,
                intestatario : dati.intestatario,
                dataScadenza: dati.dataScadenza,
                cvv: dati.cvv
                
            }
            dispatch(addMetodoDiPagamento(newMethod))
            window.location.reload();
        }
    }

    const closePagamento = () =>{
        var select=document.getElementsByTagName("select")[0];
        select.removeAttribute("selected");
        select.options[0].selected=true;
        setShowPagamento(false)
        setNumeroCarta('')
    }


    var Prezzo = 0
    const prezzoDaPagare = () => {
        let data = new Date(nuovaPrenotazione.prenotazione.dataPa);
        do {
            if(data.getDay()==0 || data.getDay()==6){
                Prezzo += Number(nuovaPrenotazione.prenotazione.prezzoFestivo);
            } else {
                Prezzo += Number(nuovaPrenotazione.prenotazione.prezzoFeriale);
            }
            data.setDate(data.getDate()+1)
        } while(data<=new Date(nuovaPrenotazione.prenotazione.dataArr));
        return Prezzo;
    }
    useEffect(()=>{
        console.log(nuovaPrenotazione.prenotazione)
    },[])

    const pagaOra = () =>{
        if(numeroCarta!=''){
            nuovaPrenotazione.prenotazione.numeroCarta = numeroCarta;
            nuovaPrenotazione.prenotazione.statoPrenotazione = "completa";
            nuovaPrenotazione.prenotazione.viaDestinazione = "";
            nuovaPrenotazione.prenotazione.prezzo = Prezzo;
            dispatch(addPrenotazione(nuovaPrenotazione.prenotazione));
        }
    }

    const cambiaModal = () =>{
            setShowPagamento(false);
            setShowMetodo(true);
    }
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
    return(
        <div>
            <Container>
                <Modal show={showPagamento} onHide={()=>closePagamento()} centered backdrop="static">
                    <ModalBody>
                        <Modal.Header closeButton>
                            <Modal.Title>
                               Scegli come vuoi pagare
                            </Modal.Title>
                        </Modal.Header>
                        <fieldset className="fieldstyle">
                            <select type="text" id="metodo" name="metodo" onChange={(e)=>setNumeroCarta(e.target.value)} title="Scegli il metodo con cui pagare" required>
                                <option value="" disabled selected>Metodi di Pagamento</option>
                                {listaMetodiPag.length==0 ? 
                                <option value="" disabled selected>Non hai metodi di pagamento</option> :
                                listaMetodiPag.map((metodo) =>(
                                <option value={metodo.numeroCarta}>Numero:{metodo.numeroCarta}- Intestatario:{metodo.intestatario}</option>
                                ))} 
                            </select> <br/>
                            <span className={classnames({'red-convalid':numeroCarta=='', 'green-convalid':numeroCarta!=''})}>{numeroCarta=='' ? "Seleziona un metodo di pagamento" : "OK"} </span>
                        </fieldset><br/>
                        <Row>
                            <Col> 
                            <Button onClick={()=>cambiaModal()}>Inserisci nuovo metodo</Button>
                            </Col>
                            <Col>
                             <Button variant="success" onClick={()=>pagaOra()}>Paga ora</Button>
                            </Col>
                        </Row>
                    </ModalBody>
                </Modal>
                <Modal show={showMetodo} onHide={()=>setShowMetodo(false)} centered backdrop="static">
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
                        <ListGroupItem variant="primary">Prezzo da pagare: {prezzoDaPagare()}€</ListGroupItem>  
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