const countryDropdown = document.getElementById('country');
const stateDropdown = document.getElementById('state');
const cityDropdown = document.getElementById('city');

// Fetch country data from the API
fetch("https://d32sbion19muhj.cloudfront.net/pub/interview/countries")
    .then(response => response.json())
    .then(data => {
        console.log(data); // Log the API response for inspection

        if (data && data.status === "success" && Array.isArray(data.data)) {
            // Proceed to populate the country dropdown
            data.data.forEach(country => {
                const option = document.createElement('option');
                option.value = country.id;
                option.textContent = country.name;
                countryDropdown.appendChild(option);
            });
        } else {
            console.error('Invalid data format for countries:', data);
        }
    })
    .catch(error => console.error('Error fetching countries:', error));





// Event listener for the country dropdown
countryDropdown.addEventListener('change', () => {
    const selectedCountryId = countryDropdown.value;
    stateDropdown.innerHTML = '<option value="" disabled selected>Select State</option>'; // Clear state dropdown
    cityDropdown.innerHTML = '<option value="" disabled selected>Select City</option>'; // Clear city dropdown

    if (selectedCountryId) {
        // Fetch all states
        fetch("https://d32sbion19muhj.cloudfront.net/pub/interview/states")
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the API response for inspection

                if (data && data.status === "success" && Array.isArray(data.data)) {
                    // Create a dictionary to store states by country ID
                    const statesByCountry = {};

                    // Populate the dictionary with states data
                    data.data.forEach(state => {
                        if (!statesByCountry[state.country_id]) {
                            statesByCountry[state.country_id] = [];
                        }
                        statesByCountry[state.country_id].push(state);
                    });

                    // Get the states for the selected country
                    const selectedCountryStates = statesByCountry[selectedCountryId];

                    // Proceed to populate the state dropdown
                    if (selectedCountryStates) {
                        selectedCountryStates.forEach(state => {
                            const option = document.createElement('option');
                            option.value = state.id;
                            option.textContent = state.name;
                            stateDropdown.appendChild(option);
                        });
                    }
                } else {
                    console.error('Invalid data format for states:', data);
                }
            })
            .catch(error => console.error('Error fetching states:', error));
    }
});






// Event listener for the state dropdown
// Event listener for the state dropdown
stateDropdown.addEventListener('change', () => {
    const selectedStateId = stateDropdown.value;
    cityDropdown.innerHTML = '<option value="" disabled selected>Select City</option>'; // Clear city dropdown

    if (selectedStateId) {
        // Fetch all cities
        fetch("https://d32sbion19muhj.cloudfront.net/pub/interview/cities")
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the API response for inspection

                if (data && data.status === "success" && Array.isArray(data.data)) {
                    // Create a dictionary to store cities by state ID
                    const citiesByState = {};

                    // Populate the dictionary with cities data
                    data.data.forEach(city => {
                        if (!citiesByState[city.state_id]) {
                            citiesByState[city.state_id] = [];
                        }
                        citiesByState[city.state_id].push(city);
                    });

                    // Get the cities for the selected state
                    const selectedStateCities = citiesByState[selectedStateId];

                    // Proceed to populate the city dropdown
                    if (selectedStateCities) {
                        selectedStateCities.forEach(city => {
                            const option = document.createElement('option');
                            option.value = city.id;
                            option.textContent = city.name;
                            cityDropdown.appendChild(option);
                        });
                    }
                } else {
                    console.error('Invalid data format for cities:', data);
                }
            })
            .catch(error => console.error('Error fetching cities:', error));
    }
});
