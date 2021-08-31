import express from 'express';

import {registraUtente,accessoUtente,nuovaPassword,addMetodoPagamento,aggiornaPatente, getMetodiPagamento,removeMetodoPagamento, aggiornaParcheggio} from "../Controllers/GestioneAccount.js"

const router = express.Router();

router.post('/Registrazione',registraUtente);
router.post('/Login',accessoUtente)
router.post('/NuovaPassword',nuovaPassword);
router.post('/AddMetodoPagamento',addMetodoPagamento);
router.post('/ListMetodiPagamento',getMetodiPagamento);
router.post('/RemoveMetodoPagamento',removeMetodoPagamento);
router.post('/AggiornaPatente', aggiornaPatente);
router.post("/AddDipendente",registraUtente);
router.post("/AggiornaParcheggio",aggiornaParcheggio);


export default router;