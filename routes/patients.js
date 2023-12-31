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
    const {name, lastname, email, phone, birth, gender, treatment, bloodgroup} = req.body;
    const e_sql = `SELECT * FROM patients WHERE pat_email = '${email}'`
        connection.query(e_sql, async function (err, result){
            if (err) throw err;
            if (result.length != 0){
                return res.status(401).json({
                    error: `The "email: ${email}" you entered already exists`
                })
            }
            const p_sql = `SELECT * FROM patients WHERE pat_phone = '${phone}'`
            connection.query(p_sql, async function (err, result){
                if (err) throw err;
                if (result.length != 0){
                    return res.status(401).json({
                        error: `The "email: ${phone}" you entered already exists`
                    })
                }
                const sql = "INSERT INTO patients(pat_name, pat_lastname , pat_email, pat_phone, pat_birth, pat_gender, pat_treatment, pat_bloodgroup) VALUES (?) ";
                const values = [name, lastname, email, phone, birth, gender, treatment, bloodgroup];
                connection.query(sql, [values], function (err, result){
                    if (err) throw err;
                    console.log("New registered patient");
                    res.json({
                        error: null,
                        data: result
                    })
                })
            })
        })
})

router.put('/updatePat', async (req, res) => {
    //const { id } = req.params; // Obtener el ID del paciente de los parámetros de la URL
    const { pat_id, name, lastname, birth, gender, treatment, bloodgroup, doc_id} = req.body;
    const sql = 
            `UPDATE patients ` +
            `SET pat_name = '${name}', pat_lastname = '${lastname}',  pat_birth = '${birth}', pat_gender = '${gender}', pat_treatment = '${treatment}', pat_bloodgroup = '${bloodgroup}' `+
            `WHERE pat_id= '${pat_id}';`;
    connection.query(sql, function (err, result){
        if (err) throw err;
        console.log("Update Patient");
        res.json({
            error: null,
            data: result
        })
    })
    /*const sql = `
        UPDATE patients 
        SET pat_name = ?, pat_lastname = ?, pat_email = ?, pat_phone = ?, pat_birth = ?, pat_gender = ?, pat_treatment = ?, pat_bloodgroup = ?, pat_doc_id = ?
        WHERE pat_id= ?`;
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
    });*/
});

// Ruta para eliminar un paciente por su ID
router.delete('/deletePat/:pat_id', async (req, res) => {
    const {pat_id} = req.params;
    const sql = `DELETE FROM patients WHERE pat_id = ?`; 
    connection.query(sql, pat_id, function (err, result) {
        if (err) throw err;
        //console.log(err);
        res.json({
            error: null,
            data: result
        })
    });
});


module.exports = router;