import express from 'express';

import {verifyDelivery, verifyRelease, assegnaLuogo, completaRilascio} from "../Controllers/GestioneCorsa.js"

const router = express.Router();

router.post('/verifyDelivery',verifyDelivery);
router.post('/verifyRelease',verifyRelease);
router.post('/assegnaLuogo',assegnaLuogo);
router.post('/completaRilascio',completaRilascio);


export default router;