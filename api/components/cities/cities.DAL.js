import connection from "../../config/db.js";

export const allCityes = async () => {
    try {
        const sql = `
        SELECT*
        FROM Cities AS c

        LEFT JOIN Departaments AS d ON d.idDepartament = c.IdDepartament
        `;
        return await connection.query(sql);
    } catch (error) {
        console.log(error);
        throw error
    }
};
