const MIN_NUMBERS = 17; // Minimum number of clues for sudoku puzzle
const DIFFICULTY = [50, 36, 32, 28, 22]; // Number of clues for difficulty level (0-5)

const DATA_ROW = "td[data-row=";
const DATA_COL = "td[data-column=";
const DATA_BOX = "td[data-box=";
const DATA_CELL = "td[data-cell=";

var sudokuAnswers = new Array();

function sudoku() {
	this.difficulty = 0;

}


function createGame() {
	var i, j, x = 1;
	for (i = 0; i < 9; i++) {
		sudokuAnswers[i] = new Array();
		for (j = 0; j < 9; j++) {
			sudokuAnswers[i][j] = j + 1;
		}
	}
}

function resetGame() {

}

/*	
	The
	@cellObject
*/
function checkCell(selectedCell) {

	var error = 0;
	guessVal = parseInt($(selectedCell).text()),
		row = $(selectedCell).attr("data-row"),
		col = $(selectedCell).attr("data-column"),
		box = $(selectedCell).attr("data-box");

	// Search through box, row, and column
	if (!isNaN(guessVal)) {
		error += checkDuplicates(selectedCell, DATA_BOX + box + "]");
		error += checkDuplicates(selectedCell, DATA_ROW + row + "]");
		error += checkDuplicates(selectedCell, DATA_COL + col + "]");
	}

	if (error == 0)
		$(selectedCell).removeClass('incorrect');


	return error;
}


/*
	Funciton loops through box/row/column to checks for same numbers
*/
function checkDuplicates(selectedCell, checkString) {
	var index, currentVal, selectedVal = $(selectedCell).text(), duplicates = 0;

	$(checkString).each(function (index, currentCell) {
		currentVal = $(currentCell).text();
		// Compare id to skip selected cell and compare box/row/column for same numbers
		if (selectedVal == currentVal && $(currentCell).prop('id') != $(selectedCell).prop('id')) {
			$(currentCell).addClass('incorrect');
			$(selectedCell).addClass('incorrect');
			duplicates += currentVal;
		}
		if (currentVal != selectedVal) {
			$(currentCell).removeClass('incorrect');
		}
	});

	return duplicates;
}



/*
	This function draws a 9x9 box
	@box - the index of the box in the sudoku board
	@boxRow
	@boxCol
*/
function drawBox(box, boxRow, boxCol) {
	var str, cellrow, cellCol, cell = 1;

	str = "<td><table class='box' data-box=" + box + ">";
	for (cellrow = 0; cellrow < 3; cellrow++) {
		str += "<tr>";
		for (cellCol = 0; cellCol < 3; cellCol++) {
			str += "<td id=r" + (cellrow + boxRow) + "_c" + (cellCol + boxCol) + "_b" + box + " data-row=" + (cellrow + boxRow)
				+ " data-column=" + (cellCol + boxCol) + " data-box=" + box + " data-cell=" + cell;

			// Altenate box colour to make it easier to separate the boxes
			if (box % 2 == 0)
				str += " class='cell altbox'></td>";
			else
				str += " class='cell' ></td>";
			cell++;
		}
		str += "</tr>"
	}

	str += "</table></td>";

	return str;
}

/*

*/
function drawBoard() {
	var boxRow, boxCol, str, box = 0;

	for (boxRow = 0; boxRow < 9; boxRow += 3) {
		str += "<tr data-boxrow =" + boxRow + ">";
		for (boxCol = 0; boxCol < 9; boxCol += 3) {
			str += drawBox(box, boxRow, boxCol);
			box++;
		}
		str += "</tr>";
	}

	$("#board").html(str);
}

function cellDetails(cell) {
	return "<br>Box: " + $(cell).attr('data-box') + " Row: " + $(cell).attr('data-row') + " Col: " + $(cell).attr('data-column');
}

/*

*/
$(document).ready(function () {
	drawBoard();
	createGame();
});


// Toggle the current selected cell only the current cell
$(function () {
	$(document).on('click', '.cell', function () {
		$(".cell").removeClass("selected");
		$(this).toggleClass("selected");
	});
});

/*

*/
$("#NewGame").click(function () {
	if (window.confirm("New game?")) {
		drawBoard();
		createGame();
	}
});

$("#sudokuButtons button").click(function () {
	$(".selected").text($(this).val());

	checkCell(".selected");

});

/*

*/
$("#resetGame").click(function () {
	if (window.confirm("Restart current game?")) {
		resetGame();
	}
});
