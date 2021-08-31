import {React} from "react";
import {Container,Row,Col, Button} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getListaClienti} from '../../Actions/admin'

function SchermataVisualizzaClienti () {
    const listaClienti = useSelector((state)=>state.AccountAdmin.listaClienti);
    const [lista,setLista] = useState([]);
    const dispatch = useDispatch();

     useEffect(()=>{
        dispatch(getListaClienti());
    },[])
    return(
        <div>
            <Container style={{marginTop:"20px"}}>
                <Row>
                    <Col> 
                        <Table striped bordered hover size="sm" responsive>
                        <thead>
                                <tr>
                                <th>Nome</th>
                                <th>Cognome</th>
                                <th>Sesso</th>
                                <th>Data di Nascita</th>
                                <th> Codice Fiscale</th>
                                <th> email </th>
                                </tr>
                        </thead>
                        <tbody>
                            {listaClienti.length==0 ? 
                                <tr> 
                                    <td> Non ci sono Clienti registrati</td>
                                </tr> : listaClienti.map((cliente) => (
                                <tr>
                                    <td>{cliente.nome}</td>
                                    <td>{cliente.cognome}</td>
                                    <td>{cliente.sesso}</td>
                                    <td>{cliente.dataNascita.slice(0,10)}</td>
                                    <td>{cliente.CF}</td>
                                    <td>{cliente.email}</td>
                                </tr>
                            ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>

            </Container>
        </div>
    )
}

export default SchermataVisualizzaClienti