import {  allToContact, insertContactMe } from "./contact.DAL.js";

export const contactMeServices = async (contact) => {
    try {
        contact.state = 1
        return await insertContactMe(contact);
    } catch (error) {
        throw error;
    }
};

export const getToContactServices = async () => {
    try {
        return await allToContact();
    } catch (error) {
        throw error;
    }
}