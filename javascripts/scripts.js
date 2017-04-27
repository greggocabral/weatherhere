var msg = "";
var latitude = "";
var longitude = "";
var weather = {};
var city = {};
var celsius = true;

$(document).ready(function() {
  getLocation();
  $("#units").click(changeUnits);
});

function getLocation(){
 
  if('geolocation' in navigator){
    requestLocation();
  }else{
    msg = "Sorry, looks like your browser doesn't support geolocation";
    $("#city").html(msg);
  }

function requestLocation(){
    
    var options = {enableHighAccuracy: false, timeout: 5000,maximumAge: 0};
  
    navigator.geolocation.getCurrentPosition(success, error, options); 
  
    function success(pos){
      longitude = Math.floor(pos.coords.longitude*10000)/10000;
      latitude = Math.floor(pos.coords.latitude*10000)/10000;
      getWeather();
      getCity();
    }
    
    function error(err){
      msg = 'Error :(';
      $("#city").html(msg);
    }  
  }
}

function getWeather(){
  var url = "https://crossorigin.me/" + "https://api.darksky.net/forecast/dd1e07767655f48cbce989a8b8a0db24/" + latitude + "," + longitude;
  $.getJSON( url, function( data )       {
      weather = data.currently;
      renderWeather();
   });
  
}

function renderWeather(){
  renderTemperature();
  renderSky();
}

function renderTemperature(){
   if (celsius){
     var temperature = Math.floor((weather.temperature-32)*5/9) + " °C";
   } else {
     var temperature = Math.floor(weather.temperature) + " °F";
   }
  $("#temperature").html(temperature);  
}

function renderSky(){
  switch(weather.icon){
    case "clear-day":
      var icon = "fa-sun-o";
      break;
    case "clear-night":
      var icon = "fa-moon-o";
      break; 
    case "rain": 
      var icon = "fa-tint";
      break;
    case "snow":
      var icon = "fa-snowflake-o";
      break;
    case "sleet":
      var icon = "fa-tint";
      break;
    case "wind":
      var icon = "fa-angle-double-right";
      break;
    case "fog":
    case "cloudy":
       var icon = "fa-cloud";
      break;
    case "partly-cloudy-day":
        var icon = "fa-cloud";
      break;
    case "partly-cloudy-night":
        var icon = "fa-cloud";
      break;
    default:
        var icon = "fa-cloud";
      break;
  }
  $("#sky").html('<i class="fa '+ icon +'" aria-hidden="true"></i>'); 
  $("#summary").html(weather.summary);
}

function getCity(){
  var url = "https://crossorigin.me/" + "https://maps.googleapis.com/maps/api/geocode/json?latlng=" + latitude + "," + longitude + "&sensor=false";
  $.getJSON( url, function( data )       {
      city = data.results[0].address_components[2].long_name + ", " + data.results[0].address_components[3].long_name + ", " + data.results[0].address_components[6].long_name;
      renderCity();
   });
}

function renderCity(){
  $("#city").html(city);
  
}

function changeUnits(){
  celsius = !celsius;
  renderTemperature();
}

