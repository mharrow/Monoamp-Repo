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
	success: function ( resp ){
		console.log (resp);
		//if ( resp == '#'){
		//	console.log ("valid command acknowledged");
		//	console.log("Reply is:"+resp);
		//} else {
		//	$( '.response' ).text ( 'failure' );
		//	console.log("Reply is:"+resp);
		// }
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

	
