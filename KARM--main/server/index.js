import express from 'express';
import bodyParser from 'body-parser';
import mongoose  from 'mongoose';
import cors from 'cors';

import {databaseURI} from "./DB/database.js";
import GestioneAccount from './Routers/GestioneAccount.js';
import GestioneAmministrazione from './Routers/GestioneAmministrazione.js';
import Prenotazione from './Routers/Prenotazione.js';
import GestioneCorsa from './Routers/GestioneCorsa.js';
import Notifiche from './Routers/Notifiche.js';

const app = express();
app.use(cors());
app.use(express.json());
//consente al sistema di utilizzare json
app.use(bodyParser.json({ extended: false}));
//dice al sistema se si desidera utilizzare un algoritmo complesso 
//per l'analisi approfondita in grado di gestire oggetti nidificati
app.use(bodyParser.urlencoded({ extended: false}));


app.use('/Routers/GestioneAccount', GestioneAccount);
app.use('/Routers/GestioneAmministrazione', GestioneAmministrazione);
app.use('/Routers/Prenotazione',Prenotazione);
app.use('/Routers/GestioneCorsa',GestioneCorsa);
app.use('/Routers/Notifiche',Notifiche);



const CONNECTION_URL = databaseURI.mongoURI;
const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL,{useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => app.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((err) => console.log(err.message));

mongoose.set('useFindAndModify',false);
