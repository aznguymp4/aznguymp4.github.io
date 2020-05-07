var gameMode = getParam('mode')
var scoreSort = (a,b) => {return b.score - a.score}
var columns = document.getElementById('tabletop')
if(gameMode !== 'normal') {
    var arr = columns.innerHTML.split('\n')
    var tag = document.createElement('th')
    tag.setAttribute("width", "7%")
    tag.innerHTML = function() { switch (gameMode) {
        case 'combo':
            scoreSort = (a,b) => {return b.stat.split('|')[0] - a.stat.split('|')[0]}
            return `Combo`
        case 't-spin':
            scoreSort = (a,b) => {return b.stat.split('|')[7] - a.stat.split('|')[7]}
            return `T-Spin Doubles`
        case 'tetris':
            scoreSort = (a,b) => {return b.stat.split('|')[3] - a.stat.split('|')[3]}
            return `Tetrises`
    }}()
    columns.insertBefore(tag, document.getElementById('score'))
}
var date = document.createElement('td')
date.innerHTML = `Date ${new Date().toString().replace(/\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} \w{3}(-|\+)\d{4} /,'')}`
date.setAttribute('width', '10%')
date.setAttribute('style', 'text-align:center')
console.log(date)
columns.insertBefore(date, document.getElementById('time').nextSibling)
var scores = reform("a11b0f6379d405e8510d8d3a8d453029".gist_get(0, `${gameMode}.json`)).sort(scoreSort).filter(function(v,i,a) { return a.map(sc=>{return sc.stat}).indexOf(v.stat) == i })
buildTable(scores)

$('#search-input').on('input', function(){
    var value = $('#search-input').val()
    var data = search(value, scores)
    buildTable(data)
})

new ClipboardJS('.username', { // function for copy-to-click
    text: function(trigger) {
        console.log(trigger)
        return trigger.getAttribute('data-id');
    }
})
function filterDupes(cb){
    if(cb) {
        var s = {}
        var filtered = scores.map(player => {
            if(!s[player.id] || (s[player.id] && s[player.id].score <= player.score)) {
                s[player.id] = player.score
                return player
            }
        }).filter(a=>a)
        buildTable(filtered, true)
    } else buildTable(scores)
};filterDupes(true)
function search(value, data){
    var filteredData = []
    data.map(player => {
        if(player.username.toLowerCase().includes(value.toLowerCase()) || player.id.includes(value)) filteredData.push(player)
    })
    return filteredData
}
function reform(d) {
    var arr = []
    Object.keys(d).map(pl => {
        d[pl].scores.map(score => {
            delete d[pl].scores
            arr.push(Object.assign(score, d[pl]))
        })
    })
    return arr
}
function statToString(st) {
    const score = st.score
    const stat = st.stat.split('|')
    return [
        `SCORE — ${score}`,
        `—`.repeat(14),
        `Single — ${stat[0]/100}`,
        `Double — ${stat[1]/300}`,
        `Triple — ${stat[2]/500}`,
        `Tetris — ${stat[3]/800}`,
        `Total T-Spins — ${stat[5]/400 + stat[6]/700 + stat[7]/900 + stat[8]/1100 + stat[9]/100 + stat[10]/100 + stat[11]/100}`,
        `T-Spin Single — ${stat[6]/700}`,
        `T-Spin Double — ${stat[7]/900}`,
        `T-Spin Triple — ${stat[8]/1100}`,
        `T-Spin Mini — ${stat[9]/100}`,
        `Mini T-Spin Single — ${stat[10]/100}`,
        `Mini T-Spin Double — ${stat[11]/100}`,
        `Bonus from Combos — ${stat[15]}`,
        `Bonus from B2B's — ${stat[16]}`,
        `Perfect Clears — ${stat[4]/6500}`
    ].join('<br>')
}

function buildTable(data,useLocalIDX){
    var table = document.getElementById('leaderboard')
    var sorted = JSON.parse(JSON.stringify(data)).sort(scoreSort).map(p=>{return p.username})
    table.innerHTML='';
    data.sort(scoreSort).map((player, i) => {
        table.innerHTML += 
        `<tr>
            <td style="text-align:center">${(useLocalIDX?data:scores).indexOf(player)+1}</td>
            <td class="username" title="Click to Copy User ID" data-id="${player.id}"><img src="${player.avatar}" height="30" width="30">${player.username}</td>
            ${function(){switch(gameMode){
                case 'combo':
                    return `<td>${player.stat.split('|')[0]/100-1 >= 0? player.stat.split('|')[0]/100-1 : 0}</td>`
                case 't-spin':
                    return `<td>${player.stat.split('|')[7]/900 + player.stat.split('|')[11]/100}</td>`
                case 'tetris':
                    return `<td>${player.stat.split('|')[3]/800}</td>`
                default:
                    return ''
            }}()}
            <td class="score">${player.score}<span class="tooltiptext">${statToString(player)}</span></td>
            <td style="text-align:center">${player.time[1]}</td>
            <td style="text-align:center">${time12hr(new Date(player.date))}</td>
            </tr>`
    })
}