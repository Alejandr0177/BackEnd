const express = require('express');
const cors = require('cors');

const corsOptions = require('./config/corsOptions');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000

const app = express();

app.use(cors(corsOptions));

app.use(bodyParser.urlencoded({extended: false}));

app.use(bodyParser.json());

const route_doctors = require('./routes/doctors')
app.use('/', route_doctors)

const route_patients = require('./routes/patients')
app.use('/', route_patients)

const route_appointment = require('./routes/appointment')
app.use('/', route_appointment)

app.listen(PORT, () => {
    console.log(`Escuchando Puerto: ${PORT}`)
})