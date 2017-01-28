
var _MS_PER_YEAR = 1000 * 60 * 60 * 24 * 375; // Milliseconds a year
var _CM_PER_INCH = 2.54;
var _IN_PER_FT = 12;

/*
	Convert feet and inches into centimeters
*/
function convertToMetric(inches, foot) {
    // Parse user's height
    inches = parseFloat(inches);
    foot = parseFloat(foot);

    // Convert feet into inches
    var metricHeight = (foot * _IN_PER_FT) + inches;
    // Convert inches into cm
    metricHeight *= _CM_PER_INCH;

    return foot + ' ft ' + inches + ' = ' + metricHeight + 'cm<br>';

}

/*
	Convert metric into feet and inches
*/
function convertToImperial(metricHeight) {

    // Convert text into float
    metricHeight = parseFloat(metricHeight);
    // Find out the selected option of measurement
    var metricOption = $('#metricOption').val();

    var imperialHeight = metricHeight;

    // Convert to centimeters
    if (metricOption == 'mm')
        imperialHeight /= 10;

    if (metricOption == 'meters')
        imperialHeight *= 10;

    // Convert metric to inches
    var imperialHeight = imperialHeight / _CM_PER_INCH;

    // Divide into feet and inches
    var heightFt = Math.floor(imperialHeight / _IN_PER_FT);
    var heightIn = Math.floor(imperialHeight % _IN_PER_FT);

    return metricHeight + ' ' + metricOption + ' = ' + heightFt + ' foot ' + heightIn + ' inches' + '<br>';
}
/*
	Restrict to enterying numbers only
*/
$(".numbersOnly").keyup(function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});

/* 
	Convert from feet and inches is clicked
*/
$('#convertFromImperial').click(function () {
    var inches = parseFloat($('#heightInches').val());
    var foot = parseFloat($('#heightFeet').val());

    if (isNaN(foot)) {
        $('#feetWarning').text("Height must be a number");
    }
    if (Number.isNaN(inches)) {
        $('#inchWarning').text("Height must be a number");
    }
    else {
        $('#result').append(convertToMetric(inches, foot));
        $('#inchWarning').text("");
        $('#feetWarning').text("");
        $('#clearHeight').prop('disabled', false);
    }
});

/* 
	Convert to metric is clicked
*/
$('#convertFromMetric').click(function () {
    var metricHeight = parseFloat($('#heightMetric').val());

    if (Number.isNaN(metricHeight)) {
        $('#metricWarning').text("Height must be a number");
    }
    else {
        $('#result').append(convertToImperial(metricHeight));
        $('#metricWarning').text("");
        $('#clearHeight').prop('disabled', false);
    }
});

/*
	Remove the results of the user's converted heights
*/
$('#clearHeight').click(function () {
    $('#result').text("");
    $('#clearHeight').prop('disabled', true);
});