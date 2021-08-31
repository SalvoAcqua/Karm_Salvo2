import React, {useEffect, Component} from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ProtectedRoute, ProtectedRouteAdmin, ProtectedRouteCliente, ProtectedRouteAutista, ProtectedRouteAddetto} from './ProtectedRoute';
import {useSelector, useDispatch} from 'react-redux';
import {registra} from './Api/utenti'
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';

import { Container } from '@material-ui/core';

import SchermataIniziale from './Components/PagineIniziali/SchermataIniziale.js';
import RegistratiForm from './Components/PagineIniziali/RegistratiForm.js';
import Layout from "./Components/Layout/layout.js";
import HomePage from './Components/PagineComuni/HomePage';
import SchermataMioProfilo from './Components/PagineComuni/SchermataMioProfilo';
import SchermataGestioneCorsa from './Components/PagineComuni/SchermataGestioneCorsa';
import ConsegnaForm from './Components/PagineComuni/ConsegnaForm';
import RilascioForm from './Components/PagineComuni/RilascioForm';
import AggiornaPatForm from './Components/PagineComuni/AggiornaPatForm';
import CambiaPassForm from './Components/PagineComuni/CambiaPassForm';
import CambiaEmailForm from './Components/PagineCliente/CambiaEmailForm';
import SchermataMetodiPag from './Components/PagineCliente/SchermataMetodiPag';
import SchermataPrenotazioniCliente from './Components/PagineCliente/SchermataPrenotazioniCliente';
import NuovaPrenotazioneForm from './Components/PagineCliente/NuovaPrenotazioneForm';
import SceltaVeicolo from './Components/PagineCliente/SceltaVeicolo';
import SceltaParcheggi from './Components/PagineCliente/SceltaParcheggi';


//PagineAdmin
import GestioneAmministrazione from './Components/PagineAdmin/GestioneAmministrazione';
import SchermataVisualizzaClienti from './Components/PagineAdmin/SchermataVisualizzaClienti';
import SchermataVisualizzaDipendenti from './Components/PagineAdmin/SchermataVisualizzaDipendenti';
import SchermataVisualizzaVeicoli from './Components/PagineAdmin/SchermataVisualizzaVeicoli';
import SchermataVisualizzaParcheggi from './Components/PagineAdmin/SchermataVisualizzaParcheggi';
import InserisciVeicoloForm from './Components/PagineAdmin/InserisciVeicoloForm';
import ModificaTariffeForm from './Components/PagineAdmin/ModificaTariffeForm';
import InserisciDipendenteForm from './Components/PagineAdmin/InserisciDipendenteForm';
import SchermataPrenotazioniAdmin from './Components/PagineAdmin/SchermataPrenotazioniAdmin';

//PagineAddetto
import SchermataParcheggioAssociato from './Components/PagineAddetto/SchermataParcheggioAssociato';
import SchermataPrenotazioniAddetto from './Components/PagineAddetto/SchermataPrenotazioniAddetto';

//PagineAutista
import SchermataPrenotazioniAutista from './Components/PagineAutista/SchermataPrenotazioniAutista';

const App = () => {

    return(
        <BrowserRouter>
             <Layout>
                <Switch>
                    <Route exact path="/" component={SchermataIniziale} />
                    <Route exact path="/Registrazione" component={RegistratiForm} />
                    <ProtectedRoute exact path="/HomePage" component={HomePage} />
                    <ProtectedRoute exact path="/SchermataMioProfilo" component={SchermataMioProfilo} />
                    <ProtectedRoute exact path="/SchermataGestioneCorsa" component={SchermataGestioneCorsa} />
                    <ProtectedRoute exact path="/Consegna" component={ConsegnaForm} />
                    <ProtectedRoute exact path="/Rilascio" component={RilascioForm} />
                    <ProtectedRoute exact path="/ModificaPassword" component={CambiaPassForm} />
                    <ProtectedRouteCliente exact path="/AggiornaPatenteCliente" component={AggiornaPatForm}/>
                    <ProtectedRouteCliente exact path="/MetodiDiPagamento" component={SchermataMetodiPag} />
                    <ProtectedRouteCliente exact path="/NuovaPrenotazione" component={NuovaPrenotazioneForm} />
                    <ProtectedRouteCliente exact path="/AggiornaEmail" component={CambiaEmailForm} />
                    <ProtectedRouteCliente exact path="/SceltaVeicolo" component={SceltaVeicolo} />
                    <ProtectedRouteCliente exact path="/SceltaParcheggi" component={SceltaParcheggi} />
                    <ProtectedRouteCliente exact path="/SchermataPrenotazioniCliente" component={SchermataPrenotazioniCliente}/>
                    <ProtectedRouteAdmin exact path="/GestioneAmministrazione" component={GestioneAmministrazione}/>
                    <ProtectedRouteAdmin exact path="/VisualizzaClienti" component={SchermataVisualizzaClienti}/>
                    <ProtectedRouteAdmin exact path="/VisualizzaDipendenti" component={SchermataVisualizzaDipendenti}/>
                    <ProtectedRouteAdmin exact path="/VisualizzaVeicoli" component={SchermataVisualizzaVeicoli}/>
                    <ProtectedRouteAdmin exact path="/VisualizzaParcheggi" component={SchermataVisualizzaParcheggi}/>
                    <ProtectedRouteAdmin exact path="/InserisciVeicolo" component={InserisciVeicoloForm}/>
                    <ProtectedRouteAdmin exact path="/ModificaTariffe" component={ModificaTariffeForm}/>
                    <ProtectedRouteAdmin exact path="/InserisciDipendente" component={InserisciDipendenteForm}/>
                    <ProtectedRouteAdmin exact path="/SchermataPrenotazioniAdmin" component={SchermataPrenotazioniAdmin}/>
                    <ProtectedRouteAddetto exact path="/ModificaParcheggioAddetto" component={SchermataParcheggioAssociato}/>
                    <ProtectedRouteAddetto exact path="/SchermataPrenotazioniAddetto" component={SchermataPrenotazioniAddetto}/>
                    <ProtectedRouteAutista exact path="/AggiornaPatenteAutista" component={AggiornaPatForm}/>
                    <ProtectedRouteAutista exact path="/SchermataPrenotazioniAutista" component={SchermataPrenotazioniAutista}/>

                    <Route path="*" component={()=> "404 NOT FOUND"}/>
                </Switch>
            </Layout>  
        </BrowserRouter>   
    );
}

export default App;