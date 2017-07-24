// After the API loads, call a function to enable the search box.
function handleAPILoaded() {
  //$('#search-button').attr('disabled', false);
}

// Search for a specified string.
function search() {
  document.title = "HPY - "+decodeURI(getUrlVars()['search']);

  var request = gapi.client.youtube.search.list({
    q: decodeURI(getUrlVars()['search']),
    part: 'snippet',
  });

  request.execute(function(response) {
    var str = JSON.stringify(response.result);
    console.log(response)
    var video = "https://www.youtube.com/embed/"+response.result.items[1].id.videoId+"?autoplay=1";
    //$('#results').html('<pre>' + response.result.items[1].id.videoId + '</pre>');
    $('#ytplayer').attr("src", video);
  });
}

function start() {
  apikey = ""
  $.getJSON("config.json", function(json) {
    apikey = json.apikey
  });
  // Initializes the client with the API key and the Translate API.
  gapi.client.init({
    'apiKey': apikey,
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
  }).then(function () {
    search()
  })
  
};

function getUrlVars() {
  var vars = {};
  var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    vars[key] = value;
  });
  return vars;
}

function init() {
  
}

// Loads the JavaScript client library and invokes `start` afterwards.
gapi.load('client', start);

window.onload = init;
