import app from './app.js'
import doenv from "dotenv";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

doenv.config()
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});