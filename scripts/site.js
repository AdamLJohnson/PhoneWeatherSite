var timeRefresh = .5 * 60 * 1000; //30 seconds
var weatherRefresh = 30 * 60 * 1000; // 30 minutes

function getWeatherURL(lat, lon) {
	return '//forecast.weather.gov/MapClick.php?lat=' + lat + '&lon=' + lon + '&unit=0&lg=english&FcstType=json';
}

function formatDate(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear() + "  " + strTime;
}

function getWeatherData(lat, lon, success, fail)
{
	var request = new XMLHttpRequest();
	request.open('GET', getWeatherURL(lat, lon), true);

	request.onload = function() {
	  if (request.status >= 200 && request.status < 400) {
	    // Success!
	    var data = JSON.parse(request.responseText);
	    return success(data);
	  } else {
	    return fail(request.status);
	  }
	};

	request.onerror = function() {
	  return fail('ERROR');
	};

	request.send();
}

function updateTimeElement(timeElement) {
    var date = new Date();
    timeElement.innerHTML = formatDate(date);
}


function updateBody(el, data)
{
	var bodyElement = el.getElementsByClassName('panel-body')[0];
	bodyElement.innerHTML = '';
	if (data.currentobservation.Weatherimage && data.currentobservation.Weatherimage != 'NULL') {
		var weatherIcon = document.createElement('img');
		weatherIcon.src = 'http://forecast.weather.gov/newimages/large/' + data.currentobservation.Weatherimage;
		weatherIcon.className = 'WeatherIcon';
		bodyElement.appendChild(weatherIcon);
	}

	var weatherTextElement = document.createElement('span');
	weatherTextElement.className = 'weatherText';
	weatherTextElement.innerHTML = '<span class="nowrap">' + data.currentobservation.Temp + ' °F</span>';
	if (data.currentobservation.Weather != 'NA') {
		weatherTextElement.innerHTML += ' ' + data.currentobservation.Weather;
	}	
	bodyElement.appendChild(weatherTextElement);
	bodyElement.innerHTML += '<div class="forecastText">' + data.time.startPeriodName[0] + ': ' + data.data.weather[0] + '</div>';
	bodyElement.innerHTML += data.time.tempLabel[0] + ': ' + data.data.temperature[0] + '°';
}

function updateTitle(el, data, title)
{
	var titleElement = el.getElementsByClassName('panel-title')[0];
	if (data.data.hazard.length > 0) {			
		titleElement.innerHTML = title + '<img class="alertIcon" src="images/urgent.png" />';
	} else {
		titleElement.innerHTML = title;
	}
}