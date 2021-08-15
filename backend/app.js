const express = require('express')
const dotenv = require('dotenv')
const tarefaRoutes = require('./src/routes/TarefaRoutes')
const mysql = require('mysql2/promise');
const cors = require('cors')
const app = express();

dotenv.config();

const whitelist = [
    'http://localhost:3000',
];

const corsOptions = {
    origin(origin, callback) {
      if (whitelist.indexOf(origin) !== -1 || !origin) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  };

mysql.createConnection({
    user: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
}).then(connection => {
    connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DATABASE};`).then(() => {
        console.log('Banco de dados criado com sucesso')
    })
}).catch((err) => {
    console.log('Error: ' + err)
})

require('./src/database')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors(corsOptions))
app.use('/api/tarefas/', tarefaRoutes)


app.get('/', (req, res) => {
    res.send('Hello world')
})

module.exports = app;