(function(){
	'use strict';
    var controllerId = 'RemoteSettings',
    	remote = angular.module('MadAmpApp');
    
    remote.controller(controllerId, ['MadAmpAPIservice', '$scope', viewModel]);
    
    function viewModel(MadAmpAPIservice, $scope){
    	console.log("inside remote settings")
    	$scope.oneAtATime = true;
    	$scope.grids = [];
    	$scope.zoneGrid = {};
    	
    	$scope.showMe = function(row){
    		console.log(row);
    	}
    	
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
			
						
			$scope.zoneDefs = [ {name: 'positionAddress', displayName: 'Id', width: "15%", enableCellEdit: false}, 
								{name: 'zoneName', displayName: 'Zone Name' }, 
   								{name: 'activeStatus', displayName: 'Active', width:"20%",
   								cellTemplate:'<button class="btn primary settingsButton" ng-click="grid.appScope.showMe(row)">{{row.entity.activeStatus}}</button>'},  
							  ];
							  
			$scope.sourceDefs = [ {name: 'positionAddress', displayName: 'Id', width: "15%", enableCellEdit: false}, 
								  {name: 'sourceName', displayName: 'Source Name' },  
							  	];
							  	
			$scope.attributeDefs = [ {name: 'displayName', displayName: 'Attribute Name', enableCellEdit: false},  
   									 {name: 'visibleStatus', displayName: 'Visible', width:"20%",
	   								 cellTemplate:'<button class="btn primary settingsButton" ng-click="grid.appScope.showMe(row)">{{row.entity.visibleStatus}}</button>'},  
								   ];
			
			$scope.grids = [{
						  header: "Zone Settings",
						  options: { enableSorting: false,
				 					 enableCellSelection: true,
				 					 data: $scope.zoneSettings,
				 					 columnDefs: $scope.zoneDefs,
				 					 rowHeight:46.67
								   },
							},
							{
							 header: "Source Settings",
						  	 options: { enableSorting: false,
				 			   		    enableCellSelection: true,
				 					    data: $scope.sourceSettings,
				 					    columnDefs: $scope.sourceDefs,
				 					    rowHeight:46.67
								  	  },
							 },
							{
							 header: "Attribute Settings",
						  	 options: { enableSorting: false,
				 			   		    enableCellSelection: true,
				 					    data: $scope.attributes,
				 					    columnDefs: $scope.attributeDefs,
				 					    rowHeight:46.67
								  	  },
							 },
							 ];
		}
	}
})();
