import {React} from "react";
import {Container,Row,Col, Button} from "react-bootstrap";

function GestioneAmministrazione () {
    return(
        <div>
            <Container>
                <Row>
                    <Col>
                        <br/>
                        <h3> GESTIONE AMMINISTRAZIONE</h3>
                    </Col>
                </Row>
                <Row >
                    <Col md="3">
                        <Button className="button" variant="secondary" href="/VisualizzaClienti"> Visualizza Clienti</Button> 
                    </Col>
                    <Col md="3">
                        <Button className="button" variant="secondary" href="/VisualizzaDipendenti"> Visualizza Dipendenti </Button>
                    </Col>
                    <Col md="3">
                        <Button className="button" variant="secondary" href="/VisualizzaParcheggi"> Visualizza Parcheggi </Button>
                    </Col>
                    <Col md="3">
                        <Button className="button" variant="secondary" href="/VisualizzaVeicoli"> Visualizza Veicoli </Button>
                    </Col>
                    <Col md="3">
                        <Button className="button" variant="secondary" href="/ModificaTariffe"> Modifica Tariffe </Button>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default GestioneAmministrazione

