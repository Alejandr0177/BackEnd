const router = require('express').Router();
const connection = require('../config/conexion');

router.get('/showAppointments', async (req, res) => {
    const sql = `
        SELECT a.*, p.pat_name, p.pat_lastname, p.pat_email, p.pat_phone, p.pat_birth, p.pat_gender, p.pat_treatment, p.pat_bloodgroup 
        FROM appointment AS a 
        INNER JOIN patients AS p ON a.app_id_pat = p.id_pat
    `;

    connection.query(sql, function (err, result) {
        if (err) {
            console.error("Error al obtener citas:", err);
            res.status(500).json({
                error: 'Error al obtener citas',
                data: null
            });
        } else {
            res.json({
                error: null,
                data: result
            });
        }
    });
});

