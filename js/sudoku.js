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
function checkCell(cellObject) {

	var guessVal = parseInt($(cellObject).text()),
		guessRow = $(cellObject).attr("data-row"),
		guessCol = $(cellObject).attr("data-column"),
		guessBox = $(cellObject).attr("data-box");

	if (!isNaN(guessVal)) {
		checkDuplicates(DATA_BOX + guessBox + "]");
		checkDuplicates(DATA_ROW + guessRow + "]");
		checkDuplicates(DATA_COL + guessCol + "]");
	}
	else return false;

	return true;
}


/*
	Funciton loops through box/row/column to checks for duplcates
*/
function checkDuplicates(checkString) {
	var i, currentVal, isDuplicate = false;
	$(checkString).each(function (i, cell1) {
		currentVal = $(cell1).text();

		if (currentVal != "") {
			$(checkString).each(function (i, cell2) {
				if ($(cell2).text() == currentVal && $(cell1).attr("data-cell") != $(cell2).attr("data-cell")) {
					isDuplicate = true;
					$(cell1).addClass("incorrect");
					$(cell2).addClass("incorrect");
				}
				else {
					//$(cell1).removeClass("incorrect");
				}
			});
		}
	});

	return isDuplicate;
}

/*

*/
function drawBox(box, boxRow, boxCol) {
	var str = "", cellrow, cellCol, cell = 1;

	str = "<td><table class='box' data-box=" + box + ">";
	for (cellrow = 0; cellrow < 3; cellrow++) {
		str += "<tr>";
		for (cellCol = 0; cellCol < 3; cellCol++) {
			str += "<td data-row=" + (cellrow + boxRow)
				+ " data-column=" + (cellCol + boxCol) + " data-box=" + box + " data-cell="
				+ cell;

			// Altenate box colour to make it easier to separate the boxes
			if (box % 2 == 0)
				str += " class='cell altbox'></td>";
			else
				str += " class='cell'" + "></td>";
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

function fillBoard() {

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
