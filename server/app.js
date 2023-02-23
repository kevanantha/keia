if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
  require('dotenv').config()
}
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const cors = require('cors')
const PORT = process.env.PORT || 3000

const routes = require('./routes')
const errorHandler = require('./middlewares/errorHandler')

mongoose.set('useCreateIndex', true)
mongoose
  .connect(`${process.env.MONGO_DB}-${process.env.NODE_ENV}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(_ => {
    console.log(`Connected to DB ${process.env.NODE_ENV}`)
  })
  .catch(err => {
    console.log(err)
  })

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', routes)
app.use(errorHandler)

app.listen(PORT, _ => console.log(`Server runs on PORT ${PORT}`))

module.exports = app
