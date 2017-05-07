const cheerio = require('cheerio');
const rp = require('request-promise');

function getMissionInfo(url) {
	return rp(url)
		.then(function(html) {
			var $ = cheerio.load(html);
			var missionName = $('#content .name').text();

			return missionName;
		})
		.catch(function(error) {
			console.log("Couldn't get mission info. Error:" + error);
		});}

function getMonsterInfo(url) {
	return rp(url)
		.then(function(html) {
			var $ = cheerio.load(html);
			var monsterName = $('#content .name').text();

			return monsterName;
		})
		.catch(function(error) {
			console.log("Couldn't get monster info. Error:" + error);
		});
}

function getPageInfo(url) {
	var pathlessUrl = url.substr(1 + url.lastIndexOf('/'));
	var pageType = pathlessUrl.substr(0, pathlessUrl.indexOf('.asp'));

	switch(pageType){
		case 'mission':
			return getMissionInfo(url)
		case 'monster':
			return getMonsterInfo(url);
	}
}

module.exports = {
	getPageInfo: getPageInfo
};