const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "variables.env" });

module.exports = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (authHeader) {
    //Obtener el token
    //separamos el authHeader con un espacio y obtenemos un arreglo de 2 posiciones de la cual tomamos la segunda (para obtener asi solo el token sin el "bearer")
    const token = authHeader.split(" ")[1];
    //comprobar el jwt
    try {
      const usuario = jwt.verify(token, process.env.SECRETA);
      req.usuario = usuario;
    } catch (error) {
      console.log(error);
      console.log("JWT no válido");
    }
  }
  return next();
};
