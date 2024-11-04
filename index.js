import app from "./src/app.js";
import {PORT} from "./src/config/config.js";
//import Product from "./src/models/mongo/Products.js"; //FIXME:
import { Server } from "socket.io";

const data = [{ "Servidor escuchando al puerto": PORT, URL: `http://localhost:${PORT}` }];
const server = app.listen(PORT, () => {
    console.table(data);
});

// Utilizando WebSockets
const io = new Server(server);

io.on("connection", async socket => {
    console.log(`Usuario ${socket.id} conectado`);
    const products = await Product.find().select("title").lean();

    socket.emit("allProducts", products);

    socket.on("addProduct", product => {
        products.push(product);
        io.emit("productAdded", product);
        console.log(`Producto agregado: ${JSON.stringify(product)}`);
    });

    socket.on("deleteProduct", pid => {
        products = products.filter(p => p.id !== pid);
        io.emit("productDeleted", pid);
        console.log(`Producto con el id: ${pid} eliminado`);
    });

    socket.on("disconnect", () => {
        console.log(`Usuario ${socket.id} desconectado`);
    });
});
