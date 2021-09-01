import React from "react";
import {Container,Row,Col,Button,Alert,Modal,ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {pagamentoAggiuntivo, assegnaLuogo, completaRilascio} from '../../Actions/corsa';
import {getListaParcheggi} from '../../Actions/admin';
import {getTariffe} from '../../Actions/prenotazioni';
import classnames from "classnames";

function RilascioForm (){
    const [visibility,setVisibility] = useState({alert:false, modalCalcola:false, modalRiepilogo:false});
    const [rilascio,setRilascio] = useState({codPrenotazione:'',integrita:'',luogoInd:'',luogoParch:''});
    const [importo,setImporto] = useState('');
    const [errCodice,setErrCodice] = useState(true);
    const [errIntegrita,setErrIntegrita] = useState(true);
    const [errInd,setErrInd] = useState(true);
    const [errParch,setErrParch] = useState(true);
    const prenotazioneInCorso = useSelector((state)=>state.PrenotazioneInCorso.corsa);
    const listaParcheggi = useSelector((state)=>state.AccountAdmin.listaParcheggi);
    const tariffe = useSelector ((state)=>state.Prenotazioni.tariffe);
    const dispatch = useDispatch();
    
    const onSubmit = (event) => {
        event.preventDefault();
        if (!errCodice && !errIntegrita && !errInd && !errParch) {
            if(prenotazioneInCorso._id==rilascio.codPrenotazione) {
                setVisibility({...visibility, modalCalcola: true});
            } else {
                setVisibility({...visibility, alert: true});
            }
        }
    }

    const clickPagamento = () => {
        setVisibility({...visibility,modalCalcola:false});
        dispatch(getTariffe(prenotazioneInCorso));
        let sovrapprezzo="";
        switch (rilascio.integrita) {
            case "0":
                setImporto('0');
                break;
            case "1":
                sovrapprezzo = tariffe.prFestivo +  tariffe.prFeriale;
                setImporto(sovrapprezzo);
                break;
            case "2":
                sovrapprezzo = tariffe.prFestivo +  tariffe.prFeriale;
                setImporto(sovrapprezzo);
                break;
            default:
                sovrapprezzo = tariffe.prFestivo +  tariffe.prFeriale;
                setImporto(sovrapprezzo);
                break;
        }
        const Dati = {importo: importo, prenotazione: prenotazioneInCorso};
        dispatch(pagamentoAggiuntivo(Dati)); //ritira i soldi dalla carta di credito
        setVisibility({...visibility,modalRiepilogo:true});
    }

    const clickConferma = () => {
        let Dati = {idVeicolo: prenotazioneInCorso.idVeicolo, parch: rilascio.luogoParch, ind: rilascio.luogoInd};
        dispatch(assegnaLuogo(Dati));
        dispatch(completaRilascio(prenotazioneInCorso));
    }

    useEffect(()=>{    
        dispatch(getListaParcheggi());
    },[]);
    
    useEffect(()=>{
        if(rilascio.codPrenotazione==""){
            setErrCodice(true);
            document.getElementById("codPrenotazione").style.borderColor="red";
        }else{
            setErrCodice(false);
            document.getElementById("codPrenotazione").style.borderColor="green";
        }
    },[rilascio.codPrenotazione]);

    useEffect(()=>{
        if(rilascio.integrita==""){
            setErrIntegrita(true);
            document.getElementById("integrita").style.borderColor="red";
        }else{
            setErrIntegrita(false);
            document.getElementById("integrita").style.borderColor="green";
        }
    },[rilascio.integrita]);

    useEffect(()=>{
        if((rilascio.luogoParch=="" && rilascio.luogoInd=="")||(rilascio.luogoParch!="" && rilascio.luogoInd!="")){
            setErrInd(true);
            setErrParch(true);
            document.getElementById("luogoParch").style.borderColor="red";
            document.getElementById("luogoInd").style.borderColor="red";
        }else {
            setErrInd(false);
            setErrParch(false);
            document.getElementById("luogoParch").style.borderColor="green";
            document.getElementById("luogoInd").style.borderColor="green";
        }
    },[rilascio.luogoInd, rilascio.luogoParch]);


    return (
        <div>
           <Container>
                <Modal show={visibility.modalCalcola} centered backdrop="static">
                    <ModalBody>
                        <Button onClick={()=>clickPagamento()}>Calcola pagamento aggiuntivo</Button>
                    </ModalBody>
                </Modal>
                <Modal show={visibility.modalRiepilogo} centered backdrop="static">
                    <Modal.Header> Pagamento avvenuto con successo </Modal.Header>
                    <ModalBody>
                        <Row>
                            <p>Sono stati prelevati {importo}€ dalla carta di credito {prenotazioneInCorso._id} a causa dei danni provocati al veicolo</p>
                        </Row>
                        <Row>
                            <Button onClick={()=>clickConferma()}>Conferma</Button>
                        </Row>
                    </ModalBody>
                </Modal>
                <Alert show={visibility.alert} variant="danger">
                    <Alert.Heading>Errore!</Alert.Heading>
                    <p>
                        Il codice inserito non risulta essere il codice di una prenotazione in corso
                    </p>
                </Alert>
                <h1> Rilascia il veicolo: </h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="codPrenotazione"> Codice Identificativo della prenotazione:</label> <br/>
                    <input type="text" id="codPrenotazione" name="codPrenotazione" onChange={(e)=>setRilascio({...rilascio,codPrenotazione: e.target.value})} title="Inserisci il codice identificativo della prenotazione" required/> <br/>
                    <span className={classnames({'green-convalid':!errCodice, 'red-convalid':errCodice})}> {errCodice ? "Inserisci il codice identificativo della prenotazione" : "OK"} </span>
                    <br/><br/>

                    <label htmlFor="integrita"> Integrità del veicolo: </label> <br/>
                    <select type="text" id="integrita" name="integrita" onChange={(e)=>setRilascio({...rilascio,integrita: e.target.value})} title="Seleziona il grado di integrità del veicolo" required> 
                        <option value="" disabled selected>Integrità</option>
                        <option value="0">0 - Nessun danno</option>
                        <option value="1">1 - Danni poco rilevanti</option>
                        <option value="2">2 - Danni moderati</option>
                        <option value="3">3 - Danni importanti</option>
                    </select><br/>
                    <span className={classnames({'green-convalid':!errIntegrita, 'red-convalid':errIntegrita})}> {errIntegrita ? "Seleziona il grado di integrità del veicolo" : "OK"} </span>
                    <br/><br/>

                    <label htmlFor="luogoParch"> Parcheggio di rilascio: </label> <br/>
                    <select type="text" id="luogoParch" name="luogoParch" onChange={(e)=>setRilascio({...rilascio,luogoParch: e.target.value})} title="Seleziona il parcheggio in cui hai rilasciato il veicolo"> 
                        <option value="-1" disabled selected>Parcheggio</option>
                        <option value=""> Nessun Parcheggio </option>
                        {listaParcheggi.length==0 ? "" :
                                listaParcheggi.map((parcheggio)=>
                                    <option value={parcheggio._id}>{parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico}</option>
                                )}
                    </select><br/>
                    <span className={classnames({'green-convalid':!errParch, 'red-convalid':errParch})}> {errParch ? "Seleziona il parcheggio di rilascio solo se non hai inserito alcun indirizzo" : "OK"} </span>
                    <br/><br/>

                    <label htmlFor="luogoInd"> Indirizzo di rilascio: </label> <br/>
                    <input type="text" id="luogoInd" name="luogoInd" onChange={(e)=>setRilascio({...rilascio,luogoInd: e.target.value})} title="Inserisci l'indirizzo del luogo in cui hai rilasciato il veicolo"/> <br/>
                    <span className={classnames({'green-convalid':!errInd, 'red-convalid':errInd})}> {errInd ? "Inserisci l'indirizzo di rilascio solo se hai selezionato 'Nessun Parcheggio'" : "OK"} </span>
                    <br/><br/>

                    <Button type="submit" variant="success" >Avanti</Button>
                </form>
            </Container>
        </div>
    )
}

export default RilascioForm