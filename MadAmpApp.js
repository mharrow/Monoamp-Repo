(function () {
	'use strict'
	
	var app = angular.module('MadAmpApp', ['ngRoute']).config(['$routeProvider', function($routeProvider) {
    $routeProvider
	    .when('/', {
	        controller: 'RemoteControl',
	        templateUrl: '/Components/Mobile/RemoteControl/RemoteControl.html'
	    })
	    .otherwise({
	        redirectTo: '/'
	    });

	}]);
})();
