import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../Images/logo.png"

import {Container, Row, Col } from "react-bootstrap";

import CopyrightIcon from "@material-ui/icons/Copyright";

function Footer () {
    return (
      <div className="Footer">
        <Container fluid>
          <Row>
            <Col style={{ color: "white" }}>
              <h6 style={{ fontWeight: "bold" }}>Azienda</h6>
              <Link to="/SuDiNoi">
                <h6>Su di Noi</h6>
              </Link>
              <Link to="/Mappa">
                <h6>I nostri parcheggi</h6>
              </Link>
              <a href="https://www.instagram.com">
                <h6>Instagram</h6>
              </a>
            </Col>
            
            <Col className="Copyright" style={{ textAlign: "center" }}>
              <CopyrightIcon style={{ color: "white", fontSize: 20 }} />{" "}
              <br/><br/>
              <img 
                src={Logo}
                alt="KARM-Logo"
                width="80rem"
                style={{ marginBottom: "2rem" }}
              />
            </Col>

            <Col textAlign="central" style={{ color: "white" }}>
              <h6 style={{fontWeight: "bold" }}>
                Contattaci
              </h6>
              <h6 >Salvatore +39 3801234567</h6>
              <h6 >Maria     +39 3807654321</h6>
              <h6 >Giuseppe  +39 3804567890</h6>
            </Col>
          </Row>
        </Container>
      </div> 
    );
}

export default Footer;