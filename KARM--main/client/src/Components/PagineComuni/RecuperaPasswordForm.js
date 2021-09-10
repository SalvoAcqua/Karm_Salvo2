import React from "react"
import {Container,Row,Col,Button,Modal, ModalBody} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import { passwordRecovery, checkOTP, modificaPass } from "../../Actions/utenti";
import ModalHeader from "react-bootstrap/esm/ModalHeader";
import classnames from "classnames";
import bcrypt from 'bcryptjs';
import ArrowLeftRoundedIcon from '@material-ui/icons/ArrowLeftRounded';

function RecuperaPasswordForm(){
    let screenHeight = document.documentElement.scrollHeight - (250);
    const [showPrimo,setShowPrimo] = useState(true)
    const [showSecondo,setShowSecondo] = useState(false)
    const [showTerzo,setShowTerzo] = useState(false)
    const [email,setEmail]=useState('');
    const [otp,setOTP] = useState('');
    const [dati,setDati] = useState({nuovaPassword:'',confermaPassword:''});
    const errore = useSelector((state) => state.errori.error);
    const [errNuovaPass,setErrNuovaPass] = useState(true);
    const [errConfPass,setErrConfPass] = useState(true);

    const patternPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$/;
    const dispatch = useDispatch();

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(passwordRecovery({email: email})).then((res)=>{
            if(res==true){
               setShowPrimo(false);
               setShowSecondo(true); 
            }
        }) 
    }

    const onSubmitOTP = (e) => {
        e.preventDefault();
        const dati = {
            email : email,
            OTP: otp
        } 
        console.log(dati)
        dispatch(checkOTP(dati)).then((res)=>{
            if(res==true){
                setShowSecondo(false);
                setShowTerzo(true); 
             }
        })
    }

    const onSubmitPassword = async (e) => {
        e.preventDefault();
        if(errNuovaPass==false && errConfPass==false){
            const passwordCriptata = await bcrypt.hash(dati.nuovaPassword,10);
            const nuovaPassword = {nuovaPassword: passwordCriptata , email: email};
            dispatch(modificaPass(nuovaPassword))
        }
    }

    useEffect(()=>{
        if (patternPassword.test(dati.nuovaPassword)){
            setErrNuovaPass(false);
        } else {
            setErrNuovaPass(true);
        }
    },[dati.nuovaPassword]);

    useEffect(()=>{
        if (dati.nuovaPassword==dati.confermaPassword && dati.confermaPassword!=''){
            setErrConfPass(false);
        } else {
            setErrConfPass(true);
        }
    },[dati.nuovaPassword,dati.confermaPassword])
    return(
        <div style={{height:screenHeight}}>
            <Container>
                <Modal show={showPrimo} centered backdrop="static">
                    <ModalBody>
                        <ModalHeader>
                            <Modal.Title>
                                Inserisci la tua email
                            </Modal.Title>
                        </ModalHeader>
                        <Row style={{margin:"10px"}} >
                        <form onSubmit={onSubmit}>
                        <label htmlFor="email">E-mail </label><br/>
                        <input name="email" id="email" type="email"  placeholder="Inserisci email" onChange={(e)=>setEmail(e.target.value)} required/><br />
                        <span className={classnames({'red-convalid':errore.email!=undefined })}> {errore.email}</span><br/><br/>
                        <Row style={{justifyContent:"space-around"}}>
                            <Col>
                        <Button type="submit" variant="success"> Avanti</Button>
                        </Col>
                        <Col>
                        <Button variant="danger" href="/">Annulla</Button>
                        </Col>
                        </Row>
                        </form>
                       
                        </Row>
                        
                    </ModalBody>
                </Modal>
                <Modal show={showSecondo} centered backdrop="static">
                    <ModalBody>
                        <ModalHeader>
                            <Modal.Title>
                                Inserisci il codice OTP ricevuto per email
                            </Modal.Title>
                        </ModalHeader>
                        <Row style={{margin:"10px"}} >
                        <form onSubmit={onSubmitOTP}>
                        <label htmlFor="text">OTP </label><br/>
                        <input name="otp" id="otp" type="text"  placeholder="Inserisci il codice OTP" onChange={(e)=>setOTP(e.target.value)} required/><br />
                        <span className={classnames({'red-convalid':(errore.otp!=undefined || otp==''), 'green-convalid':(errore.otp==undefined && otp!='') })}> {otp=='' ? "Inserisci codice OTP" : (errore.otp!=undefined ? errore.otp : "OK")}</span><br/><br/>
                        <Row style={{justifyContent:"space-around"}}>
                            <Col>
                        <Button type="submit" variant="success">Verifica</Button>
                        <Row>
                    <Col>
                        <Button variant="outline-secondary" onClick={()=>{window.history.back()}}>
                            <ArrowLeftRoundedIcon/>Indietro
                        </Button>
                    </Col>
                </Row>
                        </Col>
                        </Row>
                        </form>
                       
                        </Row>
                        
                    </ModalBody>
                </Modal>


                <Modal show={showTerzo} centered backdrop="static">
                    <ModalBody>
                        <ModalHeader>
                            <Modal.Title>
                                Inserisci la tua nuova password!
                            </Modal.Title>
                        </ModalHeader>
                        <Row style={{margin:"10px"}} >
                        <form onSubmit={onSubmitPassword}>
                        <label htmlFor="nome">Nuova Password: </label> <br/>
                        <input type="password"  id="nuovaPassword" name="nuovaPassword" onChange={(e)=>setDati({...dati,nuovaPassword: e.target.value})} pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$" 
                            title="Almeno 8 caratteri di una lettera maiuscola un numero e un carattere speciale tra # $ ^ + = ! * ( ) @ % &" required /> <br/>
                        <span className={classnames({'green-convalid':!errNuovaPass, 'red-convalid':errNuovaPass})}> {errNuovaPass ? "Inserisci la tua nuova password" : "OK"} </span>
                        <br/><br/>
                    
                        <label htmlFor="nome">Conferma Password: </label> <br/>
                        <input type="password"  id="confermaPassword" name="confermaPassword" onChange={(e)=>setDati({...dati,confermaPassword: e.target.value})} required /> <br/>
                        <span className={classnames({'green-convalid':!errConfPass, 'red-convalid':errConfPass})}> {errConfPass && dati.confermaPassword=='' ? "Conferma la tua password" : (errConfPass ? "Le password non corrispondono" : "OK" )} </span>
                        <br/><br/>
                        <Row style={{justifyContent:"space-around"}}>
                            <Col>
                                <Button type="submit" variant="success"> Conferma</Button>
                            </Col>
                        </Row>
                        </form>
                       
                        </Row>
                        
                    </ModalBody>
                </Modal>
                
            </Container>
        </div>
    )
}

export default RecuperaPasswordForm;




/**/