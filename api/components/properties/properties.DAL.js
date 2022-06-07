import connection from "../../config/db.js";

export const allProperties = async ({
    rangePrices,
    propertyType,
    bedrooms,
    bathrooms,
    city,
    category,
}) => {
    try {
        const filterByRangePrices = () => {
            if (rangePrices && rangePrices[0] == 0 && rangePrices[1] == 0) {
                return `p.price >0`;
            }

            if (rangePrices && rangePrices[0] && rangePrices[1]) {
                return `p.price >= ${rangePrices[0]} AND p.price <= ${rangePrices[1]}`;
            }
            return `p.price >0`;
        };

        const filterByPropertyType = () => {
            if (propertyType) {
                return `and pt.propertyType LIKE '%${propertyType}%'`;
            }
            return "";
        };

        const filterByBedroomsNumber = () => {
            if (bedrooms) {
                return `AND p.bedrooms >= '${bedrooms}'`;
            }
            return "";
        };
        const filterByBathroomsNumber = () => {
            if (bathrooms) {
                return `AND p.bathrooms >= '${bathrooms}'`;
            }
            return "";
        };
        const filterByCity = () => {
            if (city) {
                return `AND p.city LIKE '%${city}%'`;
            }
            return "";
        };
        const filterByOffer = () => {
            if (category) {
                return `AND offer = '${category}'`;
            }
            return "";
        };

        const sql = `
        SELECT*
        FROM Properties AS p
        LEFT JOIN PropertyTypes AS pt ON pt.propertyTypeId = p.propertyTypeId
        LEFT JOIN Offer AS o ON p.offerId = o.offerId
        WHERE
        ${filterByRangePrices()}
        ${filterByPropertyType()}
        ${filterByBedroomsNumber()}
        ${filterByBathroomsNumber()}
        ${filterByCity()}
        ${filterByOffer()}
        `;
        return await connection.query(sql);
    } catch (error) {
        throw error;
    }
};
export const propertyById = async (id) => {
    try {
        const sql = `
        SELECT*
        FROM Properties AS p
        LEFT JOIN PropertyTypes AS pt ON pt.propertyTypeId = p.propertyTypeId
        WHERE p.idProperty = ${id}          
        `;
        return await connection.query(sql);
    } catch (error) {
        throw error;
    }
};

export const insertProperty = async (property) => {
    try {
        const values = [
            property.title,
            property.price,
            property.address,
            property.building,
            property.emaiL,
            property.phone,
            property.antiquityYears,
            property.published,
            property.lastAdminprice,
            property.neighborhood,
            property.propertyTypeId,
            property.area,
            property.stratum,
            property.bedrooms,
            property.numElevators,
            property.numFloor,
            property.numbBathrooms,
            property.garage,
            property.remodelation,
            property.latitude,
            property.longitude,
            property.city,
            property.contact,
            property.image1,
            property.image2,
            property.image3,
            property.image4,
            property.image5,
            property.image6,
        ];
        const sql = `
        INSERT INTO Properties (
            title,
            price,
            address,
            building,
            emaiL,
            phone,
            antiquityYears,
            published,
            lastAdminprice, 
            neighborhood,
            propertyTypeId,
            area,
            stratum,
            bedrooms,
            numElevators,
            numFloor,
            bathrooms,
            garage,
            remodelation,
            latitude,
            longitude,
            city,
            contact,
            image1,
            image2,
            image3,
            image4,
            image5,
            image6
            )
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);
        
        `;
        return await connection.query(sql, values);
    } catch (error) {
        throw error;
    }
};

export const importPorperties = async (properties) => {
    try {
        await connection.query("START TRANSACTION");
        const sql = `
        INSERT INTO Properties (
                reference,
                title,
                description,
                price,
                address,
                building,
                contactName,
                email,
                phone,
                antiquityYears,
                published, 
                lastAdminprice,
                neighborhood,
                propertyTypeId,
                offerId,
                area,
                stratum,
                bedrooms,
                numElevators,
                numFloor,
                bathrooms,
                garage,
                parking,
                remodelation,
                latitude,
                longitude,
                city,
                contact, 
                image1,
                image2, 
                image3,
                image4,
                image5,
                image6,
                saleOff
                )           
        VALUES ?
        `;
        await connection.query(sql, [properties]);
        const result = await connection.query(`COMMIT`);
        return result;
    } catch (error) {
        console.log({
            from: "properties.DAL.js",
            error
        });
        await connection.query("ROLLBACK");

        if (error.code === 'ER_BAD_FIELD_ERROR') {
            throw {
                msg: "Error con el archivo",
                text:"Las columnas no coinciden con las esperadas por la base de datos"
            }
        }

        if (error.code === 'ER_DUP_ENTRY') {
            throw {
                msg: "Error con el archivo",
                text: "El archivo contiene referencias duplicadas"
            }
        }

        throw {
            msg: "Error importanto las propiedades",
        };
    }
};

export const columnsPorperties = async () => {
    try {
        const sql = `
        SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Properties'
        `;
        return await connection.query(sql);
    } catch (error) {
        throw error;
    }
};
