function getAge() {
	var todayDate = new Date();
	var dob = new Date(1992, 04);
	var age = Math.floor((todayDate - dob) / _MS_PER_YEAR);

	return age;
}

$(document).ready(function () {
	$("#age").text(getAge());
});
