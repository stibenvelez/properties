import generateJWT from "../../helpers/generatejwt.js";
import {
    confirmUserByToken,
    findUserByEmail,
    findUserById,
    findUserByNameUser,
    findUserByToken,
    updateUser,
} from "./user.DAL.js";
import {
    authService,
    createUserService,
    forgetPassswordService,
} from "./user.services.js";
import bcrypt from "bcrypt";

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
                email: result.email,
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

        const updateDataUser = {
            idUser: userToConfirm.idUser,
            confirmed: 1,
            token: "",
        };
        await confirmUserByToken(updateDataUser);
        res.json({ msg: "usuario confirmado" });
        // TODO update user
    } catch (error) {
        console.log(error);
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
};

export const forgetPassword = async (req, res) => {
    try {
        await forgetPassswordService(req.body);
        res.json({ mgs: "ok" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};

export const checkToken = async (req, res) => {
    try {
        const { token } = req.params;
        const [isValidToken] = await findUserByToken(token);

        if (!isValidToken) {
            throw new Error("Token no valido");
        }
        res.json({ msg: "token valido y el usuario existe" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};

export const newPassword = async (req, res) => {
    try {
        const { token } = req.params;
        const { password } = req.body;
        const [user] = await findUserByToken(token);
        if (!user) {
            throw new Error("Token no valido");
        }

        const updateData = {
            ...user,
            idUser: user.idUser,
            password: password,
            token: "",
        };

        const salt = await bcrypt.genSalt(10);
        updateData.password = await bcrypt.hash(updateData.password, salt);
        console.log(updateData);
        await updateUser(updateData);
        res.json({ msg: "Contraseña actualizada con exito" });
        
    } catch (error) {
        console.log(error);
    }
};

export const getProfile = async (req, res) => {
    try {
        const { user } = req;
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};
