const express = require('express')
const router = express.Router()
const request = require('request')

router.get('/', (req, res) => {
  const refresh_token = req.query.token

  if (!refresh_token) {
    res.status(400)
    res.send({ ERROR: 'No token provided.' })
    return
  }

  const authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    headers: { 'Authorization': 'Basic ' + (new Buffer(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')) },
    form: {
      refresh_token,
      grant_type: 'refresh_token'
    },
    json: true
  }

  request.post(authOptions, (error, response, { access_token }) => {
    if (!error && response.statusCode === 200) {
      res.send({ access_token })
    }
  })
})

module.exports = router