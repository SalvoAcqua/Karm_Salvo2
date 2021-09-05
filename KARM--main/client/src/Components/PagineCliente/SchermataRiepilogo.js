import React from 'react';
import {Container,Row,Col, Button, Card, ListGroupItem, ListGroup, Modal, ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addMetodoDiPagamento } from "../../Actions/utenti";
import {addPrenotazione, pagaAutista} from "../../Actions/prenotazioni"
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import classnames from "classnames";
import {convertiData, convertiDataEuropa} from '../gestioneDateTime';


function SchermataRiepilogo() {
    const nuovaPrenotazione = useSelector((state)=>state.Prenotazioni);
    const [numeroCarta,setNumeroCarta] = useState('')
    const [displayMancia,setDisplayMancia] = useState('none')
    const [dati,setDati] = useState({numeroCarta:'',intestatario:'',dataScadenza:'', cvv:'',mancia:''})
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

    useEffect(()=>{
        if(nuovaPrenotazione.prenotazione.autista==true){
            setDisplayMancia('block')  
        }
    },[])

    const mostra = () =>{
        if(nuovaPrenotazione.prenotazione.autista==false){
            return(
                <Row>             
                    <Card className="card" style={{width: '100%', backgroundColor: "rgb(214, 214, 214)" }}>
                        <Card.Body>
                            <Card.Title>Riepilogo Prenotazione</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Tipo Veicolo: {nuovaPrenotazione.prenotazione.tipoVeicolo}</ListGroupItem>
                            <ListGroupItem>Date e ora Partenza : {convertiDataEuropa(new Date(nuovaPrenotazione.prenotazione.dataPa))}, {nuovaPrenotazione.prenotazione.oraPa}</ListGroupItem>
                            <ListGroupItem>Data e ora Arrivo : {convertiDataEuropa(new Date(nuovaPrenotazione.prenotazione.dataArr))}, {nuovaPrenotazione.prenotazione.oraArr}<br/></ListGroupItem>
                            <ListGroupItem>Consegna : {(nuovaPrenotazione.prenotazione.viaFuoriStallo=!'') ? nuovaPrenotazione.prenotazione.viaFuoriStallo : (nuovaPrenotazione.prenotazione.datiParcheggioConsegna.nome - nuovaPrenotazione.prenotazione.datiParcheggioConsegna.indirizzo,nuovaPrenotazione.prenotazione.datiParcheggioConsegna.nCivico)}<br/></ListGroupItem>
                            <ListGroupItem>Rilascio : {nuovaPrenotazione.prenotazione.datiParcheggioRilascio.nome}- {nuovaPrenotazione.prenotazione.datiParcheggioRilascio.indirizzo},{nuovaPrenotazione.prenotazione.datiParcheggioRilascio.nCivico} <br/></ListGroupItem>
                            <ListGroupItem>Presenza Autista: No <br/></ListGroupItem>
                            <ListGroupItem variant="primary">Prezzo da pagare: {nuovaPrenotazione.prenotazione.prezzo}€</ListGroupItem>  
                        </ListGroup>
                        <br/>
                    </Card>
                </Row>
            )
        } else{
            return(
                <Row>             
                    <Card className="card" style={{width: '100%', backgroundColor: "rgb(214, 214, 214)" }}>
                        <Card.Body>
                            <Card.Title>Riepilogo Prenotazione</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Tipo Veicolo: Autovettura</ListGroupItem>
                            <ListGroupItem>Date e ora Partenza : {convertiDataEuropa(new Date(nuovaPrenotazione.prenotazione.dataPa))}, {nuovaPrenotazione.prenotazione.oraPa}</ListGroupItem>
                            <ListGroupItem>Data e ora Arrivo : {convertiDataEuropa(new Date(nuovaPrenotazione.prenotazione.dataArr))}, {nuovaPrenotazione.prenotazione.oraArr}<br/></ListGroupItem>
                            <ListGroupItem>Via Partenza : {nuovaPrenotazione.prenotazione.indirizzoPa}<br/></ListGroupItem>
                            <ListGroupItem>Via Destinazione : {nuovaPrenotazione.prenotazione.indirizzoArr} <br/></ListGroupItem>
                            <ListGroupItem>Presenza Autista: SI <br/></ListGroupItem>
                            <ListGroupItem variant="primary">Prezzo da pagare: {nuovaPrenotazione.prenotazione.prezzo}€</ListGroupItem>  
                        </ListGroup>
                        <br/>
                    </Card>
                </Row>
            )

        }
    }




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
            dispatch(addMetodoDiPagamento(newMethod)).then(()=>{
                window.location.reload();
            })
            
        }
    }

    const closePagamento = () =>{
        var select=document.getElementsByTagName("select")[0];
        select.removeAttribute("selected");
        select.options[0].selected=true;
        setShowPagamento(false)
        setNumeroCarta('')
    }


    const pagaOra = () =>{
        if(numeroCarta!=''){
            if(nuovaPrenotazione.prenotazione.autista==false){
            nuovaPrenotazione.prenotazione.numeroCarta = numeroCarta;
            nuovaPrenotazione.prenotazione.statoPrenotazione = "completa";
            nuovaPrenotazione.prenotazione.viaDestinazione = "";
            dispatch(addPrenotazione(nuovaPrenotazione.prenotazione));
            } else {
                nuovaPrenotazione.prenotazione.numeroCarta = numeroCarta;
                dispatch(pagaAutista({numeroCarta:nuovaPrenotazione.prenotazione.numeroCarta, mancia:dati.mancia, idPrenotazione: nuovaPrenotazione.prenotazione._id}))
            }
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
                            <div style={{display:displayMancia}}>
                                <label htmlFor="number">Mancia </label> <br/>
                                        <input name="mancia" id="mancia" type="text" min="0" defaultValue="0" onChange={(e)=>setDati({...dati,mancia:e.target.value})} />
                                        <br />
                            </div>
                        </fieldset><br/>
                        <Row>
                            <Col> 
                            <Button variant="secondary" onClick={()=>cambiaModal()}>Inserisci nuovo metodo</Button>
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


                <br/>
                <Row>
                    <Button size="lg" variant="success" onClick={()=>setShowPagamento(true)}>Procedi al Pagamento</Button>
                </Row>
                <br/>
                {mostra()}
                
                <br/>
                <Row>
                    <Button size="lg" variant="success" onClick={()=>setShowPagamento(true)}>Procedi al Pagamento</Button>
                </Row>
                <br/>

                
            </Container>
        </div>
    )
}

export default SchermataRiepilogo