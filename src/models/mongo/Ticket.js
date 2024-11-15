import mongoose, { mongo } from "mongoose";

/* 
    Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
    Id (autogenerado por mongo)
    code: String debe autogenerarse y ser único
    purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
    amount: Number, total de la compra.
    purchaser: String, contendrá el correo del usuario asociado al carrito. 
*/

ticketSchema = new mongoose.Schema(
    {
        code: { type: String, required: true, unique: true, trim: true },
        purchase_datetime: { type: Date, required: true, default: Date.now() },
        amount: { type: Number, required: true, min: 1 },
        purchaser: { type: String, required: true, trim: true },
    },
    {
        versionKey: false,
    }
);

export const Ticket = mongoose.model("Ticket", ticketSchema);
