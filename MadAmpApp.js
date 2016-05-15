(function () {
	'use strict'
	
	var app = angular.module('MadAmpApp', [
		'ngAnimate',        // animations
        'ngRoute',          // routing
        
        // 3rd Party Modules
        'ui.bootstrap',      // ui-bootstrap (ex: carousel, pagination, dialog)
        'ui.grid',			// displaying and modifying app settings
        'ui.grid.autoResize',
    	'ui.grid.resizeColumns'
        ]).config(['$routeProvider', function($routeProvider) {
    $routeProvider
	    .when('/', {
	        controller: 'RemoteControl',
	        templateUrl: '/Components/Mobile/RemoteControl/RemoteControl.html'
	    })
	    .when('/RemoteSettings', {
	        controller: 'RemoteSettings',
	        templateUrl: '/Components/Mobile/RemoteSettings/RemoteSettings.html'
	    })
	    .when('/DesktopControl', {
			controller: 'DesktopControl',
			templateUrl: '/Components/Desktop/DesktopControl/DesktopControl.html'
		})
	    .otherwise({
	        redirectTo: '/'
	    });

	}]);
})();
