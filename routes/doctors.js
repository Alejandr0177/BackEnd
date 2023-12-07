const router = require('express').Router();
const bcrypt = require('bcrypt');
const connection = require('../config/conexion');
const jwt = require('jsonwebtoken')

router.get('/showDocs', async (req, res) => {
    const sql = "SELECT * FROM doctors"
    connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.json({
            error: null,
            data: result
        })
    });
})

router.post('/registerDoc', async (req, res) => {
    const body = req.body;
    const {name, app, apm, email, password, phone} = req.body;
    const e_sql = `SELECT * FROM doctors WHERE doc_email = '${email}'`
    connection.query(e_sql, async function (err, result){
        if (err) throw err;
        if (result.length != 0){
            return res.status(401).json({
                error: `The "email: ${email}" you entered already exists`
            });
        }
        const p_sql = `SELECT * FROM doctors WHERE doc_phone = '${phone}'`
        connection.query(p_sql, async function (err, result){
            if (err) throw err;
            if (result.length != 0){
                return res.status(401).json({
                    error: `The "phone: ${phone}" you entered already exists`
                })
            }
            const sql = "INSERT INTO doctors(doc_name, doc_app, doc_apm, doc_email, doc_password, doc_phone) VALUES (?) ";
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt)
            const values = [name, app, apm, email, password, phone];
            connection.query(sql, [values], function (err, result) {
                if (err) throw err;
                console.log("New registered user");
                res.json({
                    error: null,
                    data: result
                });
            });
        })
    })
})

router.post('/loginDoc', async (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT doc_id, doc_email, doc_password, doc_name FROM doctors WHERE doc_email = '${email}'`;
    connection.query(sql, async function (err, result) {
        if (err) throw err;
        if (result.length === 0) {
            return res.status(401).json({
                error: 'Email not Found'
            });
        }
        /*const correctPassword = await bcrypt.compare(password, result[0].doc_password)
        if(!correctPassword) {
            return res.status(400).json({
                error: "Las contraseñas no coinciden"
            })
        }*/
        if(password != result[0].doc_password){
            return res.status(400).json({
                error: "Las contraseñas no coinciden"
            })
        }

        //const user = {username: result[0].doc_name};
        //const accessToken = generateAccessToken(user)

        const accessToken = jwt.sign({
            username: result[0].doc_name,
            id: result[0].doc_id,
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '30m'
        })
        const refreshToken = jwt.sign({
            username: result[0].doc_name,
            id: result[0].doc_id,
        }, process.env.REFRESH_TOKEN_SECRET, {
            expiresIn: '1d'
        })
        res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 })
        res.header('authorization', accessToken).json ({
            error: null,
            message: 'Authenticated_user',
            username: result[0].doc_name,
            id: result[0].doc_id,
            accessToken: accessToken
        })

        /*if (password === result[0].doc_password) {
            // Almacenar id_doc en la sesión
            req.session.id_doc = result[0].doc_id;

            res.json({
                'alert': 'SESSION_START()',
                data: result
            });
        } else {
            return res.status(401).json({
                error: 'Incorrect password'
            });
        }*/
    });
});


module.exports = router;