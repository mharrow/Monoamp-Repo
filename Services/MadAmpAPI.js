(function(){
    'use strict';
    
	angular.module('MadAmpApp').
	  factory('MadAmpAPIservice', function($http) {
	
	    var MadAmpAPI = {};
	
	    MadAmpAPI.getSettings = function() {
	      return $http({method:'GET', url:'/Server/madAmpMySqlQuery.php'});
	    }
	    
	    
	    MadAmpAPI.sendCommand = function(stringCmd) {
	      return $http({
	        method: 'POST', 
	        url:'/Server/madAmpPythonMessenger.php',
			data: ({serStr: stringCmd}),
			headers: {'Content-Type': 'text/xml'},
	      });
	    }
	    
	    return MadAmpAPI;	    
	  });	
})();
