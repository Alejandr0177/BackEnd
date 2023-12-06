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
    const sql = "INSERT INTO patients(pat_name, pat_lastname , pat_email, pat_phone, pat_birth, pat_gender, pat_treatment, pat_bloodgroup) VALUES (?) ";
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

router.post('/updatePat/:id', async (req, res) => {
    const { id } = req.params; // Obtener el ID del paciente de los parámetros de la URL
    const { name, lastname, email, phone, birth, gender, treatment, bloodgroup } = req.body;

    console.log(id)

    const sql = `
        UPDATE patients 
        SET pat_name = ?, pat_lastname = ?, pat_email = ?, pat_phone = ?, pat_birth = ?, pat_gender = ?, pat_treatment = ?, pat_bloodgroup = ?
        WHERE id_pat= ?`; 

    const values = [name, lastname, email, phone, birth, gender, treatment, bloodgroup, id];

    connection.query(sql, values , function (err, result) {
        if (err) {
            console.error("Error al actualizar paciente:", err);
            res.status(500).json({
                error: 'Error al actualizar paciente',
                data: null
            });
        } else {
            console.log("Información del paciente actualizada");
            res.json({
                error: null,
                data: result
            });
        }
    });
});

// Ruta para eliminar un paciente por su ID
router.delete('/deletePat/:id', async (req, res) => {
    const { id } = req.params;

    const sql = `DELETE FROM patients WHERE id_pat = ?`; 

    connection.query(sql, id, function (err, result) {
        if (err) {
            console.error("Error al eliminar paciente:", err);
            res.status(500).json({
                error: 'Error al eliminar paciente',
                data: null
            });
        } else {
            if (result.affectedRows > 0) {
                console.log("Paciente eliminado exitosamente");
                res.json({
                    error: null,
                    message: 'Paciente eliminado exitosamente'
                });
            } else {
                console.log("No se encontró el paciente para eliminar");
                res.status(404).json({
                    error: 'Paciente no encontrado',
                    data: null
                });
            }
        }
    });
});


module.exports = router;