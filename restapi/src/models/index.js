import fs from 'fs'
import path from 'path'

const Sequelize = require('sequelize')
const mysql = require('mysql2') // TODO: add mysql2

const config = require(__dirname + '/../configs/sequelize.js')[process.env.NODE_ENV]
const basename = path.basename(__filename)

const models = {}

// manage DB의 연결객체 : 기본연결
let sequelize = new Sequelize(config.database, config.username, config.password, config)
// FIXME: 유저 DB의 연결객체 : 기본 DB 인 ldk_0000로 연결한다.
let userDb = new Sequelize('ldk_0000', config.username, config.password, config)

// 관리자 DB 모델 등록
fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-9) === '.model.js'))
    .forEach(file => {
        const model = sequelize['import'](path.join(__dirname, file))
        models[model.name] = model
    })

// NOTE: 유저 DB 모델 등록 - 파일명이 '.udb.js'로 끝난다.
fs.readdirSync(__dirname)
    .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-7) === '.udb.js'))
    .forEach(file => {
        const md = userDb['import'](path.join(__dirname, file))
        models[md.name] = md
    })

// 관계형 DB의 관계를 설정하는 부분
Object.keys(models).forEach(modelName => {
    if (models[modelName].associate) {
        models[modelName].associate(models)
    }
})

models.Sequelize = Sequelize
models.mysql = mysql // NOTE: add mysql
models.format = mysql.format // NOTE:많이 사용하는 mysql.format 을 연결

models.mdb = sequelize // 관리자 DB
models.udb = userDb // NOTE:유저 DB

export default models
