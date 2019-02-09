// DEPENDENCIES
// =====================================
// Read and set environment variables
require("dotenv").config();

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the API keys
var keys = require("./keys");

// Import the axios npm package.
var axios = require("axios");

// Import the moment npm package.
var moment = require("moment");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

// FUNCTIONS
// =====================================

// Helper function that gets the artist name
var getArtistNames = function(artist) {
  return artist.name;
};

// Function for running a Spotify search
var searchSpotify = function(songName) {
  if (songName === undefined) {
    songName = "walk this way";
  }

  spotify.search(
    {
      type: "track",
      query: songName
    },
    function(err, data) {
      if (err) {
        console.log("Oops-something went wrong: " + err);
        return;
      }

      var songs = data.tracks.items;

      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("ARTIST(S): " + songs[i].artists.map(getArtistNames));
        console.log("SONG NAME: " + songs[i].name);
        console.log("PREVIEW SONG: " + songs[i].preview_url);
        console.log("ALBUM: " + songs[i].album.name);
        console.log(
          "🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸"
        );
      }
    }
  );
};

var searchBand = function(artist) {
  var queryURL =
    "https://rest.bandsintown.com/artists/" +
    artist +
    "/events?app_id=codingbootcamp";

  axios.get(queryURL).then(function(response) {
    var jsonData = response.data;

    if (!jsonData.length) {
      console.log("No results found for " + artist);
      return;
    }

    console.log("Concert listting for " + artist + ":");

    for (var i = 0; i < jsonData.length; i++) {
      var show = jsonData[i];

      // Display information about each concert
      // If the concernt doesn't have a region, the show the country.

      console.log(
        show.venue.city +
          "," +
          (show.venue.region || show.venue.country) +
          " at " +
          show.venue.name +
          " " +
          moment(show.datetime).format("MM/DD/YYYY")
      );
    }
  });
};

// Movie search function
var searchMovie = function(movieName) {
  if (movieName === undefined) {
    movieName = "scarface";
  }

  var urlHit =
    "http://www.omdbapi.com/?t=" +
    movieName +
    "&y=&plot=full&tomatoes=true&apikey=trilogy";

  axios.get(urlHit).then(function(response) {
    var jsonData = response.data;

    console.log(
      "🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹"
    );

    console.log("TITLE: " + jsonData.Title);
    console.log("YEAR: " + jsonData.Year);
    console.log("RATED: " + jsonData.Rated);
    console.log("Actors: " + jsonData.Actors);
    console.log(
      "🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸🔸"
    );

    console.log("IMDB RATING: " + jsonData.imdbRating);
    console.log("COUNTRY: " + jsonData.Country);
    console.log("LANGUAGE: " + jsonData.Language);
    console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
    console.log(
      "🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹🔹"
    );
  });
};

// Function for running a command based on text file
var runFromRandomTxt = function() {
  fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);

    var dataArr = data.split(",");

    if (dataArr.length === 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length === 1) {
      pick(dataArr[0]);
    }
  });
};

// Function for determining which command is executed
var pick = function(caseData, functionData) {
  switch (caseData) {
    case "concert-this":
      searchBand(functionData);
      break;
    case "spotify-this-song":
      searchSpotify(functionData);
      break;
    case "movie-this":
      searchMovie(functionData);
      break;
    case "do-what-it-says":
      runFromRandomTxt();
      break;
    default:
      console.log("LIRI doesn't know that");
  }
};

// Function that takes in command line arguments and executes correct function.
var startLiri = function(argOne, argTwo) {
  pick(argOne, argTwo);
};

// MAIN PROCESS
// =====================================
startLiri(process.argv[2], process.argv.slice(3).join(" "));
