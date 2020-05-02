String.prototype.getContents = function(raw, type, send, headers) { // Get contents from a URL (string containing 1 URL)
    var xhr = new XMLHttpRequest()
    xhr.open(type ? type : "GET", this, false) // true = asynchronous request | false = synchronous request
    if (headers) headers.map(header => {
        xhr.setRequestHeader(Object.keys(header)[0], Object.values(header)[0])
    })
    xhr.send(send)
    return raw ? xhr.responseText : JSON.parse(xhr.responseText)
}
String.prototype.gist_get = function(raw, fileName) {
    var files = JSON.parse(`https://api.github.com/gists/${this}`.getContents(1)).files
    var idx = fileName? Object.keys(files).indexOf(fileName) : 0
    return raw ? files[Object.keys(files)[idx]].content : JSON.parse(files[Object.keys(files)[idx]].content)
}
function getParam(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) 
    {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) 
        {
            return sParameterName[1];
        }
    }
}