/*const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
});

connection.connect((error) => {
  if (error) {
    console.log("El error de conexion es " + error);
    return;
  }
  console.log("Conectado con la base de datos");
});

module.exports = connection;*/
// var conexion = mysql.createConnection({
//   host: "localhost",
//   database: "login_node_curso",
//   user: "root",
//   password: "",
// });

// conexion.connect({
//   function(error) {
//     if (error) {
//       throw error;
//     } else {
//       console.log("yujuuu");
//     }
//   },
// });
//conexion.end();
// const connection = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'login_node_curso'
// })

// const connection = mysql.createConnection({
//      host: process.env.DB_HOST,
//      user: process.env.DB_USER,
//      password: process.env.DB_PASSWORD,
//      database: process.env.DB_DATABASE

// })

// app.get("/", (req, res) => {
//     res.send("Conexion exitosa");
// })

// connection.connect((error) => {
//      if(error){
//          console.log('El error de conexion es: '+error);
//          return;
//      }
//      console.log('Conectado a la base de datos');
//  });

//odule.exports = conexion;

// export default conexion
