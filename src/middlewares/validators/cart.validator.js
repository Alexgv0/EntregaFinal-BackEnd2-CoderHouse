import { body, param } from "express-validator";
import { validateExistenceInDB, validateMongoID,  } from "./validationMiddlewares.js";

// Valida el cid
export const validateCartCidAndExistence = [...validateMongoID("cid"), ...validateExistenceInDB("cid")];

// Valida los datos pasados por body para el momento de crear o modificar el carrito
export const validateCartProducts = [
    body("products")
        .exists().withMessage("El arreglo del carrito es requerido")
        .withMessage("El arreglo del carrito es requerido")
        .isArray()
        .withMessage("El carrito debe de ser un arreglo."),

    ...validateMongoID("products.*.product"),
    ...validateExistenceInDB("products.*.product", true),

    body("products.*.quantity")
        .exists()
        .withMessage("La cantidad es requerida.")
        .isInt({ min: 0 })
        .withMessage("La cantidad debe ser un número mayor o igual a cero."),
];
