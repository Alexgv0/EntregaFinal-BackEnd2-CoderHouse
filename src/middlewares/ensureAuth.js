import AuthController from "../controllers/authController.js";

const AC = new AuthController();
const { passportAuth } = AC;

export const ensureAuth = (req, res, next) => {
    const authenticate = passportAuth('current', { session: false });
    authenticate(req, res, next);
}
