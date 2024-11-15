import { body, param } from "express-validator";
import { validateExistenceInDB, validateMongoID} from "./validationMiddlewares.js";

// Valida el pid
export const validateProductPidAndExistence = [...validateMongoID("pid"), ...validateExistenceInDB("pid")];

const validateCreateOrUpdateProduct = (isUpdate = false) => [
    body("title")
        .if(() => !isUpdate || typeof body("title").value !== "undefined")
        .optional({ nullable: isUpdate })
        .isString().withMessage("El título debe ser una cadena.")
        .notEmpty().withMessage("El título no puede estar vacío."),

    body("description")
        .if(() => !isUpdate || typeof body("description").value !== "undefined")
        .optional({ nullable: isUpdate })
        .isString().withMessage("La descripción debe ser una cadena.")
        .notEmpty().withMessage("La descripción no puede estar vacía."),

    body("code")
        .if(() => !isUpdate || typeof body("code").value !== "undefined")
        .optional({ nullable: isUpdate })
        .isString().withMessage("El código debe ser una cadena.")
        .notEmpty().withMessage("El código no puede estar vacío."),

    body("price")
        .if(() => !isUpdate || typeof body("price").value !== "undefined")
        .optional({ nullable: isUpdate })
        .isFloat({ min: 0 }).withMessage("El precio debe ser un número mayor o igual a 0."),

    body("status")
        .if(() => !isUpdate || typeof body("status").value !== "undefined")
        .optional({ nullable: isUpdate })
        .isBoolean().withMessage("El estado debe ser un valor booleano."),

    body("stock")
        .if(() => !isUpdate || typeof body("stock").value !== "undefined")
        .optional({ nullable: isUpdate })
        .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0."),

    body("category")
        .if(() => !isUpdate || typeof body("category").value !== "undefined")
        .optional({ nullable: isUpdate })
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