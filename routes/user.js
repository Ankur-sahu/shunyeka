const express = require('express')
const router = express.Router()
const {createUser, getUsers, getUser, updateUser, deleteUser,} = require('../controllers/userController')

router.get('/', getUsers)

router.post("/",createUser)

router.get('/:user_id', getUser)

router.put('/:user_id', updateUser)

router.delete('/:user_id', deleteUser)

module.exports = router