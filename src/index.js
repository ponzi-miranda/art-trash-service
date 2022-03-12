const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

//routes
app.use(require('./routes/index'));

app.listen(port);
console.log('sin miedo al éxito por puerto 3000');