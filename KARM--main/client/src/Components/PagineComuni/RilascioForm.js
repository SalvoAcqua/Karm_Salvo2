import React from "react";
import {Container,Row,Col,Button,Alert,Modal,ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {verifyRelease, pagamentoAggiuntivo, assegnaLuogo, completaRilascio} from '../../Actions/corsa';
import {getListaParcheggi} from '../../Actions/admin';
import {getTariffe} from '../../Actions/prenotazioni';
import {convertiData, getOra, emptyDate} from '../gestioneDateTime';
import classnames from "classnames";

function RilascioForm (){
    const [showContainer, setShowContainer] = useState("none");
    const [rilascio,setRilascio] = useState({codPrenotazione:'',integrita:'',luogoInd:'',luogoParch:''});
    const [importoDanni,setImportoDanni] = useState(0);
    const [importoLuogo,setImportoLuogo] = useState(0);
    const [importoTempo,setImportoTempo] = useState(0);
    const [errCodice,setErrCodice] = useState(true);
    const [errIntegrita,setErrIntegrita] = useState(true);
    const [errLuogo,setErrLuogo] = useState(true);
    const listaParcheggi = useSelector((state)=>state.AccountAdmin.listaParcheggi);
    const corsa = useSelector((state)=>state.Corsa.corsa);
    const Err = useSelector((state)=>state.errori.error);
    const dispatch = useDispatch();
    
    const onSubmit = (event) => {
        event.preventDefault();
        if (!errCodice && !errIntegrita && !errLuogo) {
            const Dati={cod: rilascio.codPrenotazione};
            dispatch(verifyRelease(Dati));
        }
    }

    const clickPagamento = () => {
        dispatch(getTariffe(corsa)).then((res)=>{
            switch (rilascio.integrita) {
                case "0":
                    setImportoDanni(0);
                    break;
                case "1":
                    setImportoDanni((res.prFestivo +  res.prFeriale)/4);
                    break;
                case "2":
                    setImportoDanni((res.prFestivo +  res.prFeriale)/2);
                    break;
                default:
                    setImportoDanni((res.prFestivo +  res.prFeriale)*5);
                    break;
            }
    
            if (rilascio.luogoInd!=""){
                if(rilascio.luogoInd!=corsa.viaDestinazione){
                    setImportoLuogo((res.prFestivo +  res.prFeriale)/4);
                }
            } else {
                if(rilascio.luogoParch!=corsa.idParcheggioRilascio){
                    setImportoLuogo((res.prFestivo +  res.prFeriale)/4);
                }
            }
    
            let todayTime=new Date();
            let todayDate=new Date(convertiData(todayTime));
            let dataArrivo=new Date(corsa.dataArrivo);
            let sovrapprezzoTempo=0;
            
            if (dataArrivo.getTime()<todayDate.getTime()){
                let data = dataArrivo;
                do {
                    if(data.getDay()==0 || data.getDay()==6){
                        sovrapprezzoTempo += Number(res.prFestivo);
                    } else {
                        sovrapprezzoTempo += Number(res.prFeriale);
                    }
                    data.setDate(data.getDate()+1)
                } while(data<=todayDate);
            } else if (dataArrivo.getTime()==todayDate.getTime()) {
                if (corsa.oraArrivo>getOra(todayTime)){
                    sovrapprezzoTempo=(todayDate.getDay()==0 || todayDate.getDay()==6) ? res.prFestivo : res.prFeriale;
                }
            }
            setImportoTempo(sovrapprezzoTempo);
    
            setShowContainer("block");
        })
    }

    const clickConferma = () => {
        let totale=importoDanni+importoLuogo+importoTempo;
        let Dati={totale: totale, corsa: corsa};
        dispatch(pagamentoAggiuntivo(Dati)); //ritira i soldi dalla carta di credito
        let dati = {idVeicolo: corsa.idVeicolo, parch: rilascio.luogoParch, ind: rilascio.luogoInd};
        dispatch(assegnaLuogo(dati));
        dispatch(completaRilascio(corsa));
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
            setErrLuogo(true);
            document.getElementById("luogoParch").style.borderColor="red";
            document.getElementById("luogoInd").style.borderColor="red";
        }else {
            setErrLuogo(false);
            document.getElementById("luogoParch").style.borderColor="green";
            document.getElementById("luogoInd").style.borderColor="green";
        }
    },[rilascio.luogoInd, rilascio.luogoParch]);


    return (
        <div>
           <Container>
                <Modal show={Err.corsa!=undefined} centered backdrop="static">
                    <ModalBody>
                        <Button onClick={()=>clickPagamento()}>Calcola pagamento aggiuntivo</Button>
                        <Container style={{display:showContainer}} classtyle={{marginTop:"20px"}}>
                            <br/><br/>
                            <h3> Sovrapprezzo calcolato: </h3>
                            <Row>
                                <br/><br/>
                                <p>Verranno prelevati dalla tua carta di credito (inserita in fase di prenotazione): </p><br/>
                                <p> {importoDanni} € a causa dei danni provocati al veicolo</p><br/>
                                <p> {importoTempo} € a causa del ritardo riscontrato</p><br/>
                                <p> {importoLuogo} € a causa del luogo del rilascio</p><br/><br/>
                                <p> Per un importo totale pari a  {importoDanni+importoTempo+importoLuogo}€</p><br/>
                            </Row>
                            <Row>
                                <Button onClick={()=>clickConferma()}>Conferma</Button>
                            </Row>
                        </Container>
                    </ModalBody>
                </Modal>
                <Alert show={Err.rilascio!=undefined} variant="danger">
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
                    <span className={classnames({'green-convalid':!errLuogo, 'red-convalid':errLuogo})}> {errLuogo ? "Seleziona il parcheggio di rilascio solo se non hai inserito alcun indirizzo" : "OK"} </span>
                    <br/><br/>

                    <label htmlFor="luogoInd"> Indirizzo di rilascio: </label> <br/>
                    <input type="text" id="luogoInd" name="luogoInd" onChange={(e)=>setRilascio({...rilascio,luogoInd: e.target.value})} title="Inserisci l'indirizzo del luogo in cui hai rilasciato il veicolo"/> <br/>
                    <span className={classnames({'green-convalid':!errLuogo, 'red-convalid':errLuogo})}> {errLuogo ? "Inserisci l'indirizzo di rilascio solo se hai selezionato 'Nessun Parcheggio'" : "OK"} </span>
                    <br/><br/>

                    <Button type="submit" variant="success" >Avanti</Button>
                </form>
            </Container>
        </div>
    )
}

export default RilascioForm