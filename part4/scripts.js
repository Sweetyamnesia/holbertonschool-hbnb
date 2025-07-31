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
    } else {
		checkAuthentication();
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
      	document.cookie = `token=${data.access_token}; path=/; max-age=3600; Secure; SameSite=Strict`;
      	window.location.href = 'index.html';
  		} else {
			try {
            	const errorData = await response.json();
            	alert('Échec de la connexion : ' + (errorData.message || response.statusText));
        	} catch (e) {
            	alert('Échec de la connexion : ' + response.statusText);
        	}
  		}
  	}

	function getCookie(name) {
      // Function to get a cookie value by its name
      // Your code here
  	}

	function checkAuthentication() {
      const token = getCookie('token');
      const loginLink = document.getElementById('login-link');

      if (!token) {
          loginLink.style.display = 'block';
      	} else {
          loginLink.style.display = 'none';
          fetchPlaces(token);
      	}
  	}

	async function fetchPlaces(token) {
		const response = await fetch('http://localhost:5000/api/v1/places', {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

		if (!response.ok) {
			throw new Error('Erreur lors du chargement des lieux');
		}

		const places = await response.json();
		displayPlaces(places);
  	}

	function displayPlaces(places) {
      const placesList = document.getElementById('places-list');
    	if (!placesList) {
			return;
		}
		
		placesList.innerHTML = '';

		places.forEach(place => {
			const placeDiv = document.createElement('div');
			placeDiv.classList.add('place');
			placesList.appendChild(placeDiv)
			placeDiv.dataset.price = place.price;
		});
  	}

	document.getElementById('price-filter').addEventListener('change', (event) => {
      const placePrice = parseFloat(place.dataset.price);
        if (isNaN(selectedPrice) || placePrice <= selectedPrice) {
            place.style.display = 'block';
        } else {
            place.style.display = 'none';
		}
  	});
});