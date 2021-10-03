const express = require('express')
const pool = require('../config/database')

const router = express.Router()

/**
 * get emplyee by id
 * @id {string} of employee
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

module.exports = router
