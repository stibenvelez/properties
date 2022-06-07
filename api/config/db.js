import mysql from "mysql2/promise";

// Create the connection pool. The pool-specific settings are the defaults
const connection = mysql.createPool({
    host: "151.106.97.204",
    user: "u189463349_admin",
    database: "u189463349_booking_db",
    password: "7O#qxa;/itN@",
    waitForConnections: true,
    connectionLimit: 10,
});

export default connection;
