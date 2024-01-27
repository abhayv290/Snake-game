

//fetch the post request

const handlesignup = async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    try {
        const url = 'http://localhost:3000/auth/signup';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({email: email, password: password}),
        });
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            window.location.href = '/'  //redirect to home page



        }
    } catch (error) {
        console.log(error);
    }

}

const btn = document.getElementById('btn');
btn.addEventListener('click', (e) => {
    e.preventDefault();
    handlesignup();
})

