import express from 'express';
import {addPrenotazione,listaVeicoliPrenotazione, listaPrenotazioniAddetto, listaPrenotazioniAdmin, listaPrenotazioniAutista, listaPrenotazioniCliente} from '../Controllers/Prenotazione.js'

const router = express.Router();

router.post("/AddPrenotazione",addPrenotazione);
router.post("/ListaVeicoli",listaVeicoliPrenotazione);
router.post("/ListaPrenotazioniAddetto",listaPrenotazioniAddetto);
router.post("/ListaPrenotazioniAdmin",listaPrenotazioniAdmin);
router.post("/ListaPrenotazioniAutista",listaPrenotazioniAutista);
router.post("/ListaPrenotazioniCliente",listaPrenotazioniCliente);

export default router;