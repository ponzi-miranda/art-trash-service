const {Router} = require('express');
const router = Router();

const {login} = require('../controllers/index.controller');
const {getStock, getStockById, createStock, getTipoProducto, getStockByMarcaId } = require('../controllers/stock.controller');
const{getUsers, createUser, getUserById, deleteUser, updateUser} = require('../controllers/users.controller');
const{getProductById, getProductsByBrandId, createProduct, updateProduct, deleteProduct} = require('../controllers/products.controller');

router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.post('/login', login);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/stock', getStock);
router.get('/stock/:id', getStockById);
router.get('/tipoProducto', getTipoProducto);
router.post('/stock', createStock);
router.get('/stock/marca/:id', getStockByMarcaId);
router.get('/products/:id', getProductById);
router.get('/products/brand/:id', getProductsByBrandId);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

module.exports = router;