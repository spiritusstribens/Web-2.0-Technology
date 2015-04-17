window.onload = function() {
	buttonsInit();
	var atplus = document.getElementsByClassName('apb')[0];
	var availableArea = document.getElementById('bottom-positioner');
	atplus.onclick = function() {
		setOrder();
		robot(0);
	}
	availableArea.onmouseleave = function() {
		var order;
		if (document.getElementsByClassName('comment').length) {
			order = document.getElementsByClassName('comment')[0];
			order.className = 'order';
			order.innerHTML = '';
			buttonsInit();
		}
	}
}

function connectServer(callback) {
	var XMLHttp;
	if (window.XMLHttpRequest) {
		XMLHttp = new XMLHttpRequest();
	} else if (window.ActiveXObject) {
		XMLHttp = new ActiveXObject('Microsoft.XMLHTTP');
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
	info.style.backgroundColor = 'rgb(100, 100, 100)';
	info.getElementsByClassName('info')[0].innerHTML = '';

	for (var i = 0; i < buttons.length; i++) {
		buttons[i].gotten = false;
		changeView(buttons[i]);
		buttons[i].childNodes[1].style.visibility = 'hidden';
	}
}

function checkInfoAvailable() {
	var buttons = document.getElementsByClassName('button');
	var info = document.getElementById('info-bar');
	for (var i = 0; i < buttons.length; i++) {
		if (buttons[i].gotten == false) {
			return;
		}
	}
	info.style.backgroundColor = 'rgb(200, 200, 200)';
}

function changeView(button) {
	if (button.gotten == false) {
		button.style.backgroundColor = 'rgb(100, 200, 200)';
		button.style.color = 'rgb(255, 255, 255)';
	} else {
		button.style.backgroundColor = 'rgb(50, 100, 100)';
		button.style.color = 'rgb(150, 150, 150)';
	}
}

function setOrder() {
	var order = document.getElementsByClassName('order')[0];
	order.index = 0;
	order.arr = ['A', 'B', 'C', 'D', 'E'];
	order.arr.sort(function(a, b) {
		return (Math.random() > 0.5 ? -1 : 1);
	});
}

function getOrder() {
	var order = document.getElementsByClassName('order')[0];
	if (order.index < 5) {
		return (order.arr[order.index++].charCodeAt() - 65);
	} else {
		return order.index;
	}
}

function robot(currentSum) {
	var order = document.getElementsByClassName('order')[0];
	var index = getOrder();
	switch (index) {
		case 0:
			aHandler(currentSum);
			break;
		case 1:
			bHandler(currentSum);
			break;
		case 2:
			cHandler(currentSum);
			break;
		case 3:
			dHandler(currentSum);
			break;
		case 4:
			eHandler(currentSum);
			break;
		case 5:
			order.className = 'comment';
			bubbleHandler(currentSum);
			break;
		default:
			alert('!!');
			exit();
	}
}

function aHandler(currentSum) {
	var order = document.getElementsByClassName('order')[0];
	order.innerHTML = '这是个天大的秘密';

	var buttons = document.getElementsByClassName('button');
	var handle = buttons[0];
	handle.childNodes[1].innerHTML = '...';
	handle.childNodes[1].style.visibility = 'visible';
	connectServer(function(data) {
		//handle.childNodes[1].innerHTML = data;
		handle.childNodes[1].style.visibility = 'hidden';
		handle.gotten = true;
		changeView(handle);
		checkInfoAvailable();
		robot(parseInt(currentSum) + parseInt(data));
	});
}

function bHandler(currentSum) {
	var order = document.getElementsByClassName('order')[0];
	order.innerHTML = '我不知道';

	var buttons = document.getElementsByClassName('button');
	var handle = buttons[1];
	handle.childNodes[1].innerHTML = '...';
	handle.childNodes[1].style.visibility = 'visible';
	connectServer(function(data) {
		//handle.childNodes[1].innerHTML = data;
		handle.childNodes[1].style.visibility = 'hidden';
		handle.gotten = true;
		changeView(handle);
		checkInfoAvailable();
		robot(parseInt(currentSum) + parseInt(data));
	});
}

function cHandler(currentSum) {
	var order = document.getElementsByClassName('order')[0];
	order.innerHTML = '你不知道';

	var buttons = document.getElementsByClassName('button');
	var handle = buttons[2];
	handle.childNodes[1].innerHTML = '...';
	handle.childNodes[1].style.visibility = 'visible';
	connectServer(function(data) {
		//handle.childNodes[1].innerHTML = data;
		handle.childNodes[1].style.visibility = 'hidden';
		handle.gotten = true;
		changeView(handle);
		checkInfoAvailable();
		robot(parseInt(currentSum) + parseInt(data));
	});
}

function dHandler(currentSum) {
	var order = document.getElementsByClassName('order')[0];
	order.innerHTML = '他不知道';

	var buttons = document.getElementsByClassName('button');
	var handle = buttons[3];
	handle.childNodes[1].innerHTML = '...';
	handle.childNodes[1].style.visibility = 'visible';
	connectServer(function(data) {
		//handle.childNodes[1].innerHTML = data;
		handle.childNodes[1].style.visibility = 'hidden';
		handle.gotten = true;
		changeView(handle);
		checkInfoAvailable();
		robot(parseInt(currentSum) + parseInt(data));
	});
}

function eHandler(currentSum) {
	var order = document.getElementsByClassName('order')[0];
	order.innerHTML = '才怪';

	var buttons = document.getElementsByClassName('button');
	var handle = buttons[4];
	handle.childNodes[1].innerHTML = '...';
	handle.childNodes[1].style.visibility = 'visible';
	connectServer(function(data) {
		//handle.childNodes[1].innerHTML = data;
		handle.childNodes[1].style.visibility = 'hidden';
		handle.gotten = true;
		changeView(handle);
		checkInfoAvailable();
		robot(parseInt(currentSum) + parseInt(data));
	});
}

function bubbleHandler(currentSum) {
	var order = document.getElementsByClassName('comment')[0];
	var handle = document.getElementById('info-bar');
	if (handle.style.backgroundColor == 'rgb(200, 200, 200)') {
		order.innerHTML = '楼主异步调用战斗力感人，目测不超过';
		handle.getElementsByClassName('info')[0].innerHTML = currentSum;
	} else {
		order.innerHTML = '我在这里';
	}
}