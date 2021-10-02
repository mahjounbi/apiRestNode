const express = require('express')
const pool = require('../config/database')
const router = express.Router()

router.get('/:id', async function (req, res) {
  try {
    const sqlQuery = 'SELECT * from team WHERE id=?'
    const rows = await pool.query(sqlQuery, req.params.id)
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router
