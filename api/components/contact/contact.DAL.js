import connection from "../../config/db.js";

export const insertContactMe = async (contact) => {
    try {
        const sql = `
            INSERT INTO Contactme (
                email,
                firstName,
                lastName,
                message,
                observations,
                contactedBy,
                idProperty,
                state
            )
            VALUES (
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?,
                ?
            )

                `;
        const values = [
            contact.email,
            contact.firstName,
            contact.lastName,
            contact.message,
            contact.observations,
            contact.contactedBy,
            contact.idProperty,
            contact.state,
        ];
        const [result] = await connection.query(sql, values);
        return result;
    } catch (error) {
        throw error;
    }
};

export const allToContact = async () => {
    try {
        const sql = `
            SELECT *
            FROM Contactme
            ORDER BY id DESC
            `;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    }
}