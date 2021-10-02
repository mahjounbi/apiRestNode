const express = require('express')

const PORT = process.env.PORT || '3300'

const app = express()

/**
 * MiddleWare
 */

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

/**
 * Routes
 */

app.get('/', (request, response) => {
  response.status(200).json({ name: 'jalel' })
})

const employeeRouter = require('./routes/emplyee')
app.use('/employee', employeeRouter)

const teamRouter = require('./routes/team')
app.use('/team', teamRouter)

/** Start listening */
app.listen(PORT, () => {
  console.log(`Listening for request on port ${PORT}`)
})
