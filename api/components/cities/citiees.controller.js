import { getAllCityesService } from "./cities.services.js"


export const getAllCityes = async (req, res) => {
        try {
            const result = await getAllCityesService()
            res.json(result)
        } catch (error) {
            res.status(400).json({msg: 'error obteneindo las ciudades'})
    }
}