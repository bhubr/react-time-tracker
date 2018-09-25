const express = require('express')
const router = express.Router()
const appRootPath = require('app-root-path')
const lockScreenPy = `${appRootPath}/misc/lockscreen.py`
const { spawn } = require('child_process')

router.get('/', (req, res) => {
  spawn('python', [lockScreenPy])
  res.json({})
})

module.exports = router
