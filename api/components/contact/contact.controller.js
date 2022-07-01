import { contactMeServices, createContactManagementServices, getToContactByIdServices, getToContactListServices } from "./contact.services.js";


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
        const result = await getToContactListServices();
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'error obteneindo la configuración'})
    }
}

export const getToContactById = async (req, res) => {
    try {
        const result = await getToContactByIdServices(req, res);
        res.json(result);
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'error obteneindo la configuración'})
    }
}

export const createContactManagement = async (req, res) => {
    try {
        await createContactManagementServices(req, res);
        res.json({msg: "Contact me"});
    } catch (error) {
        console.log(error);
        res.status(400).json({msg: 'error obteneindo la configuración'})
    }
}