'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

//middlewares
app.use(express.static('client')) //client folder

app.get('/api/title', (req, res) =>
	res.json({title: 'Best To-do app ever, yo!'})
)

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
