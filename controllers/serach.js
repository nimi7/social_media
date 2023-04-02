const router = require("express").Router();
const User = require('../models/UserModel')
const querystring = require('query-string')


router.get('/ResultSearch/:name', (req, res, location) => {
console.log('querystring' , req.url)
console.log('req',req.params)
  User.find(req.params, (err, user) => {
    if (err) {
      return res.status(400).json({ success: false, error: `user not found` })
    }
    if (!user) {
      return res.status(404).json({ success: false, error: `user not found` })
    }
    console.log('user-------------------------------------====', user)
    return res.status(200).send(user)

  }).catch(err => console.log('err', err))

})

module.exports = router;