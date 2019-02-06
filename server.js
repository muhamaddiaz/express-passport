const express = require('express')
const app = express()

const authRoute = require('./routes/auth')

app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.set('view engine', 'pug')

app.use('/auth', authRoute)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`)
})