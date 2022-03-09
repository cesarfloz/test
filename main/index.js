
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();


app.use(express.json());
app.use(bodyParser.json());

// Coneccion con la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'rootpass',
  database: 'users_db'
});

app.get('/', (req, res) => {
    res.send('Funcionando...');
  });
  
  // Mostrar todos mis usuarios
  app.get('/users', (req, res) => {
    const sql = 'SELECT * FROM users';
  
    connection.query(sql, (error, results) => {
      if (error) throw error;
      if (results.length > 0) {
        res.json(results);
      } else {
        res.send('No se encuentran resultados');
      }
    });
  });
  
  app.get('/users/:id', (req, res) => {
    const {id} = req.params;
    const sql = `SELECT * FROM users WHERE id = ${id}`;
    connection.query(sql, (error, result) => {
      if (error) throw error;
  
      if (result.length > 0) {
        res.json(result);
      } else {
        res.send('No se encuentran resultados');
      }
    });
  });
  
  app.post('/register', (req, res) => {
    const sql = 'INSERT INTO users SET ?';
  
    const userObj = {
      user_name: req.body.user_name,
      email: req.body.email,
      password: req.body.password
    };
  
    connection.query(sql, userObj, error => {
      if (error) throw error;
      res.send('¡Usuario creado!');
    });
  });
  
  app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const {user_name, email, password} = req.body;
    const sql = `UPDATE users SET user_name = '${user_name}', email='${email},'password='${password} WHERE id =${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Usuario creado');
    });
  });
  
  app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM users WHERE id= ${id}`;
  
    connection.query(sql, error => {
      if (error) throw error;
      res.send('Eliminar usuario');
    });
  });
  

// Verificando coneccion DB
connection.connect(error => {
  if (error) throw error;
  console.log('DB Funcionnando!');
});

app.listen(
    PORT, () => console.log('Servidor corriendo')
    );