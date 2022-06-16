import express from "express";
const routes = express.Router();
import propertiesRoutes from '../components/properties/routes.js'
import citiesRoutes from '../components/cities/routes.js'
import userRoutes from '../components/user/routes.js'
import suscriptionsRoutes from '../components/suscriptions/routes.js'


routes.use(express.static("public"));
routes.use("/properties", propertiesRoutes);
routes.use('/cities', citiesRoutes)
routes.use("/users", userRoutes);
routes.use("/suscriptions", suscriptionsRoutes);


export default routes