// Fething User data

async function fetchUser() {
    const url = 'http://localhost:3000/auth/me'
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    if (json.success) {
        const user = document.getElementById('username');
        const email = document.getElementById('email');
        user.innerHTML = json.user.username;
        email.innerHTML = json.user.email_id;

    }

}
fetchUser();


//fetch gameScore for based on the user
async function fetchScore() {
    const url = 'http://localhost:3000/game/fetchscore'
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    if (json.success) {
        const getscore = document.getElementById('getscore');
        for (let item of json.data.scoreinfo) {
            const utcDate = new Date(item.createdAt);
            const istDate = utcDate.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});

            getscore.innerHTML += `<li> Time:   <strong>${istDate}:</strong> <span>score: <strong>${item.score}</strong> </span> </li>`
        }
    }




} fetchScore();


//Fetching leaderboard  for the ranking the best user (Status Pending )
async function fetchLeaderbrd() {
    const url = 'http://localhost:3000/game/fetchleaderboard'
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);


    // sort the data in Desending Order?=
    json.data.scores.sort((a, b) => parseInt(b.score) - parseInt(a.score));
    if (json.success) {
        const getscore = document.getElementById('leaderbrd');



        let rank = 0;
        for (let item of json.data.scores) {
            const utcDate = new Date(item.createdAt);
            const istDate = utcDate.toLocaleString("en-US", {timeZone: "Asia/Kolkata"});
            getscore.innerHTML += `<li>  <b>${++rank}:</b>  <strong>${item.username}</strong>    <span>score: <strong>${item.score}</strong> </span> <span>time: ${istDate}</span> </li>`
        }
    }


} fetchLeaderbrd();


//function for creating an sorted array
function SortedArray(data) {
    let j = 0;


    console.log(data);

}



