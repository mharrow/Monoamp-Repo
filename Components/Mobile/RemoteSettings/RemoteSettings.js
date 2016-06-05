(function(){
	'use strict';
    var controllerId = 'RemoteSettings',
    	remote = angular.module('MadAmpApp');
    
    
    remote.controller(controllerId, ['MadAmpAPIservice', '$scope', '$sce', '$filter', '$q', '$interval', viewModel]);
    
    function viewModel(MadAmpAPIservice, $scope, $sce, $filter, $q, $interval){
    	var attributeToggleTemplate = '<div class="ui-grid-cell-contents" ng-click="grid.appScope.toggleSettingsButton(row)">'
    									+'<button ng-if="grid.appScope.toggleVisible(row) == 1" class="btn btn-success settingsButton"><i class="fa fa-check" aria-hidden="true"></i></button>'
    									+'<button ng-if="grid.appScope.toggleVisible(row) == 0" class="btn btn-danger settingsButton"><i class="fa fa-times" aria-hidden="true"></i></button>'
    									+'</div>',
    		globalGridRowHeight = 80;
    	
    	$scope.oneAtATime = true;
    	$scope.grids = [];
    	$scope.gridApi = [];
    	$scope.zoneGrid = {};
    	
		$scope.registerGridApi = function(index, gridApi){
		    //set gridApi on scope
		    $scope.gridApi[index] = gridApi;
		    gridApi.rowEdit.on.saveRow($scope, $scope.saveRow);
		};
		
		$scope.saveRow = function( rowEntity ) {
		    // create a fake promise - normally you'd use the promise returned by $http or $resource
		    var toggleData, currentGrid;

    		if (rowEntity.hasOwnProperty('zoneName')){
				toggleData = 
				{
				   tableName: "zones",
	        	   field: "zoneName",
	        	   fieldValue: rowEntity.zoneName,
	        	   pk: "positionAddress",
	        	   pkValue: rowEntity.positionAddress	
				}
				currentGrid = 0;
			}
			else if (rowEntity.hasOwnProperty('sourceName')){
				toggleData = 
				{
				   tableName: "sources",
	        	   field: "sourceName",
	        	   fieldValue: rowEntity.sourceName,
	        	   pk: "positionAddress",
	        	   pkValue: rowEntity.positionAddress
				}
				currentGrid = 1;
			}
			
			var promise = MadAmpAPIservice.updateSetting(toggleData);
			$scope.gridApi[currentGrid].rowEdit.setSavePromise(rowEntity, promise);

    	}
    	
    	$scope.toggleSettingsButton = function(row){
    		var toggleData;
    		$scope.currentRow = row;
    		if (row.entity.hasOwnProperty('activeStatus')){
				toggleData = 
				{
				   tableName: "zones",
	        	   field: "activeStatus",
	        	   fieldValue: !parseInt(row.entity.activeStatus.toString()) ? "1":"0",
	        	   pk: "positionAddress",
	        	   pkValue: row.entity.positionAddress	
				}
			}
			else if (row.entity.hasOwnProperty('visibleStatus')){
				toggleData = 
				{
				   tableName: "attributes",
	        	   field: "visibleStatus",
	        	   fieldValue: !parseInt(row.entity.visibleStatus.toString())  ? "1":"0",
	        	   pk: "control",
	        	   pkValue: row.entity.control
				}
			}
			
			console.log(toggleData);
			
			MadAmpAPIservice.updateSetting(toggleData).then(function(resp){
				console.log(resp.data);
				if(resp.data.tableName == "attributes"){
					$scope.attributes[resp.data.field] = parseInt(resp.data.fieldValue);
				}
				else{
					$scope.zoneSettings[resp.data.field] = parseInt(resp.data.fieldValue);
				}
				$scope.currentRow.entity[resp.data.field] = parseInt(resp.data.fieldValue);
			}, function(resp){
				console.log("error importing app settings");
			});
    	}
    	
    	MadAmpAPIservice.getSettings().then(function(resp){
			parseMenuSettings(resp.data)
			}, function(resp){
				console.log("error importing app settings")
			});
			
			
		$scope.toggleVisible = function (row){
			if (row.entity.hasOwnProperty('activeStatus')){
				return row.entity.activeStatus;
			}
			if (row.entity.hasOwnProperty('visibleStatus')){
				return row.entity.visibleStatus;
			}
			return ("error setting toggle button for "+row.entity);
		};
		
    	function parseMenuSettings(resp)
		{
			$scope.zoneSettings = resp.slice(0,6);
			$scope.sourceSettings = resp.slice(6,12);
			var attributes = resp.slice(12,resp.length);
			$scope.attributes = $filter('getRangeControls')(attributes);
						
			$scope.zoneDefs = [ {name: 'positionAddress', displayName: '', width: "10%", enableCellEdit: false}, 
								{name: 'zoneName', displayName: 'Zone Name', width: "60%" }, 
   								{name: 'activeStatus', displayName: 'Active', enableCellEdit: false, width:"30%",
   								cellTemplate: attributeToggleTemplate},  
							  ];
							  
			$scope.sourceDefs = [ {name: 'positionAddress', displayName: 'Id', width: "15%", enableCellEdit: false}, 
								  {name: 'sourceName', displayName: 'Source Name' },  
							  	];
							  	
			$scope.attributeDefs = [ {name: 'displayName', displayName: 'Attribute Name', enableCellEdit: false},  
   									 {name: 'visibleStatus', displayName: 'Visible', enableCellEdit: false, width:"30%",
	   								 cellTemplate: attributeToggleTemplate},  
								   ];
			
			$scope.grids = [{
						  open: false,
						  header: "Zone Settings",
						  options: { enableSorting: false,
				 					 enableCellSelection: true,
				 					 data: $scope.zoneSettings,
				 					 columnDefs: $scope.zoneDefs,
				 					 rowHeight: globalGridRowHeight,
				 					 onRegisterApi: function(gridApi){$scope.registerGridApi(0, gridApi);}
								   },
							},
							{
						     open: false,
							 header: "Source Settings",
						  	 options: { enableSorting: false,
				 			   		    enableCellSelection: true,
				 					    data: $scope.sourceSettings,
				 					    columnDefs: $scope.sourceDefs,
				 					    rowHeight: globalGridRowHeight,
				 					 	onRegisterApi: function(gridApi){$scope.registerGridApi(1, gridApi);}
								  	  },
							 },
							{
						     open: false,							 
							 header: "Attribute Settings",
						  	 options: { enableSorting: false,
				 			   		    enableCellSelection: true,
				 					    data: $scope.attributes,
				 					    columnDefs: $scope.attributeDefs,
				 					    rowHeight: globalGridRowHeight,
				 					 	onRegisterApi: function(gridApi){$scope.registerGridApi(2, gridApi);}
								  	  },
							 },
							 ];
		}
	}
})();
