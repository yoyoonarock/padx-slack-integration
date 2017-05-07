'use strict';

const bodyParser = require('body-parser');
const express = require('express');
const rp = require('request-promise');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, function () {
	console.log('Express server listening on port ' + PORT);
});

app.get('/', function(req, res) {
	res.send("It's working!");
});

app.post('/padx', function(req, res) {
	var searchParams = req.body.text;
	var requestObject = {
		method: 'GET',
		uri: 'https://www.googleapis.com/customsearch/v1',
		qs: {
			key: process.env.GOOGLE_API_KEY,
			cx: process.env.GOOGLE_SEARCH_ENGINE_ID,
			q: searchParams,
			num: 1 // return at most one result from google
		}
	};

	var returnText;

	rp(requestObject)
		.then(function(body) {
			body = JSON.parse(body);
			var searchResults = body.items;
			if (searchResults) {
				var resultLink = searchResults[0].link;
				returnText = 'Top result for "' + searchParams + '": ' + resultLink;

				res.json({
					response_type: "in_channel",
					text: returnText
				});
			} else {
				returnText = "Sorry! Couldn't find any search results for " + searchParams;
				res.json({
					response_type: "in_channel",
					text: returnText
				});
			}
		})
		.catch(function(err) {
			console.log(err)
			returnText = 'Sorry! There was an error and I have no idea why. Please try again!\nStacktrace: ' + err;
			res.json({
				response_type: "in_channel",
				text: returnText
			});
		});
});
