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

export const ToContactById = async id => {
    try {
        const sql = `
            SELECT c.*, sc.state
            FROM Contactme AS c
            INNER JOIN StatesContact AS sc ON c.stateId = sc.stateId
            WHERE id = ${id}
            `;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    }
}

export const allContactManagement = async id => {
    try {
        const sql = `
            SELECT cm.*, sc.state
            FROM ContactManagement AS cm
            INNER JOIN StatesContact AS sc ON cm.idStateContact  = sc.stateId
            WHERE cm.contactMeId  = ${id}
            ORDER BY createdAt ASC
            `;
        const [result] = await connection.query(sql);
        return result;
    } catch (error) {
        throw error;
    }
}

export const insertContactManagement = async (contactManagement) => {
    try {
        const sql = `
            INSERT INTO ContactManagement (
                idStateContact,
                observations,
                managedBy,
                contactMeId
            )
            VALUES (
                ?,
                ?,
                ?,
                ?
            )

                `;
        const values = [
            contactManagement.state,
            contactManagement.observations,
            contactManagement.managedBy,
            contactManagement.id,
        ];
        const [result] = await connection.query(sql, values);
        return result;
    } catch (error) {
        throw error;
    }
}