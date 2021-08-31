import { Link } from "react-router-dom";
import {Button, Container,Modal,Row,Col} from "react-bootstrap";
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import classnames from "classnames";
import {loginUser} from '../../Actions/utenti'
import "./index.css"

function SchermataIniziale (){  
  const [show,setShow]=useState(false);
  const [dati,setDati]=useState({email:'',password:''});
  const errore = useSelector((state) => state.errori.error);
  const dispatch = useDispatch();

  const onSubmit = (event) => {
    event.preventDefault();
    const datiUtente= dati;
    dispatch(loginUser(datiUtente));
  }

  useEffect(()=>{
    //Bisogna settare isAuthenticated false
  },[])
  
  return (
    <div className="dist-div-footer corpo">
      <Modal show={show} onHide={()=>setShow(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Inserisci i tuoi dati</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row>
              <form onSubmit={onSubmit}>
                <label htmlFor="email">E-mail </label><br/>
                <input name="email" id="email" type="email"  placeholder="Inserisci email" onChange={(e)=>setDati({...dati,email:e.target.value})} required/><br />
                <span className={classnames({'red-convalid':errore.UserNotFound!=undefined })}> {errore.UserNotFound}</span>
                
                <br/>

                <label htmlFor="password">Password </label> <br/>
                <input name="password" id="password" type="password" placeholder="Inserisci password" onChange={(e)=>setDati({...dati,password:e.target.value})} title="Almeno 8 caratteri di una lettera maiuscola un numero e un carattere speciale tra # $ ^ + = ! * ( ) @ % &" 
                            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,40}$" required
                />
                <br />
                <span className={classnames({'red-convalid':errore.IncorretPassword!=undefined })}> {errore.IncorretPassword}</span>
                <br /> 

                <Button type="submit" variant="secondary">
                  Accedi
                </Button>
              </form>
            </Row>

            <Row>
              <Col style={{display:"flex", justifyContent:"flex-end"}}>
                <p>
                  <Link to="/Registrazione"> Hai dimenticato la password? </Link>
                </p>
              </Col>
            </Row>
          </Container> 
        </Modal.Body>
      </Modal>
    
      <Container className="height-max accesso ">
        <Row className="justifyCenter">
          <h3>
            <br/>
            Benvenuti in KARM
          </h3>
          <h5>
            Qui puoi noleggiare il veicolo che fa per te!
          </h5>
        </Row>
        <Row className="justifyCenter">
          <Button className="btn btn-secondary btn-lg bottoneAccesso" onClick={()=>setShow(true)}>
            Accedi a KARM!
          </Button>
        </Row>
        <Row className="justifyCenter">
          <h6>
            <p className="forgot-password text-center">
              Non sei registrato? <Link to="/Registrazione">Registrati</Link>
            </p>
          </h6>
        </Row>
      </Container>
    </div>
 );
}

export default SchermataIniziale