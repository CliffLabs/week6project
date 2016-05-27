
//http://api.indeed.com/ads/apisearch?
// Google API Key: AIzaSyDwrMAUq00y5-e7XSYl51CjQadoGn9REF0

// do more than one ajax call using as our q: developer, programmer, engineer, coder etc. to take into account the different titles for different countries

// after receiving the results use .concat to join array
// use _.uniq which will omit duplicate resuls within the array

var remote = {}; 

var googleAPIKey = 'AIzaSyDwrMAUq00y5-e7XSYl51CjQadoGn9REF0';

// GET DATA /AJAX CALL
remote.getData = function(query){
$.ajax({
    url: 'http://api.indeed.com/ads/apisearch',
    method: 'GET',
    dataType: 'jsonp',
    data: {
    	publisher: '8031956003452346',
        v: '2',
        format: 'json',
        q: 'remote developer ' + query,
        latlong: '1',
        // co: 'ca',
        //start: 0,
        sort: 'date',
        limit: '25'
    }
}).then(function(data) {
    	// console.log(data);
        remote.googleData(data.results);
	});
};


//Need to write a forEach to iterate through the array of jobs and pull out certain properties for us to display onto the page 
// DISPLAY: jobtitle, company, formattedLocation, snippet, url, formattedRelativeTime

// TO STORE: latitude, longtitude, for Google Maps API for time zones




// GET data from Google Maps API
// make and multiple ajax call to Google Maps using .when because we will be passing an array 
// What will be returned is an array-like object in which we will use .map to iterate through this array and do stuff

remote.googleData = function(data){

    var latlongArray = [];

    data.map(function(jobs){
        // if (jobs.latitude != null || jobs.longitude != null){
        // latlongArray.push(latlong);
        // }  
        if (jobs.latitude === undefined) {
            jobs.latitude = 0;
        }

        if (jobs.longitude === undefined) {
            jobs.longitude = 0;
        }

        var latlong = jobs.latitude + ',' + jobs.longitude;
        latlongArray.push(latlong);
        console.log(latlong);
    });
    // console.log(latlongArray);

    var googleMapsAPI = latlongArray.map(function(latlong){
        // console.log(latlong);
            return $.ajax({
                    url: 'https://maps.googleapis.com/maps/api/timezone/json',
                    method: 'GET',
                    dataType: 'json',
                    data:{
                        location: latlong,
                        timestamp: 1331161200 ,
                        key: googleAPIKey
                    }
            });
    });

    $.when.apply(null, googleMapsAPI)
        .then(function(){
            var timeZoneArray = Array.prototype.slice.call(arguments);

            console.log(timeZoneArray);
            getTimeZone(timeZoneArray);
        });

    function getTimeZone(timeZoneArray){
        remote.timeZone = timeZoneArray.map(function(time){
            return time[0].timeZoneName;
        })

        remote.finalResults(data);
    };
}; 


// need to append timezone data onto the page according to the appropriate job posting

// need to write a function for data.forEach and call it after getTimeZone


remote.finalResults = function(data){
    // console.log(data);

    data.forEach(function(jobs, i){
        console.log(i);

        jobs.snippet = jobs.snippet.replace(/(<([^>]+)>)/ig, '');

        var jobTitle = $('<h2>').text(jobs.jobtitle);
        var company = $('<h3>').text(jobs.company);
        var location = $('<h3>').text(jobs.formattedLocation);
        var jobDescription = $('<p>').text(jobs.snippet);
        var indeedUrl = $('<a>').attr('href', jobs.url);
        var postingTime = $('<h3>').text(jobs.formattedRelativeTime);
        var zone = $('<h3>').text(remote.timeZone[i]);

        // we need to take these variables that we've defined and displa it on our html
        $('.results').append(jobTitle, company, location, jobDescription, indeedUrl, postingTime, zone);
    });
};


// INIT FUNCTION
remote.init = function() {
    $('form').on('submit', function(e){
        e.preventDefault();
        var query = $('input[type=text]').val();
        // console.log(query);
    	remote.getData(query);
    });
};

// DOCUMENT READY
$(function(){
    remote.init();
});