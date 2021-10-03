const express = require('express')
const pool = require('../config/database')
const router = express.Router()

/**
 * get team by id
 * @param {number} idOfEmployee
 * */

router.get('/:id', async function (req, res) {
  try {
    const sqlQuery = 'SELECT * from team WHERE id=?'
    const rows = await pool.query(sqlQuery, req.params.id)
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * get team list
 * */

router.get('/', async function (req, res) {
  try {
    const sqlQuery = 'SELECT * from team'
    const rows = await pool.query(sqlQuery)
    res.status(200).json(rows)
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * create team or list of team
 * @param { Object[] } teamList
 * @param { String } teamList[].name
 * @param { String } teamList[].description
 * */

router.post('/add', async function (req, res) {
  try {
    if (req.body.length > 0) {
      req.body.forEach(team => {
        const sqlQuery = 'INSERT INTO team (name, description) VALUES (?, ?)'
        pool.query(sqlQuery, [team.name, team.description], function (err, result) {
          if (err) {
            res.status(400).json({ error: result.message })
          }
        })
        res.status(200).send('your team list was added with success')
      })
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * update team or list of team
 * @param { Object[] } teamList
 * @param { Number } teamList[].id
 * @param { String } teamList[].name
 * @param { String } teamList[].description
 * */

router.patch('/update', async function (req, res) {
  try {
    if (req.body.length > 0) {
      req.body.forEach(team => {
        const sqlQuery = 'UPDATE team SET name = ?, description = ? WHERE id = ?'
        pool.query(sqlQuery, [team.name, team.description, team.id], function (err, result) {
          if (err) {
            res.status(400).json({ error: result.message })
          }
        })
        res.status(200).send('your team list was updated with success')
      })
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

/**
 * delete team or list of team
 * @param { Object[] } teamList
 * */

router.delete('/delete', async function (req, res) {
  try {
    if (req.body.length > 0) {
      req.body.forEach(team => {
        const sqlQuery = 'DELETE FROM team WHERE id = ?'
        pool.query(sqlQuery, [team], function (err, result) {
          if (err) {
            res.status(400).json({ error: result.message })
          }
        })
        res.status(200).send('your team list was deleted with success')
      })
    }
  } catch (error) {
    res.status(400).send(error.message)
  }
})

module.exports = router
