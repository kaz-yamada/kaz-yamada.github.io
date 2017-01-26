const MIN_NUMBERS = 17; // Minimum number of clues for sudoku puzzle
const DIFFICULTY = [50, 36, 32, 28, 22]; // Number of clues for difficulty level (0-5)

var sudokuAnswers = new Array(81);
var guessMatrix = new Array(81);
var checked = new Array();
var invalidCells = new Array();

var SudokuGame;

/**
 * 
 */
function sudoku() {
	this.difficulty = 0;
	this.gameComplete;

	/**
	 * Create a game of sudoku
	 */
	this.createGame = function () {
		var row, col, test;
		gameComplete = false;

		for (row = 0; row < 9; row++) {
			sudokuAnswers[row] = new Array();
			guessMatrix[row] = new Array();
			for (col = 0; col < 9; col++) {
				// sudokuAnswers[row][col] = Math.floor((Math.random() * 9) + 1);
				$('.cell[data-row=' + row + '][data-column=' + col + ']').html(sudokuAnswers[row][col]);
			}
		}

	}

	this.shuffle = function () {

	}

	this.resetGame = function () {

	}

	this.addGuess = function (cell) {
		guessMatrix[cell.data('row')][cell.data('column')];
	}

	/** Functuin: parseBoard()
	 * Takes all the values from the board and adds them to the guessMatrix array
	 */
	this.parseBoard = function () {
		var row = 0, col = 0, currentVal;

		$('.cell').each(function (index) {
			guessMatrix[row][col] = $(this).text();
			col++;
			if (col >= 9) {
				col = 0;
				row++;
			}
		});

	}

	/**
	 * This function
	 * 
	 */
	this.checkCell = function (selectedCell) {
		var guessVal = parseInt(selectedCell.text()),
			row = selectedCell.data('row'),
			col = selectedCell.data('column'),
			box = selectedCell.data('box'),
			hasDuplicates = 0;

		guessMatrix[row][col] = guessVal;

		console.log('Checking cell: ' + selectedCell.prop('id') + ' with value ' + guessVal)

		checked.length = 0;
		checked.sort();
		writeErr('');
		// Search through box, row, and column
		if (guessVal >= 0 && guessVal <= 9) {
			hasDuplicates += checkDuplicate(selectedCell, '.cell[data-box=' + box + ']');
			hasDuplicates += checkDuplicate(selectedCell, '.cell[data-column=' + col + ']');
			hasDuplicates += checkDuplicate(selectedCell, '.cell[data-row=' + row + ']');
		}

		if (hasDuplicates == 0 || guessVal == '') {
			removeError(selectedCell);

			if (invalidCells.length > 0) {
				for (var i = 0; i < invalidCells.length; i++) {
					if (_checkCell(invalidCells[i])) {
						removeError($('#' + invalidCells[i]));
					}
				}
			}
		}

		//findInvalid();
		addErr(invalidCells);
		addErr(invalidCells.length);

		return;
	}

	_checkCell = function (cellID) {
		var validCell = true, cell = $('#' + cellID);


		console.log('_checkCell - Checking ' + cell.prop('id'));

		// Checkthe cell's column
		$('#board').find(cell.data('column')).each(function (itr) {
			// Ignore cells that have been checked or comparing against itself
			if ($(this).text() == cell.text() &&
				$(this).prop('id') != cell.prop('id')) {
				validCell = false;
			}
		});

		// Check the cell's row
		$('#board').find(cell.data('row')).each(function (itr) {
			// Ignore cells that have been checked or comparing against itself
			if ($(this).text() == cell.text() &&
				$(this).prop('id') != cell.prop('id')) {
				validCell = false;
			}
		});

		// Check the cell's box
		$('#board').find(cell.data('box')).each(function (itr) {
			// Ignore cells that have been checked or comparing against itself
			if ($(this).text() == cell.text() &&
				$(this).prop('id') != cell.prop('id')) {
				validCell = false;
			}
		});

		if (validCell)
			console.log(cellID + ' - no errors found');
		return validCell;
	}

	/**
	 * Loop through the selected cell's row/box/column and flag any conflicting cells
	 * Note: need to skip preiously checked cells
	 */
	checkDuplicate = function (selectedCell, searchData) {
		var hasDuplicates = 0;

		$('#board').find(searchData).each(function (itr) {
			// Ignore cells that have been checked or comparing against itself
			if ($(this).text() == selectedCell.text() &&
				$(this).prop('id') != selectedCell.prop('id') &&
				checked.indexOf($(this).prop('id')) < 0) {
				flagError($(this));
				flagError(selectedCell);
				hasDuplicates++;
			}

			checked.push($(this).prop('id'));
		});

		return hasDuplicates;
	}

	flagError = function (cell) {
		var index = invalidCells.indexOf(cell.prop('id'))

		if (index == -1) {
			cell.addClass('error');
			invalidCells.push(cell.prop('id'));
			console.log(invalidCells.indexOf(cell) + ' ' + cell.prop('id') + ' Added to invalidCells');
			return true;
		}
		else
			return false;
	}

	removeError = function (cell) {
		var index = invalidCells.indexOf(cell.prop('id'));

		if (index >= 0) {
			cell.removeClass('error');
			invalidCells.splice(index, 1);
			console.log(index + ' ' + cell.prop('id') + ' Removed from invalidCells');
			return true;
		}
		else
			return false;
	}

	findInvalid = function () {
		invalidCells.length = 0;
		$('#board').find('.error').each(function () {
			invalidCells.push($(this).prop('id'));
		});
		addErr(invalidCells);
	}

}



/**
 * 	Draws a 9x9 box
 *	@box - the index of the box in the sudoku board
 *  @boxRow
 *  @boxCol
 */
drawBox = function (box, boxRow, boxCol) {
	var str, cellRow, cellCol, cell = 0;

	str = "<td><table class='box' data-box=" + box + ">";
	for (cellRow = 0; cellRow < 3; cellRow++) {
		str += "<tr>";
		for (cellCol = 0; cellCol < 3; cellCol++) {
			str += "<td id=R" + (cellRow + boxRow) + "_C" + (cellCol + boxCol) + "_B" + box + " data-row=" + (cellRow + boxRow)
				+ " data-column=" + (cellCol + boxCol) + " data-box=" + box + " data-cell=" + cell;

			// Altenate box colour to make it easier to separate the boxes
			if (box % 2 == 0)
				str += " class='cell'></td>";
			else
				str += " class='cell altbox' ></td>";
			cell++;
		}
		str += "</tr>"
	}

	str += "</table></td>";

	return str;
}

/**
 * 
 */
drawBoard = function () {
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

writeErr = function (str) {
	$('#warning').html(str + "<br>");
}

addErr = function (str) {
	$('#warning').append(str + "<br>");
}

/**
 * 
 * 
 */
$(document).ready(function () {
	drawBoard();

	SudokuGame = new sudoku();
	SudokuGame.createGame();

	$(document).on('click', '.cell', function () {
		$(".cell").removeClass("selected");
		$(this).toggleClass("selected");
	});
});


// Toggle the current selected cell only the current cell
$(function () {
	$(document).on('click', '.cell', function () {
		$(".cell").removeClass("selected");
		$(this).toggleClass("selected");
	});
});

$("#sudokuButtons button").click(function () {
	$(".selected").text($(this).val());
	SudokuGame.addGuess($(".selected"));
	SudokuGame.checkCell($(".selected"));
	//SudokuGame.parseBoard();
});

/**
 * 
 */
$("#NewGame").click(function () {
	if (window.confirm("New game?")) {
		drawBoard();
		SudokuGame.createGame();
	}
});

/**
 * 
 */
$("#resetGame").click(function () {
	if (window.confirm("Restart current game?")) {
		resetGame();
	}
});
