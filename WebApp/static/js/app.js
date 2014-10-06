// Namespace App
var moviesApp = moviesApp || {};

moviesApp.config = (function()
{
    return {
        init: function()
        {
            this.transparency();
        },
        transparency: function()
        {
            Transparency.matcher = function(element, key)
            {
                return element.el.getAttribute('data-name') == key;
            };
        },
        movieApiUrl: 'http://dennistel.nl/movies',
        genreDirective:
        {
            genre:
            {
                href: function(params)
                {
                    return params.value + this.genre;
                }
            }
        },
        movieDirective:
        {
            movie_url:
            {
                text: function(params)
                {
                    return params.value;
                },
                href: function(params)
                {
                    return params.value + moviesApp.utils.formatMovieTitle(this.title);
                }
            },

            cover:
            {
                src: function(params)
                {
                    return this.cover;
                }
            },
            actors:
            {
                url_photo:
                {
                    src: function(params)
                    {
                        return this.url_photo;
                    }
                },
                url_character:
                {
                    text: function(params) {
                        return params.value;
                    },
                    href: function(params)
                    {
                        return this.url_character;
                    }
                },
                url_profile:
                {
                    text: function(params) {
                        return params.value;
                    },
                    href: function(params)
                    {
                        return this.url_profile;
                    }
                }
            }
        }
    }
})();

moviesApp.utils = (function ()
{
    return {
        xhrTrigger: function (type, url, success, data)
        {
            var req = new XMLHttpRequest;
            req.open(type, url, true);

            req.setRequestHeader('Content-type','application/json');

            type === 'POST' ? req.send(data) : req.send(null);

            req.onreadystatechange = function()
            {
                if (req.readyState === 4)
                {
                    if (req.status === 200 || req.status === 201)
                    {
                        success(req.responseText);
                    }
                }
            }
        },
        dateToYMD: function(date)
        {
            var d = date.getDate();
            var m = date.getMonth() + 1;
            var y = date.getFullYear();
            return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
        },
        formatMovieTitle: function(title)
        {
            return title.replace(/\s+/g, '-').toLowerCase();
        }
    }
})();

moviesApp.content = (function ()
{
    return {
        about:
        {
            title: 'About',
            description: 'Description about me'
        }
    }
})();

moviesApp.sections = (function()
{
    function removeClassActiveFromSections()
    {
        var allSections = document.getElementsByTagName('section');

        for(var i = 0; i < allSections.length; i++)
        {
            allSections[i].classList.remove('active');
        }
    }

    function getGenres(movieData)
    {
        var genres = _.union(_.flatten(_.pluck(movieData, 'genres')));

        genres = _.map(genres, function(genre, i)
        {
            genre = {
                genre: genre
            }

            return genre;
        });

        return genres;
    }

    function manipulateMovieData(response)
    {
        var movieData = _.map(JSON.parse(response), function(movie, i)
        {
            movie.reviews = _.reduce(movie.reviews, function(memo, review)
            {
                return memo + review.score;
            }, 0) / movie.reviews.length;

            movie.releaseDate = moviesApp.utils.dateToYMD(new Date(movie.release_date));

            return movie;
        }, 0);

        movieData = _.sortBy(movieData, function(movie)
        {
            return movie.releaseDate;
        });

        return JSON.stringify(movieData.reverse());
    }

    return {
        init: function()
        {
            this.about();
        },
        about: function()
        {
            Transparency.render(document.getElementById('about'), moviesApp.content.about);
        },
        movies: function(genre)
        {
            if(localStorage.getItem('movies'))
            {
                console.log('Haal movies uit de localStorage');
            }
            else
            {
                moviesApp.utils.xhrTrigger('GET', moviesApp.config.movieApiUrl, function(response)
                {
                    console.log('Haal movies api binnen en zet in localStorage');

                    response = manipulateMovieData(response);

                    localStorage.setItem('movies', response);

                    // Call this function again (because the API has been request and saved into localStorage)
                    moviesApp.sections.movies();
                });
            }

            var movieData = JSON.parse(localStorage.getItem('movies'));
            var genres = getGenres(movieData);

            if(genre != undefined)
            {
                movieData = _.filter(movieData, function(movie)
                {
                    return _.contains(movie.genres, genre);
                });
            }

            Transparency.render(document.getElementById('genreCollection'), genres, moviesApp.config.genreDirective);
            Transparency.render(document.getElementById('movieCollection'), movieData, moviesApp.config.movieDirective);
        },
        movie: function(title)
        {
            if(localStorage.getItem('movies'))
            {
                console.log('Haal movie met TITLE ' + title + ' binnen uit localStorage');
            }
            else
            {
                moviesApp.utils.xhrTrigger('GET', moviesApp.config.movieApiUrl, function (response)
                {
                    console.log('Haal movies api binnen en zet in localStorage');

                    response = manipulateMovieData(response);

                    localStorage.setItem('movies', response);

                    moviesApp.sections.movie(title);
                });
            }

            var movieData = _.filter(JSON.parse(localStorage.getItem('movies')), function(movie)
            {
                return moviesApp.utils.formatMovieTitle(movie.title) == title;
            });

            Transparency.render(document.getElementById('movie'), movieData, moviesApp.config.movieDirective);
        },
        toggle: function(section)
        {
            removeClassActiveFromSections();

            document.querySelector('#' + section).classList.add('active');
        }
    }
})();

moviesApp.router = (function()
{
    return {
        init: function()
        {
            routie(
            {
                'movies': function()
                {
                    console.log('Open movies page');

                    moviesApp.sections.movies();
                    moviesApp.sections.toggle('movies');
                },
                'movies/genre/:genre': function(genre)
                {
                    console.log('Open movies page - filter movies on genre: ' + genre);

                    moviesApp.sections.movies(genre);
                    moviesApp.sections.toggle('movies');
                },
                'movie/:title': function(title)
                {
                    console.log('Open specified movie page by TITLE: ' + title);

                    moviesApp.sections.movie(title);
                    moviesApp.sections.toggle('movie');
                },
                'about': function()
                {
                    console.log('Open about page');
                    moviesApp.sections.toggle('about');
                },
                '*': function()
                {
                    console.log('Open movies page (something else than movies/about chosen in url)');

                    // Fallback - open movies page
                    moviesApp.sections.movies();
                    moviesApp.sections.toggle('movies');
                }
            });
        }
    }
})();

moviesApp.controller = (function()
{
    return {
        init: function()
        {
            moviesApp.config.init();

            moviesApp.router.init();

            moviesApp.sections.init();
        }
    }
})();

// Init the app controller
moviesApp.controller.init();