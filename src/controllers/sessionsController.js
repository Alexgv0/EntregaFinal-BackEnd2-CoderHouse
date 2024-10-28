/**
 * Devuelve los datos de el JWT almacenado
 * @param {*} req
 * @param {*} res
 * @returns
 */
export const currentResponse = (req, res) => {
    return res.status(200).json({ status: "success", message: "Usuario autorizado", jwt: req.user });
};

/**
 * Elimina la sesion del usuario y vuelve al login
 * @param {*} req
 * @param {*} res
 */
export const sessionLogout = (req, res) => {
    try {
       if (req?.cookie?.token) {
           res.clearCookie("token", { httpOnly: true });
           res.status(200);
           console.log("Sesion cerrada correctamente");
           return res.redirect("/");
    } else {
           console.error("Error: No hay token para eliminar");
           return res.status(404).json({ message: "No hay token para eliminar" });
       }
    } catch (error) {
        console.log("Error intentar al cerrar sesion:", error);
        return res.status(500).json({ message: "Error del servidor al intentar cerrar sesion" });
    }
};
