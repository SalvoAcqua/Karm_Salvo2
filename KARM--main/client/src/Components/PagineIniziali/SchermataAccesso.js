import { Link } from "react-router-dom";
import React from "react";
import Button from 'react-bootstrap/Button'
import {Container} from '@material-ui/core';


function SchermataAccesso (){
    return (
        <Container>
            <form >
                <label htmlFor="email">E-mail </label><br/>
                <input name="email" id="email" type="email" size="50" maxLength="40" placeholder="Inserisci email" required/><br />
                <br />

                <label htmlFor="password">Password </label> <br/>
                <input name="password" id="password" type="password" placeholder="Inserisci password"
                    size="50" required
                /><br />
                <br /> <br/>
            </form>

            <button type="button" class="btn btn-primary">
                <Link to="/HomePage"> 
                    Accedi
                </Link>
            </button>
        </Container>
    );
}

export default SchermataAccesso