const {Router} = require('express');
const router = Router();

const { getUsers, createUser, getUserById, deleteUser, login } = require('../controllers/index.controller')

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.post('/login', login);
router.delete('/users/:id', deleteUser);

module.exports = router;