// Fething User data

async function fetchUser() {
    const url = 'http://localhost:3000/auth/me'
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
    if (json.success) {
        const user = document.getElementById('username');
        const email = document.getElementById('email');
        user.innerHTML = json.user.username;
        email.innerHTML = json.user.email_id;

    }

}
fetchUser();


//fetch gameScore for based on the user





