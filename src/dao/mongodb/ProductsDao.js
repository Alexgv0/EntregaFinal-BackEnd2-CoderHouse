import MongoDao from "./MongoDao.js";
import { Product } from "../../models/mongo/Products.js";

export class ProductsDaoMongo extends MongoDao {
    constructor() {
        super(Product);
    }
}