window.onload = function() {
    var tables = getAllTables();
    makeSortable(makeFilterable(tables));
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeSortable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var th = tables[i].getElementsByTagName('th');
		var tbody = tables[i].tBodies[0];
		var tableArray = new Array();
		for (var j = 0; j < tbody.rows.length; j++)
			tableArray[j] = tbody.rows[j];
		for (var j = 0; j < th.length; j++) {
			th[j].onclick = function(i, j, tbody, tableArray) {
				return function() {
					if (tbody.sortCol == j)
						tableArray.reverse();
					else
						tableArray.sort(compare(j, 1));
					var frag = document.createDocumentFragment();
					for (var k = 0; k < tableArray.length; k++) {
						frag.appendChild(tableArray[k]);
					}
					tbody.appendChild(frag);
					tbody.sortCol = j;
					changeView(tables[i], j);
				}
			}(i, j, tbody, tableArray);
		}
	}
	return tables;
}

function makeFilterable(tables) {
	for (var i = 0; i < tables.length; i++) {
		var div = document.createElement('div');
		var input = document.createElement('input');
		input.type = 'text';
		input.placeholder = 'Enter the Filter';
		div.appendChild(input);
		tables[i].parentNode.insertBefore(div, tables[i]);
		var tbody = tables[i].tBodies[0];
		var trow = tbody.rows;
		var tableArray = new Array();
		for (var j = 0; j < trow.length; j++) {
			tableArray[j] = trow[j];
		}

		input.oninput = function(input, tbody, tableArray) {
			return function() {
				for (var i = 0; i < tableArray.length; i++) {
					tableArray[i].style.display = 'none';
				}
				for (var i = 0; i < tableArray.length; i++) {
					for (var j = 0; j < tableArray[i].cells.length; j++) {
						tableArray[i].cells[j].innerHTML = tableArray[i].cells[j].innerHTML.replace(/<\/?span[^>]*>/ig,'');
						if (tableArray[i].cells[j].innerHTML.indexOf(input.value) >= 0) {
							tableArray[i].style.display = '';
							var reg = new RegExp(input.value, 'g');
							tableArray[i].cells[j].innerHTML = tableArray[i].cells[j].innerHTML.replace(reg, '<span style=\"font-weight: bold;\">' + input.value + '</span>');
						}
					}
				}
				for (var i = 0; i < tableArray.length; i++) {
					if (tableArray[i].style.display == '') {
						tbody.insertBefore(tableArray[i], tbody.firstChild);
					}
				}
			}
		}(input, tbody, tableArray);
	}
	return tables;
}

function changeView(table, col) {
	var trow = table.tBodies[0].rows;
	for (var i = 0; i < trow.length; i++) {
		if (i % 2 == 0)
			trow[i].className = '';
		else
			trow[i].className = 'alternate';
	}

	var th = table.getElementsByTagName('th');
	for (var i = 0; i < th.length; i++) {
		if (i != col)
			th[i].className = '';
	}
	if (th[col].className == '')
		th[col].className = 'ascend';
	else if (th[col].className == 'ascend')
		th[col].className = 'descend';
	else
		th[col].className = 'ascend';
}

function compare(col, mode) {
	return function(a, b) {
		if (mode == 1)
			return (a.cells[col].innerHTML > b.cells[col].innerHTML)
		else
			return (a.cells[col].innerHTML < b.cells[col].innerHTML)
	}
}
