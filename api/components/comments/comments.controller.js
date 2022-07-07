import { createCommentService } from "./comments.services.js";


export const createComment = async (req, res) => {
    try {
        await createCommentService(req, res);
        res.status(200).json({ msg: "Comentario creado" });
    } catch (error) {
        throw error;
    }
}