import React from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getListaParcheggiDisp,addVeicolo} from '../../Actions/admin';
import classnames from "classnames";

function InserisciVeicoloForm (){
    const [veicolo,setVeicolo] = useState({tipo:'',modello:'',marca:'',cilindrata:'', posti:'',porte:'',
        targa:'',parcAssociato:'',descrizione:'',prFestivo:'',prFeriale:''});
    const [errTipoVeicolo,setErrTipoVeicolo] = useState(true);
    const [errModello,setErrModello] = useState(true);
    const [errMarca,setErrMarca] = useState(true);
    const [errCilindrata,setErrCilindrata] = useState(true);
    const [errNPosti,setErrNposti] = useState(true);
    const [errNPorte,setErrNPorte] = useState(true);
    const [errTarga,setErrTarga] = useState(true);
    const [errParcAssociato,setErrParcAssociato] = useState(true);
    const [errDescrizione,setErrDescrizione] = useState(true);
    const [errPrFestivo,setErrPrFestivo] = useState(true);
    const [errPrFeriale,setErrPrFeriale] = useState(true);
    const listaParcheggiDisp = useSelector((state)=>state.AccountAdmin.listaParcheggiDisp);
    const dispatch = useDispatch();
    
    var patternTarga=/^[A-Z]{2}[\d]{3}[A-Z]{2}$/;
    
    const onSubmit = (event) => {
        event.preventDefault();
        let Veicolo = {};
    switch(veicolo.tipo){
        case "Autovettura":
             Veicolo = {
                tipoVeicolo:veicolo.tipo,
                modello:veicolo.modello,
                marca:veicolo.marca,
                cilindrata:veicolo.cilindrata,
                nPosti:veicolo.posti,
                nPorte:veicolo.porte,
                targa:veicolo.targa,
                parcheggioAssociato:veicolo.parcAssociato,
                descrizione:veicolo.descrizione,
                prezzoFestivo:veicolo.prFestivo,
                prezzoFeriale:veicolo.prFeriale
            }
            break;
        case "Moto":
              Veicolo = {
                tipoVeicolo:veicolo.tipo,
                modello:veicolo.modello,
                marca:veicolo.marca,
                cilindrata:veicolo.cilindrata,
                targa:veicolo.targa,
                parcheggioAssociato:veicolo.parcAssociato,
                descrizione:veicolo.descrizione,
                prezzoFestivo:veicolo.prFestivo,
                prezzoFeriale:veicolo.prFeriale
            }
            break;
        default:
              Veicolo = {
                tipoVeicolo:veicolo.tipo,
                parcheggioAssociato:veicolo.parcAssociato,
                descrizione:veicolo.descrizione,
                prezzoFestivo:veicolo.prFestivo,
                prezzoFeriale:veicolo.prFeriale
            }
            break;
        }
        dispatch(addVeicolo(Veicolo));
    }
    
    useEffect(()=>{
        switch (veicolo.tipo){
            case "Autovettura":
                for (var element of document.getElementsByClassName("moto")){
                    element.style="display:none";
                }
                for (var element of document.getElementsByClassName("biciMono")){
                    element.style="display:none";
                }
                for (var element of document.getElementsByClassName("auto")){
                    element.style="display:block";
                    if (element.getElementsByTagName("input").length!=0){
                        element.getElementsByTagName("input")[0].value="";
                    }else if (element.getElementsByTagName("textarea").length!=0) {
                        element.getElementsByTagName("textarea")[0].value="";
                    } else if (element.getElementsByTagName("select").length!=0) {
                        var select=element.getElementsByTagName("select")[0];
                        select.removeAttribute("selected");
                        select.options[0].selected=true;
                    }
                }
                break;
            case "Moto":
                for (var element of document.getElementsByClassName("auto")){
                    element.style="display:none";
                    if (element.getElementsByTagName("input").length!=0){
                        element.getElementsByTagName("input")[0].value="";
                    }else if (element.getElementsByTagName("textarea").length!=0) {
                        element.getElementsByTagName("textarea")[0].value="";
                    } else if (element.getElementsByTagName("select").length!=0) {
                        var select=element.getElementsByTagName("select")[0];
                        select.removeAttribute("selected");
                        select.options[0].selected=true;
                    }
                }
                for (var element of document.getElementsByClassName("biciMono")){
                    element.style="display:none";
                }
                for (var element of document.getElementsByClassName("moto")){
                    element.style="display:block";
                }
                break;
            case "Bicicletta":
            case "Monopattino":
                for (var element of document.getElementsByClassName("auto")){
                    element.style="display:none";
                    if (element.getElementsByTagName("input").length!=0){
                        element.getElementsByTagName("input")[0].value="";
                    }else if (element.getElementsByTagName("textarea").length!=0) {
                        element.getElementsByTagName("textarea")[0].value="";
                    } else if (element.getElementsByTagName("select").length!=0) {
                        var select=element.getElementsByTagName("select")[0];
                        select.removeAttribute("selected");
                        select.options[0].selected=true;
                    }
                }
                for (var element of document.getElementsByClassName("moto")){
                    element.style="display:none";
                }
                for (var element of document.getElementsByClassName("biciMono")){
                    element.style="display:block";
                }
                break;
            default:
                for (var element of document.getElementsByClassName("moto")){
                    element.style="display:none";
                }
                for (var element of document.getElementsByClassName("biciMono")){
                    element.style="display:none";
                }
                for (var element of document.getElementsByClassName("auto")){
                    element.style="display:none";
                }
                break;
        }

        setVeicolo({...veicolo,modello:'',marca:'',cilindrata:'', posti:'',porte:'',targa:'',
                    parcAssociato:'',descrizione:'',prFestivo:'',prFeriale:''});

        if(veicolo.tipo==""){
            setErrTipoVeicolo(true);
            document.getElementById("tipo").style.borderColor="red";
        }else{
            setErrTipoVeicolo(false);
            document.getElementById("tipo").style.borderColor="green";
            let tipoVeicolo={tipo: veicolo.tipo};
            dispatch(getListaParcheggiDisp(tipoVeicolo));
        }
    },[veicolo.tipo]);
        
    useEffect(()=>{
        if(veicolo.modello==""){
            setErrModello(true);
            document.getElementById("modello").style.borderColor="red";
        }else{
            setErrModello(false);
            document.getElementById("modello").style.borderColor="green";
        }
    },[veicolo.modello]);

    useEffect(()=>{
        if(veicolo.marca==""){
            setErrMarca(true)
            document.getElementById("marca").style.borderColor="red";
        }else{
            setErrMarca(false)
            document.getElementById("marca").style.borderColor="green";
        }
    },[veicolo.marca]);

    useEffect(()=>{
        if(veicolo.cilindrata=="" || veicolo.cilindrata<0){
            setErrCilindrata(true);
            document.getElementById("cilindrata").style.borderColor="red";
        }else{
            setErrCilindrata(false);
            document.getElementById("cilindrata").style.borderColor="green";
        }
    },[veicolo.cilindrata]);

    useEffect(()=>{
        if(veicolo.posti=="" || veicolo.posti<2 || veicolo.posti>9){
            setErrNposti(true);
            document.getElementById("nPosti").style.borderColor="red";
        }else{
            setErrNposti(false);
            document.getElementById("nPosti").style.borderColor="green";
        }
    },[veicolo.posti]);

    useEffect(()=>{
        if(veicolo.porte=="" || veicolo.porte<3 || veicolo.porte>7){
            setErrNPorte(true);
            document.getElementById("nPorte").style.borderColor="red";
        }else{
            setErrNPorte(false);
            document.getElementById("nPorte").style.borderColor="green";
        }
    },[veicolo.porte]);

    useEffect(()=>{
        if(!patternTarga.test(veicolo.targa)){
            setErrTarga(true);
            document.getElementById("targa").style.borderColor="red";
        }else{
            setErrTarga(false);
            document.getElementById("targa").style.borderColor="green";
        }
    },[veicolo.targa]);

    useEffect(()=>{
        if(veicolo.parcAssociato==""){
            setErrParcAssociato(true);
            document.getElementById("parcAssociato").style.borderColor="red";
        }else{
            setErrParcAssociato(false);
            document.getElementById("parcAssociato").style.borderColor="green";
        }
    },[veicolo.parcAssociato]);

    useEffect(()=>{
        if(veicolo.descrizione==""){
            setErrDescrizione(true);
            document.getElementById("descrizione").style.borderColor="red";
        }else{
            setErrDescrizione(false);
            document.getElementById("descrizione").style.borderColor="green";
        }
    },[veicolo.descrizione]);

    useEffect(()=>{
        if(veicolo.prFestivo=="" || veicolo.prFestivo<0){
            setErrPrFestivo(true);
            document.getElementById("prFestivo").style.borderColor="red";
        }else{
            setErrPrFestivo(false);
            document.getElementById("prFestivo").style.borderColor="green";
        }
    },[veicolo.prFestivo]);

    useEffect(()=>{
        if(veicolo.prFeriale=="" || veicolo.prFeriale<0){
            setErrPrFeriale(true);
            document.getElementById("prFeriale").style.borderColor="red";
        }else{
            setErrPrFeriale(false);
            document.getElementById("prFeriale").style.borderColor="green";
        }
    },[veicolo.prFeriale]);


    return (
        <div>
           <Container class="container">
                <br/>
                <h5> Inserisci i dati per la registrazione del nuovo veicolo </h5>
                <br/>

                <form onSubmit={onSubmit}>
                    <Row>
                        <Button type="submit" variant="success" size="lg" >Avanti</Button>{' '}
                    </Row>
                    <br/>
                    <fieldset className="fieldstyle">
                        <legend class="h4">Tipologia Veicolo:</legend>
                        <select type="text" id="tipo" name="tipo" onChange={(e)=>setVeicolo({...veicolo,tipo: e.target.value})} title="Seleziona il tipo di veicolo" >
                            <option value="" disabled selected>Tipo veicolo</option>
                            <option value="Autovettura">Autovettura</option>
                            <option value="Moto">Moto</option>
                            <option value="Bicicletta">Bicicletta</option>
                            <option value="Monopattino">Monopattino</option>
                        </select><br/>
                        <span className={classnames({'green-convalid':!errTipoVeicolo, 'red-convalid':errTipoVeicolo})}> {errTipoVeicolo? "Seleziona il tipo di veicolo" : "OK"} </span>
                        <br/>
                    </fieldset>
                    <br/>
                    <fieldset className="fieldstyle">
                        <legend class="h4">Inserisci i dati: </legend>
                        <div class="auto moto">
                            <label htmlFor="modello">Modello: </label> <br/>
                            <select type="text" id="modello" name="modello" onChange={(e)=>setVeicolo({...veicolo,modello: e.target.value})} title="Inserisci il modello del veicolo" > 
                                <option value="" disabled selected>Modello</option>
                                <option value="Sportiva">Sportiva</option>
                                <option value="Lusso">Lusso</option>
                                <option value="Classica">Classica</option>
                                <option value="Altro">Altro</option>
                            </select><br/>
                            <span className={classnames({'green-convalid':!errModello, 'red-convalid':errModello})}> {errModello ? "Inserisci il modello del veicolo" : "OK"} </span>
                            <br/>
                        </div>

                        <div class="auto moto">
                            <label htmlFor="marca">Marca: </label> <br/>
                            <input type="text" id="marca" name="marca" size="30" onChange={(e)=>setVeicolo({...veicolo,marca: e.target.value})} title="Inserisci la marca del veicolo" /> <br/>
                            <span className={classnames({'green-convalid':!errMarca, 'red-convalid':errMarca})}> {errMarca ? "Inserisci la marca del veicolo" : "OK"} </span>
                            <br/>
                        </div>

                        <div class="auto moto">
                            <label htmlFor="cilindrata">Cilindrata: </label> <br/>
                            <input type="number" id="cilindrata" name="cilindrata" size="30" onChange={(e)=>setVeicolo({...veicolo,cilindrata: e.target.value})} title="Inserisci la cilindrata del veicolo" min="0"  /> <br/>
                            <span className={classnames({'green-convalid':!errCilindrata, 'red-convalid':errCilindrata})}> {errCilindrata && veicolo.cilindrata=="" ? "Inserisci la cilindrata del veicolo" : (errCilindrata ? "Non puoi inserire una cilindrata minore di 0" : "OK")} </span>
                            <br/>
                        </div>
                        
                        <div class="auto">
                            <label htmlFor="nPosti">Numero di posti: </label> <br/>
                            <input type="number" id="nPosti" name="nPosti" size="30" onChange={(e)=>setVeicolo({...veicolo,posti: e.target.value})} title="Inserisci il numero di posti del veicolo" min="2" max="9"  />  <br/>
                            <span className={classnames({'green-convalid':!errNPosti, 'red-convalid':errNPosti})}> {errNPosti && veicolo.posti=="" ? "Inserisci il numero di posti del veicolo" : (errNPosti ? "Non puoi inserire un valore minore di 2 o maggiore di 9" : "OK")} </span>
                            <br/>
                        </div>
                        
                        <div class="auto">
                            <label htmlFor="nPorte">Numero di porte: </label> <br/>
                            <input type="number" id="nPorte" name="nPorte" size="30" onChange={(e)=>setVeicolo({...veicolo,porte: e.target.value})} title="Inserisci il numero di porte del veicolo" min="3" max="7"  /> <br/>
                            <span className={classnames({'green-convalid':!errNPorte, 'red-convalid':errNPorte})}> {errNPorte && veicolo.porte=="" ? "Inserisci il numero di porte del veicolo" : (errNPorte ? "Non puoi inserire un valore minore di 3 o maggiore di 7" : "OK")} </span>
                            <br/>
                        </div>
                        
                        <div class="auto moto">
                            <label htmlFor="targa">Targa: </label> <br/>
                            <input type="text" id="targa" name="targa" size="30" onChange={(e)=>setVeicolo({...veicolo,targa: e.target.value.toUpperCase()})} title="Inserisci la targa del veicolo" pattern="^[A-Z]{2}[\d]{3}[A-Z]{2}$" placeholder="AA000AA"  /> <br/>
                            <span className={classnames({'green-convalid':!errTarga, 'red-convalid':errTarga})}> {errTarga && veicolo.targa=="" ? "Inserisci la targa del veicolo" : (errTarga ? "Devi inserire 2 lettere, seguite da 3 cifre e infine altre 2 lettere" : "OK")} </span>
                            <br/>
                        </div>
                        
                        <div class="auto moto biciMono">
                            <label htmlFor="parcAssociato">Parcheggio Associato: </label> <br/>
                            <select type="text" id="parcAssociato" name="parcAssociato" onChange={(e)=>setVeicolo({...veicolo,parcAssociato: e.target.value})} title="Inserisci il parcheggio in cui si trova il veicolo" > 
                                <option value="" disabled selected>Nome Parcheggio</option>
                                {listaParcheggiDisp.length==0 ? <option value="-1" disabled>Nessun parcheggio disponibile</option> :
                                listaParcheggiDisp.map((parcheggio)=>
                                    <option value={parcheggio._id}>{parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico}</option>
                                )}
                            </select><br/>
                            <span className={classnames({'green-convalid':!errParcAssociato, 'red-convalid':errParcAssociato})}> {errParcAssociato ? "Inserisci il parcheggio in cui si trova il veicolo" : "OK"} </span>
                            <br/>
                        </div>
                        
                        <div class="auto moto biciMono">
                            <label htmlFor="descrizione">Descrizione: </label> <br/>
                            <textarea type="text" id="descrizione" name="descrizione" size="30" onChange={(e)=>setVeicolo({...veicolo,descrizione: e.target.value})} title="Inserisci una breve descrizione per il veicolo"  /> <br/>
                            <span className={classnames({'green-convalid':!errDescrizione, 'red-convalid':errDescrizione})}> {errDescrizione ? "Inserisci una breve descrizione per il veicolo" : "OK"} </span>
                            <br/>
                        </div>

                        <div class="auto moto biciMono">
                            <label htmlFor="prFestivo">Prezzo Festivo: </label> <br/>
                            <input type="number" id="prFestivo" name="prFestivo" size="30" onChange={(e)=>setVeicolo({...veicolo,prFestivo: e.target.value})} title="Inserisci il prezzo del veicolo nei giorni festivi" min="0"  /> <br/>
                            <span className={classnames({'green-convalid':!errPrFestivo, 'red-convalid':errPrFestivo})}> {errPrFestivo && veicolo.prFestivo=="" ? "Inserisci il prezzo del veicolo nei giorni festivi" : (errPrFestivo ? "Non puoi inserire un prezzo minore di 0" : "OK")} </span>
                            <br/>
                        </div>

                        <div class="auto moto biciMono">
                            <label htmlFor="prFeriale">Prezzo Feriale: </label> <br/>
                            <input type="number" id="prFeriale" name="prFeriale" size="30" onChange={(e)=>setVeicolo({...veicolo,prFeriale: e.target.value})} title="Inserisci il prezzo del veicolo nei giorni feriali" min="0"  /> <br/>
                            <span className={classnames({'green-convalid':!errPrFeriale, 'red-convalid':errPrFeriale})}> {errPrFeriale && veicolo.prFeriale=="" ? "Inserisci il prezzo del veicolo nei giorni feriali" : (errPrFeriale ? "Non puoi inserire un prezzo minore di 0" : "OK")} </span>
                            <br/>
                        </div>
                    </fieldset>
                    <br/><br/>
                    <Row>
                    <Button type="submit" variant="success" size="lg"> Avanti </Button>{' '}
                </Row>
                <br/>
                </form>
            </Container>
        </div>
    )
}

export default InserisciVeicoloForm