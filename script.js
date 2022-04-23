var i = 0,
	j = 0,
	k = 0,
	m = 0,
	h = screen.height/2-50,
	w = screen.width/2,
	time = 75,
	timeInc = 75,
	countError = 0,
	errorAux = 0,
	gifAux = 0,
	clue = false,
	auxClue = true,
	minimizedWidth = new Array,
	minimizedHeight = new Array,
	windowTopPos = new Array,
	windowLeftPos = new Array,
	windowInitPosY = new Array,
	windowInitPosX = new Array,
	exeTopPos = new Array,
	exeLeftPos = new Array,
	popupTopPos = new Array,
	popupLeftPos = new Array,
	panel,
	id;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

function getText(type, id) {
	if (type == 'exe') var text = '[exeId=\"';
	else var text = '[popupId=\"';
	text = text.concat(id);
	text = text.concat('\"]');
	return text;
}

function updateBin() {
	for (let i = 0; i <= 7; i++) if (!$("#window" + i).hasClass("closed")) return;

	for (let i = 0; i < 16; i++) {
		let text = getText('exe', i);
		var element = document.querySelector(text);
		if (element.className == "exe open") return;
	}

	for (let i = 0; i < 3; i++) {
		let text = getText('popup', i);
		var element = document.querySelector(text);
		if (element.className == "popup open") return;
	}

	document.getElementById("imgRecBin").src = "icons/recycle_bin_empty.ico";
}

function checkInternet() {
	var element = document.querySelector('[internetId="0"]');
	if (element.className == "internet open") {
		element = document.querySelector('[internetId="0"]');
		var audio = new Audio('sounds/Windows XP Critical Stop.mp3');
		audio.play();

		element.className = "internet highlight";

		countError++;

		sleep(75).then(() => {
			{ element.className = "internet open"; }
		})


		sleep(150).then(() => {
			{ element.className = "internet highlight"; }
		})


		sleep(225).then(() => {
			{ element.className = "internet open"; }
		})


		return true;
	}
	return false;
}

function ajustZindex() {
	$(".window").each(function () {
		$(this).css('z-index', $(this).css('z-index') - 20);
	});

	$(".exe").each(function () {
		$(this).css('z-index', $(this).css('z-index') - 20);
	});

	$(".popup").each(function () {
		$(this).css('z-index', $(this).css('z-index') - 20);
	});
}

function makeElemActive(elem) {
	ajustZindex();
	elem.style.zIndex = 900;
}

function openExe(id, top, left) {
	var audio = new Audio('sounds/Windows XP Start.mp3');
	let text = getText('exe', id);
	var element = document.querySelector(text);

	if (element.className == "exe open") {
		makeElemActive(element);
		return;
	}

	sleep(time).then(() => {
		audio.play();
		element.className = "exe open";
		$(element).css("top", top);
		$(element).css("left", left);
		makeElemActive(element);
	})
}

function openPopup(id, top, left) {
	var audio = new Audio('sounds/Windows XP Start.mp3');
	let text = getText('popup', id);
	var element = document.querySelector(text);

	if (element.className == "popup open") {
		makeElemActive(element);
		return;
	}

	sleep(time).then(() => {
		audio.play();
		element.className = "popup open";
		$(element).css("top", top);
		$(element).css("left", left);
		makeElemActive(element);
	})
}

function minimizeExe(id) {
	let text = getText('exe', id);

	exeTopPos[id] = $(document.querySelector(text)).css("top");
	exeLeftPos[id] = $(document.querySelector(text)).css("left");
	$(document.querySelector(text)).animate({
		top: 1500,
		left: 0
	}, 500);
}

function minimizePopup(id) {
	let text = getText('popup', id);

	popupTopPos[id] = $(document.querySelector(text)).css("top");
	popupLeftPos[id] = $(document.querySelector(text)).css("left");
	$(document.querySelector(text)).animate({
		top: 1500,
		left: 0
	}, 500);
}

function openMinimizedExe(id) {
	let text = getText('exe', id);

	$(document.querySelector(text)).animate({
		top: exeTopPos[id],
		left: exeLeftPos[id]
	});
}

function openMinimizedPopup(id) {
	let text = getText('popup', id);

	$(document.querySelector(text)).animate({
		top: popupTopPos[id],
		left: popupLeftPos[id]
	});
}

function adjustFullScreenSize() {
	$(".fullSizeWindow .wincontent").css("width", (window.innerWidth - 32));
	$(".fullSizeWindow .wincontent").css("height", (window.innerHeight - 98));
}
function makeWindowActive(thisid) {
	ajustZindex();

	$("#window" + thisid).css('z-index', 900);
	$(".window").removeClass("activeWindow");
	$("#window" + thisid).addClass("activeWindow");

	if (id == 0) {
		document.querySelector(getText('exe', 0)).style.zIndex = 900;
	}

	if (id == 1) {
		document.querySelector(getText('exe', 1)).style.zIndex = 900;
		document.querySelector(getText('popup', 0)).style.zIndex = 900;
	}

	//arduino
	if (id == 2) {
		document.querySelector(getText('exe', 2)).style.zIndex = 900;
		document.querySelector(getText('exe', 3)).style.zIndex = 900;
		document.querySelector(getText('popup', 1)).style.zIndex = 900;
	}

	if (id == 3) {
		document.querySelector(getText('exe', 4)).style.zIndex = 900;
		document.querySelector(getText('exe', 5)).style.zIndex = 900;
		document.querySelector(getText('exe', 6)).style.zIndex = 900;
		document.querySelector(getText('exe', 7)).style.zIndex = 900;
	}

	//audio
	if (id == 4) {
		document.querySelector(getText('exe', 8)).style.zIndex = 900;
		document.querySelector(getText('exe', 9)).style.zIndex = 900;
		document.querySelector(getText('popup', 2)).style.zIndex = 900;
	}

	//fotografia
	if (id == 5) {
		document.querySelector(getText('exe', 10)).style.zIndex = 900;
		document.querySelector(getText('exe', 11)).style.zIndex = 900;
		document.querySelector(getText('exe', 12)).style.zIndex = 900;
		document.querySelector(getText('exe', 13)).style.zIndex = 900;
	}

	if (id == 6) {
		document.querySelector(getText('exe', 14)).style.zIndex = 900;
		document.querySelector(getText('exe', 15)).style.zIndex = 900;
	}

	if ($("#window" + thisid).hasClass("closed")) {
		var audio = new Audio('sounds/Windows XP Start.mp3');
		audio.play();
	}

	$(".taskbarPanel").removeClass('activeTab');

	$("#minimPanel" + thisid).addClass("activeTab");
}

function minimizeWindow(id) {
	if (checkInternet()) return;

	windowTopPos[id] = $("#window" + id).css("top");
	windowLeftPos[id] = $("#window" + id).css("left");

	$("#window" + id).animate({
		top: 1500,
		left: 0
	}, 300, function () {		//animation complete
		$("#window" + id).addClass('minimizedWindow');
		$("#minimPanel" + id).addClass('minimizedTab');
		$("#minimPanel" + id).removeClass('activeTab');
	});

	if (id == 0) {
		minimizeExe(0);
	}

	if (id == 1) {
		minimizeExe(1);
		minimizePopup(0);
	}

	//arduino
	if (id == 2) {
		minimizeExe(2);
		minimizeExe(3);
		minimizePopup(1);
	}

	if (id == 3) {
		minimizeExe(4);
		minimizeExe(5);
		minimizeExe(6);
		minimizeExe(7);
	}

	//audio
	if (id == 4) {
		minimizeExe(8);
		minimizeExe(9);
		minimizePopup(2);
	}

	//fotografia
	if (id == 5) {
		minimizeExe(10);
		minimizeExe(11);
		minimizeExe(12);
		minimizeExe(13);
	}

	if (id == 6) {
		minimizeExe(14);
		minimizeExe(15);
	}
}

function openWindow(id) {

	if (checkInternet()) return;

	//internet explorer
	if (id == 8) {
		element = document.querySelector('[internetId="0"]');
		sleep(500).then(() => {
			if (element.className != "internet open") {
				var audio = new Audio('sounds/Windows XP Critical Stop.mp3');
				audio.play();
				element.className = "internet open";
			}
		})
	}
	//recycle bin
	else if (id == 9) {

		var check = 0;

		for (let i = 0; i <= 7; i++) {
			if (!$("#window" + i).hasClass("closed")) { check = 1; }
			$("#window" + i).addClass("closed");
			$("#minimPanel" + i).addClass("closed");
		}

		for (let i = 0; i < 16; i++) {
			let text = getText('exe', i);
			document.querySelector(text);
			if (document.querySelector(text).className == "exe open") { check = 1; }
			document.querySelector(text).className = "exe closed";
		}

		for (let i = 0; i < 3; i++) {
			let text = getText('popup', i);
			document.querySelector(text);
			if (document.querySelector(text).className == "popup open") { check = 1; }
			document.querySelector(text).className = "popup closed";
		}

		if (check == 1) {
			var audio = new Audio('sounds/Windows XP Recycle.mp3');
			audio.play();
		}

		auxClue = false;
		document.getElementById("recycleBin").style.background = "none";

		document.getElementById("imgRecBin").src = "icons/recycle_bin_empty.ico";
	}
	else {

		clue = true;

		if ($('#window' + id).hasClass("minimizedWindow")) {
			openMinimized(id);
		} else {
			if ($("#window" + id).hasClass("closed")) {
				$('#window' + id).animate({
					top: windowInitPosY[id],
					left: windowInitPosX[id]
				}, 0, function () {
				});
			}
			makeWindowActive(id);
			$("#window" + id).removeClass("closed");
			$("#minimPanel" + id).removeClass("closed");

			//thomas fresco
			if (id == 0) {
				openExe(0, h-150, w+80);
			}

			//codigo
			if (id == 1) {
				openExe(1, h-230, w-440);
				time += timeInc;
				openPopup(0, h+40, w-250); //github 1
				time = timeInc;
			}

			//arduino
			if (id == 2) {
				openExe(2, h-20, w-100);
				time += timeInc;
				openExe(3, h-300, w+120); //bearcubs
				time += timeInc;
				openPopup(1, h+100, w-450); //github 2
				time = timeInc;
			}

			if (id == 3) {
				openExe(4, h+50, w-155);
				time += timeInc;
				openExe(6,h-200, w+220); //natal
				time += timeInc;
				openExe(5, h-370, w+50); //sweat
				time += timeInc;
				openExe(7, h-200, w-530); //lata
				time = timeInc;
			}

			//audio
			if (id == 4) {
				openExe(8, h-100, w+60);
				time += timeInc;
				openExe(9, h-290, w-440); //capa album
				time += timeInc;
				openPopup(2, h+110, w-400); //linktree
				time = timeInc;
			}

			//fotografia
			if (id == 5) {
				openExe(10, h-360, w-610);
				time += timeInc;
				openExe(11, h-350, w+310); //retrato
				time += timeInc;
				openExe(12, h-180, w+65); //experimental
				time += timeInc;
				openExe(13, h+25, w-410); //objeto
				time = timeInc;
			}

			if (id == 6) {
				openExe(14, h-150, w+130);
				time += timeInc;
				openExe(15,  h+25, w-350); //20
				time = timeInc;
			}
		}
		document.getElementById("imgRecBin").src = "icons/recycle_bin_full.ico";
	}
}

function closeWindow(id) {
	if (checkInternet()) return;

	$("#window" + id).addClass("closed");
	$("#minimPanel" + id).addClass("closed");

	updateBin();
}

function openMinimized(id) {
	if (checkInternet()) return;
	$('#window' + id).removeClass("minimizedWindow");
	$('#minimPanel' + id).removeClass("minimizedTab");
	makeWindowActive(id);

	$('#window' + id).animate({
		top: windowTopPos[id],
		left: windowLeftPos[id]
	}, 300, function () {
	});

	if (id == 0) {
		openMinimizedExe(0);
	}

	if (id == 1) {
		openMinimizedExe(1);
		openMinimizedPopup(0);
	}

	//arduino
	if (id == 2) {
		openMinimizedExe(2);
		openMinimizedExe(3);
		openMinimizedPopup(1);
	}

	if (id == 3) {
		openMinimizedExe(4);
		openMinimizedExe(5);
		openMinimizedExe(6);
		openMinimizedExe(7);
	}

	//audio
	if (id == 4) {
		openMinimizedExe(8);
		openMinimizedExe(9);
		openMinimizedPopup(2);
	}

	//fotografia
	if (id == 5) {
		openMinimizedExe(10);
		openMinimizedExe(11);
		openMinimizedExe(12);
		openMinimizedExe(13);
	}

	if (id == 6) {
		openMinimizedExe(14);
		openMinimizedExe(15);
	}

}

function closeinternet() {
	document.querySelector('[internetId="0"]').className = "internet closed";
	element.className = "internet closed";
	countError = 0;
	updateBin();
}

function closeExe(id) {
	if (checkInternet()) return;

	let text = getText('exe', id);
	var element = document.querySelector(text);
	element.className = "exe closed";
	updateBin();
}

function closePopup(id) {
	if (checkInternet()) return;

	let text = getText('popup', id);
	var element = document.querySelector(text);
	element.className = "popup closed";
	updateBin();
}

$(document).ready(function () {

	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
		document.querySelector('[id="blueScreen"]').style.display = "block";
		document.querySelector('[id="blueScreen"]').style.margin = "auto";
		document.getElementById("loadingBlue").height = "100px";
	}

	$(".window").each(function () {      		// window template
		$(this).css('z-index', 900)
		$(this).attr('data-id', i);
		minimizedWidth[i] = $(this).width();
		minimizedHeight[i] = $(this).height();
		windowTopPos[i] = $(this).css("top");
		windowLeftPos[i] = $(this).css("left");
		windowInitPosY[i] = $(this).css("top");
		windowInitPosX[i] = $(this).css("left");
		$("#taskbar").append('<div class="taskbarPanel" id="minimPanel' + i + '" data-id="' + i + '">' + $(this).attr("data-title") + '</div>');
		if ($(this).hasClass("closed")) { $("#minimPanel" + i).addClass('closed'); }
		$(this).attr('id', 'window' + (i++));
		$(this).wrapInner('<div class="wincontent"></div>');
		$(this).prepend('<div class="windowHeader"><strong>' + $(this).attr("data-title") + '</strong><span title="Minimize" class="winminimize"><span></span></span><span title="Maximize" class="winmaximize"><span></span><span></span></span><span title="Close" class="winclose">x</span></div>');
	});

	var audio = new Audio('sounds/Windows XP Startup.mp3');
	audio.play();

	setInterval(function () {
		h = screen.height/2-50;
		w = screen.width/2;
		windowInitPosX = [w-450,w-100,w-350,w-330,w-80,w-240,w-400,w-215];
		windowInitPosY = [h-300,h-275,h-350,h-300,h-350,h-300,h-325,h-225];
		var audio = new Audio('sounds/Windows XP Battery Critical.mp3');
		if (countError >= 5) {
			if (errorAux == 0) {
				audio.play();
				document.querySelector('[id="blueScreen"]').style.display = "block";
				errorAux++;
				sleep(2000).then(() => { window.location.reload(); })
			}
		}
	}, 200);

	setInterval(function () {
		if (clue && auxClue) {
			if (document.getElementById("recycleBin").style.background == "none") document.getElementById("recycleBin").style.background = "rgba(255,255,255,0.5)";
			else document.getElementById("recycleBin").style.background = "none";
		}
	}, 400);

	setInterval(function () {
		if (gifAux == 0) {
			document.getElementById("experimental").src = "pictures/monkey_after.jpg";
			sleep(250).then(() => { document.getElementById("retrato").src = "pictures/eduardo.jpg"; })
			sleep(500).then(() => { document.getElementById("objeto").src = "pictures/head.jpg"; })
			gifAux = 1;
		}
		else {
			document.getElementById("experimental").src = "pictures/monkey.jpg";
			sleep(250).then(() => { document.getElementById("retrato").src = "pictures/ines.jpg"; })
			sleep(500).then(() => { document.getElementById("objeto").src = "pictures/greek.jpg"; })
			gifAux = 0;
		}
	}, 2000);

	$(".internet").each(function () {
		$(this).attr('internetId', j++);
	});

	$(".exe").each(function () {
		$(this).attr('exeId', k);
		exeTopPos[k] = $(this).css("top");
		exeLeftPos[k] = $(this).css("left");
		k++;
	});

	$(".popup").each(function () {
		$(this).attr('popupId', m);
		popupTopPos[m] = $(this).css("top");
		popupLeftPos[m] = $(this).css("left");
		m++;
	});

	//popup ok
	$(".button").click(function () {
		if ($(this).parent().attr("popupId") == 0) {
			closePopup($(this).parent().attr("popupId"))
			window.open("https://github.com/thomaspfresco/LEI_portfolio", '_blank');
		}
		else if ($(this).parent().attr("popupId") == 1) {
			closePopup($(this).parent().attr("popupId"))
			window.open("https://github.com/thomaspfresco/FreshFruitMIDI", '_blank');
		}
		else if ($(this).parent().attr("popupId") == 2) {
			closePopup($(this).parent().attr("popupId"))
			window.open("https://linktr.ee/wearefugue", '_blank');
		}
		else closeinternet($(this).parent().attr("internetId"));
	});

	//internet fechar
	$(".buttonClose").click(function () {
		closeinternet($(this).parent().parent().attr("internetId"));
	});

	//exe fechar
	$(".exeClose").click(function () {
		closeExe($(this).parent().parent().attr("exeId"));
	});

	$(".popupClose").click(function () {
		closePopup($(this).parent().parent().attr("popupId"));
	});

	$("#minimPanel" + (i - 1)).addClass('activeTab');
	$("#window" + (i - 1)).addClass('activeWindow');

	//$(".wincontent").resizable(); // resizable

	$(".window").draggable({ cancel: ".wincontent" });	// draggable

	$(".exe").draggable({ cancel: ".exeContent" });	// draggable

	$(".popup").draggable({ cancel: ".exeContent" });	// draggable

	$(".exe").mouseup(function () {
		exeTopPos[$(this).attr("exeId")] = $(this).css("top");
		exeLeftPos[$(this).attr("exeId")] = $(this).css("left");
	});

	$(".popup").mouseup(function () {
		popupTopPos[$(this).attr("popupId")] = $(this).css("top");
		popupLeftPos[$(this).attr("popupId")] = $(this).css("left");
	});

	$(".window").mousedown(function () {		// active window on top (z-index 1000)
		makeWindowActive($(this).attr("data-id"));
	});

	$(".exe").mousedown(function () {		// active window on top (z-index 1000)
		ajustZindex();
		$(this).css('z-index', 900);
	});


	$(".popup").mousedown(function () {		// active window on top (z-index 1000)
		ajustZindex();
		$(this).css('z-index', 900);
	});

	$(".winclose").click(function () {		// close window
		closeWindow($(this).parent().parent().attr("data-id"));
	});

	$(".winminimize").click(function () {		// minimize window
		minimizeWindow($(this).parent().parent().attr("data-id"));
	});

	$(".taskbarPanel").click(function () {
		var element = document.querySelector('[internetId="0"]');
		if (element.className == "internet open") {
			element = document.querySelector('[internetId="0"]');
			var audio = new Audio('sounds/Windows XP Critical Stop.mp3');
			audio.play();

			countError++;

			element.className = "internet highlight";

			sleep(100).then(() => {
				{ element.className = "internet open"; }
			})
		}

		else {

			// taskbar click
			id = $(this).attr("data-id");
			if ($(this).hasClass("activeTab")) {	// minimize if active
				minimizeWindow($(this).attr("data-id"));
			} else {
				if ($(this).hasClass("minimizedTab")) {	// open if minimized
					openMinimized(id);
				} else {								// activate if inactive
					makeWindowActive(id);
				}
			}
		}
	});

	$(".openWindow").click(function () {		// open closed window
		openWindow($(this).attr("data-id"));
	});

	$(".winmaximize").click(function () {
		if (checkInternet()) return;
		if ($(this).parent().parent().hasClass('fullSizeWindow')) {			// minimize

			$(this).parent().parent().removeClass('fullSizeWindow');
			$(this).parent().parent().children(".wincontent").height(minimizedHeight[$(this).parent().parent().attr("data-id")]);
			$(this).parent().parent().children(".wincontent").width(minimizedWidth[$(this).parent().parent().attr("data-id")]);
		} else {															// maximize
			$(this).parent().parent().addClass('fullSizeWindow');

			minimizedHeight[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").height();
			minimizedWidth[$(this).parent().parent().attr('data-id')] = $(this).parent().parent().children(".wincontent").width();

			adjustFullScreenSize();
		}
	});
	adjustFullScreenSize();
});