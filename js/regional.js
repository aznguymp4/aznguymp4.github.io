// Made by aznguy.mp4
// 06/13/2020
function replace(input) {
    var letters = {
        'a': ':regional_indicator_a:\u200A', // ALL LETTERS HAVE A \u200A AFTER IT TO PREVENT LETTERS FROM TURNING INTO FLAG EMOJIS
        'b': ':regional_indicator_b:\u200A', // for some reason, using \u200B doesn't work on iOS devices
        'c': ':regional_indicator_c:\u200A',
        'd': ':regional_indicator_d:\u200A',
        'e': ':regional_indicator_e:\u200A',
        'f': ':regional_indicator_f:\u200A',
        'g': ':regional_indicator_g:\u200A',
        'h': ':regional_indicator_h:\u200A',
        'i': ':regional_indicator_i:\u200A',
        'j': ':regional_indicator_j:\u200A',
        'k': ':regional_indicator_k:\u200A',
        'l': ':regional_indicator_l:\u200A',
        'm': ':regional_indicator_m:\u200A',
        'n': ':regional_indicator_n:\u200A',
        'o': ':regional_indicator_o:\u200A',
        'p': ':regional_indicator_p:\u200A',
        'q': ':regional_indicator_q:\u200A',
        'r': ':regional_indicator_r:\u200A',
        's': ':regional_indicator_s:\u200A',
        't': ':regional_indicator_t:\u200A',
        'u': ':regional_indicator_u:\u200A',
        'v': ':regional_indicator_v:\u200A',
        'w': ':regional_indicator_w:\u200A',
        'x': ':regional_indicator_x:\u200A',
        'y': ':regional_indicator_y:\u200A',
        'z': ':regional_indicator_z:\u200A',
        ' ': '　',
        '0': ':zero:',
        '1': ':one:',
        '2': ':two:',
        '3': ':three:',
        '4': ':four:',
        '5': ':five:',
        '6': ':six:',
        '7': ':seven:',
        '8': ':eight:',
        '9': ':nine:',
        '!': ':exclamation:',
        '?': ':question:',
        '\n': '\n',
        '#': ':hash:',
        '*': ':asterisk:'
    }
    return input.split('').map(letter => { return letters[letter] }).join('')
}
$('#input').on('input', function(){
    var val = $('#input').val()
    var out = replace(val.toLowerCase())
    $('#outputText').val(out);
    if(out.length > 2000) { document.getElementById("charWarn").style.opacity="1" }
    else { document.getElementById("charWarn").style.opacity="0" }
})
new ClipboardJS('#btnCopy', { // function for copy-to-click
    text: function(trigger) {
        var animation = "animate__animated animate__bounce"
        $('#btnCopy').addClass(animation)
        setTimeout(()=>{ $('#btnCopy').text("Copied") },200)
        setTimeout(()=>{ $('#btnCopy').removeClass(animation) },1000)
        return $('#outputText').val()
    }
})