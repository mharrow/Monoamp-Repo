(function () {
	'use strict'
	
	var app = angular.module('MadAmpApp', [
		'ngAnimate',        // animations
        'ngRoute',          // routing
        
        // 3rd Party Modules
        'ui.bootstrap',      // ui-bootstrap (ex: carousel, pagination, dialog)
        ]).config(['$routeProvider', function($routeProvider) {
    $routeProvider
	    .when('/', {
	        controller: 'RemoteControl as vm',
	        templateUrl: '/Components/Mobile/RemoteControl/RemoteControl.html'
	    })
	    .otherwise({
	        redirectTo: '/'
	    });

	}]);
})();
