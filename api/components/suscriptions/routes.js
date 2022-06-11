import express from "express";
import connection from "../../config/db.js";
const router = express.Router();

router.post('/', async (req, res) => {
    const email = req.body.email
    
    try {
        const sql = `INSERT INTO Subscriptions (email) VALUES ('${email}')`;
        const [rows] = await connection.query(sql);
        res.status(200).json(rows)
    } catch (error) {

        if (error.code == "ER_DUP_ENTRY") {
            res.status(400).send("Ya te encuentras registrado con este email",
            );
            return;
        }

        res.status(500).json('Algo salió mal, intenta nuevamente');
        console.log(error);
    }
});


export default router;