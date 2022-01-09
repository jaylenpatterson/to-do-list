const axios = require('axios');

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
			// print the JSON response from SerpWow
			console.log(JSON.stringify(response.data['organic_results'][0]['snippet'], 0, 2));
		})
		.catch((error) => {
			// catch and print the error
			console.log(error);
		});
};

searcher('churches chicken');

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
	'director'
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

// knowledge_graph.description (for resturants)
// knowledge_graph.type (for movies and books)
// response.data.knowledge_graph["known_attributes"][0].attribute
//snippet
