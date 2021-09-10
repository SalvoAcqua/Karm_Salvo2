import express from 'express';

import {verifyDelivery, verifyRelease, assegnaLuogo, completaRilascio, richiediNuovoVeicolo,rimborso} from "../Controllers/GestioneCorsa.js"

const router = express.Router();

router.post('/verifyDelivery',verifyDelivery);
router.post('/verifyRelease',verifyRelease);
router.post('/assegnaLuogo',assegnaLuogo);
router.post('/completaRilascio',completaRilascio);
router.post('/richiediNuovoVeicolo',richiediNuovoVeicolo);
router.post('/rimborso',rimborso);

export default router;