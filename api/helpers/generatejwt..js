import jwt from "jsonwebtoken";

const generateJWT = ({ id , user}) => {
    return jwt.sign({ id, user }, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
};

export default generateJWT;