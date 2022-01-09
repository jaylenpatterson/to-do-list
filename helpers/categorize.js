const axios = require('axios');

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
	'TV'
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
	'marinate'
];

const findWatchKeyWords = function(str) {
	for (let word of watchKeyWords) {
		if (str.search(word) != -1) {
			return true;
		}
	}
	return false;
};

const findReadKeyWords = function(str) {
	for (let word of readKeyWords) {
		if (str.search(word) != -1) {
			return true;
		}
	}
	return false;
};

const findEatKeyWords = function(str) {
	for (let word of eatKeyWords) {
		if (str.search(word) != -1) {
			return true;
		}
	}
	return false;
};

// Produces a string with information about the type of medium/entity the query is
const searcher = function(query) {
	const params = {
		//These API calls are limited to 100 be careful :)
		api_key: '8E18BC37CDA44180A962F38036260267',
		engine: 'google',
		gl: 'ca',
		lr: 'lang_en',
		cr: 'ca',
		q: query
	};

	// make the http GET request to SerpWow
	axios
		.get('https://api.serpwow.com/search', { params })
		.then((response) => {
			// console.log(JSON.stringify(response.data['organic_results'][0]['snippet']))
			// determines if any key words can be found within the string that the searcher function retreives. If so return true otherwise return false
			if (findWatchKeyWords(JSON.stringify(response.data['organic_results'][0]['snippet'], 0, 2))) {
				return "watch";
			}

			if (findReadKeyWords(JSON.stringify(response.data['organic_results'][0]['snippet'], 0, 2))) {
				return "read";
			}

			if (findEatKeyWords(JSON.stringify(response.data['organic_results'][0]['snippet'], 0, 2))) {
				return "resturant";
			} else {
        return "buy";
			}
		})
		.catch((error) => {
			// catch and print the error
			console.log(error);
		});
};

// searcher('harry potter');

// module.exports(searcher);


// let re = new RegExp(//, 'i')

// const findWatchKeyWords = function(str) {
//   for(let word of watchKeyWords) {
//     if (str.search(word) != -1) {
//       return true;
//     }
//   }
//   return false;
// }
// findWatchKeyWords("family guy")

// knowledge_graph.description (for resturants)
// knowledge_graph.type (for movies and books)
// response.data.knowledge_graph["known_attributes"][0].attribute
//snippet
