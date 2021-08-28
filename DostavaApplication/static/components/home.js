Vue.component("home", {
    data: function() {
        return {
            loggedInUser: '',
            deliveryAddress: '',
            cuisines: [
                { id: 'italian', value: 'Italijanska' },
                { id: 'chinese', value: 'Kineska' },
                { id: 'barbecue', value: 'Rostilj' },
                { id: 'american', value: 'Americka hrana' },
                { id: 'sweets', value: 'Poslastice' }
            ],
            raitings: [
                { id: 'zero-one', value: '0 - 1' },
                { id: 'one-two', value: '1 - 2' },
                { id: 'two-three', value: '2 - 3' },
                { id: 'three-four', value: '3 - 4' },
                { id: 'four-five', value: '4 - 5' }
            ],
            restaurants: [
                { id: 1, img: 'images/kfc.jpg', name: 'KFC', type: 'Americka hrana', status: 'OPENED', address: 'Knez Mihajlova 7, Beograd', rating: 2.55 },
                { id: 2, img: 'images/mcdonalds.png', name: "McDonald's", type: 'Americka hrana', status: 'OPENED', address: 'Zelengorska 27, Subotica', rating: 1.95 },
                { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED', address: 'Jevrejska 11, Novi Sad', rating: 4.32 },
                { id: 4, img: 'images/mcdonalds.png', name: "McDonald's", type: 'Americka hrana', status: 'OPENED', address: 'Zelengorska 27, Subotica', rating: 1.95 },
                { id: 5, img: 'images/mcdonalds.png', name: "McDonald's", type: 'Americka hrana', status: 'OPENED', address: 'Zelengorska 27, Subotica', rating: 1.95 },
                { id: 6, img: 'images/mcdonalds.png', name: "McDonald's", type: 'Americka hrana', status: 'OPENED', address: 'Zelengorska 27, Subotica', rating: 1.95 },
                { id: 7, img: 'images/mcdonalds.png', name: "McDonald's", type: 'Americka hrana', status: 'OPENED', address: 'Zelengorska 27, Subotica', rating: 1.95 },
                { id: 8, img: 'images/mcdonalds.png', name: "McDonald's", type: 'Americka hrana', status: 'OPENED', address: 'Zelengorska 27, Subotica', rating: 1.95 }

            ],
            nameSort: '',
            locationSort: '',
            ratingSort: ''
        }
    },

    template: `
	<div>
		<div class="navigation-area">
			<ul class="nav-navbar">
				<li><a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a></li>
				<span class="main-nav">
					<li v-if="loggedInUser == '' || loggedInUser == undefined" v-on:click="register"><a class="btn" >Prijavi se/Registruj se</a></li>
					<li v-if="loggedInUser != '' && loggedInUser != undefined" style="display:flex;align-items: center;margin-left: 4%;" v-on:click="register"><a class="btn" style="border: 0;padding: 0;">
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
				<input type="text" placeholder="Unesi naziv restorana..">
				<input type="text" placeholder="Unesi lokaciju restorana..">
				<button class="black-btn">Pretraži</button>
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
							<input type="checkbox" id="openRestaurantsFilter" name="cuisine" value="openRestaurantsFilter">
							<label  for="openRestaurantsFilter" style="font-weight:bold">Otvoreni restorani</label>
						</div>
					</div>
					<h2 style="text-align: center;" >Kuhinje</h2>
					<div class="checkbox-btn-container-dark">
						<div v-for="cuisine in cuisines">
							<input type="checkbox" v-bind:id=cuisine.id name="cuisine" v-bind:value=cuisine.id>
							<label  v-bind:for=cuisine.id>{{cuisine.value}}</label>
						</div>
					</div>
					<h2 style="text-align: center;" >Ocene</h2>
					<div class="checkbox-btn-container-dark">
						<div v-for="raiting in raitings">
							<input type="checkbox" v-bind:id=raiting.id name="stars" v-bind:value=raiting.id>
							<label v-bind:for=raiting.id>{{raiting.value}}</label>
						</div>
					</div>
				</div>

				<div class="restaurant-types">
					<h2 style="text-align: center;" >Sortiraj restorane</h2>
					<div class="sort-div">
							<div style="margin:2%" v-on:click="sortRestaurants">
								<button type="radio" id="sortByName" name="sort" value="sortByName"><label>Naziv</label>
									<i class="fa fa-sort" aria-hidden="true"></i>
								</button>
							</div>
							<div style="margin:2%" v-on:click="sortRestaurants">
								<button type="radio" id="sortByLocation" name="sort" value="sortByLocation"><label>Lokacija</label>
									<i class="fa fa-sort" aria-hidden="true"></i>
								</button>
							</div>
							<div style="margin:2%" v-on:click="sortRestaurants"> 
								<button type="radio" id="sortByRating" name="sort" value="sortByRating"><label>Prosecna ocena</label>
									<i class="fa fa-sort" aria-hidden="true"></i>
								</button>
							</div>

					</div>
				</div>
			</div>

			<div class="restaurants">
				<h1> Restorani u ponudi</h1>
				<p></p>

				<restaurant-card v-for="restaurant in restaurants" v-bind:key="restaurant.id" v-bind:restaurant="restaurant"></restaurant-card>

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
                window.location.href = "#/account?" + this.deliveryAddress;
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
            let neki = this.loggedInUser;
            if (event.currentTarget.innerText.includes('Naziv')) {
                let nameSort = document.getElementById('sortByName');
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

            } else if (event.currentTarget.innerText.includes('Lokacija')) {
                let locationSort = document.getElementById('sortByLocation');
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

            } else if (event.currentTarget.innerText.includes('Prosecna ocena')) {
                let ratingSort = document.getElementById('sortByRating');
                if (this.ratingSort == '') {
                    ratingSort.innerHTML = '<label>Prosecna ocena</label> <i class="fa fa-sort-desc" aria-hidden="true"></i>';
                    this.ratingSort = 'desc';
                } else if (this.ratingSort == 'desc') {
                    ratingSort.innerHTML = '<label>Prosecna ocena</label> <i class="fa fa-sort-asc" aria-hidden="true"></i>';
                    this.ratingSort = 'asc';
                } else {
                    ratingSort.innerHTML = '<label>Prosecna ocena</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                    this.ratingSort = '';
                }

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
        }
    }
})