import {React} from "react";
import {Container,Row,Col, Button} from "react-bootstrap";

function GestioneAmministrazione () {
    return(
        <div class="container">
            <Container >
                <Row>
                    <Col>
                        <br/>
                        <h3> GESTIONE AMMINISTRAZIONE</h3>
                    </Col>
                </Row>
                <br/>
                <Row class="row text-center">
                    <Button className="button" variant="secondary" size="lg" href="/VisualizzaClienti"> Visualizza Clienti</Button> 
                </Row>
                <br/>
                <Row class="row text-center">
                    <Button className="button" variant="secondary" size="lg" href="/VisualizzaDipendenti"> Visualizza Dipendenti </Button>
                </Row>
                <br/>
                <Row class="row text-center">
                    <Button className="button" variant="secondary" size="lg" href="/VisualizzaParcheggi"> Visualizza Parcheggi </Button>
                </Row>
                <br/>
                <Row class="row text-center">
                    <Button className="button" variant="secondary" size="lg" href="/VisualizzaVeicoli"> Visualizza Veicoli </Button>
                </Row>
                <br/>
                <Row class="row text-center">
                    <Button className="button" variant="secondary" size="lg" href="/ModificaTariffe"> Modifica Tariffe </Button>
                </Row>
                <br/><br/>
            </Container>
        </div>
    )
}

export default GestioneAmministrazione

