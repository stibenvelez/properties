import connection from "../../config/db.js";

export const allCityes = async () => {
    try {
        const sql = `
        SELECT c.*,
        d.departament,
        COUNT(c.cityId) AS countProperties
        FROM Cities AS c

        LEFT JOIN Departaments AS d ON d.idDepartament = c.IdDepartament
        INNER JOIN Properties AS p ON p.cityId = c.cityId
        GROUP BY c.cityId
        ORDER BY COUNT(c.cityId) DESC
        `;
        return await connection.query(sql);
    } catch (error) {
        console.log(error);
        throw error
    }
};
