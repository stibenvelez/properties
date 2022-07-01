import { allContactManagement, allToContact, insertContactManagement, insertContactMe, ToContactById } from "./contact.DAL.js";

export const contactMeServices = async (contact) => {
    try {
        contact.state = 1;
        return await insertContactMe(contact);
    } catch (error) {
        throw error;
    }
};

export const getToContactListServices = async () => {
    try {
        return await allToContact();
    } catch (error) {
        throw error;
    }
};

export const getToContactByIdServices = async (req, res) => {
    const id = req.params.id;
    try {
        const [contact] = await ToContactById(id);
        const contactManagement = await allContactManagement(id);
        contact.management = contactManagement || [];

        if (!contact) {
            res.status(404).json({ msg: "No se encontro el contacto" });
            return
        }
        return contact;
    } catch (error) {
        throw error;
    }
};

export const createContactManagementServices = async (req, res) => {
    const id = req.params.id;
    try {
        const managementData = req.body;
        managementData.managedBy = req.user.idUser;
        await insertContactManagement(managementData);
    } catch (error) {
        throw error;
    }
}
