const express = require('express');
const app = express();
var mysql = require('mysql');

// Connexion a la base de datos
var connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'login_node_curso',
   port: 3306
});
connection.connect(function(error){
   if(error){
      throw error;
   }else{
      console.log('Conexion correcta.');
   }
});

// 2 -
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3 Invocamos al dotenv
const dotenv = require('dotenv');
dotenv.config({path: './env/.evn'})

//4 - El directorio public
app.use('/resources', express.static('public'))
app.use('/resources', express.static(__dirname + '/public'))

// 5 - Establecemos el motor de plantilla js
app.set('view engine', 'ejs');

// 6 - invocmaos al bcryptjs
const bcrypt = require('bcryptjs');

// 7 - var, de session
const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//8 - invocamos al modulo de conexion de la BD
//const connection = require('./database/db')

//console.log(__dirname);

//9 estableciendo las rutas 

// app.get('/', (req, res) => {
//     res.render('index',{msg:'Esto es un mensaje de Node'})
// })
app.get('/login', (req, res) => {
  res.render('login');
})
app.get('/register', (req, res) => {
  res.render('register');
})

//10 Registracion 
app.post('/register', async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;
  let passwordHaash = await bcrypt.hash(pass, 8);
  connection.query('INSERT INTO users SET ?', {user:user, name:name, rol:rol, pass:passwordHaash}, async(error, results)=>{
    if(error){
      console.log(error);
    }else{
      res.render('register', {
				alert: true,
				alertTitle: "Registro",
				alertMessage: "Registro Exitoso",
				alertIcon:'success',
				showConfirmButton: false,
				timer: 1500,
				ruta: ''
			})
    }
  })
})

//11 Autentificacion
app.post('/auth', async (req, res)=> {
	const user = req.body.user;
	const pass = req.body.pass;    
  let passwordHash = await bcrypt.hash(pass, 8);
	if (user && pass) {
		connection.query('SELECT * FROM users WHERE user = ?', [user], async (error, results, fields)=> {
			if( results.length == 0 || !(await bcrypt.compare(pass, results[0].pass)) ) {    
				res.render('login', {
                        alert: true,
                        alertTitle: "Error",
                        alertMessage: "USUARIO y/o PASSWORD incorrectas",
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'login'    
                    });
			} else {        
				req.session.loggedin = true;                
				req.session.name = results[0].name;
				res.render('login', {
					alert: true,
					alertTitle: "Conexión exitosa",
					alertMessage: "LOGIN CORRECTO",
					alertIcon:'success',
					showConfirmButton: false,
					timer: 1500,
					ruta: ''
				});        			
			}			
			res.end();
		});
	} else {	
		res.send('Por favor, introduzca el usuario y la contraseña');
		res.end();
	}
});

//11 auth pages
app.get('/', (req, res)=> {
	if (req.session.loggedin) {
		res.render('index',{
			login: true,
			name: req.session.name			
		});		
	} else {
		res.render('index',{
			login:false,
			name:'Debe iniciar sesión',			
		});				
	}
	res.end();
});

app.use(function(req, res, next) {
    if (!req.user)
        res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    next();
});

//12 Destruye la sesion
app.get('/logout', function (req, res) {
	req.session.destroy(() => {
	  res.redirect('/') 
	})
});

// Escucha en el puerto 3000
app.listen(3000, (req, res) => {
    console.log('server running in http://localhost:3000');
})

