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
    const { name, email } = req.body;

    const response = await pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email]);
    console.log(response);
    res.json({
        message: 'User Added Succesfully',
        body: {
            user: {name, email}
        }
    })
};

const deleteUser = async (req, res) => {
    const response = await pool.query('DELETE FROM users WHERE id = $1', [req.params.id]);
    res.json(`User ${req.params.id} deleted successfully`);
};

module.exports = {
    getUsers,
    getUserById,
    createUser,
    deleteUser
}