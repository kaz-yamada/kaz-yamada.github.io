function populateCells() {

}

function checkCell(cellObject) {
	// var itr;
	// arr.sort();

	// for (itr = 1; itr <= 9; itr++) {
	// 	if (itr != arr[itr])
	// 		return false;
	// }
	// $(this).val(), $(this).attr("data-row"), $(this).attr("data-column"), $(this).attr("data-box")

	$("#test").text("Cell Value = " + $(cellObject).val() +
		" Cell Row = " + $(cellObject).attr("data-row") +
		" Cell column = " + $(cellObject).attr("data-column") +
		" Cell box = " + $(cellObject).attr("data-box"));

	return true;
}

function checkRow() {

}

function checkColumn() {

}

function drawBox(box, boxRow, boxCol) {
	var str = "", cellrow, cell;

	str = "<td><table class='box' data-box=" + box + ">";
	for (cellrow = 0; cellrow < 3; cellrow++) {
		str += "<tr>";
		for (cell = 0; cell < 3; cell++) {
			str += "<td><input class='cell' type='text' maxlength=1 data-row=" + (cellrow + boxRow)
				+ " data-column=" + (cell + boxCol) + " data-box=" + box + "></td>";
		}
		str += "</tr>"
	}

	str += "</table></td>";

	return str;
}

function drawBoard() {
	var boxRow, boxCol, str, box = 1;


	// Draw row
	for (boxRow = 1; boxRow <= 9; boxRow += 3) {
		str += "<tr data-boxrow =" + boxRow + ">";
		for (boxCol = 1; boxCol <= 9; boxCol += 3) {
			str += drawBox(box, boxRow, boxCol);
			box++;
		}
		str += "</tr>";
	}

	$("#board").append(str);
}

$(document).ready(function () {
	drawBoard();

	$('.cell').keyup(function () {
		checkCell(this);
	});
});

$("#NewGame").click(function(){

	if(window.confirm("New game?"))
	{
		$("#board").text("");
		drawBoard();
	}

});

$("#resetGame").click(function(){
	if(window.confirm("Restart current game?"))
	{
		
	}
});
