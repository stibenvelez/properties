import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/', routes)

export default app;
