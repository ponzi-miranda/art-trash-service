const {Router} = require('express');
const router = Router();

const {login} = require('../controllers/index.controller');
const {getStock, getStockById, createStock, getTipoProducto, getStockByMarcaId, getStockByBrandId, updateStock } = require('../controllers/stock.controller');
const{getUsers, createUser, getUserById, deleteUser, updateUser} = require('../controllers/users.controller');
const{getProductById,getProductDataById, getProductsByBrandId, createProduct, updateProduct, deleteProduct, getProductTypes} = require('../controllers/products.controller');
const{getSaleById, getSalesByBrandId, createSale, getSalesByEventId, getSalesViewByEventId, getSales} = require('../controllers/sales.controller');
const{createEvent, getEvents} = require('../controllers/events.controller');


router.get('/users', getUsers);
router.get('/users/:id', getUserById);
router.post('/users', createUser);
router.post('/login', login);
router.delete('/users/:id', deleteUser);
router.put('/users/:id', updateUser);
router.get('/stock', getStock);
router.get('/stock/:id', getStockById);
router.put('/stock/:id', updateStock);
router.get('/tipoProducto', getTipoProducto);
router.post('/stock', createStock);
router.get('/stock/marca/:id', getStockByMarcaId);
router.get('/stock/brand/:id', getStockByBrandId);
router.get('/products/:id', getProductById);
router.get('/products/brand/:id', getProductsByBrandId);
router.post('/products', createProduct);
router.put('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);
router.get('/product/types', getProductTypes);
router.get('/sales/:id', getSaleById);
router.get('/sales/brand/id', getSalesByBrandId);
router.post('/sales', createSale);
router.get('/sales', getSales);
router.get('/sales/event/id', getSalesByEventId);
router.get('/salesEvent/:id', getSalesViewByEventId);
router.post('/event', createEvent);
router.get('/events', getEvents);
router.get('/products/data/:id', getProductDataById);


module.exports = router;