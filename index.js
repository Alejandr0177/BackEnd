const express = require('express');
const cors = require('cors');
const session = require('express-session'); // Agrega la importación de express-session

const corsOptions = require('./config/corsOptions');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

const app = express();

// Configuración de express-session
app.use(session({
  secret: 'tu_secreto', // Deberías cambiar esto por una cadena segura
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const route_doctors = require('./routes/doctors');
app.use('/', route_doctors);

const route_patients = require('./routes/patients');
app.use('/', route_patients);

const route_appointment = require('./routes/appointment');
app.use('/', route_appointment);

app.listen(PORT, () => {
  console.log(`Escuchando Puerto: ${PORT}`);
});
