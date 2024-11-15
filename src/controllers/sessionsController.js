import ClassController from "./classController.js";
import AuthServices from "../services/authServices.js";
import UserRepository from "./../repositories/UserRepository.js";

const UR = new UserRepository();
const AS = new AuthServices();

export default class SessionsController extends ClassController {
    constructor() {
        super(AS);
    }

    /**
     * Devuelve los datos de el JWT almacenado
     * @param {*} req
     * @param {*} res
     * @returns
     */
    async currentResponse(req, res) {
        try {
            if (!req.user) {
                throw new Error("No hay un usuario logueado");
            }

            const userDTO = await UR.findById(req.user.id);
    
            if (!userDTO) {
                return res.status(404).json({ status: "error", message: "Usuario no encontrado" });
            }
    
            return res.status(200).json({
                status: "success",
                message: "Usuario autorizado",
                user: userDTO
            });
        } catch (error) {
            console.error("Error al obtener el usuario:", error);
            return res.status(500).json({ status: "error", message: "Error al procesar la solicitud" });
        }
    };
    
    /**
     * Elimina la sesion del usuario y vuelve al login
     * @param {*} req
     * @param {*} res
     */
    async sessionLogout(req, res) {
        try {
           if (req?.cookies?.token) {
               res.clearCookie("token", { httpOnly: true });
               console.log("Sesion cerrada correctamente");
               return res.redirect("/");
        } else {
               console.error("Error: No hay token para eliminar");
               return res.status(404).json({ message: "No hay token para eliminar" });
           }
        } catch (error) {
            console.log("Error intentar al cerrar sesion:", error);
            return res.status(500).json({ message: "Error del servidor al intentar cerrar sesion" });
        }
    };
}
