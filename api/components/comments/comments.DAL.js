import connection from "../../config/db.js";

export const insertComment = async (comment) => {
    try {
        const sql = `INSERT INTO CommentsProperties (
            name,
            comment,
            score,
            propertyId
        )
        VALUES (
            '${comment.name}',
            '${comment.comment}',
            '${comment.score}',
            '${comment.propertyId}'
        )`;
        return await connection.query(sql);
    } catch (error) {
        throw error;
    }
}

export const getCommentsById = async (propertyId) => {
    try {
        const sql = `SELECT * FROM CommentsProperties WHERE propertyId = '${propertyId}'`;
        const [comments] = await connection.query(sql);
        return comments;
    } catch (error) {
        throw error;
    }
}
