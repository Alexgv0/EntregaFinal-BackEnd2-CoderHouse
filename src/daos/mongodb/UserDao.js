import MongoDao from "./MongoDao.js";
import { User } from "../../models/mongo/User.js";

export default class UserDaoMongo extends MongoDao {
    constructor() {
        super(User);
    }

    /**
     * Obtiene un usuario por su email.
     * @param {String} userEmail - El email del usuario.
     * @returns {Object|null} - El usuario si se encuentra, o null si no.
     */
    async getByEmail(email) {
        try {
            return await this.model.findOne({ email })
        } catch (error) {
            throw new Error(error)
        }
    }

}
