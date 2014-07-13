/**
 * MikaelKorpela.fi AngularJS module
 */
var mikael = angular.module('mikael', [
        'ngAnimate',
        'ngRoute',
        'ngSanitize',
        'akoenig.deckgrid',
        'angular-flexslider',
        'ui.keypress',
    ]);

/*
 * Update title and page class after route changes
 */
mikael.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        window.scrollTo(0,0); // Just make sure we're at the top of the page when page has changed...
        $rootScope.title = current.$$route.title;
        $rootScope.pageClass = current.$$route.pageClass;
    });
}]);
