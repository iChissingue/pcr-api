const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const Router = require('./Router/Router')
const cors = require('cors')


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.use('/', Router)
app.use('/', (req, res)=> res.status(200).send("Pagina nao encontrada!"))

const PORT = process.env.PORT || 2020

app.listen(PORT, ()=> console.log(`A aplicacao esta rodado na porta ${PORT}`))