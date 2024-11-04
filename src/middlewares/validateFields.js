import { validationResult } from "express-validator";

const validateFields = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.error("Error al validar: ",errors.array());
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

export default validateFields;
