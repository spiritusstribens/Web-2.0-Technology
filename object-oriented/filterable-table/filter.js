window.onload = function() {
    var tables = getAllTables();
    makeAllTablesFilterable(tables);
}

function getAllTables() {
    return document.getElementsByTagName("table");
}

function makeAllTablesFilterable(tables) {
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
}