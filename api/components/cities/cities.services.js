import { allCityes } from "./cities.DAL.js";


export const getAllCityesService = async () => {
    try {
        const [result] = await allCityes();
        return result;
    } catch (error) {
        throw error
    }
}