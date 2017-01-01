
var _MS_PER_DAY = 1000 * 60 * 60 * 24 * 375; // Milliseconds a day

function getAge(){
	var todayDate = new Date();
	var dob = new Date(1992, 04);
	var age = Math.floor((todayDate - dob ) / _MS_PER_DAY);

	parseInt
	return age;
}

$( document ).ready(function() {
	$("#age").text(getAge());
});