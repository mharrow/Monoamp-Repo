(function(){
	'use strict';
    var controllerId = 'RemoteSettings';
    angular.module('MadAmpApp').controller(controllerId, ['MadAmpAPIservice', '$scope', viewModel]);
    
    function viewModel(MadAmpAPIservice, $scope){
    	console.log("inside remote settings")
    	$scope.zoneGrid = {};
    	MadAmpAPIservice.getSettings().then(function(resp){
			parseMenuSettings(resp.data)
			}, function(resp){
				console.log("error importing app settings")
			});
			
    	function parseMenuSettings(resp)
		{
			$scope.zoneSettings = resp.slice(0,6);
			$scope.sourceSettings = resp.slice(6,12);
			$scope.attributes = resp.slice(12,resp.length);
			$scope.zoneDefs = [ {name: 'zoneName', displayName: 'Zone Name' }, 
   								{name: 'activeStatus', displayName: 'Active' },  
							  ]
			$scope.zoneGrid = 
				{data: $scope.zoneSettings,
				 columnDefs: $scope.zoneDefs,
				 rowHeight:46.67
				};
		}
	}
})();
