window.onload = function() {
	buttonsInit();
	var atplus = document.getElementsByClassName('apb');
	var availableArea = document.getElementById('bottom-positioner');
	atplus[0].onclick = function() {
		robot(0);
	}
	availableArea.onmouseleave = buttonsInit;
}

function connectServer(callback) {
	var XMLHttp;
	if (window.XMLHttpRequest) {
		XMLHttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		XMLHttp = new ActiveXObject('Microsoft.XMLHttp');
	} else {
		return;
	}
	XMLHttp.open('GET', '../server', true);
	XMLHttp.send();
	XMLHttp.onreadystatechange = function() {
		if (XMLHttp.readyState == 4 && XMLHttp.status == 200) {
			callback(XMLHttp.responseText);
		}
	}
}

function buttonsInit() {
	var buttons = document.getElementsByClassName('button');
	var info = document.getElementById('info-bar');
	info.getElementsByClassName('info')[0].innerHTML = '';
	info.style.backgroundColor = 'rgb(100, 100, 100)';

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].enable = true;
		buttons[i].gotten = false;
		buttons[i].childNodes[1].style.visibility = 'hidden';
		changeView(buttons[i]);
		buttons[i].onclick = function(i) {
			return function() {
				if (buttons[i].enable == false) {
					return;
				}
				disableButtons(this, buttons);
				buttons[i].childNodes[1].innerHTML = '...';
				buttons[i].childNodes[1].style.visibility = 'visible';
				connectServer(function(data) {
					buttons[i].childNodes[1].innerHTML = data;
					buttons[i].gotten = true;
					buttons[i].enable = false;
					enableButtons(buttons);
					checkInfoAvailable(buttons, info);
					robot(i + 1);
				});
			}
		}(i);
	}

	info.onclick = function() {
		if (this.style.backgroundColor == 'rgb(200, 200, 200)') {
			var sum = 0;
			for (var i = 0; i < buttons.length; i++) {
				sum += parseInt(buttons[i].childNodes[1].innerHTML);
			}
			this.getElementsByClassName('info')[0].innerHTML = sum;
		}
	}
}

function enableButtons(buttons) {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].gotten == false){
			buttons[i].enable = true;
		}
		changeView(buttons[i]);
	}
}

function disableButtons(except, buttons) {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i] != except) {
			buttons[i].enable = false;
		}
		changeView(buttons[i]);
	}
}

function checkInfoAvailable(buttons, info) {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].gotten == false) {
			return;
		}
	}
	info.style.backgroundColor = 'rgb(200, 200, 200)';
}

function changeView(button) {
	if (button.enable == true) {
		button.style.backgroundColor = 'rgb(100, 200, 200)';
		button.style.color = 'rgb(255, 255, 255)';
	} else {
		button.style.backgroundColor = 'rgb(50, 100, 100)';
		button.style.color = 'rgb(150, 150, 150)';
	}
}

function robot(index) {
	if (index < 5) {
		var buttons = document.getElementsByClassName('button');
		buttons[index].click();
		index++;
	} else {
		var info = document.getElementById('info-bar');
		info.click();
	}
}