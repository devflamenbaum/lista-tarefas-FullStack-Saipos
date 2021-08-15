const Sequelize = require('sequelize');
const databaseConfig = require('../config/database')
const Tarefa = require('../models/Tarefa')

const models = [Tarefa]
const connection = new Sequelize(databaseConfig)

models.forEach(model => model.init(connection));