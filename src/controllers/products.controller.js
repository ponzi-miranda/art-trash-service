const { Pool } = require ('pg');

//local db
// const pool = new Pool({
//     host: 'localhost',
//     user: 'postgres',
//     password: 'cacho-rita',
//     database: 'arttrash',
//     port: '5432',
// });

const pool = new Pool({
    host: 'ec2-18-235-114-62.compute-1.amazonaws.com',
    user: 'myogrscrsmzoqv',
    password: '02723d316c5701569a1e9a3c73a3e534f3a119d76c1ab8639783c7a3526c453f',
    database: 'd7vnh6vi13oiol',
    port: '5432',
    ssl: {
        rejectUnauthorized: false
      }
});

//CRUD PRODUCT  
 
const getProductById = async (req, res) => {
    const response = await pool.query('SELECT * FROM products WHERE id = $1', [req.params.id]);
    res.json(response.rows); 
};

const getProductDataById = async (req, res) => {
    const response = await pool.query('SELECT description, product_type_id, serial_number, price, quantity FROM products p join stock s  on p.id  = s.product_id WHERE p.id = $1', [req.params.id]);
    res.json(response.rows); 
};

const getProductTypes = async (req, res) => {
    const response = await pool.query('SELECT * FROM product_type');
    console.log(response.rows);
    res.status(200).json(response.rows);
 };

const getProductsByBrandId = async (req, res) => {
    const response = await pool.query('SELECT * FROM products WHERE brand_id = $1', [req.params.id]);
    res.json(response.rows); 
};

const deleteProduct = async (req, res) => {
    const response = await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
    res.json(`Product ${req.params.id} deleted successfully`);
};

const updateProduct = async (req, res) => {
    const{id} = req.params;
    const{serial_number, description, product_type_id, price, brand_id} = req.body;

    const response = await pool.query('UPDATE products SET serial_number = $1, description = $2, product_type_id = $3, price = $4, brand_id = $5 WHERE id = $6',
        [serial_number, description, product_type_id, price, brand_id, id]
    );

    return res.json(response.rows[0])
}

const createProduct = async (req, res) => {
    const { serial_number, description, product_type_id, price, brand_id } = req.body;
    const response = await pool.query('INSERT INTO products (serial_number, description, product_type_id, price, brand_id) VALUES ($1, $2, $3, $4, $5) RETURNING id', [
        serial_number, description, product_type_id, price, brand_id
    ]);
    console.log(response);
    var id = response.rows[0].id;

    res.json({
        message: 'Product Added Succesfully',
        body: {
            product: {serial_number, description, product_type_id, price, brand_id, id},
            
        }
    })
};

module.exports = {
    createProduct,
    getProductById,
    getProductsByBrandId,
    deleteProduct,
    updateProduct,
    getProductTypes,
    getProductDataById
}