/**\
 * get element and make it visibale
 */
function showElement(element) {
	element.style.display = "block";
}
/**
 * get element and make it unvisibale 
 */
function hideElement(element) {
	element.style.display = "none";
}
/**
 * show ERROR massage and hide other divs in HTML.
 */
function showERROR(message){
hideElement(objLoader);
hideElement(objTable);
objERROR.innerHTML=message;
showElement(objERROR);
}
/**
 * convert Fahrenheit to celcius method
 * @param  obj = json object of weather data  
 * @param  temperatureF temperature 
 */
function toCelcius(obj,temperatureF){
			obj.currently.temperature = parseInt(((temperatureF - 32)*(5/9)).toFixed(1)); //Temperature conversion to represent in Celsius and one digit after dec point. 
	}
var urlProxy = "https://cors-anywhere.herokuapp.com/"
var urlAPI = "https://api.darksky.net/forecast/557ecd4b8c8bbba02f4a50afe884934b/";
var objLoader = document.getElementById("loader");
var objTable = document.getElementById("weather_infobox"); 
var objERROR=document.getElementById("error_text");
var objWeatherTemp=document.getElementById("weather_temp");
var objWeatherLocation=document.getElementById("weather_location");
var objWeatherDescription=document.getElementById("weather_description");
var selectedLocation;
var showPosition;
/**
 * main function
 */
function weatherPage() {
	/**
	 * initial on click & refresh tab
	 */
	this.init = function () {

		getLocation();
	}

	/**
	 * location getter from browser
	 */
	function getLocation()
	{
		if(!navigator.geolocation){
		showERROR("can't reach currect location");
		return(false)}
		navigator.geolocation.getCurrentPosition(function(position){
			var lat = position.coords.latitude;
			var lon = position.coords.longitude;
			weatherByLocation(lat,lon, "Current location");
		});
		console.log("supported")
		

	}

	/**
	 * display data on screen
	 * @param  jsonText = response text from server
	 */
	function showWeatherData (jsonText)
	{
	var objData = JSON.parse(jsonText);
	var temperatureF = objData.currently.temperature;
	toCelcius(objData,temperatureF);
	console.log(objData);
	var temp =objData.currently.temperature;
	showElement(objTable);
	objWeatherTemp.innerHTML = temp ; // fill in weather temperature
	objWeatherLocation.innerHTML=selectedLocation; // fiil in weather location
	objWeatherDescription.innerHTML=objData.currently.summary;//fiil in weather description
	//insert animated icon
	var skycons = new Skycons({"color": "#ffffff"});
	skycons.add("weather_icon", objData.currently.icon);
	skycons.play();

	}
	/**
	 * call weather api + location params
	 * @param  lat = latitude parameter 
	 * @param  lon = longtude parameter
	 */
	
	function weatherByLocation(lat,lon,locat) {
		selectedLocation=locat;
		hideElement(objTable);//hiding info table
		showElement(objLoader); // loading review

		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function () {

			if (this.readyState != 4)
				return (false);

			if (this.status != 200){
				showERROR("failed to get data from server");
				return(false);
			}
			showWeatherData(this.responseText);
			console.log("work");
			hideElement(objLoader);
			showElement(objTable);
			

		};
		var url = urlProxy + urlAPI + lat + ',' + lon;
		xhttp.open("get", url);
		xhttp.send();
		weatherPage.weatherByLocation=weatherByLocation;
	}



	
}
var objPage = new weatherPage();
hideElement(objTable);//hiding info table
showElement(objLoader); // loading review
objPage.init();