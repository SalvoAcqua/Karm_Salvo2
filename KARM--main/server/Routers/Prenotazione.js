import express from 'express';
import {addPrenotazione,listaVeicoliPrenotazione, listaPrenotazioniAddetto, listaPrenotazioniAdmin, listaPrenotazioniAutista, listaPrenotazioniCliente, getTariffe, deleteBooking, terminaPrenotazione, accettaCorsa, datiPrenotazione, pagaAutista, rifiutaCorsa} from '../Controllers/Prenotazione.js'

const router = express.Router();

router.post("/AddPrenotazione",addPrenotazione);
router.post("/ListaVeicoli",listaVeicoliPrenotazione);
router.post("/ListaPrenotazioniAddetto",listaPrenotazioniAddetto);
router.post("/ListaPrenotazioniAdmin",listaPrenotazioniAdmin);
router.post("/ListaPrenotazioniAutista",listaPrenotazioniAutista);
router.post("/ListaPrenotazioniCliente",listaPrenotazioniCliente);
router.post("/GetTariffe",getTariffe);
router.post("/DeleteBooking",deleteBooking);
router.post("/TerminaPrenotazione",terminaPrenotazione);
router.post("/AccettaCorsa",accettaCorsa);
router.post("/DatiPrenotazione",datiPrenotazione);
router.post("/PagaAutista",pagaAutista);
router.post("/RifiutaCorsa",rifiutaCorsa);


export default router;