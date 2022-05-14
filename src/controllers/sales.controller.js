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
 
const getSaleById = async (req, res) => {
    const response = await pool.query('SELECT * FROM sales WHERE id = $1', [req.params.id]);
    res.json(response.rows); 
};

const getSales = async (req, res) => {
    const response = await pool.query('SELECT * FROM sales');
    res.json(response.rows); 
};

const getSalesByBrandId = async (req, res) => {
    const response = await pool.query('SELECT * FROM sales WHERE brand_id = $1', [req.params.id]);
    res.json(response.rows); 
};

const getSalesByEventId = async (req, res) => {
    const response = await pool.query('SELECT * FROM sales WHERE event_id = $1', [req.params.id]);
    res.json(response.rows); 
};

const getSalesViewByEventId = async (req, res) => {
    const response = await pool.query('select s.id, u.name as brand, p.description as product, pm.description as payment, quantity, p.price, s.total, s.profit from sales s join products p on s.product_id = p.id join payment_methods pm on s.payment_method_id = pm.id join users u on u.id = s.brand_id where s.event_id = $1', [req.params.id]);
    res.json(response.rows); 
};
// const deleteProduct = async (req, res) => {
//     const response = await pool.query('DELETE FROM products WHERE id = $1', [req.params.id]);
//     res.json(`Product ${req.params.id} deleted successfully`);
// };

// const updateProduct = async (req, res) => {
//     const{id} = req.params;
//     const{serial_number, description, product_type_id, price, brand_id} = req.body;

//     const response = await pool.query('UPDATE products SET serial_number = $1, description = $2, product_type_id = $3, price = $4, brand_id = $5 WHERE id = $6',
//         [serial_number, description, product_type_id, price, brand_id, id]
//     );

//     return res.json(response.rows[0])
// }

const createSale = async (req, res) => {
    const {brand_id, event_id, product_id, quantity, payment_method_id, total, profit} = req.body;
    const response = await pool.query('INSERT INTO sales (brand_id, event_id, product_id, quantity, payment_method_id, total, profit) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id', [
        brand_id, event_id, product_id, quantity, payment_method_id, total, profit
    ]);
    console.log(response);
    var id = response.rows[0].id;

    res.json({
        message: 'Sale Added Succesfully',
        body: {
            product: {brand_id, event_id, product_id, quantity, payment_method_id, total, profit, id},
        }
    })
};

module.exports = {
    createSale,
    getSaleById,
    getSalesByBrandId,
    //deleteProduct,
    //updateProduct,
    getSalesByEventId,
    getSalesViewByEventId,
    getSales
}