import express from 'express';
import {prendiNonLette,prendiNotifiche} from "../Controllers/Notifiche.js"

const router = express.Router();

router.post("/prendiNonLette",prendiNonLette);
router.post("/prendiNotifiche",prendiNotifiche);


export default router;