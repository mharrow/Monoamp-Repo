var sendCommand = "<",
    sendQuery = "?",
    stringCmd = "",
    resp = "";

var controlStatus =
{
    ObjectCode:
    {
        unit: 1,
        zone: 1
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
        min: 0,
        max: 6,
        value: 0,
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

function run(){
	// on load of window set zoneSelect to first zone and query status
	// from MonoAmp use result to set powerOn variable and all other
	// parameters
    
    $("[id^=ATTR_]").click(function () {
        console.log("Button Pressed: " + this.id);
        var buttonStats = this.id.split("_"),
            buttonAttribute = buttonStats[1],
            buttonDirection = buttonStats[2],
            controlAttribute = controlStatus[buttonAttribute];

        if (buttonDirection == "UP") {
            if (controlAttribute.value + 1 <= controlAttribute.max) {
                stringCmd =
                    sendCommand
                    + controlStatus.ObjectCode.unit + "" + controlStatus.ObjectCode.zone
                    + controlAttribute.commandKey
                    + getValueString(controlAttribute.value + 1);
                console.log("Scale button action to Post: " + stringCmd);
                serCmd(stringCmd);
            } else {
                console.log("Scale command out of range");
            }
        } else { //button direction is down
            if (controlAttribute.value - 1 >= controlAttribute.min) {
                sendCommand 
                    + controlStatus.ObjectCode.unit + "" + controlStatus.ObjectCode.zone 
                    + controlAttribute.commandKey
                    + getValueString(controlAttribute.value - 1);
                console.log("Scale button action to Post: " + stringCmd);
                serCmd(stringCmd);
            } else {
                console.log("Scale command out of range");
            }
        }
    });

    document.getElementById("zoneSelect").value = "11";
	stringCmd =
        sendQuery
        + controlStatus.ObjectCode.unit + "" + controlStatus.ObjectCode.zone;
	console.log("App start - Query status Zone 1:"+stringCmd);
	serCmd(stringCmd);	// POST serial request for zone data
	// all settings  first zone and power state of zone
	}

function serCmd(stringCmd){
	// call ajax data = stringCmd to be sent out the serial port
    $.ajax({
	    url:'/Monoamp_py.php',
	    type: "POST",
	    data: ({serStr: stringCmd}),
	    success: setControlStatus(resp)
	});
}

function doAssignZone(){
    controlStatus.ObjectCode.zone = document.getElementById("zoneSelect").value;
	stringCmd =
        sendQuery
        + controlStatus.ObjectCode.unit + "" + controlStatus.ObjectCode.zone;
	console.log("Command to Post:"+stringCmd);
	serCmd(stringCmd);	// POST serial command to php
}

function togglePower() {
    //if power is on, send message to turn off
    //DO NOT SET BUTTON UNTIL RECIEVE A RESPONSE

	if (controlStatus.Power.value) {
	//disable source selection and power off selected zone
		stringCmd =
            sendCommand
            + controlStatus.ObjectCode.unit + "" + controlStatus.ObjectCode.zone
            + controlStatus.Power.commandKey
            + "00";
		}
	else {
		stringCmd =
            sendCommand
            + controlStatus.ObjectCode.unit + "" + controlStatus.ObjectCode.zone
            + controlStatus.Power.commandKey
            + "01";
	}

	console.log("Power Command to Post:" + stringCmd);
	serCmd(stringCmd);  // POST Zone power off to php serial
}


function doAssignSource(){
    controlStatus.Source.value = document.getElementById("sourceSelect").value;
	if (controlStatus.Power.value){
	    stringCmd = 
            sendCommand 
            + controlStatus.ObjectCode.unit + "" + controlStatus.ObjectCode.zone 
            + controlStatus.Source.commandKey
            + getValueString(controlStatus.Source.value);
		console.log("Command to post:" + stringCmd);
		serCmd(stringCmd);  // POST Source to php serial
		}
	else{
		console.log("No Zone selected or Power for zone is off");
	}
}

function setPower(newPowerState) {
    var powerButton = document.getElementById("zonePowerToggle");
    //powerOn is the last state of the button
    //if powerOn is the same as the new state, no need to do anything
    if (newPowerState) {
        powerButton.className = powerButton.className.replace("powerOff", "powerOn");
        powerButton.textContent = powerButton.textContent.replace("OFF", "ON");
        controlStatus.Power.value = 1;
    } else {
        powerButton.className = powerButton.className.replace("powerOn", "powerOff");
        powerButton.textContent = powerButton.textContent.replace("ON", "OFF");
        controlStatus.Power.value = 0;
    }    
}

function getValueString(value) {
    return (value >= 10) ? value.toString() : "0" + value.toString();
}

function setControlStatus(resp)
{
    var n = resp.length;
    console.log ("Reply is: " + resp);
    console.log ("Reply length is: " + n);
    if (n == 31) {
        //splitting the zone into unit and zone
        //control object code are what these values represent as a pair
        controlStatus.ObjectCode.unit = parseInt(resp.substr(5, 1));
        controlStatus.ObjectCode.zone = parseInt(resp.substr(6, 1));

        setPower(parseInt(resp.substr(9, 2)));

        controlStatus.Mute.value = parseInt(resp.substr(11, 2));
        controlStatus.Volume.value = parseInt(resp.substr(15, 2));
        controlStatus.Treble.value = parseInt(resp.substr(17, 2));
        controlStatus.Bass.value = parseInt(resp.substr(19, 2));
        controlStatus.Balance.value = parseInt(resp.substr(21, 2));

        controlStatus.Source.value = parseInt(resp.substr(23, 2));
        sourceSelect.options[controlStatus.Source.value - 1].selected = true;

        //log the controlStatus object
        console.log("[setting controls] Zone is: " + controlStatus.ObjectCode.unit
            + "" + controlStatus.ObjectCode.zone);
        console.log("[setting controls] Power (PR) is: " + controlStatus.Power.value);
        console.log("[setting controls] Mute (MU) is: " + controlStatus.Mute.value);
        console.log("[setting controls] Volume (VO) is: " + controlStatus.Volume.value);
        console.log("[setting controls] Treble (TR) is: " + controlStatus.Treble.value);
        console.log("[setting controls] Bass (BS) is: " + controlStatus.Bass.value);
        console.log("[setting controls] Balance (BL) is: " + controlStatus.Balance.value);
        console.log("[setting controls] Source (CH) is: " + controlStatus.Source.value);
    } else {
        console.log("Response is incorrect format!");
    }
}
