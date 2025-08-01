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
      const response = await fetch(`http://localhost:5000/api/v1/auth/login`, {
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

	function getCookieByName(name) {
    const cookies = document.cookie.split(";");
        for (let cookie of cookies) {
            cookie = cookie.trim();
        if (cookie.startsWith(name + "=")) {
            return cookie.substring(name.length + 1);
        }
        }
        return null;
    }
	

	async function fetchPlaces(token) {
		const response = await fetch(`http://localhost:5000/api/v1/places`, {
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
      const placePrice = parseFloat(places.dataset.price);
        if (isNaN(selectedPrice) || placePrice <= selectedPrice) {
            places.style.display = 'block';
        } else {
            places.style.display = 'none';
		}
  	});

	function checkAuthentication() {
      const token = getCookie('token');
      const addReviewSection = document.getElementById('add-review');

      if (!token) {
          addReviewSection.style.display = 'none';
      } else {
          addReviewSection.style.display = 'block';
          // Store the token for later use
          fetchPlaceDetails(token, placeId);
      }
  	}

	async function fetchPlaceDetails(token, placeId) {
        const response = await fetch(`http://localhost:5000/api/v1/places/${placeId}`, {
			method: 'GET',
			headers: {
				'Authorization': `Bearer ${token}`
			}
		});

        if (!response.ok) {
			throw new Error('Erreur lors du chargement des détails');
		}

        const data = await response.json();
		displayPlaces(data);
  	}

	function displayPlaceDetails(place) {
        document.getElementById('placeDetails').innerHTML = '';  

      // Create elements to display the place details (name, description, price, amenities and reviews)
      // Append the created elements to the place details section
  	}

	function checkAuthentication() {
      const token = getCookie('token');
      if (!token) {
          window.location.href = 'index.html';
      }
      return token;
  	}

	function getPlaceIdFromURL() {
        const urlParams = new URLSearchParams(window.location.search);
        const placeId = urlParams.get('place_id');
        return placeId;
    }

    const reviewForm = document.getElementById('review-form');
    const token = checkAuthentication();
    const placeId = getPlaceIdFromURL();

    if (reviewForm) {
        reviewForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            // Get review text from form
            // Make AJAX request to submit review
            // Handle the response
        });
    }

	async function submitReview(token, placeId, reviewText) {
    const response = await fetch(`http://localhost:5000/api/v1/places/${placeId}/reviews`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comment: reviewText })
    });
        handleResponse(response);
    }


	function handleResponse(response) {
    if (response.ok) {
        alert('Review submitted successfully!');
        const reviewInput = document.getElementById('review-text');
        if (reviewInput) reviewInput.value = '';
    } else {
        alert('Failed to submit review');
      }
  	}
});