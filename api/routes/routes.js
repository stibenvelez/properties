import express from "express";
const routes = express.Router();
import propertiesRoutes from '../components/properties/routes.js'
import citiesRoutes from '../components/cities/routes.js'
import userRoutes from '../components/user/routes.js'

routes.use("/properties", propertiesRoutes);
routes.use('/cities', citiesRoutes)
routes.use("/admin", userRoutes);

export default routes