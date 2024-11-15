import express from "express";
import AuthController from "../controllers/authController.js";

const AC = new AuthController();
const { login, loginOrRegisterGoogle, register } = AC;

const router = express.Router();
router.use(express.json());

// Local
router.post("/login", login);

router.post("/register", register);

// Google
router.get("/login-google", loginOrRegisterGoogle);

// Callback URL de Google luego de logueo o registro
router.get("/oauth2/redirect/accounts.google.com", loginOrRegisterGoogle);

export default router;
