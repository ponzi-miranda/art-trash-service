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

const getEvents = async (req, res) => {
    const response = await pool.query('SELECT * FROM events');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
 
const getEventById = async (req, res) => {
    const response = await pool.query('SELECT * FROM events WHERE id = $1', [req.params.id]);
    res.json(response.rows); 
};

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

const updateEvent = async (req, res) => {
    const{id} = req.params;
    const{name, inscription, start_date, finish_date} = req.body;

    const response = await pool.query('UPDATE events SET name = $1, inscription = $2, start_date = $3, finish_date = $4 WHERE id = $5',
        [name, inscription, start_date, finish_date, id]
    );

    return res.json(response.rows)
}

module.exports = {

    createEvent,
    // getStockByMarcaId,
    updateEvent,
    // getStockByBrandId,
    getEvents,  
    getEventById
}