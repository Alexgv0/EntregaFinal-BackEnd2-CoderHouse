import MongoDao from "./MongoDao.js";
import { Product } from "../../models/mongo/Products.js";

export default class ProductsDaoMongo extends MongoDao {
    constructor() {
        super(Product);
    }
}