// oh my GOD this code is so old and bad
// too lazy to remake it.........................
function cmp(a,b){return(a>b)-(a<b)}
const showAtTime = 25
const gameMode = getParam('mode') || 'normal'
const columns = document.getElementById('tabletop')
let scoreSort = (a,b) => {return b.score.score - a.score.score}
if(gameMode !== 'normal') {
	//let arr = columns.innerHTML.split('\n')
	let tag = document.createElement('th')
	tag.setAttribute("width", "7%")
	tag.innerHTML = function() { switch (gameMode) {
		case 'sprint':
			scoreSort = (a,b) => {return a.score.time[0] - b.score.time[0] || cmp(b.score,a.score)}
			return `Time`
		case 'combo':
			scoreSort = (a,b) => {return b.score.stat.split('|')[0] - a.score.stat.split('|')[0] || cmp(b.score,a.score)}
			return `Combo`
		case 't-spin':
			scoreSort = (a,b) => {return b.score.stat.split('|')[7] - a.score.stat.split('|')[7] || cmp(b.score,a.score)}
			return `T-Spin Doubles`
		case 'tetris':
			scoreSort = (a,b) => {return b.score.stat.split('|')[3] - a.score.stat.split('|')[3] || cmp(b.score,a.score)}
			return `Tetrises`
	}}()
	columns.insertBefore(tag, document.getElementById('score'))
}
let date = document.createElement('td')
date.innerHTML = `Date ${new Date().toString().replace(/\w{3} \w{3} \d{2} \d{4} \d{2}:\d{2}:\d{2} \w{3}(-|\+)\d{4} /,'')}`
date.setAttribute('width', '10%')
date.setAttribute('style', 'text-align:center')
columns.insertBefore(date, document.getElementById('time').nextSibling)
const table = document.getElementById('leaderboard')
let hitBottom = false
let displaying = 0

setTimeout(()=>{
	fetch(`https://aznbotmp4.herokuapp.com/berisbot/scores/${gameMode}`,{method:'GET'}).then(d => {d.json().then(scores => {
		buildTable(scores, false, 0, showAtTime)
		
		$('#load').remove()
		$('#search-input').on('change', ()=>{
			let query = $('#search-input').val().toLowerCase()
			
			buildTable(query? scores.filter(p => p.username.toLowerCase().includes(query)) : scores, false, 0, 100)
		})

		function buildTable(data, useLocalIDX, start, size, keepOld) {
			//let sorted = JSON.parse(JSON.stringify(data)).sort(scoreSort).map(p=>{return p.username})
			if(!keepOld) {
				table.innerHTML=''
				displaying = 0
			}
			let sorted = data.sort(scoreSort)
			hitBottom = false

			for(let i=start;i<size;i++){
				let player = sorted[i]
				if(!player) break;
				let score = player.score
				
				displaying++
				table.innerHTML += 
				`<tr>
					<td style="text-align:center">${(useLocalIDX?data:scores).indexOf(player)+1}</td>
					<td class="username">${player.username}</td>
					
					${function(){switch(gameMode){
						case 'sprint':
							$('#time').remove()
							return `<td>${score.time[1]}</td>`
						case 'combo':
							return `<td>${score.stat.split('|')[0]/100-1 >= 0? score.stat.split('|')[0]/100-1 : 0}</td>`
						case 't-spin':
							return `<td>${score.stat.split('|')[7]/900 + score.stat.split('|')[11]/100}</td>`
						case 'tetris':
							return `<td>${score.stat.split('|')[3]/800}</td>`
						default:
							return ''
					}}()}
					<td class="score">${score.score}<span class="tooltiptext">${statToString(score)}</span></td>
					${gameMode !== 'sprint'? `<td style="text-align:center">${score.time[1]}</td>`:``}
					<td style="text-align:center">${time12hr(new Date(score.date))}</td>
				</tr>`
			}
		}
		function statToString(st) {
			const score = st.score
			const stat = st.stat.split('|')
			return [
				`SCORE — ${score}`,
				//`—`.repeat(14),
				`<hr>`,
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
			].join('<br>').replace('<hr><br>','<hr>')//weird code but whatevs
		}
		window.onscroll = function() {
			if(!hitBottom && $('#search-input').val().length==0 && window.innerHeight + window.pageYOffset >= document.body.offsetHeight) {
				hitBottom = true
				buildTable(scores, false, displaying, displaying+showAtTime, true)
			}
		}
	})})
},1000)