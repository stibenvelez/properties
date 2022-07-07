import { insertComment } from "./comments.DAL.js";

export const createCommentService = async (req, res) => {
    const data = req.body;
    try {
        await insertComment(data);
    } catch (error) {
        throw error;
    }
}
