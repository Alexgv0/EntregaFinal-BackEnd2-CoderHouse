import { Router } from "express";
import authRouter from "./auth.router.js";
import sessionsRouter from "./sessions.router.js";
import productRouter from "./product.router.js";
import cartRouter from "./cart.router.js";

const router = Router();

router.use("/auth", authRouter);

router.use("/sessions", sessionsRouter);

router.use("/products", productRouter);

router.use("/carts", cartRouter);

export default router;
