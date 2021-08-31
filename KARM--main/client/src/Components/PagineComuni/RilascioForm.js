import React from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {getListaParcheggiDisp} from '../../Actions/corsa';
import classnames from "classnames";

function RilascioForm (){
    const [rilascio,setRilascio] = useState({email:'',codVeicolo:'',integrita:'',luogo:''});
    const [errRilascio,setErrRilascio] = useState({email:false,codVeicolo:false,integrita:false,luogo:false});
    const dispatch = useDispatch();
    
    const onSubmit = (event) => {
        event.preventDefault();
    }

    useEffect(()=>{
        if(rilascio.email==""){
            setErrRilascio({...errRilascio, email:true});
            document.getElementById("email").style.borderColor="red";
        }else{
            setErrRilascio({...errRilascio, email:false});
            document.getElementById("email").style.borderColor="green";
        }
    },[rilascio.email]);

    useEffect(()=>{
        if(rilascio.codVeicolo==""){
            setErrRilascio({...errRilascio, codVeicolo:true});
            document.getElementById("codVeicolo").style.borderColor="red";
        }else{
            setErrRilascio({...errRilascio, codVeicolo:false});
            document.getElementById("codVeicolo").style.borderColor="green";
        }
    },[rilascio.codVeicolo]);

    useEffect(()=>{
        if(rilascio.integrita==""){
            setErrRilascio({...errRilascio, integrita:true});
            document.getElementById("integrita").style.borderColor="red";
        }else{
            setErrRilascio({...errRilascio, integrita:false});
            document.getElementById("integrita").style.borderColor="green";
        }
    },[rilascio.integrita]);

    useEffect(()=>{
        if(rilascio.luogo==""){
            setErrRilascio({...errRilascio, luogo:true});
            document.getElementById("luogo").style.borderColor="red";
        }else{
            setErrRilascio({...errRilascio, luogo:false});
            document.getElementById("luogo").style.borderColor="green";
        }
    },[rilascio.luogo]);


    return (
        <div>
           <Container>
                <h1> Rilascia il veicolo: </h1>
                <form onSubmit={onSubmit}>
                    <label htmlFor="email"> Email: </label> <br/>
                    <input type="email" id="email" name="email" onChange={(e)=>setRilascio({...rilascio,email: e.target.value})} title="Inserisci l'email del cliente" required/>
                    <br/>

                    <label htmlFor="codVeicolo"> Codice Identificativo del veicolo:</label> <br/>
                    <input type="text" id="codVeicolo" name="codVeicolo" onChange={(e)=>setRilascio({...rilascio,codVeicolo: e.target.value})} title="Inserisci il codice identificativo del veicolo" required/>
                    <br/>

                    <label htmlFor="integrita"> Integrità del veicolo: </label> <br/>
                    <select type="text" id="integrita" name="integrita" onChange={(e)=>setRilascio({...rilascio,integrita: e.target.value})} title="Seleziona il grado di integrità del veicolo" required> 
                        <option value="" id="preselected" disabled selected>Integrità</option>
                        <option value="aaa">aaa</option>
                        <option value="bbb">bbb</option>
                        <option value="ccc">ccc</option>
                        <option value="ddd">ddd</option>
                    </select><br/>

                    <label htmlFor="luogo"> Luogo: </label> <br/>
                    <input type="text" id="luogo" name="luogo" onChange={(e)=>setRilascio({...rilascio,luogo: e.target.value})} title="Inserisci il luogo del rilascio" required/><br />
                    <br/>

                    <Button type="submit" variant="success" >Avanti</Button>{' '}
                </form>
            </Container>
        </div>
    )
}

export default RilascioForm