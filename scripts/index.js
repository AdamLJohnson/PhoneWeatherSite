(function () {

    updateTime();
    setInterval(updateTime, timeRefresh);
    var panels = document.getElementsByClassName('weatherPanel');
    for (var i = 0; i < panels.length; i++) {
    	setupPanel(panels[i]);
    	updatePanel(panels[i]);
    }

    setInterval(function () {
    	for (var i = 0; i < panels.length; i++) {
	    	updatePanel(panels[i]);
	    }
    }, weatherRefresh); //30 minutes


    function updateTime() {
	    var timeElement = document.getElementById('time');
	    updateTimeElement(timeElement);
	}

	function updatePanel(el){
		var lat = el.getAttribute('data-lat');
		var lon = el.getAttribute('data-lon');

		getWeatherData(lat, lon, function success(data) {
			updatePanelData(el, data);
		}, function fail(err) {
			var bodyElement = el.getElementsByClassName('panel-body')[0];
			bodyElement.innerHTML = err;
		});		
	};

	function updatePanelData(el, data){
		var title = el.getAttribute('data-title');
		updateTitle(el, data, title);
		updateBody(el, data);
	};

	function setupPanel(el){
		var headerElement = document.createElement('div');
		headerElement.className = 'panel-heading';		
		el.appendChild(headerElement);

		var titleElement = document.createElement('h3');
		titleElement.className = 'panel-title';
		titleElement.innerHTML = el.getAttribute('data-title');
		headerElement.appendChild(titleElement);

		var bodyElement = document.createElement('div');
		bodyElement.className = 'panel-body';
		el.appendChild(bodyElement);
	};
})();