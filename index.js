const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const Router = require('./Router/Router')
<<<<<<< HEAD
const cors = require('cors')
=======
>>>>>>> bf1e4e5c676d2991cc2554d2c1e263c62042030a


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
<<<<<<< HEAD
app.use(cors())
=======
>>>>>>> bf1e4e5c676d2991cc2554d2c1e263c62042030a

app.use('/', Router)
app.use('/', (req, res)=> res.status(200).send("Pagina nao encontrada!"))

const PORT = process.env.PORT || 2020

app.listen(PORT, ()=> console.log(`A aplicacao esta rodado na porta ${PORT}`))