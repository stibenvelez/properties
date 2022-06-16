import jwt from "jsonwebtoken";

const generateJWT = ({ idUser, firstName, lastName, email }) => {
    return jwt.sign(
        { idUser, firstName, lastName, email },
        process.env.JWT_SECRET,
        {
            expiresIn: "30d",
        }
    );
};

export default generateJWT;