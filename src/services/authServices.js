import ClassServices from "./classServices.js";
import { comparePasswords } from "../utils/utils.js";
import { userDao } from "../daos/persistence.js";

export default class AuthServices extends ClassServices {
    constructor() {
        super(userDao);
    }
    
    /**
     * Valida si la contraseña es correcta
     * @param {String} password - Recibe contraseña introducida en login
     * @param {Object} user - Recibe el usuario registrado
     * @returns {Boolean} - Devuelve true si la contraseña coincide con la del usuario, false en otro caso.
     */
    async validatePassword (password, user) {
        try {
            const isValidPassword = comparePasswords(password, user.password);
            if (!isValidPassword) {
                throw new Error("Contraseña incorrecta");
            }
            return isValidPassword;
        } catch (error) {
            console.error("Error al validar la contraseña:", error);
            return false;
        }
    };
    
    /**
     * Verifica y valida el usuario para el logueo
     * @param {String} email - Recibe correo del usuario
     * @param {String} password - Recibe constraseña del usuario
     * @returns {Object|null} - Devuelve el usuario
     */
    async login (email, password) {
        try {
            const user = await userDao.getUserByEmail(email);
    
            if (!user) {
                return null;
            }
    
            const correctPassword = validatePassword(password, user);
    
            if (!correctPassword) {
                return null;
            }
    
            return user;
        } catch (error) {
            console.error("Error al iniciar sesion:", error);
            return null;
        }
    };

} 
