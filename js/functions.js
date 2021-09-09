function getContents(url, raw, type, send, headers) { // Get contents from a URL
    var xhr = new XMLHttpRequest()
    xhr.open(type ? type : "GET", url, false) // true = asynchronous request | false = synchronous request
   /*  if(headers) headers.map(header => {
        xhr.setRequestHeader(Object.keys(header)[0], Object.values(header)[0])
    })
 */
    if(headers) Object.keys(headers).map(key => {xhr.setRequestHeader(key, headers[key]) })
    xhr.send(send)
    return raw ? xhr.responseText : JSON.parse(xhr.responseText)
}
function gistGet(ID, raw, fileName) {
    var files = JSON.parse(getContents(`https://api.github.com/gists/${ID}`, 1)).files
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
function time12hr(date) {
    var months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    var hours = date.getHours()
    var minutes = date.getMinutes()
    hours = hours%12 ? hours%12 : 12 // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes
    return `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()} at ${hours}:${minutes} ${hours >= 12? "AM" : "PM"}`
}
function extractNums(str) {
    return str.replace(/[^.\d]/g,'')
}
function setCookie(e, t, n) {
    const o = new Date;
    o.setTime(o.getTime() + 24 * n * 60 * 60 * 1e3);
    let i = "expires=" + o.toUTCString();
    document.cookie = e + "=" + t + ";" + i + ";path=/"
}
function getCookie(e) {
    let t = e + "=", n = decodeURIComponent(document.cookie).split(";");
    for (let e = 0; e < n.length; e++) {
        let o = n[e];
        for (;" " == o.charAt(0);) o = o.substring(1);
        if (0 == o.indexOf(t)) return o.substring(t.length, o.length)
    }
    return ""
}
function checkToken(token) {
    return new Promise((res,rej) => {
        fetch('https://discord.com/api/users/@me', {headers: {Authorization: `Bearer ${token}`}, method: 'GET'}).then(async response2 => {
            const jsonRes = await response2.json()
            if(jsonRes.message) {
                rej('Invalid Token')
            } else {
                res(token)
            }
        })
    })
}