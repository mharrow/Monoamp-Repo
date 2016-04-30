(function(){
	'use strict';
    var controllerId = 'RemoteControl';
    angular.module('MadAmpApp').controller(controllerId, ['MadAmpAPIservice', '$scope', viewModel]);
    function viewModel(MadAmpAPIservice, $scope){
    	
	
		$scope.zoneSettings = "",
		$scope.sourceSettings = "",
		$scope.attributeSettings = "";
	
		var	sendCommand = "<",
		    sendQuery = "?",
		    stringCmd = "",
		    resp = "";

		//hard coded because of hardware constraints
		$scope.controlStatus =
		{
		    ObjectCode:
		    {
		        unit: 1,
		        zone: 3
		    },
		
		    Power:
		    {
		        min: 0,
		        max: 1,
		        value: 0,
		        commandKey: "PR"
		    },
		
		    Source:
		    {
		        min: 1,
		        max: 6,
		        value: 5,
		        commandKey: "CH"
		    },
		
		    Volume:
		    {
		        min: 0,
		        max: 38,
		        value: 0,
		        commandKey: "VO"
		    },
		
		    Bass:
		    {
		        min: 0,
		        max: 14,
		        value: 0,
		        commandKey: "BS"
		    },
		
		    Treble:
		    {
		        min: 0,
		        max: 14,
		        value: 0,
		        commandKey: "TR"
		    },
		
		    Balance:
		    {
		        min: 0,
		        max: 20,
		        value: 0,
		        commandKey: "BL"
		    },
		
		    Mute:
		    {
		        min: 0,
		        max: 1,
		        value: 0,
		        commandKey: "MU"
		    }
		
		};
		
		run();
		
		function run(){
			// on load of window set zone_select to first zone and query status
			// from MonoAmp use result to set powerOn variable and all other
			// parameters
		    
		    $("[id^=ATTR_]").click(function () {
		        console.log("Button Pressed: " + this.id);
		        var buttonStats = this.id.split("_"),
		            buttonAttribute = buttonStats[1],
		            buttonDirection = buttonStats[2],
		            controlAttribute = $scope.controlStatus[buttonAttribute];
		
		        if (buttonDirection == "UP") {
		            if (controlAttribute.value + 1 <= controlAttribute.max) {
		                stringCmd =
		                    sendCommand
		                    + $scope.controlStatus.ObjectCode.unit + "" + $scope.controlStatus.ObjectCode.zone
		                    + controlAttribute.commandKey
		                    + getValueString(controlAttribute.value + 1);
		                console.log("Scale button action to Post: " + stringCmd);
		                serCmd(stringCmd);
		            } else {
		                console.log("Scale command out of range");
		            }
		        } else { //button direction is down
		            if (controlAttribute.value - 1 >= controlAttribute.min) {
		                stringCmd =
							sendCommand 
							+ $scope.controlStatus.ObjectCode.unit + "" + $scope.controlStatus.ObjectCode.zone 
							+ controlAttribute.commandKey
							+ getValueString(controlAttribute.value - 1);
						console.log("Scale button action to Post: " + stringCmd);
						serCmd(stringCmd);
		            } else {
		                console.log("Scale command out of range");
		            }
		        }
		    });
		
		    $("[id^=TOGGLE_]").click(function () {
		        //if power is on, send message to turn off
		        //DO NOT SET BUTTON UNTIL RECIEVE A RESPONSE
		        console.log("Toggle Pressed: " + this.id);
		        var toggleStats = this.id.split("_"),
		            toggleType = toggleStats[1];
		
		        if ($scope.controlStatus[toggleType].value) {
		            //disable source selection and power off selected zone
		            stringCmd =
		                sendCommand
		                + $scope.controlStatus.ObjectCode.unit + "" + $scope.controlStatus.ObjectCode.zone
		                + $scope.controlStatus[toggleType].commandKey
		                + "00";
		        } else {
		            stringCmd =
		                sendCommand
		                + $scope.controlStatus.ObjectCode.unit + "" + $scope.controlStatus.ObjectCode.zone
		                + $scope.controlStatus[toggleType].commandKey
		                + "01";
		        }
		
		        console.log(toggleType + " Command to Post:" + stringCmd);
		        serCmd(stringCmd); // POST Zone power off to php serial
		    });
		
		    document.getElementById("zone_select").value = "11";
			stringCmd =
		        sendQuery
		        + "11"
			console.log("App start - Query status Zone 1:"+stringCmd);
			serCmd(stringCmd);	// POST serial request for zone data
			
			// POST mysql request for zone names
			var settings = MadAmpAPIservice.getSettings().then(function(resp){
				parseMenuSettings(resp.data)
				}, function(resp){
					console.log("error importing app settings")
				});
			}
		

		function serCmd(stringCmd){
			// use API service to issue a command to blah
		    MadAmpAPIservice.sendCommand(stringCmd).success(function(resp) 
		    {
		    	setControlStatus(resp);
		    	
		    });
		}

		
		function doAssignZone(){
		    //$scope.controlStatus.ObjectCode.zone = document.getElementById("zone_select").value;
			stringCmd =
		        sendQuery
		        + $scope.controlStatus.ObjectCode.unit + "" + $scope.controlStatus.ObjectCode.zone;
			console.log("Command to Post:"+stringCmd);
			serCmd(stringCmd);	// POST serial command to php
		}
		
		function doAssignSource(){
		    //$scope.controlStatus.Source.value = document.getElementById("source_select").value;
			if ($scope.controlStatus.Power.value){
			    stringCmd = 
		            sendCommand 
		            + $scope.controlStatus.ObjectCode.unit + "" + $scope.controlStatus.ObjectCode.zone 
		            + $scope.controlStatus.Source.commandKey
		            + getValueString($scope.controlStatus.Source.value);
				console.log("Command to post:" + stringCmd);
				serCmd(stringCmd);  // POST Source to php serial
				}
			else{
				console.log("No Zone selected or Power for zone is off");
			}
		}
		
		function setPower(newPowerState) {
		    var powerButton = document.getElementById("TOGGLE_Power");
		    //powerOn is the last state of the button
		    //if powerOn is the same as the new state, no need to do anything
		    if (newPowerState) {
		        powerButton.className = powerButton.className.replace("powerOff", "powerOn");
		        powerButton.textContent = powerButton.textContent.replace("OFF", "ON");
		        $scope.controlStatus.Power.value = 1;
		    } else {
		        powerButton.className = powerButton.className.replace("powerOn", "powerOff");
		        powerButton.textContent = powerButton.textContent.replace("ON", "OFF");
		        $scope.controlStatus.Power.value = 0;
		    }    
		}
		
		function getValueString(value) {
		    return (value >= 10) ? value.toString() : "0" + value.toString();
		}
			
		function parseMenuSettings(resp)
		{
			$scope.zoneSettings = resp.slice(0,6);
			//$scope.selectedZone = $scope.zoneSettings[0].positionAddress;
			$scope.sourceSettings = resp.slice(6,12);
			//$scope.selectedSource = $scope.sourceSettings[0].positionAddress;
			$scope.attributeSettings = resp.slice(12,18);
			
		}
		
		function setControlStatus(resp)
		{// This is the best way to perform an SQL query
		// For more examples, see mysql_real_escape_string()
		    var n = resp.length;
		    console.log ("Reply length is: " + n);
		    if (n == 31) {
		        //splitting the zone into unit and zone
		        //control object code are what these values represent as a pair
		        $scope.controlStatus.ObjectCode.unit = parseInt(resp.substr(5, 1));
		        $scope.controlStatus.ObjectCode.zone = parseInt(resp.substr(6, 1));
		        //$('#zone_select')[0].value = $scope.controlStatus.ObjectCode.zone.toString();
		        
		        setPower(parseInt(resp.substr(9, 2)));
		
		        $scope.controlStatus.Mute.value = parseInt(resp.substr(11, 2));
		        
		        $scope.controlStatus.Volume.value = parseInt(resp.substr(15, 2));
				//$('#ATTR_Volume_Label').text($scope.controlStatus.Volume.value);
		        
		        $scope.controlStatus.Treble.value = parseInt(resp.substr(17, 2));
		        //$('#ATTR_Treble_Label').text($scope.controlStatus.Treble.value - 7);
		        
		        $scope.controlStatus.Bass.value = parseInt(resp.substr(19, 2));
		        //$('#ATTR_Bass_Label').text($scope.controlStatus.Bass.value - 7);
		        
		        $scope.controlStatus.Balance.value = parseInt(resp.substr(21, 2));
		
		        $scope.controlStatus.Source.value = parseInt(resp.substr(23, 2));
		        //$('#source_select')[0].value = $scope.controlStatus.Source.value.toString();
		
		        //log the $scope.controlStatus object
		        console.log("[setting controls] Zone is: " + $scope.controlStatus.ObjectCode.unit
		            + "" + $scope.controlStatus.ObjectCode.zone);
		        console.log("[setting controls] Power (PR) is: " + $scope.controlStatus.Power.value);
		        console.log("[setting controls] Mute (MU) is: " + $scope.controlStatus.Mute.value);
		        console.log("[setting controls] Volume (VO) is: " + $scope.controlStatus.Volume.value);
		        console.log("[setting controls] Treble (TR) is: " + $scope.controlStatus.Treble.value);
		        console.log("[setting controls] Bass (BS) is: " + $scope.controlStatus.Bass.value);
		        console.log("[setting controls] Balance (BL) is: " + $scope.controlStatus.Balance.value);
		        console.log("[setting controls] Source (CH) is: " + $scope.controlStatus.Source.value);
		    } else {
		        console.log("Response is incorrect format!");
		    }
		}
	}
})();
