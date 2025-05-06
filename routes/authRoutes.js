const router = require('express').Router()
const authController = require('../controllers/authController')
const checkToken = require('../middleware/checkToken')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.get('/user/:id', checkToken, authController.getUserById)

module.exports = router