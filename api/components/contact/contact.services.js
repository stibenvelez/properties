import {  insertContactMe } from "./contact.DAL.js";

export const contactMeServices = async (contact) => {
    try {
        contact.state = 1
        return await insertContactMe(contact);
    } catch (error) {
        throw error;
    }
};