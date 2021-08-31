import React from "react"
import {Container,Row,Button} from "react-bootstrap";
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {verifyDelivery} from "../../Actions/corsa";
import classnames from "classnames";

function ConsegnaForm (){
    const [dati,setDati] = useState("");
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        const Dati = {cod: dati}
        dispatch(verifyDelivery(Dati));
    }
    
    return (
        <Container style={{marginTop:"20px"}}>
            <div>
                <br/>
                    <form onSubmit={onSubmit}>
                        <fieldset>
                            <legend>Inserisci il codice identificativo del veicolo</legend>
                            <Row>
                                <br/>
                                <input type="text" id="codVeicolo" name="codVeicolo" onChange={(e)=>setDati(e.target.value)} required/> <br/>
                                <span className={classnames({'green-convalid':dati!="", 'red-convalid':dati==""})}> {dati=="" ? "Inserisci il codice identificativo del veicolo" : "OK"} </span>
                                <br/><br/>
                            </Row>
                            <Row>
                                <Button type="submit">
                                    Avanti
                                </Button>
                            </Row>
                            <br/><br/>
                        </fieldset>
                    </form>
            </div>
        </Container>
    )
}

export default ConsegnaForm