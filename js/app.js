
var _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 375; // Milliseconds a year
var _CM_PER_INCH = 2.54;
var _IN_PER_FT = 12;

function getAge() {
	var todayDate = new Date();
	var dob = new Date(1992, 04);
	var age = Math.floor((todayDate - dob) / _MS_PER_YEAR);

	return age;
}

function convertToMetric() {
	// Parse user's height
	var inches = parseFloat($('#heightInches').val());
	var foot = parseFloat($('#heightFeet').val());

	// Find the height in centimeters
	var metricHeight = (foot * _IN_PER_FT) + inches;
	return foot + ' ft ' + inches + ' = ' + metricHeight + 'cm<br>';

}

function convertToImperial() {
	// Get user's height in metric
	var metricHeight = $('#heightMetric').val();
	var metricOption = $('#metricOption').val();

	// Convert to centimeters
	if (metricOption == 'mm')
		metricHeight = metricHeight * 10;
	else if (metricOption == 'm')
		metricHeight = metricHeight / 10;

	// Convert metric to inches
	var imperialHeight = metricHeight / _CM_PER_INCH;

	// Divide into feet and inches
	var heightFt = Math.floor(imperialHeight / _IN_PER_FT);
	var heightIn = Math.floor(imperialHeight % _IN_PER_FT);

	return metricHeight + ' ' + metricOption + ' = ' + heightFt + ' foot ' + heightIn + ' inches' + '<br>';
}

$(document).ready(function () {
	$("#age").text(getAge());
});

/* 
	Convert to feet and inches is clicked
*/
$('#convertImperial').click(function () {
	var inches = parseFloat($('#heightInches').val());
	var foot = parseFloat($('#heightFeet').val());

	if (isNaN(inches) || isNaN(foot) ) {
		$('#imperialWarning').text("Height must be a number");
	}
	else {
		$('#result').append(convertToMetric());
		$('#imperialWarning').text("");
	}
});


/* 
	Convert to metric is clicked
*/
$('#convertMetric').click(function () {
	var metricHeight = $('#heightMetric').val();

	if (isNaN(metricHeight) || metricHeight == "" ) {
		$('#metricWarning').text("Height must be a number");
	}
	else {
		$('#result').append(convertToImperial());
		$('#metricWarning').text("");
	}
});