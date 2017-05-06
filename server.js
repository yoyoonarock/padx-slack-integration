'use strict';

const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');

const PORT = 3000;

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(PORT, function () {
	console.log('Express server listening on port ' + PORT);
});

app.post('/padx', function(req, res) {
	var searchParams = req.body.text;
	var requestObject = {
		method: 'GET',
		uri: 'https://www.googleapis.com/customsearch/v1',
		qs: {
			key: 'INSERT_API_TOKEN_HERE',
			cx: 'INSERT_CUSTOM_SEARCH_ID',
			q: searchParams,
			num: 1 // return at most one result from google
		}
	};

	var returnText;

	request(requestObject, function(error, response, body) {
		body = JSON.parse(body);

		if (!error && response.statusCode == 200) {
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

		} else {
			returnText = 'Sorry! There was an error and I have no idea why. Please try again!';
			res.json({
				response_type: "in_channel",
				text: returnText
			});
		}
	});
});
