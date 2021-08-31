import {React} from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import {useSelector} from 'react-redux';

function SchermataGestioneCorsa () {
    
    const user = useSelector((state)=>state.utenti.utente);
    
    if (user.ruolo=="Autista" || user.ruolo=="Cliente"){
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <br/>
                            <h3> GESTIONE CORSA</h3>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="3">
                            <Button className="button" variant="secondary" href="/Consegna"> Consegna </Button> 
                        </Col>
                        <Col md="3">
                            <Button className="button" variant="secondary" href="/Rilascio"> Rilascio </Button>
                        </Col>
                        <Col md="3">
                            <Button className="button" variant="secondary" href="/ComunicaGuasto"> Comunica Guasto </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    } else {
        return(
            <div>
                <Container>
                    <Row>
                        <Col>
                            <br/>
                            <h3> GESTIONE CORSA</h3>
                        </Col>
                    </Row>
                    <Row >
                        <Col md="3">
                            <Button className="button" variant="secondary" href="/Consegna"> Consegna </Button> 
                        </Col>
                        <Col md="3">
                            <Button className="button" variant="secondary" href="/Rilascio"> Rilascio </Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
    
}

export default SchermataGestioneCorsa

