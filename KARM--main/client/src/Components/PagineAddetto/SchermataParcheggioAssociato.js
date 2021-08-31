import React from "react"
import {Container,Row,Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getListaParcheggi} from "../../Actions/admin";
import {setPark} from "../../Actions/utenti";
import classnames from "classnames";

function SchermataParcheggioAssociato (){
    const [parcheggioID,setParcheggioID] = useState("");
    const listaParcheggi = useSelector((state)=>state.AccountAdmin.listaParcheggi);
    const user = useSelector ((state) => state.utenti.utente);
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        if (parcheggioID!=""){
            let dati={id:user._id, idParcheggio:parcheggioID};
            dispatch(setPark(dati));
        }
    }

    useEffect(()=>{
        dispatch(getListaParcheggi());
    },[])
    
    return (
        <Container style={{marginTop:"20px"}}>
            <div>
                <br/>
                    <form onSubmit={onSubmit}>
                        <fieldset>
                            <legend>Seleziona il nuovo parcheggio in cui lavori</legend>
                            <Row>
                                <br/>
                                <select type="text" id="parcheggio" name="parcheggio" onChange={(e)=>setParcheggioID(e.target.value)} title="Seleziona il parcheggio in cui lavori"> <br/>
                                    <option value="" selected disabled>Parcheggio</option>
                                    <option value="-1">Nessun Parcheggio</option>
                                    {listaParcheggi.map((parcheggio)=>
                                        <option value={parcheggio._id}>{parcheggio.nome}-{parcheggio.indirizzo},{parcheggio.nCivico}</option>
                                    )}
                                </select>
                                <span className={classnames({'green-convalid':parcheggioID!="", 'red-convalid':parcheggioID==""})}> {parcheggioID=="" ? "Seleziona il parcheggio in cui lavori" : "OK"} </span>
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

export default SchermataParcheggioAssociato