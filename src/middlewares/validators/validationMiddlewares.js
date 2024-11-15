import { body, param } from "express-validator";
import ProductServices from "../../services/productServices.js";
import CartServices from "../../services/cartServices.js";
const PS = new ProductServices();
const CS = new CartServices();


export const validateMongoID = idName => {
    return [
        param(idName)
        .exists().withMessage(`El ${idName} es requerido.`)
        .isMongoId().withMessage(`El ${idName} debe ser un ID de MongoDB valido.`)
    ];
};

export const validateExistenceInDB = (idName, inBody = false) => {
    if (inBody) {
        return [
            body(idName)
            .custom(
                async (value) => {
                    let item = null;
                    switch (idName) {
                        case "pid":
                            item = await PS.getById(value);
                            break;
                        case "products.*.product":
                            item = await PS.getById(value);
                            break;
                        case "cid":
                            item = await CS.getById(value);
                            break;
                        default:
                            throw new Error(`El ${idName} no coincide con los casos disponibles para seleccionar el modelo`);
                        }
                    if (!item) {
                        throw new Error(`El item con ${idName}: ${value} no existe en la base de datos.`);
                    }
                    return true;
                })
        ];
    } else {
        return [
            param(idName)
            .custom(
                async (value) => {
                    let item = null;
                    switch (idName) {
                        case "pid":
                            item = await PS.getById(value);
                            break;
                        case "products.*.product":
                            item = await PS.getById(value);
                            break;
                        case "cid":
                            item = await CS.getById(value);
                            break;
                        default:
                            throw new Error(`El ${idName} no coincide con los casos disponibles para seleccionar el modelo`);
                        }
                    if (!item) {
                        throw new Error(`El item con ${idName}: ${value} no existe en la base de datos.`);
                    }
                    return true;
                })
        ];
    }
};