Vue.component("admin-restaurants", {
    data: function() {
        return {
            cuisines: [
                { id: 'American', value: 'Američka' },
                { id: 'Barbecue', value: 'Roštilj' },
                { id: 'Chinese', value: 'Kineska' },
                { id: 'Italian', value: 'Italijanska' },
                { id: 'Mexican', value: 'Meksička' }
            ],
            ratings: [
                { id: '0 to 1', value: '0 - 1' },
                { id: '1 to 2', value: '1 - 2' },
                { id: '2 to 3', value: '2 - 3' },
                { id: '3 to 4', value: '3 - 4' },
                { id: '4 to 5', value: '4 - 5' }
            ],
            restaurants: null,
            searchTextName: '',
            searchTextLocation: '',
            searchResults: '',
            filteredResults: '',
            finalResults: '',
            nameSort: '',
            locationSort: '',
            ratingSort: '',
            question: '',
            selectedRestaurant: '',
            loggedInUser: ''
        }
    },
    created: function() {
        this.getRestaurants();
    },
    template: `
	<div>
		<div class="white-behind-search" id="bigSearch" style="top:191px">
			<div class="search-restaurants">
				<button class="black-btn" style="
                width: 70%;
                margin:0;
                margin-right: 54px;
                white-space: nowrap;"
						v-on:click="newRestaurantClicked"
				>+ Novi restoran</button>

				<div style="display:flex;width:100%">
					<i class="fa fa-search"></i>
					<input style="margin-right:0" type="text" placeholder="Unesi naziv restorana.." id="srchName">
				</div>
				<input type="text" placeholder="Unesi lokaciju restorana.." id="srchLocation">
				<button class="black-btn" style="
                margin:0;" v-on:click="findRestaurants">Pretraži</button>
				
			</div>
		</div>
		<div class="content">
			<div class="float-left-div" name="admin">
				<button class="black-btn" style="    width: 100%;
                                            margin:0;
											font-size: 17px;
											min-height: fit-content;
											margin-bottom: 10%"
							v-on:click="newRestaurantClicked" id="newRestorantSmallView"
					>+ Novi restoran</button>

					<div name="smallSearch">
						<input v-on:click="showHideSearch()" type="checkbox" id="showSearch" value="showSearch">
						<label style="margin:0" class="full-radio-btn-label" for="showSearch">Pretraga <i class="fa fa-search" aria-hidden="true"></i></label>
					</div>
					<div class="search-restaurants" id="smallSearch" name="smallSearch" style="visibility: hidden;
					opacity: 0;height:0;margin:0;
					transition: visibility 0s, opacity 0.5s linear;">

						<input type="text" placeholder="Naziv..">
						<input type="text" placeholder="Lokacija..">
						<button class="black-btn">Pretraži</button>
					</div>
					<div >
						<input v-on:click="showHideFilters()" type="checkbox" id="showFilters" value="showFilters">
						<label style="margin:0" class="full-radio-btn-label" for="showFilters">Filteri <i class="fa fa-angle-down" aria-hidden="true"></i></label>
					</div>
					<div class="restaurant-types" id="filters" style="visibility: hidden;
						opacity: 0;height:0;margin:0;overflow-y:auto;
						transition: visibility 0s, opacity 0.5s linear;">
						<div class="checkbox-btn-container-dark">
							<div>
								<input type="checkbox" id="openRestaurantsFilter" value="openRestaurantsFilter" v-on:change="findRestaurants">
								<label  for="openRestaurantsFilter" style="font-weight:bold">Otvoreni restorani</label>
							</div>
						</div>
						<h2 style="text-align: center;" >Kuhinje</h2>
						<div class="checkbox-btn-container-dark">
							<div v-for="cuisine in cuisines">
								<input type="checkbox" v-bind:id=cuisine.id name="cuisineTypes" v-bind:value=cuisine.id v-on:change="findRestaurants">
								<label  v-bind:for=cuisine.id>{{cuisine.value}}</label>
							</div>
						</div>
						<h2 style="text-align: center;" >Ocene</h2>
						<div class="checkbox-btn-container-dark">
							<div v-for="rating in ratings">
								<input type="checkbox" v-bind:id=rating.id name="stars" v-bind:value=rating.id v-on:change="findRestaurants">
								<label v-bind:for=rating.id>{{rating.value}}</label>
							</div>
						</div>
					</div>

					<div class="restaurant-types">
						<h2 style="text-align: center;" >Sortiraj restorane</h2>
						<div class="sort-div">
								<div style="margin:2%" v-on:click="sortRestaurants">
									<button v-on:click="sortByName" type="radio" id="sort-by-name" name="sort" value="sort-by-name"><label>Naziv</label>
										<i class="fa fa-sort" aria-hidden="true"></i>
									</button>
								</div>
								<div style="margin:2%" v-on:click="sortRestaurants">
									<button type="radio" v-on:click="sortByLocation" id="sort-by-location" name="sort" value="sort-by-location"><label>Lokacija</label>
										<i class="fa fa-sort" aria-hidden="true"></i>
									</button>
								</div>
								<div style="margin:2%" v-on:click="sortRestaurants"> 
									<button v-on:click="sortByRating" type="radio" id="sort-by-rating" name="sort" value="sort-by-rating"><label>Prosečna ocena</label>
										<i class="fa fa-sort" aria-hidden="true"></i>
									</button>
								</div>

						</div>
					</div>
				</div>

			<div class="restaurants">
				<h1> Restorani u ponudi</h1>
				<p></p>

                <a v-for="restaurant in finalResults" v-on:click="openRestaurantPage(restaurant)">
                    <restaurant-card v-bind:key="restaurant.id" style="cursor: pointer;" v-on:askToDelete="askToDelete"
                        v-bind:restaurant="restaurant" v-bind:loggedInRole="loggedInUser.role"></restaurant-card>
                </a>

			</div>
		</div>

		
        <new-restaurant id="newRestaurant"></new-restaurant>
		<success></success>
        <question :question="question" v-on:answer="answer"></question>
	</div>
	`,
    mounted() {
        window.scrollTo(0, 0);

        axios.get("/user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data;
                }
            })

    },

    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        newRestaurantClicked: function(event) {
            document.getElementById('newRestaurant').style.display = 'flex';
        },
        showHideFilters: function(event) {
            let filters = document.getElementById('filters');
            if (filters.style.visibility == 'hidden') {
                filters.style.visibility = 'visible';
                filters.style.opacity = '1';
                filters.style.height = "30vh";
                filters.style.margin = "10% 0";
            } else {
                filters.style.visibility = 'hidden';
                filters.style.opacity = '0';
                filters.style.height = '0';
                filters.style.margin = "0";
            }
        },
        sortRestaurants: function(event) {
            let nameSort = document.getElementById('sort-by-name');
            let locationSort = document.getElementById('sort-by-location');
            let ratingSort = document.getElementById('sort-by-rating');

            if (event.currentTarget.innerText.includes('Naziv')) {
                if (this.nameSort == '') {
                    nameSort.innerHTML = '<label>Naziv</label> <i class="fa fa-sort-desc" aria-hidden="true"></i>';
                    this.nameSort = 'desc';
                } else if (this.nameSort == 'desc') {
                    nameSort.innerHTML = '<label>Naziv</label> <i class="fa fa-sort-asc" aria-hidden="true"></i>';
                    this.nameSort = 'asc';
                } else {
                    nameSort.innerHTML = '<label>Naziv</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                    this.nameSort = '';
                }

                locationSort.innerHTML = '<label>Lokacija</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                this.locationSort = '';
                ratingSort.innerHTML = '<label>Prosečna ocena</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                this.ratingSort = '';

            } else if (event.currentTarget.innerText.includes('Lokacija')) {
                if (this.locationSort == '') {
                    locationSort.innerHTML = '<label>Lokacija</label> <i class="fa fa-sort-desc" aria-hidden="true"></i>';
                    this.locationSort = 'desc';
                } else if (this.locationSort == 'desc') {
                    locationSort.innerHTML = '<label>Lokacija</label> <i class="fa fa-sort-asc" aria-hidden="true"></i>';
                    this.locationSort = 'asc';
                } else {
                    locationSort.innerHTML = '<label>Lokacija</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                    this.locationSort = '';
                }

                nameSort.innerHTML = '<label>Naziv</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                this.nameSort = '';
                ratingSort.innerHTML = '<label>Prosečna ocena</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                this.ratingSort = '';

            } else if (event.currentTarget.innerText.includes('Prosečna ocena')) {
                if (this.ratingSort == '') {
                    ratingSort.innerHTML = '<label>Prosečna ocena</label> <i class="fa fa-sort-desc" aria-hidden="true"></i>';
                    this.ratingSort = 'desc';
                } else if (this.ratingSort == 'desc') {
                    ratingSort.innerHTML = '<label>Prosečna ocena</label> <i class="fa fa-sort-asc" aria-hidden="true"></i>';
                    this.ratingSort = 'asc';
                } else {
                    ratingSort.innerHTML = '<label>Prosečna ocena</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                    this.ratingSort = '';
                }

                nameSort.innerHTML = '<label>Naziv</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                this.nameSort = '';
                locationSort.innerHTML = '<label>Lokacija</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                this.locationSort = '';
            }
        },
        showHideSearch: function(event) {
            let smallSearch = document.getElementById('smallSearch');
            if (smallSearch.style.visibility == 'hidden') {
                smallSearch.style.visibility = 'visible';
                smallSearch.style.opacity = '1';
                smallSearch.style.height = "auto";
                smallSearch.style.margin = "10% 0";
            } else {
                smallSearch.style.visibility = 'hidden';
                smallSearch.style.opacity = '0';
                smallSearch.style.height = '0';
                smallSearch.style.margin = "0";
            }
        },
        openRestaurantPage: function(restaurant) {
            window.location.href = "#/restaurant?id=" + restaurant.restaurantID;
        },
        findRestaurants: function(event) {
            this.searchTextName = document.getElementById('srchName').value
            this.searchTextLocation = document.getElementById('srchLocation').value
            let isNameEntered = true;
            let isLocationEntered = true;
            let resultsForName = [];
            let resultsForLocation = [];

            // SEARCH RESTAURANTS
            if (this.searchTextName != '' && this.searchTextName.trim().lenght != 0) {
                let searchParts = this.searchTextName.trim().split(' ');

                for (restaurant of this.restaurants) {
                    let matches = true;
                    for (let i = 0; i < searchParts.length; i++) {
                        if (!restaurant.name.toUpperCase().includes(searchParts[i].toUpperCase())) {
                            matches = false;
                            break;
                        }
                    }
                    if (matches) {
                        resultsForName.push(restaurant);
                    }
                }

            } else {
                isNameEntered = false;
            }

            if (this.searchTextLocation != '' && this.searchTextLocation.trim().lenght != 0) {
                let searchParts = this.searchTextLocation.trim().split(' ');

                let rests;
                if (!isNameEntered) {
                    rests = this.restaurants;
                } else {
                    rests = resultsForName;
                }

                for (restaurant of rests) {
                    let matches = true;
                    let address = restaurant.location.address;
                    for (let i = 0; i < searchParts.length; i++) {
                        if (!address.city.toUpperCase().includes(searchParts[i].toUpperCase()) &&
                            !address.streetAddress.toUpperCase().includes(searchParts[i].toUpperCase())) {
                            matches = false;
                            break;
                        }
                    }
                    if (matches) {
                        resultsForLocation.push(restaurant);
                    }
                }
            } else {
                isLocationEntered = false;
            }

            if (!isNameEntered && !isLocationEntered) {
                this.searchResults = this.restaurants;
            } else if (isNameEntered && !isLocationEntered) {
                this.searchResults = resultsForName;
            } else {
                this.searchResults = resultsForLocation;
            }


            // FILTER RESTAURANTS
            var cbOpen = document.getElementById('openRestaurantsFilter');
            var cbCuisine = document.getElementsByName('cuisineTypes');
            var cbStars = document.getElementsByName('stars');
            var cbCheckedCuisine = [];
            var cbCheckedStars = [];

            this.filteredResults = this.restaurants;
            filteredByStatus = [];
            filteredByType = [];
            filteredByRating = [];

            // filter by status
            if (cbOpen.checked) {
                for (restaurant of this.restaurants) {
                    if (restaurant.open) {
                        filteredByStatus.push(restaurant);
                    }
                }
            }

            // filter by type
            for (var i = 0; i < cbCuisine.length; i++) {
                if (cbCuisine[i].checked) {
                    cbCheckedCuisine.push(cbCuisine[i].id);
                }
            }

            for (restaurant of this.restaurants) {
                for (cb of cbCheckedCuisine) {
                    if (restaurant.type == cb) {
                        filteredByType.push(restaurant);
                    }
                }
            }

            // filter by rating
            let minRating = '';
            let maxRating = '';
            for (var i = 0; i < cbStars.length; i++) {
                if (cbStars[i].checked) {
                    cbCheckedStars.push(cbStars[i].id);
                }
            }

            for (var i = 0; i < cbCheckedStars.length; i++) {
                minRating = Number((String(cbCheckedStars[i])).charAt(0));
                maxRating = Number((String(cbCheckedStars[i])).charAt((String(cbCheckedStars[i])).length - 1));

                for (restaurant of this.restaurants) {
                    if (restaurant.rating >= minRating && restaurant.rating <= maxRating) {
                        filteredByRating.push(restaurant);
                    }
                }
            }

            if (!(cbCheckedCuisine.length == 0 && !cbOpen.checked && cbCheckedStars.length == 0)) {
                if (cbOpen.checked) {
                    this.filteredResults = filteredByStatus.filter(x => this.filteredResults.includes(x));
                }

                if (cbCheckedCuisine.length != 0) {
                    this.filteredResults = filteredByType.filter(x => this.filteredResults.includes(x));
                }

                if (cbCheckedStars.length != 0) {
                    this.filteredResults = filteredByRating.filter(x => this.filteredResults.includes(x));
                }

                this.filteredResults = [...new Set(this.filteredResults)];
            }

            this.searchResults;
            this.filteredResults;

            this.finalResults = this.searchResults.filter(x => this.filteredResults.includes(x));

        },
        sortByName: function() {
            if (this.nameSort == 'desc') {
                this.finalResults = this.finalResults.sort(function compareFn(a, b) { return a.name.localeCompare(b.name) });
            } else if (this.nameSort == '') {
                this.finalResults = this.finalResults.sort(function compareFn(a, b) { return a.name.localeCompare(b.name) }).reverse();
            }
        },
        sortByLocation: function() {
            restaurantAddresses = [];
            for (restaurant of this.finalResults) {
                streetAndNumber = restaurant.location.address.streetAddress;
                fullAddress = restaurant.location.address.city + ' ' + streetAndNumber.substring(0, streetAndNumber.lastIndexOf(" "));
                streetNumber = streetAndNumber.substring(streetAndNumber.lastIndexOf(" "));

                let restourantAddress = { address: fullAddress, number: streetNumber, id: restaurant.restaurantID };
                restaurantAddresses.push(restourantAddress);
            }

            if (this.locationSort == 'desc') {
                restaurantAddresses = restaurantAddresses.sort(function compareFn(a, b) {
                    return a.address.localeCompare(b.address) || a.number - b.number;
                });

            } else if (this.locationSort == '') {
                restaurantAddresses = restaurantAddresses.sort(function compareFn(a, b) {
                    return a.address.localeCompare(b.address) || a.number - b.number;
                }).reverse();
            }

            notSorted = Array.from(this.finalResults);
            this.finalResults = [];
            for (address of restaurantAddresses) {
                for (restaurant of notSorted) {
                    if (restaurant.restaurantID == address.id) {
                        this.finalResults.push(restaurant)
                    }
                }
            }
        },
        sortByRating: function() {
            if (this.ratingSort == 'desc') {
                this.finalResults = this.finalResults.sort(function compareFn(a, b) { return a.rating - b.rating });
            } else if (this.ratingSort == '') {
                this.finalResults = this.finalResults.sort(function compareFn(a, b) { return a.rating - b.rating }).reverse();
            }
        },
        getRestaurants: function() {
            axios
                .get('/restaurants/getAllRestaurants')
                .then(response => {
                    if (response.data != null) {
                        this.restaurants = response.data;
                        this.finalResults = response.data;
                    }
                });

        },
        askToDelete: function(restaurant) {
            this.question = "Da li ste sigurni da želite da obrišete '" + restaurant.name + "'?";
            document.querySelector("#question").style.display = "flex";
            this.selectedRestaurant = restaurant;
        },
        deleteRestaurant: function() {
            axios
                .delete("/restaurants/" + this.selectedRestaurant.restaurantID)
                .then(response => {
                    if (response.data != null && response.data != "") {
                        this.getRestaurants();
                    }
                })
        },
        answer: function(receivedAnswer) {
            document.querySelector("#question").style.display = "none";
            if (receivedAnswer == 'yes') {
                this.deleteRestaurant();
            }
        }
    }
});