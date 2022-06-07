import generateJWT from "../../helpers/generateJWT..js";
import { findUserByNameUser } from "./user.DAL.js";


export const auth = async (req, res) => {
    const { user, password } = req.body;
    const rows = await findUserByNameUser(user);

    if (rows.length === 0) {
        const error = new Error("El usuario no existe");
        res.status(404).json({ msg: error.message });
        return;
    }
    // valid password
    if (rows[0].password !== password) {
        const error = new Error("clave incorrecta");
        res.status(403).json({ msg: error.message });
        return;
    }
    
    // create token    
   
    res.json({
        id: rows[0].id,
        user: rows[0].user,
        token: generateJWT({ user: user }),
    });
      
};