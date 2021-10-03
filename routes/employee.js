const express = require('express')
const pool = require('../config/database')
const crypto = require('crypto')

const router = express.Router()

/**
 * get employee by id
 * @param { Number } id employee
 * */

router.get('/:id', async function (req, res) {
  try {
    const sqlQuery = 'SELECT  employee.id, employee.profile, employee.email, employee.adress, employee.registered, employee.isActive, employee.team, employee.created_at, employee.updated_at FROM employee INNER JOIN team ON employee.team = team.id WHERE employee.id =?'
    const rows = await pool.query(sqlQuery, req.params.id)
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
  res.status(200).json({ id: req.params.id })
})

/**
 * get employee list
 * */

router.get('/', async function (req, res) {
  try {
    const sqlQuery = 'SELECT * from employee'
    const rows = await pool.query(sqlQuery)
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * create employee or list of employee
 * @param { Object[] } employeeList
 * @param { Object } employeeList[].profile
 * @param { String } employeeList[].email
 * @param { String } employeeList[].adress
 * @param { String } employeeList[].registered
 * @param { Boolean } employeeList[].isActive
 * @param { Number } employeeList[].team
 * */

router.post('/add', async function (req, res) {
  try {
    if (req.body.length > 0) {
      req.body.forEach(empl => {
        const id = crypto.randomBytes(16).toString('hex')
        const sqlQuery = 'INSERT INTO employee (id, profile, email, adress, registered, isActive, team) VALUES (?, ?, ?, ?, ?, ?, ?)'
        pool.query(sqlQuery, [id, empl.profile, empl.email, empl.adress, empl.registered, empl.isActive, empl.team], function (err, result) {
          if (err) {
            res.status(400).json({ error: result.message })
          }
          console.log('result', result)
        })
        res.status(200).send('your employee list was added with success')
      })
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * update employee or list of employee
 * @param { Object[] } employeeList
 * @param { String } employeeList[].id
 * @param { Object } employeeList[].profile
 * @param { String } employeeList[].email
 * @param { String } employeeList[].adress
 * @param { String } employeeList[].registered
 * @param { Boolean } employeeList[].isActive
 * @param { Number } employeeList[].team
 * */

router.patch('/update', async function (req, res) {
  try {
    if (req.body.length > 0) {
      req.body.forEach(empl => {
        const sqlQuery = 'UPDATE team SET profile = ?, email = ?, adress = ?, registered = ?, isActive = ?, team = ? WHERE id = ?'
        pool.query(sqlQuery, [empl.profile, empl.email, empl.adress, empl.registered, empl.isActive, empl.team], function (err, result) {
          if (err) {
            res.status(400).json({ error: result.message })
          }
        })
        res.status(200).send('your employee list was updated with success')
      })
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * delete employee or list of employee
 * @param { Object[] } employeeList
 * */

router.delete('/delete', async function (req, res) {
  try {
    if (req.body.length > 0) {
      req.body.forEach(empl => {
        const sqlQuery = 'DELETE FROM employee WHERE id = ?'
        pool.query(sqlQuery, [empl], function (err, result) {
          if (err) {
            res.status(400).json({ error: result.message })
          }
        })
        res.status(200).send('your employee list was deleted with success')
      })
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router
