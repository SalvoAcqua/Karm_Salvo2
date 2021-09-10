import React from "react";
import {Container,Row,Col,Button,Alert,Card,ListGroup,ListGroupItem} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getTariffe, verifyArrive, completeModifyArrive, aggiornaArrivoIncompleta} from "../../Actions/prenotazioni";
import {getListaParcheggi} from "../../Actions/admin";
import {convertiDataEuropa,convertiData,emptyDate} from '../gestioneDateTime';
import Mappa from '../Mappa/Mappa.js'
import classnames from "classnames";

function ModPrenotazioneArrivo (){
    
    const [arrivo,setArrivo] = useState({parch: "", ind: "", data: "", ora: ""});
    const [nomeParcheggio,setNomeParcheggio] = useState("");
    const Prenotazione = useSelector ((state) => state.Prenotazioni.prenotazione);
    const ListaParcheggi = useSelector((state) => state.AccountAdmin.listaParcheggi);
    const err = useSelector((state) => state.errori.error);
    const user = useSelector((state) => state.utenti.utente);
    const [errParch,setErrParch] = useState(true);
    const [errInd,setErrInd] = useState(true);
    const [errData,setErrData] = useState({val: true, mess:""});
    const [errOra,setErrOra] = useState({val: true, mess:""});
    
    const dispatch = useDispatch();
    
    var Tariffe={};
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
        } while(data<=new Date(arrivo.data));
        return Prezzo;
    }
    
    const onSubmit = (e) => {
        e.preventDefault();

        if (Prenotazione.idAutista==undefined){
            for(let element of ListaParcheggi){
                if(element._id==arrivo.parch){
                    setNomeParcheggio(element.nome);
                }
            };
            if (!errParch && !errData.val && !errOra.val) {
                const Dati = {id: Prenotazione._id, idVeicolo: Prenotazione.idVeicolo, dataPa: Prenotazione.dataPartenza, oraPa: Prenotazione.oraPartenza, dataArr: arrivo.data, oraArr: arrivo.ora};
                dispatch(verifyArrive(Dati));
            }
        } else {
            if (!errInd && !errData.val && !errOra.val) {
                const Dati = {id: Prenotazione._id, idVeicolo: Prenotazione.idVeicolo, dataPa: Prenotazione.dataPartenza, oraPa: Prenotazione.oraPartenza, dataArr: arrivo.data, oraArr: arrivo.ora};
                dispatch(verifyArrive(Dati));
            }
        }
    }
    
    useEffect(()=>{    
        dispatch(getListaParcheggi());
        dispatch(getTariffe({idVeicolo: Prenotazione.idVeicolo})).then((res)=>{
            Tariffe={prFestivo: res.prFestivo, prFeriale: res.prFeriale};
        });
    },[]);

    useEffect(()=>{
        if (err.nessunErrore!=undefined && Prenotazione.idAutista!=undefined) {
            const Dati = {id: Prenotazione._id, idVeicolo: Prenotazione.idVeicolo, ind: arrivo.ind, dataPa: Prenotazione.dataPartenza, oraPa: Prenotazione.oraPartenza, dataArr: arrivo.data, oraArr: arrivo.ora};
            dispatch(aggiornaArrivoIncompleta(Dati));
            if (user.ruolo=="Admin") {
                window.location.href='/SchermataPrenotazioniAdmin';
            } else {
                window.location.href='/SchermataPrenotazioniCliente';
            }
        }
    },[err]);

    useEffect(()=>{    
        if (arrivo.parch=="") {
            setErrParch(true);
        } else {
            setErrParch(false);
        }
    },[arrivo.parch]);

    useEffect(()=>{    
        if (arrivo.ind=="") {
            setErrInd(true);
        } else {
            setErrInd(false);
        }
    },[arrivo.ind]);

    useEffect(()=>{
        let dataPartenza = new Date(Prenotazione.dataPartenza);
        if (emptyDate(arrivo.data)){
            setErrData({...errData, val: true, mess: "Inserisci la data di arrivo"});
        } else if (arrivo.data.getTime()<dataPartenza.getTime()) {
            setErrData({...errData, val: true, mess: "Non puoi inserire una data precedente a quella di partenza"});
        } else {
            setErrData({...errData, val: false, mess: "OK"});
        }

        if (arrivo.ora=="") {
            setErrOra({...errOra, val: true, mess: "Inserisci l'ora' di arrivo"});
        } else if (!emptyDate(arrivo.data) && arrivo.data.getTime()==dataPartenza.getTime() && arrivo.ora<Prenotazione.oraPartenza) {
            setErrOra({...errOra, val: true, mess: "Non puoi arrivare prima di partire"});
        } else {
            setErrOra({...errOra, val: false, mess: "OK"});
        }
    },[arrivo.data, arrivo.ora]);
    
    const completaModificaArrivo = (idPrenotazione, arrivo, Sovrapprezzo) => {
        const DatiCompletamento = {idPrenotazione: idPrenotazione, arrivo: arrivo, Sovrapprezzo: Sovrapprezzo};
        dispatch(completeModifyArrive(DatiCompletamento));
        if (user.ruolo=="Admin") {
            window.location.href='/SchermataPrenotazioniAdmin';
        } else {
            window.location.href='/SchermataPrenotazioniCliente';
        }
    }
    
    if (err.nessunErrore!=undefined && Prenotazione.idAutista==undefined) {
        let Sovrapprezzo = prezzoDaPagare(Tariffe.prFeriale, Tariffe.prFestivo) - Prenotazione.prezzo;
        return (
            <div >
                <Container>
                    <Card className="card" style={{width: '100%', backgroundColor: "rgb(214, 214, 214)" }}>
                        <Card.Body>
                            <Card.Title>Riepilogo Modifica</Card.Title>
                        </Card.Body>
                        <ListGroup className="list-group-flush">
                            <ListGroupItem>Tipo Veicolo: {Prenotazione.tipoVeicolo}</ListGroupItem>
                            <ListGroupItem>Data e Ora Partenza : {convertiDataEuropa(new Date(Prenotazione.dataPartenza))} , {Prenotazione.oraPartenza}</ListGroupItem>
                            <ListGroupItem>Data e Ora Arrivo : {convertiDataEuropa(new Date(arrivo.data))} , {arrivo.ora}</ListGroupItem>
                            <ListGroupItem>Partenza : {Prenotazione.indirizzoPartenza=="//" ? Prenotazione.nomeParcheggioPartenza : Prenotazione.indirizzoPartenza}</ListGroupItem>
                            <ListGroupItem>Arrivo : {arrivo.ind=="" ? nomeParcheggio : arrivo.ind}</ListGroupItem>
                            <ListGroupItem variant="primary">Sovrapprezzo da pagare: {Sovrapprezzo>0 ? Sovrapprezzo : "0"}€</ListGroupItem>  
                        </ListGroup>
                        <Button variant="secondary" onClick={()=>completaModificaArrivo(Prenotazione._id, arrivo, Sovrapprezzo)}>Avanti</Button>
                        <br/>
                    </Card>
                </Container>
            </div>
        );
    } 
    
    if (Prenotazione.idAutista==undefined){
        return (
            <div>            
                <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                    <Row>
                    <Col>
                        <Mappa/>
                    </Col>
                    </Row>
                    <Row>
                    <Alert variant="danger" show={err.modificaArrivo!=undefined}>
                        <Alert.Heading>Errore!</Alert.Heading>
                        <p>
                            {err.modificaArrivo}
                        </p>
                    </Alert>
                        <form onSubmit={onSubmit}>
                            <br/>
                            <Row> 
                                <Button type="submit" variant="success" size="lg">Prosegui</Button>
                            </Row>
                            <br/>

                                <h3> Compila i campi inserendo i nuovi dati sull'arrivo: </h3>
                                <label htmlFor="Parch"> Parcheggio: </label> <br/>
                                <select type="text" id="Parch" name="Parch" onChange={(e)=>setArrivo({...arrivo, parch: e.target.value})} title="Seleziona il parcheggio di arrivo"> 
                                    <option value="-1" disabled selected>Parcheggio</option>
                                    {ListaParcheggi.length==0 ? "" :
                                            ListaParcheggi.map((parcheggio)=>
                                                <option value={parcheggio._id}>{parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico}</option>
                                            )}
                                </select><br/>
                                <span className={classnames({'green-convalid':!errParch, 'red-convalid':errParch})}> {errParch ? "Seleziona il parcheggio di arrivo" : "OK"} </span>
                                <br/>
                            
                                <label htmlFor="dataArr">Data: </label> <br/>
                                <input type="date" id="dataArr" name="dataArr" onChange={(e)=>setArrivo({...arrivo, data: new Date(e.target.value)})} title="Inserisci la data di arrivo" min={convertiData(new Date(Prenotazione.dataPartenza))}/> <br/>
                                <span className={classnames({'green-convalid':!errData.val, 'red-convalid':errData.val})}> {errData.mess} </span>
                                <br/>

                                <label htmlFor="oraArr">Ora: </label> <br/>
                                <input type="time" id="oraArr" name="oraArr" onChange={(e)=>setArrivo({...arrivo, ora: e.target.value})} title="Inserisci l'orario di arrivo"/> <br/>
                                <span className={classnames({'green-convalid':!errOra.val, 'red-convalid':errOra.val})}> {errOra.mess} </span>
                            <br/>
                            <Row> 
                                <Button type="submit" variant="success" size="lg">Prosegui</Button>
                            </Row>
                            <br/>
                        </form>
                    </Row>
                </Container>
            </div>
        )
    } else if(Prenotazione.idAutista!="") {
        return (
            <div>            
                <Container className="container pagA" style={{marginTop:"20px", textAlign:"center"}}>
                    <Row>
                    <Col>
                        <Mappa/>
                    </Col>
                    </Row>
                    <Row> 
                        <Alert variant="danger" show={err.modificaArrivo!=undefined}>
                        <Alert.Heading>Errore!</Alert.Heading>
                        <p>
                            {err.modificaArrivo}
                        </p>
                    </Alert> 
                    </Row>
                    <Row>
                        <form onSubmit={onSubmit}>
                            <br/>
                            <Row> 
                                <Button type="submit" variant="success" size="lg">Prosegui</Button>
                            </Row>
                            <br/>

                                <h3> Compila i campi inserendo i nuovi dati sull'arrivo: </h3>
                                <label htmlFor="Ind"> Indirizzo: </label> <br/>
                                <input type="text" id="Ind" name="Ind" onChange={(e)=>setArrivo({...arrivo, ind: e.target.value})} title="Inserisci l'indirizzo di arrivo"/><br/>
                                <span className={classnames({'green-convalid':!errInd, 'red-convalid':errInd})}> {errInd ? "Inserisci l'indirizzo di arrivo" : "OK"} </span>
                                <br/>
                            
                                <label htmlFor="dataArr">Data: </label> <br/>
                                <input type="date" id="dataArr" name="dataArr" onChange={(e)=>setArrivo({...arrivo, data: new Date(e.target.value)})} title="Inserisci la data di arrivo" min={convertiData(new Date(Prenotazione.dataPartenza))}/> <br/>
                                <span className={classnames({'green-convalid':!errData.val, 'red-convalid':errData.val})}> {errData.mess} </span>
                                <br/>

                                <label htmlFor="oraArr">Ora: </label> <br/>
                                <input type="time" id="oraArr" name="oraArr" onChange={(e)=>setArrivo({...arrivo, ora: e.target.value})} title="Inserisci l'orario di arrivo"/> <br/>
                                <span className={classnames({'green-convalid':!errOra.val, 'red-convalid':errOra.val})}> {errOra.mess} </span>
                            <br/>
                            <Row> 
                                <Button type="submit" variant="success" size="lg">Prosegui</Button>
                            </Row>
                            <br/>
                        </form>
                    </Row>
                </Container>
            </div>
        );
    }           
}

export default ModPrenotazioneArrivo