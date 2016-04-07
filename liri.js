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