import express from 'express';
import {addPrenotazione,listaVeicoliPrenotazione, listaPrenotazioniAddetto, listaPrenotazioniAdmin, listaPrenotazioniAutista, listaPrenotazioniCliente, getTariffe, deleteBooking, terminaPrenotazione, modifyVehicle, completaNuovoVeicolo, verifyArrive, completeModifyArrive, aggiornaArrivoIncompleta, accettaCorsa, datiPrenotazione, pagaAutista, rifiutaCorsa, rifiutaModifica} from '../Controllers/Prenotazione.js'

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
router.post("/ModifyVehicle",modifyVehicle);
router.post("/CompletaNuovoVeicolo",completaNuovoVeicolo);
router.post("/VerifyArrive",verifyArrive);
router.post("/CompleteModifyArrive",completeModifyArrive);
router.post("/AggiornaArrivoIncompleta",aggiornaArrivoIncompleta);
router.post("/AccettaCorsa",accettaCorsa);
router.post("/DatiPrenotazione",datiPrenotazione);
router.post("/PagaAutista",pagaAutista);
router.post("/RifiutaCorsa",rifiutaCorsa);
router.post("/RifiutaModifica",rifiutaModifica);



export default router;