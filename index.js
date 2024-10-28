import app from "./src/app.js";
import {PORT} from "./src/config/config.js"

const data = [{ "Servidor escuchando al puerto": PORT, URL: `http://localhost:${PORT}` }];
app.listen(PORT, () => {
    console.table(data);
});
