document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const email = document.getElementById("email").value;
    		const password = document.getElementById("password").value;

			try {
                await loginUser(email, password);
            } catch (error) {
                alert('Une erreur est survenue : ' + error.message);
            }

        });
    }

	async function loginUser(email, password) {
      const response = await fetch('http://localhost:5000/api/v1/auth/login', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
      });
      
	  if (response.ok) {
      	const data = await response.json();
      	document.cookie = `token=${data.access_token}; path=/; max-age=3600`;
      	window.location.href = 'index.html';
  		} else {
			const errorText = await response.text();
      		alert('Login failed: ' + response.statusText);
  		}
  	}
});