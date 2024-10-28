import mongoose from "mongoose";

/* 
    Crear un modelo User el cual contará con los campos:
        first_name:String,
        last_name:String,
        email:String (único)
        age:Number,s
        cart:Id con referencia a Carts
        role:String(default:’user’)

    Encriptar la contraseña del usuario mediante el paquete bcrypt (Utilizar el método “hashSync”). 
*/

const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, default: null, required: false },
        last_name: { type: String, default: null, required: false },
        email: { type: String, required: true, unique: true },
        age: { type: Number, default: null, required: false, min: 0, max: 150 },
        password: { type: String, default: null, required: false },
        cart: { type: mongoose.Schema.Types.ObjectId, ref: "Carts", default: null, required: false },
        role: { type: String, default: "user", required: false },
    },
    {
        versionKey: false,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
