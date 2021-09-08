import React from "react"
import {Container,Row,Col,Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import bcrypt from 'bcryptjs';
import classnames from "classnames";
import { modificaPass } from "../../Actions/utenti";
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

function CambiaPassForm (){
    const [dati,setDati] = useState({vecchiaPassword:'',nuovaPassword:'',confermaPassword:''});
    const [errVecchiaPass,setErrVecchiaPass] = useState(true);
    const [errNuovaPass,setErrNuovaPass] = useState(true);
    const [errConfPass,setErrConfPass] = useState(true);
    const passwordUtente = useSelector((state)=> state.utenti.utente.password)
    const emailUtente = useSelector((state)=> state.utenti.utente.email)

    const dispatch = useDispatch();
    const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$/;


    const onSubmit = async (event) => {
        event.preventDefault();
        if(errVecchiaPass==false && errNuovaPass==false && errConfPass==false){
            const passwordCriptata = await bcrypt.hash(dati.nuovaPassword,10);
            const nuovaPassword = {nuovaPassword:passwordCriptata, email: emailUtente};
            dispatch(modificaPass(nuovaPassword))
        }
    }

    useEffect(()=>{
        bcrypt.compare(dati.vecchiaPassword,passwordUtente).then((passwordCorretta)=>{
            if(!passwordCorretta){
                document.getElementById("vecchiaPassword").style.borderColor="red";
                setErrVecchiaPass(true);
             }
             else{
                document.getElementById("vecchiaPassword").style.borderColor="green";
                setErrVecchiaPass(false);
             }
        })
    },[dati.vecchiaPassword]);

    useEffect(()=>{
        if (patternPassword.test(dati.nuovaPassword)){
            document.getElementById("nuovaPassword").style.borderColor="green";
            setErrNuovaPass(false);
        } else {
            document.getElementById("nuovaPassword").style.borderColor="red";
            setErrNuovaPass(true);
        }
    },[dati.nuovaPassword]);

    useEffect(()=>{
        if (dati.nuovaPassword==dati.confermaPassword && dati.confermaPassword!=''){
            document.getElementById("confermaPassword").style.borderColor="green";
            setErrConfPass(false);
        } else {
            document.getElementById("confermaPassword").style.borderColor="red";
            setErrConfPass(true);
        }
    },[dati.nuovaPassword,dati.confermaPassword])


    return (
        <div className="dist-div-footer password">
           <Container class="container">
                <Row>
                    <Button variant="outline-secondary" onClick={()=>{window.history.back()}}>
                        <ArrowLeftRoundedIcon/>Indietro
                    </Button>
                </Row>
                <br/>

                <form onSubmit={onSubmit}>
                    <br/>
                    <Row>
                        <Button type="submit" size="lg" variant="success">
                            Conferma
                        </Button>{' '}
                    </Row>
                    <Row>
                            <h5>
                            <br/>
                                Modifica Password
                            </h5>
                        </Row>
                    <Row> 
                        <label htmlFor="nome">Vecchia Password: </label> <br/>
                        <input btype="password"  id="vecchiaPassword" name="vecchiaPassword" onChange={(e)=>setDati({...dati,vecchiaPassword: e.target.value})} required autoFocus/> <br/>
                        <span className={classnames({'green-convalid':!errVecchiaPass, 'red-convalid':errVecchiaPass})}> {errVecchiaPass && dati.vecchiaPassword=='' ? "Inserisci la tua vecchia password" : (errVecchiaPass ? "La password non corrisponde" : "OK")} </span>
                        <br/><br/>
                        
                        <label htmlFor="nome">Nuova Password: </label> <br/>
                        <input type="password"  id="nuovaPassword" name="nuovaPassword" onChange={(e)=>setDati({...dati,nuovaPassword: e.target.value})} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$" 
                            title="Almeno 8 caratteri di una lettera maiuscola un numero e un carattere speciale tra # $ ^ + = ! * ( ) @ % &" required /> <br/>
                        <span className={classnames({'green-convalid':!errNuovaPass, 'red-convalid':errNuovaPass})}> {errNuovaPass ? "Inserisci la tua nuova password" : "OK"} </span>
                        <br/><br/>
                    
                        <label htmlFor="nome">Conferma Password: </label> <br/>
                        <input type="password"  id="confermaPassword" name="confermaPassword" onChange={(e)=>setDati({...dati,confermaPassword: e.target.value})} required /> <br/>
                        <span className={classnames({'green-convalid':!errConfPass, 'red-convalid':errConfPass})}> {errConfPass && dati.confermaPassword=='' ? "Conferma la tua password" : (errConfPass ? "Le password non corrispondono" : "OK" )} </span>
                        <br/><br/>
                    </Row>
                    <Row>
                        <Button type="submit" size="lg" variant="success">
                            Conferma
                        </Button>{' '}
                    </Row>
                    <br/>
                </form>
            </Container>
        </div>
    )
}

export default CambiaPassForm