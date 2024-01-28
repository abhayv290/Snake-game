// Fething User data

async function fetchUser() {
    const url = 'http://localhost:3000/auth/me'
    const response = await fetch(url);
    const json = await response.json();
    console.log(json);
}
fetchUser();