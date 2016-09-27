'use strict';

const { json } = require('body-parser')
const express = require('express');
const mongoose = require('mongoose');

const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/todo-app'

const PORT = process.env.PORT || 3000;

const app = express();

//middlewares
app.use(express.static('client')) //client folder
app.use(json());

app.get('/api/title', (req, res) =>
	res.json({title: 'Best To-do app ever, yo!'})
)

const Item = mongoose.model('item', {
	task: String
})

app.get('/api/items', (req, res, err) =>
	Item
		.find()
		.then(items => res.json( {items} ))
		.catch(err)
)

app.post('/api/items', (req, res, err) => {
	const task = req.body
	Item
		.create(task)
		.then(task => res.json(task))
		.catch(err)
	}
)

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URL, () =>
	app.listen(PORT, () => console.log(`listening on port: ${PORT}`))
)
