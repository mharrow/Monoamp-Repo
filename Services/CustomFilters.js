(function(){
	'use strict';
	angular.module('MadAmpApp').filter('getRangeControls', function() {
	
	  // Create the return function and set the required parameter name to **input**
	  return function(input) {
	
	    var out = [];
	
	    // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the control is of type range.
	    angular.forEach(input, function(attribute) {
	
	      if (attribute.type === 'range') {
	        out.push(attribute)
	      }
	      
	    })
	
	    return out;
	  }
	});
	
	angular.module('MadAmpApp').filter('getFirstActiveZone', function() {
	
	  // Create the return function and set the required parameter name to **input**
	  return function(input) {
	
	    var out = [];
	
	    // Using the angular.forEach method, go through the array of data and perform the operation of figuring out if the control is of type range.
	    angular.forEach(input, function(zone) {

	      if (zone.activeStatus == "1") {
	      	out.push(zone)
	      }
	      
	    })
	
	    return out;
	  }
	});
	
})();
