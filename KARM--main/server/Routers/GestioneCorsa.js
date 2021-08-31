import express from 'express';

import {verifyDelivery} from "../Controllers/GestioneCorsa.js"

const router = express.Router();

router.post('/verifyDelivery',verifyDelivery);


export default router;