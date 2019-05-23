var http = require("https");

class   Hypertube {
    constructor() {
        this.currentResult = null;
        this.currentPath = null;
    }

    searchTvShows(object, callback) {
        this.currentPath = "/3/search/tv?query=" + object.query + "&include_adult=false&page=1";
        this.ApiCall(function(tvShows){
            callback(tvShows);
        });
    }

    getTvShow(object, callback){
        this.currentPath = "/3/tv/" + object.id + "?";
        this.ApiCall(function(tvShow){
            callback(tvShow);
        });
    }

    getTvTrailer(object, callback) {
        this.currentPath = "/3/tv/"+object.id+"/videos?";
        this.ApiCall(function(videos){
            callback(videos);
        });
    }

    getMovieTrailer(object, callback) {
        this.currentPath = "/3/movie/"+object.id+"/videos?";
        this.ApiCall(function(videos){
            callback(videos);
        });
    }

    searchMovies(object, callback) {
        this.currentPath = "/3/search/movie?query=" + object.query + "&include_adult=false&page=1";
        this.ApiCall(function(movies){
            callback(movies);
        });
    }

    getTrending(object, callback) {
        this.currentPath = "/3/trending/"+object.type+"/"+object.timeFrame+"?";
        this.ApiCall(function(movies){
            callback(movies);
        });
    }

    getMovie(object, callback) {
        this.currentPath = "/3/movie/"+ object.id +"?";
        this.ApiCall(function(movie){
            callback(movie);
        });
    }

    getSeason(object, callback) {
        this.currentPath = "/3/tv/"+object.id+"/season/"+object.seasonNumber+"?";
        this.ApiCall(function(season){
            callback(season);
        });
    }

    getSimilarMovies(object, callback) {
        this.currentPath = "/3/movie/"+ object.id +"/similar?page=1";
        this.ApiCall(function(movies){
            callback(movies);
        });
    }

    getTvRecommendations(object, callback) {
        this.currentPath = "/3/tv/"+object.id+"/recommendations?";
        this.ApiCall(function(movies){
            callback(movies);
        });
    }

    getSimilarTvShows(object, callback) {
        this.currentPath = "/3/tv/"+object.id+"/similar?";
        this.ApiCall(function(movies){
            callback(movies);
        });
    }

    discoverMovies(callback) {
        this.currentPath = "/3/discover/movie?page=1&include_video=true&include_adult=false&sort_by=popularity.desc";
        this.ApiCall(function(movies){
            callback(movies);
        });
    }

    getUpcoming(callback) {
        this.currentPath = "/3/movie/upcoming?page=1";
        this.ApiCall(function(movies){
            callback(movies);
        });
    }

    ApiCall(callback) {
        var result;
        var options = {
            "method": "GET",
            "hostname": "api.themoviedb.org",
            "port": null,
            "path": encodeURI(this.currentPath + "&language=en-US&api_key=adc880e87d64c28aac3558c838b71d56&adult=false"),
            "headers": {}
          };
    
        var req = http.request(options, function (res) {
            var chunks = [];
          
            res.on("data", function (chunk) {
              chunks.push(chunk);
            });
            res.on("end", function () {
              var body = Buffer.concat(chunks);
              result = JSON.parse(body.toString());
              callback(result);
            });
        });
        req.end();
    }
}

module.exports = new Hypertube;