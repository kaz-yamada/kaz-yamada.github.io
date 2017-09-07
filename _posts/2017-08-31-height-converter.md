---
layout: post
title:  "Height Converter"
date:   2017-08-31 13:36:00
categories: javscript jqurey
---
<style >
label {
  color: white;
  display: inline-block;
}
input.numbersOnly,
select.button {
  max-width: 250px;
  display: inline-block;
  vertical-align: middle;
}
</style>

## Calculate and convert height

A height converter that takes feet and inches and converts them into centimeters/meters/millimeters.

Just felt like this site could use a post

#### Convert feet and inches into centimeters or meters
  <div>
    <h5>Feet and inches</h5>
    <input id="heightFeet" type="text" class="numbersOnly" /><label for="heightFeet">&nbsp;feet&nbsp;&nbsp;</label>
    <span id="feetWarning" class="warning"></span><br>
    <input id="heightInches" type="text" class="numbersOnly" /><label for="heightInches">&nbsp;in.&nbsp;</label>
    <span id="inchWarning" class="warning"></span><br><br>
    <button type="button" class="button" id="convertFromImperial">Convert feet and inches to centimeters</button>
    <h5>Metric</h5>
    <input id="heightMetric" type="text" class="numbersOnly" />
    <select id="metricOption" class="button dropdown" >
						<option value="cm">cm</option>
						<option value="mm">mm</option>
						<option value="meters">m</option>
					</select>
    <span id="metricWarning" class="warning"></span>
    <button type="button" class="button" id="convertFromMetric">Convert into feet and inches</button>
  </div>
  <div>
    <h5>Results</h5>
    <p id="result"></p><br>
    <button type="button" class="button" id="clearHeight" disabled>Clear Results</button>
  </div>
<script>
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
  $(".numbersOnly").keyup(function() {
    this.value = this.value.replace(/[^0-9\.]/g, '');
  });

  /*
  	Convert from feet and inches is clicked
  */
  $('#convertFromImperial').click(function() {
    var inches = parseFloat($('#heightInches').val());
    var foot = parseFloat($('#heightFeet').val());

    if (isNaN(foot)) {
      $('#feetWarning').text("Height must be a number");
    }
    if (Number.isNaN(inches)) {
      $('#inchWarning').text("Height must be a number");
    } else {
      $('#result').append(convertToMetric(inches, foot));
      $('#inchWarning').text("");
      $('#feetWarning').text("");
      $('#clearHeight').prop('disabled', false);
    }
  });

  /*
  	Convert to metric is clicked
  */
  $('#convertFromMetric').click(function() {
    var metricHeight = parseFloat($('#heightMetric').val());

    if (Number.isNaN(metricHeight)) {
      $('#metricWarning').text("Height must be a number");
    } else {
      $('#result').append(convertToImperial(metricHeight));
      $('#metricWarning').text("");
      $('#clearHeight').prop('disabled', false);
    }
  });

  /*
  	Remove the results of the user's converted heights
  */
  $('#clearHeight').click(function() {
    $('#result').text("");
    $('#clearHeight').prop('disabled', true);
  });
</script>
