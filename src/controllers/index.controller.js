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

const login = async (req, res) => {
    const {email, password} = req.body;

    const response = await pool.query('SELECT * FROM users WHERE email = $1 AND password = $2', [email, password]);
    console.log(response);
    if(response.rowCount != 0){
        res.status(200).json(response.rows[0].id);
    }
    else{
        res.json(`Error`);
    }
}

module.exports = {

    login
}