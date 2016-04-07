var fs = require("fs");
var keys = require("./keys.js");
var request = require("request");
var Twitter = require("twitter");
var spotify = require("spotify");

var uRequest = process.argv[2];
var uParam = process.argv[3];

var client = new Twitter({
	consumer_key: keys.twitterKeys.consumer_key,
	consumer_secret: keys.twitterKeys.consumer_secret,
	access_token_key: keys.twitterKeys.access_token_key,
	access_token_secret: keys.twitterKeys.access_token_secret
});
directUser(uRequest, uParam);
function directUser(uRequest, uParam){
	switch(uRequest){
		case "my-tweets" :
			getTweets();
			break;
		case "spotify-this-song":
			getSong(uParam);
			break;
		case "movie-this":
			getMovie(uParam);
			break;
		case "do-what-it-says":
			doWhatItSays();
			break;
		default:
			console.log("Your choices are 'my-tweets', 'spotify-this-song', 'movie-this', or 'do-what-it-says'")
	};
};
function getTweets(){
	console.log("\nMost recent Tweets:\n");
	var params = {screen_name: '@RobBlack0'};
	client.get('statuses/user_timeline', params, function(error, tweets, response){
	  if (!error) {
	    var totalTweets = tweets.length
	    if (totalTweets>20){
	    	totalTweets=20;
	    }
	    for (i=0;i<totalTweets;++i){
	    	console.log(tweets[i].created_at+": "+tweets[i].text);
	    }
	    	console.log("\n");
	  }else{console.log(error)}
	});
};
function getSong(uParam){
	if(uParam == undefined) uParam = "what's my age again";
	spotify.search({type: "track", query: uParam}, function(err, data){
		var song = data.tracks.items[0];
		console.log("Artist: " + song.artists[0].name)
		console.log("Song:" + song.name)
		console.log("Preview: " + song.preview_url)
		console.log("Album: " + song.album.name)
	})
};
function getMovie(uParam){
	if(uParam == undefined) uParam = "Mr. Nobody";
	request('http://www.omdbapi.com/?t='+uParam+'&y=&plot=short&tomatoes=true&r=json', function (error, response, body) {
		if (!error && response.statusCode == 200) {
			var mov = JSON.parse(body);
			console.log("\nTitle: " + mov.Title);
			console.log("Year: " + mov.Year);
			console.log("Country: " + mov.Country);
			console.log("Language: " + mov.Language);
			console.log("Actors: " + mov.Actors);
			console.log("IMDB Rating: " + mov.imdbRating);
			console.log("Rotten Tomatoes Rating: " + mov.tomatoRating);
			console.log("Rotten Tomatoe URL: " + mov.tomatoURL);
		};
	});
};
function doWhatItSays(){
	fs.readFile("random.txt", "utf-8", function(err, data){
		if(err) console.log(err);
		var params = data.split(", ");
		directUser(params[0], params[1]);
	});
};