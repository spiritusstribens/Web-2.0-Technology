window.onload = function() {
	buttonInit();
	var atplus = document.getElementsByClassName('apb')[0];
	var availableArea = document.getElementById('bottom-positioner');
	atplus.onclick = function() {
		robot(0);
	};
	availableArea.onmouseleave = buttonInit;
}

function connectServer(callback) {
	XMLHttp.sendReq('GET', '../server', '', callback);
}

function buttonInit() {
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
				if (buttons[i].enable == false){
					return;
				}
				buttons[i].childNodes[1].style.visibility = 'visible';
				buttons[i].childNodes[1].innerHTML = '...';
				connectServer(function(data) {
					buttons[i].childNodes[1].innerHTML = data;
					buttons[i].gotten = true;
					buttons[i].enable = false;
					changeView(buttons[i]);
					checkInfoAvailable(buttons, info);
				});
			}
		}(i);

		info.onclick = function() {
			if (info.style.backgroundColor == 'rgb(200, 200, 200)') {
				var sum = 0;
				for (var i = 0; i < buttons.length; i++){
					sum += parseInt(buttons[i].childNodes[1].innerHTML);
				}
				info.getElementsByClassName('info')[0].innerHTML = sum;
			}
		}
	}
}

function checkInfoAvailable(buttons, info) {
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].gotten == false)
			return;
	}
	info.style.backgroundColor = 'rgb(200, 200, 200)';
	robot(5);
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

function robot(code) {
	var buttons = document.getElementsByClassName('button');
	var info = document.getElementById('info-bar');
	if (code == 0) {
		for (var i = 0; i < 5; i++) {
			buttons[i].click();
		}
	} else {
		info.click();
	}
}