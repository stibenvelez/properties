import express from "express";
import cors from "cors";
import routes from "./routes/routes.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/v1/', routes)
app.use(express.static("public"));
export default app;
