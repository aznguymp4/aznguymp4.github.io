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
                res(jsonRes)
            }
        })
    })
}

isMobile = (function(a) {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) return true;
})(navigator.userAgent || navigator.vendor || window.opera);