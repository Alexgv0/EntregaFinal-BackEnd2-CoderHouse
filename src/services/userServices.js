import { hashPassword } from "../utils/utils.js";
import { userDao } from "./../dao/persistence.js";

/**
 * Crea un nuevo usuario en la base de datos.
 * @param {Object} userData - Datos del usuario (nombre, email, etc.).
 * @returns {Object} - El usuario creado.
 */
export const createUser = async userData => {
    try {
        const newUserData = {
            first_name: userData?.first_name || null,
            last_name: userData?.last_name || null,
            age: userData?.age || null,
            email: (userData?.email).toLowerCase() || null,
            password: userData?.password ? hashPassword(userData.password) : null,
        };
        if (!newUserData.email) {
            throw new Error("No se creo el usuario porque no se reconoce el email del usuario");
        }

        if (newUserData.age < 0 || newUserData.age > 150) {
            throw new Error("No se creo el usuario porque la edad no es realista");
        }
        
        const existingUser = await userDao.getByEmail(newUserData.email);
        if (existingUser) {
            throw new Error("No se creo el usuario porque ya existe");
        }

        const newUser = await userDao.create(newUserData);
        if (!newUser) {
            throw new Error("Error desconocido al intentar crear el usuario");
        }
        return newUser;
    } catch (error) {
        console.log("Error al crear usuario:", error.message);
        return null;
    }
};

export const getUserByEmail = async (email) => {
    try {
        return await userDao.getByEmail(email);
    } catch (error) {
        console.error(error);
        return null;
    }
}