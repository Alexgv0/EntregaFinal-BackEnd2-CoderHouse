import { Router } from "express";
import { ensureAuth } from "../middlewares/ensureAuth.js";
import SessionsController from "../controllers/sessionsController.js";

const SC = new SessionsController();
const { currentResponse, sessionLogout } = SC;

const router = Router();

router.get("/current", ensureAuth, currentResponse);

router.delete("/logout", sessionLogout);

export default router;
