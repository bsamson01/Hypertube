const express = require('express');
const router = express.Router();
const hypertube = require('./hypertube');
const image_url = "https://image.tmdb.org/t/p/original/";
const youtube_url = "https://www.youtube.com/embed/";
const movie_url = "https://vidsrc.me/embed/";

router.get('*', function(req, res, next){
    res.locals.user = req.user || null;
    next();
});

router.post('/', function(req, res, next) {

    //on movie search display all movies matching query
    hypertube.searchMovies({query: req.body.searchText} , function(movies) {
        res.render("display_movies", {
            title:'Hypertube | Movies',
            movies: movies.results,
            image_url: image_url
        });
    });
});


router.get('/display', function(req, res, next) {
    var id = req.query.id;
    var trailer;

    hypertube.getMovie({id: id}, function(movie) {
        hypertube.getMovieTrailer({id: id}, function (response) {
            var link = "";
            var results = response.results;

            results.forEach(result => {
                if (result.site == "YouTube" && result.type == "Trailer" && link == "")
                        link = youtube_url + result.key;
            });

            if (link == '') {
                results.forEach(result => {
                    if (result.site === 'YouTube' && link == "")
                        link = youtube_url + result.key;
                });
            }

            if (link == '')
                trailer = "https://giphy.com/embed/du3G1USMUtidvzag2V";
            else
                trailer = link + '?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0';

            hypertube.getSimilarMovies({id : id}, function(similarMovies) {
                res.render("display_movies", {
                    title: movie.title + ' | Hypertube',
                    trailer: trailer,
                    movie: movie,
                    movieVideo : movie_url + movie.imdb_id,
                    similarMovies: similarMovies.results,
                    image_url: image_url
                });
            });
        });
    });
});


router.get('/series/display', function(req, res, next) {
    var id = req.query.id;
    var trailer;
    var seasons = null;

    hypertube.getTvShow({id: id}, function(show) {
        hypertube.getTvTrailer({id: id}, function (response) {
            var link = "";
            var results = response.results;

            results.forEach(result => {
                if (result.site == "YouTube" && result.type == "Trailer" && link == "")
                        link = youtube_url + result.key;
            });

            if (link == '') {
                results.forEach(result => {
                    if (result.site === 'YouTube' && link == "")
                        link = youtube_url + result.key;
                });
            }

            if (link == '')
                trailer = "https://giphy.com/embed/du3G1USMUtidvzag2V";
            else
                trailer = link + '?autoplay=0&fs=1&iv_load_policy=3&showinfo=0&rel=0&cc_load_policy=0&start=0&end=0';
            if (show.seasons)
                seasons = show.seasons;

            hypertube.getSimilarTvShows({id : id}, function(similarShows) {
                res.render("display_movies", {
                    title: show.name + ' | Hypertube',
                    trailer: trailer,
                    show: show,
                    similarShows: similarShows.results,
                    image_url: image_url,
                    seasons: seasons
                });
            });

        });
    });
});

module.exports = router;
