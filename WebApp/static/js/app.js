// Namespace App
var App = App || {};

App.config = (function()
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
        movieDirective:
        {
            cover:
            {
                src: function(params)
                {
                    return this.cover;
                }
            }
        }
    }
})();

App.content = (function ()
{
    return {
        about:
        {
            title: 'About',
            description: 'About me'
        },
        movies:
        [
            {
                title: 'Let\'s be comps',
                releaseDate: '11 januari 2014',
                description: 'Description',
                cover: 'images/letsbecops3.jpg'
            },
            {
                title: 'November man',
                releaseDate: '11 januari 2014',
                description: 'Description',
                cover: 'images/novemberman3.jpg'
            }
        ]
    }
})();

App.sections = (function()
{
    function removeClassActiveFromSections()
    {
        var allSections = document.getElementsByTagName('section');

        for(var i = 0; i < allSections.length; i++)
        {
            allSections[i].classList.remove('active');
        }
    }

    return {
        init: function()
        {
            this.about();
            this.movies();
        },
        about: function()
        {
            Transparency.render(document.getElementById('about'), App.content.about);
        },
        movies: function()
        {
            Transparency.render(document.getElementById('movieCollection'), App.content.movies, App.config.movieDirective);
        },
        toggle: function(section)
        {
            removeClassActiveFromSections();

            document.querySelector('#' + section).classList.add('active');
        }
    }
})();

App.router = (function()
{
    return {
        init: function()
        {
            routie(
            {
                'movies': function()
                {
                    console.log('Open movies page');
                    App.sections.toggle('movies');
                },
                'about': function()
                {
                    console.log('Open about page');
                    App.sections.toggle('about');
                },
                '*': function()
                {
                    console.log('Open movies page (something else than movies/about chosen in url)');
                    App.sections.toggle('movies');
                }
            });
        }
    }
})();

App.controller = (function()
{
    return {
        init: function()
        {
            App.config.init();

            App.router.init();

            App.sections.init();
        }
    }
})();

// Init the app controller
App.controller.init();