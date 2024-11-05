import { body, param } from "express-validator";
import { validateMongoID, isInDB} from "./validationMiddlewares.js";
import { prodDao } from "../../dao/persistence.js";
import mongoose from "mongoose";

// Valida el cid
export const validateCartCid = [...validateMongoID("cid"), isInDB("cid")];

// Valida los datos pasados por body para el momento de crear o modificar el carrito
export const validateCartProducts = [
    body("products")
        .exists().withMessage("El arreglo del carrito es requerido")
        .isArray().withMessage("El carrito debe de ser un arreglo."),
    
    body("products.*.product")
        .exists().withMessage("El ID del producto es requerido.")
        .custom((value) => {
            if (!mongoose.isValidObjectId(value)) {
                throw new Error("El ID del producto no es válido.");
            }
            return true;
        })
        .bail() 
        .custom(async (value) => {
            const product = await prodDao.get(value);
            if (!product) {
                throw new Error("El producto no existe en la base de datos.");
            }
            return true;
        }),
    body("products.*.quantity")
        .exists().withMessage("La cantidad es requerida.")
        .isInt({ min: 0 }).withMessage("La cantidad debe ser un número mayor o igual a cero."),
];