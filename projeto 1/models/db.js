const Sequelize = require('sequelize')

//conexão com o DB Postgres
const sequelize = new Sequelize('postapp','postgres','777guitar',{
    host:"localhost",
    dialect:"postgres"
})

module.exports = {Sequelize: Sequelize, sequelize:sequelize}