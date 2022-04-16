const {Router} = require('express');
const router = Router();

const {login,getStock, getStockById, createStock, getTipoProducto, getStockByMarcaId } = require('../controllers/index.controller')
const{getUsers, createUser, getUserById, deleteUser, updateUser} = require('../controllers/users.controller')

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.get('/login', login);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/stock', getStock);
router.get('/stock/:id', getStockById);
router.get('/tipoProducto', getTipoProducto);
router.post('/stock', createStock);
router.get('/stock/marca/:id', getStockByMarcaId)

module.exports = router;