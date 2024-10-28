const logoutButton = document.getElementById("logoutButton");

const logout = async () => {
    try {
        const response = await fetch("/api/sessions/logout", {
            method: "DELETE",
        });
        
        const result = await response.json();
        if (result?.status === 200) {
            alert("Sesión cerrada correctamente");
            console.log("Sesión cerrada correctamente");
        } else 
        if (result?.status === 404) {
            alert("No existe ninguna sesion");
            console.log("No existe ninguna sesion");
        } else {
            alert("Error del servidor al cerrar sesion");
            console.log("Error del servidor al cerrar sesion");
        }
        console.log(result);
    } catch (error) {
        console.error("Error ine:", error);
    }
};

logoutButton.addEventListener("click", logout);
