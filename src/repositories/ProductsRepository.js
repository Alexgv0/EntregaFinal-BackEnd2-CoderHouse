import { prodDao } from "../daos/persistence.js";

export default class ProductRepository {
    constructor() {
        this.dao = prodDao;
    }
}
