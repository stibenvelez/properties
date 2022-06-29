import {  insertContactMe } from "./contact.DAL.js";

export const contactMeServices = async (contact) => {
    try {
        return await insertContactMe(contact);
    } catch (error) {
        throw error;
    }
};