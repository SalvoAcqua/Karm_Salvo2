import express from 'express';
import {prendiNonLette,prendiNotifiche,eliminaNotifica,notificaModificaAccettata,notificaModificaRifiutata} from "../Controllers/Notifiche.js"

const router = express.Router();

router.post("/prendiNonLette",prendiNonLette);
router.post("/prendiNotifiche",prendiNotifiche);
router.post("/eliminaNotifiche",eliminaNotifica);
router.post("/AccettaModifica",notificaModificaAccettata);
router.post("/RifiutaModifica",notificaModificaRifiutata);



export default router;