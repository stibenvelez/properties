import generateJWT from "../../helpers/generatejwt.js";
import { findUserByEmail, findUserByNameUser, findUserByToken } from "./user.DAL.js";
import { authService, createUserService } from "./user.services.js";

export const auth = async (req, res) => {
    try {
        const user = req.body;
        const [result] = await authService(user);
        res.json({
            idUser: result.idUser,
            firstName: result.firstName,
            lastName: result.lastName,
            email: result.email,
            token: generateJWT({
                idUser: result.idUser,
                firstName: result.firstName,
                lastName: result.lastName,
                email: result.email
            }),
        });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

export const confirmUser = async (req, res) => {
    try {
        const { token } = req.params;
        const [userToConfirm] = await findUserByToken(token);
        if (!userToConfirm) {
            throw new Error("Token no valido");
        }
        userToConfirm.confirmed = 1;
        userToConfirm.token = "";
        console.log(userToConfirm);
        // TODO update user
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};


export const createUser = async (req, res) => {
    try {
        await createUserService(req.body);
        res.json({ mgs: "Usuario creado" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
    //await createUserService(req.body);
};
