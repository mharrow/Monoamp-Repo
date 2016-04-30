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
	        Content-Type: text/xml; charset=utf-8;
			data: ({serStr: stringCmd})
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	      });
	    }
	    
	    return MadAmpAPI;	    
	  });	
})();
