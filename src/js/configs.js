/**
 * Route configuration
 */
mikael.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        pageClass: 'me',
        title: '',
        templateUrl: 'partials/me.html',
        controller: 'meCtrl'
    }).
    when('/cv', {
        pageClass: 'cv',
        title: 'Graphic designer and frontend developer ',
        templateUrl: 'partials/cv.html',
        controller: 'cvCtrl'
    }).
    when('/blog', {
        pageClass: 'blog',
        title: 'Blog of ',
        templateUrl: 'partials/blog.html',
        controller: 'blogCtrl'
    }).
    when('/portfolio', {
        pageClass: 'portfolio',
        title: 'Portfolio of ',
        templateUrl: 'partials/portfolio.html',
        controller: 'portfolioCtrl'
    }).
    when('/volunteering', {
        pageClass: 'volunteering',
        title: 'Volunteering - ',
        templateUrl: 'partials/volunteering.html',
        controller: 'volunteeringCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});
