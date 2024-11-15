import { Router } from "express";
import { getAllUsersPaginate, renderRealTimeProducts } from "../controllers/handlebarsController.js";

const router = Router();

router.get("/", (req, res) => {
    res.render("index");
});

router.get("/login", (req, res) => {
    res.render("login", { title: "Inicio de Sesion" });
});

router.get("/register", (req, res) => {
    res.render("register");
});

router.get("/products", getAllUsersPaginate);

router.get("/realtimeproducts", renderRealTimeProducts);

export default router;
