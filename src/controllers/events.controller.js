const { response } = require('express');
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


// const getTipoProducto = async (req, res) => {
//     const response = await pool.query('SELECT * FROM product_type');
//     console.log(response.rows);
//     res.status(200).json(response.rows);
// };

// const getStock = async (req, res) => {
//     const response = await pool.query('SELECT * FROM stock');
//     console.log(response.rows);
//     res.status(200).json(response.rows);
// };
 
// const getStockById = async (req, res) => {
//     const response = await pool.query('SELECT * FROM stock WHERE id = $1', [req.params.id]);
//     res.json(response.rows); 
// };

// const getStockByMarcaId = async (req, res) => {
//     const response = await pool.query('SELECT * FROM stock WHERE brand_id = $1', [req.params.id]);
//     res.json(response.rows); 
// };

// const getStockByBrandId = async (req, res) => {
//     const response = await pool.query('select s.id, product_id, p.description, pt.description as type, quantity, p.price from stock s join products p on s.product_id = p.id join product_type pt on p.product_type_id = pt.id where s.brand_id = $1',
//     [req.params.id]);
//     res.json(response.rows); 
// };


const createEvent = async (req, res) => {
        const { name, inscription, start_date, finish_date } = req.body;

        const response = await pool.query('INSERT INTO events (name, inscription, start_date, finish_date) VALUES ($1, $2, $3, $4)', [
            name, inscription, start_date, finish_date
        ]);
        console.log(response);
        res.json({
            message: 'Event Added Succesfully',
            body: {
                event: {name, inscription, start_date, finish_date}
            }
        })   
};


module.exports = {

    createEvent,
    // getStockByMarcaId,
    // getTipoProducto,
    // getStockByBrandId,
    // getStock,  
    // getStockById,
}