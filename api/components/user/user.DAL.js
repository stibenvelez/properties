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
