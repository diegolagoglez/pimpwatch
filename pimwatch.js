
function led(x,y,on) {
	if(on) {
		$("div#pimwatch img#led_" + x + "_" + y).css("visibility","visible");
	} else {
		$("div#pimwatch img#led_" + x + "_" + y).css("visibility","hidden");
	}
}

function reset() {
	$("div#pimwatch img.led").css("visibility","hidden");
}

var runningAnimations = false;
var sleep = 10;
var clickCount = 0;
var effectCount = 5;
var limit = 72;
var status = 0;

function effectReloadHorizontal(status) {
	sleep = 10;
	limit = 145;
	if(status >= 72) {
		// apagar
		led(parseInt((status-72)/6) + 1,6 - (status % 6),false);
	} else {
		// encender
		led(12 - parseInt(status/6),status % 6 + 1,true);
	}
}

function effectReloadVertical(status) {
	sleep = 10;
	limit = 145;
	if(status >= 72) {
		// apagar
		led((status-72) % 12 + 1,12 - parseInt(status/12),false);
	} else {
		// encender
		led(12 - (status % 12),parseInt(status/12) + 1,true);
	}
}

function effectRunningBarHorizontal(status) {
	limit = 25;
	sleep = 10;
	reset();
	if(status >= 12) {
		led(status - 12 + 1,1,true);
		led(status - 12 + 1,2,true);
		led(status - 12 + 1,3,true);
		led(status - 12 + 1,4,true);
		led(status - 12 + 1,5,true);
		led(status - 12 + 1,6,true);
	} else {
		led(12 - status,1,true);
		led(12 - status,2,true);
		led(12 - status,3,true);
		led(12 - status,4,true);
		led(12 - status,5,true);
		led(12 - status,6,true);
	}
}

function effectRunningBarVertical(status) {
	limit = 12;
	sleep = 20;
	reset();
	if(status >= 6) {
		led(1,6 - (status - 6) - 1,true);
		led(2,6 - (status - 6) - 1,true);
		led(3,6 - (status - 6) - 1,true);
		led(4,6 - (status - 6) - 1,true);
		led(5,6 - (status - 6) - 1,true);
		led(6,6 - (status - 6) - 1,true);
		led(7,6 - (status - 6) - 1,true);
		led(8,6 - (status - 6) - 1,true);
		led(9,6 - (status - 6) - 1,true);
		led(10,6 - (status - 6) - 1,true);
		led(11,6 - (status - 6) - 1,true);
		led(12,6 - (status - 6) - 1,true);
	} else {
		led(1,status + 1,true);
		led(2,status + 1,true);
		led(3,status + 1,true);
		led(4,status + 1,true);
		led(5,status + 1,true);
		led(6,status + 1,true);
		led(7,status + 1,true);
		led(8,status + 1,true);
		led(9,status + 1,true);
		led(10,status + 1,true);
		led(11,status + 1,true);
		led(12,status + 1,true);
	}
}

function effectRandomFill(status) {
	sleep = 10;
	limit = 200;
	var pos = parseInt(Math.random() * 72);
	var on = parseInt(Math.random() * 10) % 2;
	var x = (pos % 12) + 1;
	var y = parseInt(pos / 6) + 1;
	led(x,y,on != 0);
	// $("div#log").html("pos = " + pos + " -- x = " + x + " -- y = " + y + " -- on = " + on);
}

function showAnimation(what,status) {
	// what = 4;
	switch(what) {
		case 0:
			effectReloadHorizontal(status);
			break;
		case 1:
			effectReloadVertical(status);
			break;
		case 2:
			effectRandomFill(status);
			break;
		case 3:
			effectRunningBarHorizontal(status);
			break;
		case 4:
			effectRunningBarVertical(status);
			break;
		default:
	}
}

function showAnimations(mins) {

	if(status == 0) {
		reset();
	}

	showAnimation(mins % effectCount,status);

	status++;
	if(status < limit) {
		setTimeout("showAnimations(" + mins + ")",sleep);
	} else {
		runningAnimations = false;
		status = 0;
		showHour();
	}
}

function showHour() {

	if(runningAnimations) {
		return;
	}
	
	var date = new Date();
	var mins = date.getMinutes();
	var hours = date.getHours() % 12;
	var seconds = date.getSeconds();

	if(seconds == 30) {
		showAnimations(mins);
		return;
	}

	if (hours == 0) {
		hours = 12;
	}

	reset();

	for(var i=0;i<hours;i++) {
		led((12 - i),1,true);
	}

	for(var i=0;i<mins;i++) {
		var row = 12 - parseInt(i / 5);
		var column = (i % 5) + 2;
		led(row,column,true);
	}

	setTimeout("showHour()",1000);
}

$(document).ready(function() {
	showHour();

	$("div#pimwatch").click(function() {
		runningAnimations = true;
		showAnimations(clickCount % effectCount);
		clickCount++;
	});
});
