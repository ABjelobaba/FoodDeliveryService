Vue.component("home", {
    data: function() {
        return {
            loggedInUser: '',
            deliveryAddress: '',
            cuisines: [
                { id: 'American', value: 'Američka' },
                { id: 'Barbecue', value: 'Roštilj' },
                { id: 'Chinese', value: 'Kineska' },
                { id: 'Italian', value: 'Italijanska' },
                { id: 'Mexican', value: 'Meksička' }
            ],
            raitings: [
                { id: 'zero-one', value: '0 - 1' },
                { id: 'one-two', value: '1 - 2' },
                { id: 'two-three', value: '2 - 3' },
                { id: 'three-four', value: '3 - 4' },
                { id: 'four-five', value: '4 - 5' }
            ],
            restaurants: null,
            searchTextName: '',
            searchTextLocation: '',
            searchResults: '',
            filteredResults: '',
            finalResults: '',
            nameSort: '',
            locationSort: '',
            ratingSort: ''
        }
    },
    created: function() {
        axios
        .get('/restaurants/getAllRestaurants')
        .then(response => {
            if (response.data != null) {
                this.restaurants = response.data;
                this.finalResults = response.data;
            }
        });

        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data;
                }
            })
    },
    template: `
	<div>
		<div class="navigation-area">
			<ul class="nav-navbar">
				<li><a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a></li>
				<span class="main-nav">
					<li v-if="loggedInUser == '' || loggedInUser == undefined" v-on:click="register"><a class="btn" >Prijavi se/Registruj se</a></li>
					<li v-if="loggedInUser != '' && loggedInUser != undefined" style="display:flex;align-items: center;margin-left: 4%;" v-on:click="viewProfile"><a class="btn" style="border: 0;padding: 0;background-color: transparent;">
						<i class="fa fa-user-circle-o fa-2x"></i></a>
					</li>
				</span>
			</ul>
		</div>

		<div class="home-img">
			<div class="greet">
				<h1>Naruči dostavu!</h1>
				<div class="address">
					<h2>Adresa za dostavu:</h2>
					<div class="search">
						<i class="fa fa-search fa-lg"></i>
						<input style="color: white" v-model="deliveryAddress" type="text">
						<button v-on:click="order" class="log-btn">Pretraži</button>
					</div>
					<label id="addressErr">Knez Mihajlova 7, Beograd</label>
				</div>
			</div>
		</div>
		<div class="white-behind-search" id="bigSearch" >
			<div class="search-restaurants">
				<i class="fa fa-search"></i>
				<input type="text" placeholder="Unesi naziv restorana.." id="srchName">
				<input type="text" placeholder="Unesi lokaciju restorana.." id="srchLocation">
				<button v-on:click="findRestaurants" class="black-btn">Pretraži</button>
			</div>
		</div>
		
		<div class="content">
			<div class="float-left-div" >
				<div name="smallSearch">
                    <input v-on:click="showHideSearch()" type="checkbox" id="showSearch" value="showSearch">
                    <label style="margin:0" class="full-radio-btn-label" for="showSearch">Pretraga <i class="fa fa-search" aria-hidden="true"></i></label>
                </div>
				<div class="search-restaurants" id="smallSearch" name="smallSearch" style="visibility: hidden;
				opacity: 0;height:0; margin:0;
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
						<div v-for="raiting in raitings">
							<input type="checkbox" v-bind:id=raiting.id name="stars" v-bind:value=raiting.id v-on:change="findRestaurants">
							<label v-bind:for=raiting.id>{{raiting.value}}</label>
						</div>
					</div>
				</div>

				<div class="restaurant-types">
					<h2 style="text-align: center;" >Sortiraj restorane</h2>
					<div class="sort-div">
							<div style="margin:2%" v-on:click="sortRestaurants">
								<button type="radio" v-on:click="sortByName" id="sort-by-name" name="sort" value="sort-by-name"><label>Naziv</label>
									<i class="fa fa-sort" aria-hidden="true"></i>
								</button>
							</div>
							<div style="margin:2%" v-on:click="sortRestaurants">
								<button type="radio" v-on:click="sortByLocation" id="sort-by-location" name="sort" value="sort-by-location"><label>Lokacija</label>
									<i class="fa fa-sort" aria-hidden="true"></i>
								</button>
							</div>
							<div style="margin:2%" v-on:click="sortRestaurants"> 
								<button type="radio" id="sort-by-rating" name="sort" value="sort-by-rating"><label>Prosečna ocena</label>
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
                    <restaurant-card v-bind:key="restaurant.id" style="cursor: pointer;"
                        v-bind:restaurant="restaurant"></restaurant-card>
                </a>

			</div>
		</div>

		
		<logIn-register></logIn-register>

	</div>
	`,
    mounted() {
        window.scrollTo(0, 0);

        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data;
                }
            })

        window.addEventListener('resize', function(event) {
            var b = document.getElementById('filter-btn-do');
            var a = document.getElementById('advancedSearch-btn-do');
            if ((b != null || a != null) && document.body.clientWidth > 900) {
                if (b != null && document.querySelector('#filter-div').style.display != 'none' && document.querySelector('#filter-div').style.display != '') {
                    this.rect = b.getBoundingClientRect();
                    document.querySelector('#filter-modal').style.marginRight = $(document).width() - this.rect.right + 'px';
                    document.querySelector('.table-users').style.top = '-' + (document.querySelector('#filter-modal').getBoundingClientRect().height + 10) + 'px';

                    if (this.rect.width > 175) {
                        document.querySelector('#filter-modal').style.width = this.rect.width + 'px';
                    }
                } else {
                    this.rect = a.getBoundingClientRect();
                    document.querySelector('#advancedSearch-modal').style.marginRight = $(document).width() - this.rect.right + 'px';
                    document.querySelector('.table-users').style.top = '-' + (document.querySelector('#advancedSearch-modal').getBoundingClientRect().height + 10) + 'px';

                    if (this.rect.width > 175) {
                        document.querySelector('#advancedSearch-modal').style.width = this.rect.width + 'px';
                    }
                }

            } else if ((b != null || a != null) && document.body.clientWidth <= 900) {

                if (b != null && document.querySelector('#filter-div').style.display != 'none' && document.querySelector('#filter-div').style.display != '') {
                    document.querySelector('#filter-modal').style.width = 550 + 'px';
                    document.querySelector('.table-users').style.top = '-' + (document.querySelector('#filter-modal').getBoundingClientRect().height + 10) + 'px';
                    document.querySelector('#filter-modal').style.marginRight = 'auto';
                } else {
                    document.querySelector('#advancedSearch-modal').style.width = 550 + 'px';
                    document.querySelector('.table-users').style.top = '-' + (document.querySelector('#advancedSearch-modal').getBoundingClientRect().height + 10) + 'px';
                    document.querySelector('#advancedSearch-modal').style.marginRight = 'auto';
                }


            }
        });
    },

    methods: {
        register: function(event) {
            document.querySelector('.register').style.display = 'flex';
        },
        order: function(event) {
            if (this.deliveryAddress.match(/[\p{Letter}\s]+ [0-9]+,[\p{Letter}\s]+/gu)) {

                axios
                    .post('/cart/searchAddress', JSON.stringify(this.deliveryAddress))
                    .then(response => {
                        if (response.data != null && response.data != "") {
                            window.location.href = "#/account?" + this.deliveryAddress;
                        }
                    })
            } else {
                document.getElementById('addressErr').innerHTML = "Adresa mora biti u obliku 'Knez Mihajlova 7, Beograd'!";
                document.getElementById('addressErr').style.color = 'red';
            }
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
        viewProfile: function(event) {
            window.location.href = "#/account/profile";
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
                }
                else {
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
            }
            else {
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

            this.filteredResults = [];

            if (cbOpen.checked) {
                for (restaurant of this.restaurants) {
                    if (restaurant.open) {
                        this.filteredResults.push(restaurant);
                    }
                }
            }

            for (var i = 0; i < cbCuisine.length; i++) {
                if (cbCuisine[i].checked) {
                    cbCheckedCuisine.push(cbCuisine[i].id);
                }
            }

            for (restaurant of this.restaurants) {
                for (cb of cbCheckedCuisine) {
                    if (restaurant.type == cb) {
                        this.filteredResults.push(restaurant);
                    }
                }
            }

            if (cbCheckedCuisine.length != 0 && !cbOpen.checked) {
                this.filteredResults =  [...new Set(this.filteredResults)];
            } else {
                this.filteredResults = this.restaurants;
            }

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

                let restourantAddress = {address: fullAddress, number: streetNumber, id: restaurant.restaurantID};
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
        }
    }
})