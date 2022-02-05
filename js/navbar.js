const navbarHtml = `
<link rel="stylesheet" type="text/css" href="../../css/navbar.css"/>
<ul id="menu-bar" class="PRELOOOOOAD">
    <li class="active"><a href="/">Home</a></li>
    <li>
        <a class="dropLabel">aznbot.mp4 Tetris</a>
        <ul class="PRELOOOOOAD">
            <section>Leaderboards</section>
            <li><a href="/html/leaderboard.html">Normal Tetris</a></li>
            <li><a href="/html/leaderboard.html?mode=sprint">Sprint</a></li>
            <li><a href="/html/leaderboard.html?mode=combo">Combo Challenge</a></li>
            <li><a href="/html/leaderboard.html?mode=tetris">Tetris Only</a></li>
            <li><a href="/html/leaderboard.html?mode=t-spin">T-Spin Doubles Only</a></li>
            <section>Settings</section>
            <li><a href="/html/customize.html">Customize Appearance</a></li>
        </ul>
    </li>
    <li>
        <a class="dropLabel">Other Projects</a>
        <ul class="PRELOOOOOAD">
            <section>Some Stuff</section>
            <li><a href="https://www.roblox.com/games/6795867689/">Tetroblox</a></li>
            <li><a href="/html/DiscordTools/regional.html">Regional Indicator Generator</a></li>
            <li><a href="/quickcopy/">QuickCopy</a></li>
            <section>School Projects</section>
            <li><a href="/schoolTeto/">SchoolTeto</a></li>
            <li><a href="/schoolPong/">SchoolPong</a></li>
            <li><a href="/schoolSnake/">SchoolSnake</a></li>
        </ul>
    </li>
    <li><a class="button" href="/html/invite.html">Invite aznbot.mp4</a></li>
</ul>`

document.getElementById('navbar').innerHTML = navbarHtml
let arr = document.getElementsByClassName('PRELOOOOOAD')
for (let i=0;i<arr.length;i++) {
    const element = arr[i]
    setTimeout(function(){
        element.classList.remove('PRELOOOOOAD') 
    },100)
}