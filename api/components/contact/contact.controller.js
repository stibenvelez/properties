import { contactMeServices } from "./contact.services.js";


export const contactMe = async (req, res) => {
    try {
        await contactMeServices(req.body);
        res.json({msg: "Contact me"});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'error obteneindo la configuración'})
    }
};
