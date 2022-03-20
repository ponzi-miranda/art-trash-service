const {Router} = require('express');
const router = Router();

const { getUsers, createUser, getUserById, deleteUser,
     login,
      getStock, getStockById, createStock, getTipoProducto, getStockByMarcaId } = require('../controllers/index.controller')

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.post('/login', login);
router.delete('/users/:id', deleteUser);
router.get('/stock', getStock);
router.get('/stock/:id', getStockById);
router.get('/stock/tipoProducto', getTipoProducto);
router.post('/stock', createStock);
router.get('/stock/marca/:id', getStockByMarcaId)

module.exports = router;