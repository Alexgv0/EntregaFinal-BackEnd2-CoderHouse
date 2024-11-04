import options from "./../config/cli.js";
import { ConnectMongoDB } from "./mongodb/connection.js";
import { UserDaoMongo } from "./mongodb/UserDao.js";
import { CartsDaoMongo } from "./mongodb/CartsDao.js";
import { ProductsDaoMongo } from "./mongodb/ProductsDao.js";

const persistence = options.database;
export let userDao = null;
export let prodDao = null;
export let cartDao = null;

switch (persistence) {
    case "SQL": // TODO:
        console.log("Not working");
        process.exit(1);
        break;

    default:
        ConnectMongoDB.getInstance();
        userDao = new UserDaoMongo();
        prodDao = new ProductsDaoMongo();
        cartDao = new CartsDaoMongo();
        break;
}

export default {
    userDao,
    prodDao,
    cartDao,
};
