'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

//middlewares
app.use(express.static('client')) //client folder


app.get('/api/title', (req, res) =>
	res.send({ title: 'DO IT ALREADY' })
)

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
