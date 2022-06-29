import connection from "../../config/db.js";

export const insertContactMe = async (contact) => {
    console.log(contact);
    try {
        const sql = `
            INSERT INTO Contactme (
                email,
                firstName,
                lastName,
                message,
                observations,
                contactedBy,
                state
            )
            VALUES (
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
            contact.state,
        ];
        const [result] = await connection.query(sql, values);
        return result;
    } catch (error) {
        throw error;
    }
};