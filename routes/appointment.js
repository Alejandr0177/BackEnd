const router = require('express').Router();
const connection = require('../config/conexion');

router.get('/showAppointments', async (req, res) => {
    const sql = `
        SELECT a.*, p.pat_name, p.pat_lastname, p.pat_email, p.pat_phone, p.pat_birth, p.pat_gender, p.pat_treatment, p.pat_bloodgroup
        FROM appointment AS a 
        INNER JOIN patients AS p ON a.app_pat_id = p.pat_id
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

router.post('/registerAppointment', async (req, res) => {
    const { date, hour, id_doc, id_pat } = req.body;

    const sql = " INSERT INTO appointment (app_date, app_hour, app_id_doc, app_id_pat) VALUES (?) ";
    const values = [date, hour, id_doc, id_pat];

    connection.query(sql, values, function (err, result) {
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

// router.put('/updateAppointment/:id', async (req, res) => {
//     const { id } = req.params;
//     const { app_date, app_hour, app_id_doc, app_id_pat } = req.body;

//     const sql = " UPDATE appointment SET app_date = ?, app_hour = ?, app_id_doc = ?, app_id_pat = ? WHERE id_app = ? ";
//     const values = [app_date, app_hour, app_id_doc, app_id_pat, id];

//     connection.query(sql, values, function (err, result) {
//         if (err) {
//             console.error("Error al actualizar la cita:", err);
//             res.status(500).json({
//                 error: 'Error al actualizar la cita',
//                 data: null
//             });
//         } else {
//             res.json({
//                 error: null,
//                 message: 'Cita actualizada exitosamente'
//             });
//         }
//     });
// });


// router.delete('/deleteAppointment/:id', async (req, res) => {
//     const { id } = req.params;

//     const sql = " DELETE FROM appointment WHERE id_app = ?";
//     const values = [id];

//     connection.query(sql, values, function (err, result) {
//         if (err) {
//             console.error("Error al eliminar la cita:", err);
//             res.status(500).json({
//                 error: 'Error al eliminar la cita',
//                 data: null
//             });
//         } else {
//             if (result.affectedRows > 0) {
//                 res.json({
//                     error: null,
//                     message: 'Cita eliminada exitosamente'
//                 });
//             } else {
//                 res.status(404).json({
//                     error: 'No se encontró la cita',
//                     data: null
//                 });
//             }
//         }
//     });
// });


module.exports = router;