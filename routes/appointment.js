const router = require('express').Router();
const connection = require('../config/conexion');

// Obtener todas las citas
router.get('/showAppointments', (req, res) => {
    const sql = "SELECT * FROM appointments";

    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Error al obtener citas:", err);
            res.status(500).json({
                error: 'Error al obtener citas',
                data: null
            });
        } else {
            res.json({
                error: null,
                message: 'success',
                data: result
            });
        }
    });
});

// Crear una nueva cita
router.post('/registerAppointment', (req, res) => {
    const { name, email, phone, date, hour} = req.body;

    const sql = "INSERT INTO appointment(app_name, app_email, app_phone, app_date, app_hour) VALUES (?) ";
    
    const values = [name, email, phone, date, hour];
    connection.query(sql, [values], (err, result) => {
        if (err) throw err;
        console.log('new appointment');
        res.json({
            error: null,
            data: result
        })
    });
});

// Eliminar una cita por su ID
router.delete('/deleteappointment/:id', (req, res) => {
    const { id } = req.params;

    const sql = `
        DELETE FROM appointment
        WHERE app_id = ?
    `;
    const values = [id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al eliminar la cita:", err);
            res.status(500).json({
                error: 'Error al eliminar la cita',
                data: null
            });
        } else {
            if (result.affectedRows > 0) {
                res.json({
                    error: null,
                    message: 'Cita eliminada exitosamente'
                });
            } else {
                res.status(404).json({
                    error: 'No se encontró la cita',
                    data: null
                });
            }
        }
    });
});

// Consulta para el calendario.
router.get('/cons2Appointments', (req, res) => {
    const sql = `
        SELECT p.pat_name AS pat_nombre, p.pat_lastname, a.app_date, a.app_hour, a.app_doc_id
        FROM appointment AS a
        INNER JOIN patients AS p ON a.app_pat_id = p.pat_id
    `;

    connection.query(sql, (err, result) => {
        if (err) {
            console.error("Error al obtener citas específicas:", err);
            res.status(500).json({
                error: 'Error al obtener citas específicas',
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

module.exports = router;