import express from "express";
const routes = express.Router();
import propertiesRoutes from '../components/properties/routes.js'
import citiesRoutes from '../components/cities/routes.js'
import userRoutes from '../components/user/routes.js'
import suscriptionsRoutes from '../components/suscriptions/routes.js'
import propertyRoutesAdmin from '../components/properties/routes.admin.js'
import departamentsRoutes from '../components/departaments/routes.js'



routes.use(express.static("public"));
routes.use("/properties", propertiesRoutes);
routes.use('/cities', citiesRoutes)
routes.use("/users", userRoutes);
routes.use("/suscriptions", suscriptionsRoutes);

routes.use("/admin/properties", propertyRoutesAdmin);
routes.use("/departaments", departamentsRoutes);
routes.post('/prueba', (req, res)=> res.json(req.body))




export default routes