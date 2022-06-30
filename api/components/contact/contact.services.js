import {  allToContact, insertContactMe, ToContactById } from "./contact.DAL.js";

export const contactMeServices = async (contact) => {
    try {
        contact.state = 1
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
}

export const getToContactByIdServices = async id => {
    try {
        const [contact] = await ToContactById(id)
        return contact;
    } catch (error) {
        throw error;
    }
}