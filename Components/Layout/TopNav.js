(function(){
	'use strict';
    var controllerId = 'TopNav',
    	remote = angular.module('MadAmpApp');

    remote.controller(controllerId, ['$scope', '$location', viewModel]);
    function viewModel($scope, $location){
   		$scope.isActive = function (viewLocation) {
        	return viewLocation === $location.path();
    	};
    }    	
})();
