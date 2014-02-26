/**
 * Route configuration
 */
Phrasebook.config(function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'partials/me.html',
        controller: 'meCtrl'
    }).
    when('/about', {
        templateUrl: 'partials/cv.html',
        controller: 'cvCtrl'
    }).
    when('/translate', {
        templateUrl: 'partials/portfolio.html',
        controller: 'portfolioCtrl'
    }).
    otherwise({
        redirectTo: '/'
    });

    $locationProvider.html5Mode(true);
});