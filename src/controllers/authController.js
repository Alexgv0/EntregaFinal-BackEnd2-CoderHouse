import ClassController from "./classController.js";
import AuthServices from "../services/authServices.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";
import { generateAndSaveToken } from "../passport/jwt-strategy.js";
import { loginResponse, registerResponse } from "../middlewares/authConsoleResponses.js";
import passport from "passport";

const AS = new AuthServices();

export default class AuthController extends ClassController {
    constructor() {
        super(AS);
    }

    /**
     * Se utiliza la estrategia pasada por parametro, sea para login o registro y maneja los errores en caso de tenerlos
     * @param {String} strategyName - Nombre de la estrategia
     */
    passportAuth = (strategyName, config = {}) => {
        return (req, res, next) => {
            passport.authenticate(strategyName, config, (err, user, info) => {
                if (err) {
                    console.error(err);
                    return errorResponse(res, "Error del servidor", 500);
                }
    
                if (info?.userExists) {
                    return errorResponse(res, info.message, 409);
                }
    
                if (info?.status === 401) {
                    return errorResponse(res, info.message, 401);
                }
    
                if (!user) {
                    if (strategyName === "google") return next();
                    return errorResponse(res, info?.message || "Autenticación fallida", 401);
                }
                req.user = user;
                next();
            })(req, res, next);
        };
    }    

    /**
     * Realiza un login por passport-local, guarda su token, imprime una respuesta en consola del servidor y luego da la respuesta de exito final.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    login = (req, res, next) => {
        this.passportAuth("login")(req, res, () => {
            const token = generateAndSaveToken(req, res);

            loginResponse(req, res, next);

            return successResponse(res, { user: req.user, token }, "Login exitoso");
        });
    }

    /**
     * Realiza un registro por passport-local, guarda su token, imprime una respuesta en consola del servidor y luego da la respuesta de exito final.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    register = (req, res, next) => {
        this.passportAuth("register")(req, res, () => {
            const token = generateAndSaveToken(req, res);

            //registerResponse(req, res, next);

            return successResponse(res, { user: req.user, token }, "Registro exitoso", 201);
        });
    }

    /**
     * Realiza un registro o login por passport-google, guarda su token, imprime una respuesta en consola del servidor y luego da la respuesta de exito final.
     * @param {*} req
     * @param {*} res
     * @param {*} next
     */
    loginOrRegisterGoogle = async (req, res, next) => {
        try {
            const config = {
                assignProperty: "user", // Guarda los datos del usuario
                scope: ["profile", "email"],
            };
            this.passportAuth("google", config)(req, res, () => {
                // En caso de cancelar el ingreso redirecciona al login
                if (!req?.user) {
                    console.log("El usuario cancelo el ingreso por google");
                    return res.redirect("/login");
                }

                const token = generateAndSaveToken(req, res);

                //loginResponse(req, res, next);

                return successResponse(res, { user: req.user, token }, "Ingreso por Google exitoso");
            });
        } catch (error) {
            console.error("Error en loginOrRegisterGoogle:", error);
        }
    }
}
