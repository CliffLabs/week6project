//http://api.indeed.com/ads/apisearch?publisher=8031956003452346&q=remote+jobs+front-end+developer&latlong=1&v=2&limit=25

//http://api.indeed.com/ads/apisearch?

// publisher=8031956003452346
// q=remote+jobs+front-end+developer
// v=2

//http://www.indeed.com/jobs?as_and=remote+developer+job&as_phr=&as_any=remote+developer+job+offsite&as_not=onsite&as_ttl=&as_cmp=&jt=all&st=&salary=&radius=25&l=&fromage=any&limit=10&sort=&psf=advsrch


// do more than one ajax call using as our q: developer, programmer, engineer, coder etc. to take into account the different titles for different countries

// after receiving the results use .concat to join array
// use _.uniq which will omit duplicate resuls within the array

var remote = {};

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
        // co: 'country',
        // sort: 'date',
        limit: '25'
    }
}).then(function(data) {
    	console.log(data.results);
	});
};

//Need to write a forEach to iterate through the array of jobs and pull out certain properties for us to display onto the page 
// Some properties to be stored for

// DISPLAY: jobtitle, company, formattedLocation, snippet, url, formattedRelativeTime

// TO STORE: latitude, longtitude, for Google Maps API for time zones
        // .start for

// DISPLAY DATA FUNCTION
remote.displayData = function(){



};


// GET data from Google Maps API
// make and multiple ajax call to Google Maps using .when because we will be passing an array 
// What will be returned is an array-like object in which we will use .map to iterate through this array and do stuff


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






























