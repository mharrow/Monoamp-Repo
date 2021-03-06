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
    		globalGridRowHeight = 76;
    	
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
			
				if (rowEntity.zoneName.trim() == ""){
					rowEntity.zoneName = "Zone "+ rowEntity.positionAddress;
				}
				
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
				
				if (rowEntity.sourceName.trim() == ""){
					rowEntity.sourceName = "Source "+ rowEntity.positionAddress;
				}
				
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
			console.log(JSON.stringify(toggleData));

    	}
    	
    	$scope.toggleSliders = function(){
    		console.log("sliders on:" + $scope.slidersOn);
    		//debugger;
    		
    		var toggleData = 
			{
			   tableName: "attributeControlMode",
        	   field: "slidersOn",
        	   fieldValue: $scope.slidersOn? "0": "1",
        	   pk: "1",
        	   pkValue: "1"
			}
			
			MadAmpAPIservice.updateSetting(toggleData).then(function(resp){
				console.log("toggled control mode successfully!");
			}, function(resp){
				console.log("error toggling control mode");
				$scope.slidersOn = $scope.slidersOn ? 0: 1; 
			});
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
			$scope.slidersOn = parseInt(resp.slice(0,1)[0].slidersOn);
			$scope.zoneSettings = resp.slice(1,13);
			$scope.sourceSettings = resp.slice(13,19);
			var attributes = resp.slice(19,resp.length);
			$scope.attributes = $filter('getRangeControls')(attributes);
						
			$scope.zoneDefs = [ {name: 'positionAddress', displayName: 'Id', width: "10%", enableCellEdit: false, headerCellClass: 'gridHeader' }, 
								{name: 'zoneName', displayName: 'Zone Name', width: "60%", headerCellClass: 'gridHeader', enableCellEditOnFocus: true }, 
   								{name: 'activeStatus', displayName: 'Active', enableCellEdit: false, width:"30%",
   								cellTemplate: attributeToggleTemplate, headerCellClass: 'gridHeader'},  
							  ];
							  
			$scope.sourceDefs = [ {name: 'positionAddress', displayName: 'Id', width: "15%", enableCellEdit: false, headerCellClass: 'gridHeader'}, 
								  {name: 'sourceName', displayName: 'Source Name', headerCellClass: 'gridHeader', enableCellEditOnFocus: true },  
							  	];
							  	
			$scope.attributeDefs = [ {name: 'displayName', displayName: 'Attribute Name', enableCellEdit: false, headerCellClass: 'gridHeader'},  
   									 {name: 'visibleStatus', displayName: 'Visible', enableCellEdit: false, width:"30%",
	   								 cellTemplate: attributeToggleTemplate, headerCellClass: 'gridHeader'},  
								   ];
			
			$scope.grids = [{
						  open: false,
						  header: "Zone Settings",
						  options: { enableHorizontalScrollbar: 0, 
									 enableVerticalScrollbar: 0,
						  			 enableColumnMenus: false,
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
						  	 options: { enableHorizontalScrollbar: 0, 
										enableVerticalScrollbar: 0,
						  	 			enableColumnMenus: false,
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
						  	 options: { enableHorizontalScrollbar: 0, 
										enableVerticalScrollbar: 0,
						  	 			enableColumnMenus: false,
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
