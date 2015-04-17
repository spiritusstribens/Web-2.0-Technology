window.onload = function() {
	var tables = getAllTables();
	makeAllTablesSortable(tables);
}

function getAllTables() {
	return document.getElementsByTagName('table');
}

function makeAllTablesSortable(tables) {
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