import { validationResult } from "express-validator";

/**
 * Comprueba si fallan las validaciones ejecutadas anteriormente de express-validator
 * @param {Object} req - HTTP Request
 * @param {Object} res - HTTP Response
 * @param {Function} next - Continua con el proceso
 * @returns {Error} - En caso de fallar la validacion nos responde con un error
 */
export const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("Error al validar: ",errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export default validateFields;
