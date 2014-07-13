/**
 * Main Controller
 */
mikael.controller('mainCtrl', function($scope, $rootScope, $location, $window, $browser, $timeout) {

    /**
     * Improve scrolling performance by disabling hover during scroll events
     * @link http://www.thecssninja.com/javascript/pointer-events-60fps
     */
    $scope.scrolling = false;
    var scrollTimer;
    angular.element($window).bind("scroll", function() {
        $scope.scrolling = true;

        if(scrollTimer != false) $timeout.cancel(scrollTimer);

        scrollTimer = $timeout(function(){
            $scope.scrolling = false;
            //$timeout.cancel(scrollTimer);
            scrollTimer = false;
        }, 350);

        //$scope.$apply();
    });


	/*
	 * Header animation while scrolling
	 */
	var $naviBg = $("#navigation-bg");

	angular.element($window).bind("scroll", function() {
	    var scrolly = $(window).scrollTop();

		// Header blurry images
	    $("#cover-blur").css("opacity", scrolly / 240);

	    // Navigation background color
	    $naviBg.css("opacity", scrolly / 70);

	});


	/*
	 * Tooltips
	 */
     $scope.tooltips = function() {
         $('.tt').hover(function(){
                 // Hover over code
                 var title = $(this).attr('title');
                 $(this).data('tipText', title).removeAttr('title');
                 $('<p class="tooltip"></p>')
                 .text(title)
                 .appendTo('body')
                 .fadeIn('fast');
         }, function() {
                 // Hover out code
                 $(this).attr('title', $(this).data('tipText'));
                 $('.tooltip').remove();
         }).mousemove(function(e) {
                 var mousex = e.pageX + 20; //Get X coordinates
                 var mousey = e.pageY + 10; //Get Y coordinates
                 $('.tooltip')
                 .css({ top: mousey, left: mousex })
         });
     }

});
