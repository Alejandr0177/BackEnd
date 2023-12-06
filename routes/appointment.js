const router = require('express').Router();
const connection = require('../config/conexion');

// Obtener todas las citas
router.get('/showAppointments', (req, res) => {
    const sql = `
        SELECT p.pat_name AS pat_nombre, p.pat_email, p.pat_phone, a.app_date, a.app_hour AS app_time
        FROM appointment AS a
        INNER JOIN patients AS p ON a.app_pat_id = p.pat_id
    `;

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
                data: result
            });
        }
    });
});

// Crear una nueva cita
router.post('/registerAppointment', (req, res) => {
    const { date, hour, doc_id, pat_id } = req.body;

    const sql = "INSERT INTO appointment (app_date, app_hour, app_doc_id, app_pat_id) VALUES (?,?,?,?) ";
    const values = [date, hour, doc_id, pat_id];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error al crear la cita:", err);
            res.status(500).json({
                error: 'Error al crear la cita',
                data: null
            });
        } else {
            res.json({
                error: null,
                message: 'Cita creada exitosamente'
            });
        }
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

module.exports = router;