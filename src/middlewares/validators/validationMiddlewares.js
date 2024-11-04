import { body, param } from "express-validator";
import { cartDao, prodDao } from "../../dao/persistence.js";

export const validateMongoID = idName => {
    const mongoIdMessage = idName => `El ${idName} debe ser un ID de MongoDB valido.`;
    return [
        param(idName)
        .exists().withMessage(`El ${idName} es requerido.`)
        .isMongoId().withMessage(mongoIdMessage(idName)),
    ];
};

export const isInDB = (idName) => {
    return async (req, res, next) => {
        const id = req.params[idName];
        let item = null;
        switch (idName) {
            case "pid":
                item = await prodDao.get(id);
                break;
            
            case "cid":
                item = await cartDao.get(id);
                break;
            
            default:
                throw new Error(`El ${idName} no coincide con los casos disponibles para seleccionar el modelo`);
            break;
        }
        
        if (!item || item.length === 0) {
            return res.status(404).json({ message: `No se encontro el item con ${idName}: ${id}, o está vacío.` });
        }
        next();
    } 
};