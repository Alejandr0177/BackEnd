const router = require('express').Router();
const connection = require('../config/conexion');

router.get('/showPats', async (req, res) => {
    const sql = "SELECT * FROM patients"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            error: null,
            'alert': "success",
            data: result
        });
    });
})

router.post('/registerPat', async (req, res) => {
    const body = req.body;
    const {name, lastname, email, phone, birth, gender, treatment, bloodgroup} = req.body;
    const sql = "INSERT INTO patients(pat_name, pat_lastname, pat_email, pat_phone, pat_birth, pat_gender, pat_treatment, pat_bloodgroup) VALUES (?) ";
    const values = [name, lastname, email, phone, birth, gender, treatment, bloodgroup];
    connection.query(sql, [values], function (err, result) {
        if (err) throw err;
        console.log("New registered patient");
        res.json({
            error: null,
            data: result
        });
    });
})

module.exports = router;