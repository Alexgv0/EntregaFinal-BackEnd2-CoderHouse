import { body, param } from "express-validator";
import { validateMongoID, isInDB} from "./validationMiddlewares.js";

// Valida el pid
export const validateProductPid = [validateMongoID("pid"), isInDB("pid")];

const validateCreateOrUpdateProduct = (isUpdate = false) => [
    body("title")
        .if(() => !isUpdate || body("title").exists().withMessage("El título es requerido."))
        .isString().withMessage("El título debe ser una cadena.")
        .notEmpty().withMessage("El título no puede estar vacío."),

    body("description")
        .if(() => !isUpdate || body("description").exists().withMessage("La descripción es requerida."))
        .isString().withMessage("La descripción debe ser una cadena.")
        .notEmpty().withMessage("La descripción no puede estar vacía."),

    body("code")
        .if(() => !isUpdate || body("code").exists().withMessage("El código es requerido."))
        .isString().withMessage("El código debe ser una cadena.")
        .notEmpty().withMessage("El código no puede estar vacío."),

    body("price")
        .if(() => !isUpdate || body("price").exists().withMessage("El precio es requerido."))
        .isFloat({min: 0}).withMessage("El precio debe ser un número mayor o igual a 0."),

    body("status")
        .if(() => !isUpdate || body("status").exists().withMessage("El estado es requerido."))
        .isBoolean().withMessage("El estado debe ser un valor booleano."),

    body("stock")
        .if(() => !isUpdate || body("stock").exists().withMessage("El stock es requerido."))
        .isInt({min: 0}).withMessage("El stock debe ser un número entero mayor o igual a 0."),

    body("category")
        .if(() => !isUpdate || body("category").exists().withMessage("La categoría es requerida."))
        .isString().withMessage("La categoría debe ser una cadena.")
        .notEmpty().withMessage("La categoría no puede estar vacía."),

    body("thumbnails")
    .optional()
        .isArray().withMessage("Los thumbnails deben ser un arreglo.")
        .custom((thumbnails) => thumbnails.every(thumbnail => typeof thumbnail === "string"))
        .withMessage("Cada thumbnail debe ser una cadena."),
];

// Valida los datos pasados por body para crear el producto
export const validateCreateProduct = validateCreateOrUpdateProduct(false);

// Valida los datos pasados por body para modificar el producto
export const validateUpdateProduct = validateCreateOrUpdateProduct(true);