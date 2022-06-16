import connection from "../../config/db.js";


const USERS_TABLE = [
    {id: 1,
    user: "admin",
    password: "admin"}
];


export const findUserByNameUser = async (user) => {
    
    const query = USERS_TABLE.filter((data) => data.user === user);

    return query;
}

export const inserUser = async (user) => {
    console.log('desde DAL', user)
    try {
        const sql = `INSERT INTO Users (
            firstName,
            lastName,
            email,
            password,
            idRole,
            token
        )
        VALUES (
            '${user.firstName}',    
            '${user.lastName}',
            '${user.email}',
            '${user.password}',
            '${user.role}',
            '${user.token}'
        )`;
        return await connection.query(sql);
    } catch (error) {
        throw error;
    }

}

export const findUserByEmail = async (email) => {
    try {
        const sql = `SELECT * FROM Users WHERE email = '${email}'`;
        const [user] = await connection.query(sql);
        return user;
    } catch (error) {
        throw error;
    }
}
export const findUserByToken = async (token) => {
    try {
        const sql = `SELECT * FROM Users WHERE token = '${token}'`;
        const [user] = await connection.query(sql);
        return user;
    } catch (error) {
        throw error;
    }
};