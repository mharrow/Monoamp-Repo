(function(){
    'use strict';
    
	angular.module('MadAmpApp').
	  factory('MadAmpAPIservice', function($http) {
	
	    var MadAmpAPI = {};
	
	    MadAmpAPI.getSettings = function() {
	      return $http({
			method:'GET',
			url:'/Server/madAmpMySqlQuery.php'
			});
	    }
	    
	    
	    MadAmpAPI.sendCommand = function(stringCmd) {
	      return $http({
	        method: 'POST', 
	        url:'/Server/madAmpPythonMessenger.php',
	        data: {serStr:stringCmd},
			headers: {'Content-Type': 'application/json'},
			});
	    }
	    
	    MadAmpAPI.updateSetting = function(table, field, fieldValue, pk, pkValue) {
	      return $http({
	        method: 'POST', 
	        url:'/Server/madAmpMySqlUpdate.php',
	        data: {tableName: tableName,
	        	   field: field,
	        	   fieldValue: fieldValue,
	        	   pk: pk,
	        	   pkValue: pkValue},
			headers: {'Content-Type': 'application/json'},
			});
	    }
	    
	    return MadAmpAPI;	    
	  });	
})();
