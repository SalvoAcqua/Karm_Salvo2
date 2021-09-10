import React from "react"
import {Container,Row,Button,Alert} from "react-bootstrap";
import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {verifyDelivery} from "../../Actions/corsa";
import classnames from "classnames";

function ConsegnaForm (){
    const [dati,setDati] = useState("");
    const err = useSelector((state)=>state.errori.error);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        const Dati = {cod: dati};
        dispatch(verifyDelivery(Dati));
    }
    
    return (
        <Container classtyle={{marginTop:"20px"}}>
            <Alert show={err.consegna!=undefined} variant="danger">
                <Alert.Heading>Errore!</Alert.Heading>
                <p>
                    {err.consegna}
                </p>
            </Alert>
            <div class="container pag">
                <br/>
                    <form onSubmit={onSubmit}>
                        <Row>
                            <Button variant="secondary" size="lg" type="submit">
                                Avanti
                            </Button>
                        </Row>

                        <br/>
                        <h5>Inserisci il codice identificativo della prenotazione</h5>
                        <br/>
                        <Row>
                            <br/>
                            <input type="text" id="codPrenotazione" name="codPrenotazione" minlength="24" maxlength="24" onChange={(e)=>setDati(e.target.value)} required/> <br/>
                            <span className={classnames({'green-convalid':dati!="", 'red-convalid':dati==""})}> {dati=="" ? "Inserisci il codice identificativo della prenotazione" : "OK"} </span>
                            <br/><br/>
                        </Row>
                        <br/>
                        <Row>
                            <Button variant="secondary" size="lg" type="submit">
                                Avanti
                            </Button>
                        </Row>
                        <br/><br/>
                    </form>
            </div>
        </Container>
    )
}

export default ConsegnaForm