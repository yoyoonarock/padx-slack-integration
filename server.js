'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, function () {
	console.log('Express server listening on port ' + PORT);
});

app.post('/padx', function(req, res) {
	var searchText = req.body.text;

	var data = {
		text: 'I got your padx request! It was ' + searchText
	};
	
	res.json(data);
});
