'use strict';

const express = require('express');

const PORT = process.env.PORT || 3000;

const app = express();

//middlewares
app.use(express.static('client')) //client folder

app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
