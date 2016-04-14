var Power = "PR";
var Mute = "MU"	
var Bass = "BS";
var Treble = "TR";
var Balance = "BL";
var Volume = "VO";
var Source = "CH";
var Zone = "11";
var sendCommand = "<";
var sendQuery = "?";
var powerOn=false;
var stringCmd="";
var zoneValid=false;
var Power_value="00";
var Mute_value="00";
var Bass_value="07";
var Treble_value="07";
var Balance_value="10";
var Volume_value="20";
var Source_value="01";
var resp="";

function run(){
	// on load of window set zoneSelect to first zone and query status
	// from MonoAmp use result to set powerOn variable and all other
	// parameters
	var populateField = document.getElementById("zoneSelect").value="11";
	zoneValid = true;
	stringCmd = sendQuery + Zone; //+ String.fromCharCode(13) + String.fromCharCode(10) ;
	console.log("App start - Query status Zone 1:"+stringCmd);
	serCmd(stringCmd);	// POST serial request for zone data
	// all settings  first zone and power state of zone
	}

function serCmd(stringCmd){
	// call ajax data = stringCmd to be sent out the serial port
	//$.ajax({url: "Monoamp.php", type: "POST", data: {serstr: stringcmd}, dataType: "json"});
$.ajax({
	url:'/Monoamp_py.php',
	type: "POST",
	data: ({serStr: stringCmd}),
	//contentType: "application/json; charset=utf-8",
	//dataType: "json",
	success: function (resp){
		var n = resp.length;
		console.log ("Reply is:"+resp);
		console.log ("Reply length is:"+n);
		if (n == 31){
			Power_value = resp.substr(9,2);
			Mute_value = resp.substr(11,2);
			Volume_value = resp.substr(15,2);
			Treble_value = resp.substr(17,2);
			Bass_value = resp.substr(19,2);
			Balance_value = resp.substr(21,2);
			Source_value = resp.substr(23,2);
			console.log ("PR value is:"+Power_value);
			console.log ("MU value is:"+Mute_value);
			console.log ("VO value is:"+Volume_value);
			console.log ("TR value is:"+Treble_value);
			console.log ("BS value is:"+Bass_value);
			console.log ("BL value is:"+Balance_value);
			console.log ("CH value is:"+Source_value);
		}
	}
	
});
	
	
}

function doAssignZone(){
	var zone_value = document.getElementById("zoneSelect").value;
	Zone = zone_value;
	zoneValid = true;
	stringCmd = sendQuery + Zone; // + String.fromCharCode(13) + String.fromCharCode(10);
	console.log("Command to Post:"+stringCmd);
	serCmd(stringCmd);	// POST serial command to php
}

function togglePower(){
	var powerButton = document.getElementById("zonePowerToggle");
	
	if (powerOn) {
	//disable source selection and power off selected zone
		powerButton.className = powerButton.className.replace("powerOn","powerOff");
		powerButton.textContent = powerButton.textContent.replace("ON","OFF");
		powerOn = false;
		stringCmd = sendCommand + Zone + Power + "00"; // + String.fromCharCode(13) //+ String.fromCharCode(10);
		console.log("Power On:"+powerOn);
		console.log("Command to Post:"+stringCmd);
		serCmd(stringCmd);  // POST Zone power off to php serial
		}
	else{
		powerButton.className = powerButton.className.replace("powerOff","powerOn");
		powerButton.textContent = powerButton.textContent.replace("OFF","ON");
		powerOn = true;
		stringCmd = sendCommand + Zone + Power + "01"; // + String.fromCharCode(13) // + String.fromCharCode(10);
		console.log("Power On:"+powerOn);
		console.log("Command to Post:"+stringCmd);
		serCmd(stringCmd);  // POST Zone power on to php serial
	}
}


function doAssignSource(){
	var source_value = document.getElementById("sourceSelect").value;
	if (zoneValid === powerOn){
		stringCmd = sendCommand + Zone + Source + source_value; // + String.fromCharCode(13) // + String.fromCharCode(10);
		console.log("Command to post:"+stringCmd);
		serCmd(stringCmd);  // POST Source to php serial
		}
	else{
		console.log("No Zone selected or Power for zone is off");
	}
}

	
