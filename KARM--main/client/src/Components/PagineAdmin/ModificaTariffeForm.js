import React from "react"
import {Container,Row,Col,Button,Modal,ModalBody,Table} from "react-bootstrap";
import {useEffect,useState} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import {getListaVeicoli,modifyTariffe} from "../../Actions/admin";
import BrushSharpIcon from '@material-ui/icons/BrushSharp';

function ModificaTariffeForm (){
    const [dati,setDati]=useState({prezzoFeriale:'', prezzoFestivo:''});
    const listaVeicoli = useSelector((state)=>state.AccountAdmin.listaVeicoli);
    const [modifica,setModifica] = useState({show:false, id:''})
    const dispatch = useDispatch();

    const onSubmit = (event) => {
        event.preventDefault();
        const newTariffe={
            id:modifica.id,
            prezzoFeriale:dati.prezzoFeriale,
            prezzoFestivo:dati.prezzoFestivo
        }
        dispatch(modifyTariffe(newTariffe));
    }

    useEffect(()=>{
        dispatch(getListaVeicoli());
    },[])

    return (
        <div>

            <Modal show={modifica.show} onHide={()=>setModifica({...modifica,show:false})} centered backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Inserisci i dati della carta</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row>
                            <form onSubmit={onSubmit}>
                                <label htmlFor="text">Prezzo Festivo</label><br/>
                                <input name="prezzoFestivo" id="prezzoFestivo" type="number" onChange={(e)=>setDati({...dati,prezzoFestivo:e.target.value})} required/> 
                                <br/><br/>
                                
                                <label htmlFor="text">Prezzo Feriale</label><br/>
                                <input name="prezzoFeriale" id="prezzoFeriale" type="number" onChange={(e)=>setDati({...dati,prezzoFeriale:e.target.value})} required/> 
                                <br/><br/>
                                <Button type="submit" variant="secondary">
                                Inserisci
                                </Button>
                            </form>
                        </Row>
                    </Container> 
                 </Modal.Body>
             </Modal>
            <Container style={{marginTop:"20px"}}>
                <Row>
                    <Col>
                        <Table striped bordered hover size="sm" responsive>
                            <thead>
                                <tr>
                                <th>Tipo</th>    
                                <th>Modello</th>
                                <th>Marca</th>
                                <th>Cilindrata</th>
                                <th>N.Posti</th>
                                <th>N.Porte</th>
                                <th>Targa</th>
                                <th>Stato</th>
                                <th>Prezzo Festivo</th>
                                <th>Prezzo Feriale</th>
                                <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaVeicoli.length==0 ? 
                                    <tr> 
                                        <td> Non ci sono veicoli registrati</td>
                                    </tr> : listaVeicoli.map((veicolo) => (
                                    <tr>
                                        <td>{veicolo.tipo}</td>
                                        <td>{veicolo.modello!=undefined ? veicolo.modello : "//"}</td>
                                        <td>{veicolo.marca!=undefined ? veicolo.marca : "//"}</td>
                                        <td>{veicolo.cilindrata!=undefined ? veicolo.cilindrata : "//"}</td>
                                        <td>{veicolo.posti!=undefined ? veicolo.posti : "//"}</td>
                                        <td>{veicolo.porte!=undefined ? veicolo.porte : "//"}</td>
                                        <td>{veicolo.targa!=undefined ? veicolo.targa : "//"}</td>
                                        <td>{veicolo.stato}</td>
                                        <td>{veicolo.prFestivo}</td>
                                        <td>{veicolo.prFeriale}</td>
                                        <td>
                                            <Button onClick={()=>setModifica({...modifica,show:true, id:veicolo._id})}>
                                                <BrushSharpIcon/>
                                            </Button>
                                        </td>
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

export default ModificaTariffeForm