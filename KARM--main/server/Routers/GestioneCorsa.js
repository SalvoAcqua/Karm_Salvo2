import express from 'express';

import {verifyDelivery, completaRilascio} from "../Controllers/GestioneCorsa.js"

const router = express.Router();

router.post('/verifyDelivery',verifyDelivery);
router.post('/completaRilascio',completaRilascio);


export default router;