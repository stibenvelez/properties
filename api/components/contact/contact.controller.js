import { contactMeServices, getToContactServices } from "./contact.services.js";


export const contactMe = async (req, res) => {
    try {
        await contactMeServices(req.body);
        res.json({msg: "Contact me"});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'error obteneindo la configuración'})
    }
};


export const getAllToContact = async (req, res) => {
    try {
        const result = await getToContactServices();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'error obteneindo la configuración'})
    }
}