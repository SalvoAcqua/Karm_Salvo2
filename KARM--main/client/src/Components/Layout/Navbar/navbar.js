import React from "react";
import logo from "../../../Images/logo.png"
import {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux'
import {logoutUser} from '../../../Actions/utenti'
import { Navbar,Nav, NavDropdown, Modal, ModalBody,Container,Row,Col,Button} from "react-bootstrap";
import PersonIcon from "@material-ui/icons/Person";
import DescriptionIcon from '@material-ui/icons/Description';
import NotificationsIcon from '@material-ui/icons/Notifications';

function NAVBAR() {
    const [show,setShow]=useState(false);
    const authenticated = useSelector((state)=>state.utenti.isAuthenticated);
    const utente = useSelector((state)=>state.utenti.utente)
    const dispatch = useDispatch();

    const logout = () =>{
        dispatch(logoutUser());
    }
    if(authenticated){
        switch (utente.ruolo) {
            case "Cliente":
                return(
                    <div>
                        <Modal show={show} onHide={()=>setShow(false)} centered backdrop="static">
                            <ModalBody>
                                <Modal.Header >
                                     <Modal.Title>Sei sicuro di volerti disconnettere?</Modal.Title>
                                 </Modal.Header>
                                <Container>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <Button variant="success" onClick={logout}>Conferma</Button>{' '}
                                        </Col>
                                            
                                        <Col>
                                            <Button variant="danger" onClick={()=>setShow(false)}>Annulla</Button>{' '}
                                        </Col>
                                    </Row>
                                </Container>
                            </ModalBody>
                        </Modal>
                    
                        <Navbar bg="secondary" variant="dark" position="static">
                            <Navbar.Brand href="/HomePage">
                                <img width="40" height="40" src={logo}/>  
                            </Navbar.Brand>
                            <Navbar.Toggle />
                            <Navbar.Collapse className="justify-content-between">
                                <Nav>
                                </Nav>
        
                                <Nav>
                                    <Button variant="secondary" href="/Notifiche">
                                        <NotificationsIcon/>
                                    </Button>
                                    
                                    <Button variant="secondary" href="/SchermataMioProfilo">
                                        <NavDropdown title={<PersonIcon/>} id="dropdown-menu-align-right">
                                            <NavDropdown.Item href="/SchermataMioProfilo">Il Mio Profilo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item style={{color:"red"}} onClick={()=>setShow(true)}>Disconnetti </NavDropdown.Item>
                                        </NavDropdown>
                                    </Button>
                                    
                                    <Button variant="secondary" href="/SchermataPrenotazioniCliente">
                                        <DescriptionIcon/>
                                    </Button>
                                </Nav>
                            </Navbar.Collapse> 
                        </Navbar> 
                    </div>
                );
                break;
            case "Admin":
                return(
                        <div>
                            <Modal show={show} onHide={()=>setShow(false)} centered backdrop="static">
                                <ModalBody>
                                    <Modal.Header >
                                         <Modal.Title>Sei sicuro di volerti disconnettere?</Modal.Title>
                                     </Modal.Header>
                                    <Container>
                                        <br/>
                                        <Row>
                                            <Col>
                                                <Button variant="success" onClick={logout}>Conferma</Button>{' '}
                                            </Col>
                                                
                                            <Col>
                                                <Button variant="danger" onClick={()=>setShow(false)}>Annulla</Button>{' '}
                                            </Col>
                                        </Row>
                                    </Container>
                                </ModalBody>
                            </Modal>
                        
                            <Navbar bg="secondary" variant="dark" position="static">
                                <Navbar.Brand href="/HomePage">
                                    <img width="40" height="40" src={logo}/>  
                                </Navbar.Brand>
                                <Navbar.Toggle />

                                <Navbar.Collapse className="justify-content-between">
                                    <Nav></Nav>

                                    <Nav>                                        
                                        <Button variant="secondary" href="/SchermataMioProfilo">
                                            <NavDropdown title={<PersonIcon/>} id="dropdown-menu-align-right">
                                                <NavDropdown.Item href="/SchermataMioProfilo">Il Mio Profilo</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item style={{color:"red"}} onClick={()=>setShow(true)}>Disconnetti </NavDropdown.Item>
                                            </NavDropdown>
                                        </Button>

                                        <Button variant="secondary" href="/SchermataPrenotazioniAdmin">
                                            <DescriptionIcon/>
                                        </Button>
                                    </Nav>
                                </Navbar.Collapse> 
                            </Navbar>
                        </div>
                );
                break;
            case "Addetto":
                return (  
                    <div>
                        <Modal show={show} onHide={()=>setShow(false)} centered backdrop="static">
                            <ModalBody>
                                <Modal.Header >
                                     <Modal.Title>Sei sicuro di volerti disconnettere?</Modal.Title>
                                 </Modal.Header>
                                <Container>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <Button variant="success" onClick={logout}>Conferma</Button>{' '}
                                        </Col>
                                        <Col>
                                            <Button variant="danger" onClick={()=>setShow(false)}>Annulla</Button>{' '}
                                        </Col>
                                    </Row>
                                </Container>
                            </ModalBody>
                        </Modal>
                        
                        <Navbar bg="secondary" variant="dark" position="static">
                            <Navbar.Brand href="/HomePage">
                                <img width="40" height="40" src={logo}/>  
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse className="justify-content-between">
                                    <Nav></Nav>

                                    <Nav>                                        
                                        <Button variant="secondary" href="/SchermataMioProfilo">
                                            <NavDropdown title={<PersonIcon/>} id="dropdown-menu-align-right">
                                                <NavDropdown.Item href="/SchermataMioProfilo">Il Mio Profilo</NavDropdown.Item>
                                                <NavDropdown.Divider />
                                                <NavDropdown.Item style={{color:"red"}} onClick={()=>setShow(true)}>Disconnetti </NavDropdown.Item>
                                            </NavDropdown>
                                        </Button>

                                        <Button variant="secondary" href="/SchermataPrenotazioniAddetto">
                                            <DescriptionIcon/>
                                        </Button>
                                    </Nav>
                                </Navbar.Collapse>  
                        </Navbar>  
                    </div>
                );
                break;
            default:
                //AUTISTA
                return(
                    <div>
                        <Modal show={show} onHide={()=>setShow(false)} centered backdrop="static">
                            <ModalBody>
                                <Modal.Header >
                                     <Modal.Title>Sei sicuro di volerti disconnettere?</Modal.Title>
                                 </Modal.Header>
                                <Container>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <Button variant="success" onClick={logout}>Conferma</Button>{' '}
                                        </Col>
                                        <Col>
                                            <Button variant="danger" onClick={()=>setShow(false)}>Annulla</Button>{' '}
                                        </Col>
                                    </Row>
                                </Container>
                            </ModalBody>
                        </Modal>
                        
                        <Navbar bg="secondary" variant="dark" position="static">
                            <Navbar.Brand href="/HomePage">
                                <img width="40" height="40" src={logo}/>  
                            </Navbar.Brand>
                            <Navbar.Toggle/>
                            <Navbar.Collapse className="justify-content-between">
                                <Nav>
                                </Nav>
        
                                <Nav>
                                    <Button variant="secondary" href="/Notifiche">
                                        <NotificationsIcon/>
                                    </Button>
                                    
                                    <Button variant="secondary" href="/SchermataMioProfilo">
                                        <NavDropdown title={<PersonIcon/>} id="dropdown-menu-align-right">
                                            <NavDropdown.Item href="/SchermataMioProfilo">Il Mio Profilo</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item style={{color:"red"}} onClick={()=>setShow(true)}>Disconnetti </NavDropdown.Item>
                                        </NavDropdown>
                                    </Button>

                                    <Button variant="secondary" href="/SchermataPrenotazioniAutista">
                                        <DescriptionIcon/>
                                    </Button>

                                </Nav>
                            </Navbar.Collapse> 
                        </Navbar>  
                    </div>
                );
                break;
        }
    } else{
        return(
            <div>
                <Navbar bg="secondary" variant="dark" position="static">
                    <Navbar.Brand href="/">
                        <img width="40" height="40" src={logo}/>  
                    </Navbar.Brand>
                </Navbar>  
            </div>
        );
    }
}
export default NAVBAR;