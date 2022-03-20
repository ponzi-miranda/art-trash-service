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

//CRUD USERS

const getUsers = async (req, res) => {
   const response = await pool.query('SELECT * FROM users');
   console.log(response.rows);
   res.status(200).json(response.rows);
};

const getUserById = async (req, res) => {
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    res.json(response.rows); 
}

const createUser = async (req, res) => {
    const { name, email, password } = req.body;

    const response = await pool.query('INSERT INTO users (name, email, password) VALUES ($1, $2, $3)', [name, email, password]);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {name, email, password}
        }
    })
};

const login = async (req, res) => {
    const {email, password} = req.body;

    const response = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    console.log(response);
    if(response.rowCount != 0){
        res.status(200).json('Ok');
    }
    else{
        res.json(`Error`);
    }
}

const deleteUser = async (req, res) => {
    const response = await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json(`User ${req.params.id} deleted successfully`);
};

//CRUD STOCK  https://art-trash.herokuapp.com/login

const getTipoProducto = async (req, res) => {
    const response = await pool.query('SELECT * FROM tipoproducto');
    console.log(response.rows);
    res.status(200).json(response.rows);
};

const getStock = async (req, res) => {
    const response = await pool.query('SELECT * FROM stock');
    console.log(response.rows);
    res.status(200).json(response.rows);
};
 
const getStockById = async (req, res) => {
    const response = await pool.query('SELECT * FROM users WHERE id = $1', [req.params.id]);
    res.json(response.rows); 
};

const getStockByMarcaId = async (req, res) => {
    const response = await pool.query('SELECT * FROM users WHERE marcaid = $1', [req.params.id]);
    res.json(response.rows); 
};


const createStock = async (req, res) => {
    const { marcaid, idtipoproducto, descripcion, codigo, cantidad, precio } = req.body;

    const response = await pool.query('INSERT INTO stock (marcaid, idtipoproducto, descripcion, codigo, cantidad, precio) VALUES ($1, $2, $3, $4, $5, $6)', [marcaid, idtipoproducto, descripcion, codigo, cantidad, precio]);
    console.log(response);
    res.json({
        message: 'Stock Added Succesfully',
        body: {
            stock: {marcaid, idtipoporducto, descripcion, codigo, cantidad, precio}
        }
    })
};


module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser,
    login,
    getStock,
    getStockById,
    createStock,
    getStockByMarcaId,
    getTipoProducto
}