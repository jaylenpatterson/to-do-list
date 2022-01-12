const axios = require('axios');
// makes an api call to rapid api then compares that data against 3 seperate lists of key words
// This function then decides whether a string should be categorized as a "read", "watch", "eat" or "buy"
const searcher = function(query) {
	// keyWords for regex
	const watchKeyWords = [
		'movie',
		'animation',
		'imbd',
		'sitcom',
		'film',
		'television',
		'tv',
		'netflix',
		'directed',
		'watch',
		'anime',
		'rotten tomatoes',
		'program',
		'stream',
		'season',
		'Blu-ray',
		'director',
		'show',
		'TV',
		'animated'
	];
	const readKeyWords = [
		'novel',
		'author',
		'novels',
		'Paperback',
		'audible',
		'read',
		'audiobook',
		'hardcover',
		'written',
		'books',
		'poem',
		'poems',
		'volume',
		'vol',
		'vols',
		'library'
	];
	const eatKeyWords = [
		'meal',
		'dinner',
		'snacks',
		'food',
		'delicious',
		'dining',
		'resturant',
		'cusine',
		'diners',
		'diner',
		'prepares',
		'fresh',
		'menu',
		'juicy',
		'recipe',
		'marinate',
		'eat'
	];
	// finds out if this string has any of the watch key words within its title or description.
	const findWatchKeyWords = function(str) {
		for (let word of watchKeyWords) {
			if (str.toLowerCase().search(word) != -1) {
				return true;
			}
		}
		return false;
	};

	// finds out if this string has any of the read key words within its title or description.
	const findReadKeyWords = function(str) {
		for (let word of readKeyWords) {
			if (str.toLowerCase().search(word) != -1) {
				return true;
			}
		}
		return false;
	};
	// finds out if this string has any of the eat key words within its title or description. If not the word is categorized as a product to buy
	const findEatKeyWords = function(str) {
		for (let word of eatKeyWords) {
			if (str.toLowerCase().search(word) != -1) {
				return true;
			}
		}
		return false;
	};
	// settings for an api call to rapid api
	let options = {
		method: 'GET',
		url: `https://google-search3.p.rapidapi.com/api/v1/search/q=${query}&num=5&lr=lang_en&hl=en&cr=CA`,
		headers: {
			'x-user-agent': 'desktop',
			'x-proxy-location': 'CA',
			'x-rapidapi-host': 'google-search3.p.rapidapi.com',
			'x-rapidapi-key': '7d5cd9333cmsh890e072fca90dbfp1ddaf0jsn0efc5f6e76de'
		}
	};

	return axios.request(options).then((response) => {
		// logic that uses helper functions to organize a string into its respective category
		if (
			findReadKeyWords(response.data.results[0].description) ||
			findReadKeyWords(response.data.results[0].title)
		) {
			return new Promise((resolve) => resolve('read'));
		}

		if (
			findWatchKeyWords(response.data.results[0].description) ||
			findWatchKeyWords(response.data.results[0].title)
		) {
		return	new Promise((resolve) => resolve('watch'));
		}

		if (findEatKeyWords(response.data.results[0].description) || findEatKeyWords(response.data.results[0].title)) {
		return	new Promise((resolve) => resolve('eat'));
		} else {
		return	new Promise((resolve) => resolve('buy'));
		}
	});
};

module.exports = searcher;
