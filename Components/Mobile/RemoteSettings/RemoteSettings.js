(function(){
	'use strict';
    var controllerId = 'RemoteSettings',
    	remote = angular.module('MadAmpApp');
    
    remote.controller(controllerId, ['MadAmpAPIservice', '$scope', '$sce', '$filter', viewModel]);
    
    function viewModel(MadAmpAPIservice, $scope, $sce, $filter){
    	var attributeToggleTemplate = '<div class="ui-grid-cell-contents" ng-bind-html="grid.appScope.setToggleButton(row)"></div>',
    		globalGridRowHeight = 47.6;
    	
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
			
			
		$scope.setToggleButton = function (row){
			if (row.entity.hasOwnProperty('activeStatus')){
				return $scope.getButton(row.entity.activeStatus);
			}
			else if (row.entity.hasOwnProperty('visibleStatus')){
				return $scope.getButton(row.entity.visibleStatus);
			}
			return ("error setting toggle button for "+row.entity);
		};
		
		$scope.getButton = function (success){
			if(success == 1){
				return $sce.trustAsHtml('<button class="btn btn-success settingsButton" ng-click="grid.appScope.showMe(row)"><i class="fa fa-check" aria-hidden="true"></i></button>');
			}
			else{
				return	$sce.trustAsHtml('<button class="btn btn-danger settingsButton" ng-click="grid.appScope.showMe(row)"><i class="fa fa-times" aria-hidden="true"></i></button>');	
			}		
		}
    	function parseMenuSettings(resp)
		{
			$scope.zoneSettings = resp.slice(0,6);
			$scope.sourceSettings = resp.slice(6,12);
			var attributes = resp.slice(12,resp.length);
			$scope.attributes = $filter('getRangeControls')(attributes);
						
			$scope.zoneDefs = [ {name: 'positionAddress', displayName: 'Id', width: "15%", enableCellEdit: false}, 
								{name: 'zoneName', displayName: 'Zone Name' }, 
   								{name: 'activeStatus', displayName: 'Active', enableCellEdit: false, width:"20%",
   								cellTemplate: attributeToggleTemplate},  
							  ];
							  
			$scope.sourceDefs = [ {name: 'positionAddress', displayName: 'Id', width: "15%", enableCellEdit: false}, 
								  {name: 'sourceName', displayName: 'Source Name' },  
							  	];
							  	
			$scope.attributeDefs = [ {name: 'displayName', displayName: 'Attribute Name', enableCellEdit: false},  
   									 {name: 'visibleStatus', displayName: 'Visible', enableCellEdit: false, width:"20%",
	   								 cellTemplate: attributeToggleTemplate},  
								   ];
			
			$scope.grids = [{
						  open: false,
						  header: "Zone Settings",
						  options: { enableSorting: false,
				 					 enableCellSelection: true,
				 					 data: $scope.zoneSettings,
				 					 columnDefs: $scope.zoneDefs,
				 					 rowHeight: globalGridRowHeight
								   },
							},
							{
						     open: false,
							 header: "Source Settings",
						  	 options: { enableSorting: false,
				 			   		    enableCellSelection: true,
				 					    data: $scope.sourceSettings,
				 					    columnDefs: $scope.sourceDefs,
				 					    rowHeight: globalGridRowHeight
								  	  },
							 },
							{
						     open: false,							 
							 header: "Attribute Settings",
						  	 options: { enableSorting: false,
				 			   		    enableCellSelection: true,
				 					    data: $scope.attributes,
				 					    columnDefs: $scope.attributeDefs,
				 					    rowHeight: globalGridRowHeight
								  	  },
							 },
							 ];
		}
	}
})();
