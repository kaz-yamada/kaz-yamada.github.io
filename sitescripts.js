function getAge(){
	var todayDate = new Date();
	var birthDate = new Date(1992,04);
	var age = new Date();
	
	document.getElementById("age").innerHTML = todayDate.getFullYear()-birthDate.getFullYear();
}