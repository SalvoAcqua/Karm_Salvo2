import {React} from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useSelector} from 'react-redux';

function SchermataGestioneCorsa () {
    
    const user = useSelector((state)=>state.utenti.utente);
    
    if (user.ruolo=="Autista" || user.ruolo=="Cliente"){
        return(
            <div class="container pag">
                <Container >
                    <Row>
                        <Col>
                            <br/>
                            <h3> GESTIONE CORSA</h3>
                        </Col>
                    </Row>
                    <br/>
                    <Row >
                            <Button className="button" variant="secondary" size="lg" href="/Consegna"> Consegna </Button> 

                            <Button className="button" variant="secondary" size="lg" href="/Rilascio"> Rilascio </Button>

                            <Button className="button" variant="secondary" size="lg" href={user.ruolo=="Autista" ? "/SchermataComunicaGuastoAutista" : "/SchermataComunicaGuastoCliente"}> Comunica Guasto </Button>
                    </Row>
                    <br/>
                </Container>
            </div>
        )
    } else {
        return(
            <div>
                <Container class="container pag">
                    <Row>
                        <Col>
                            <br/>
                            <h3> GESTIONE CORSA</h3>
                        </Col>
                    </Row>
                    <Row >
                            <Button className="button" variant="secondary" href="/Consegna"> Consegna </Button> 

                            <Button className="button" variant="secondary" href="/Rilascio"> Rilascio </Button>
                    </Row>
                </Container>
            </div>
        )
    }
    
}

export default SchermataGestioneCorsa

