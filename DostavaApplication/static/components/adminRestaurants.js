Vue.component("admin-restaurants", {
    data: function() {
        return {

            searchText: '',
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

            ]
        }
    },

    template: `
	<div>
		<div class="white-behind-search" id="bigSearch" style="top:205px">
			<div class="search-restaurants">
				<button class="black-btn" style="
										font-size: 17px;
										min-height: fit-content;
										display: inline-block;
										width: 400px;
										margin-right: 80px;"
						v-on:click="newRestaurantClicked"
				>+ Novi restoran</button>

				<div style="display:flex;width:100%">
					<i class="fa fa-search"></i>
					<input style="margin-right:0" type="text" placeholder="Unesi naziv restorana..">
				</div>
				<input type="text" placeholder="Unesi lokaciju restorana..">
				<button class="black-btn">Pretraži</button>
				
			</div>
		</div>
		<div class="content">
			<div class="float-left-div" name="admin">
				<button class="black-btn" style="
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
						opacity: 0;height:0;margin:0;
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

		
        <new-restaurant id="newRestaurant"></new-restaurant>
		<success></success>
	</div>
	`,
    mounted() {
        window.scrollTo(0, 0);
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
                filters.style.height = "auto";
                filters.style.margin = "10% 0";
            } else {
                filters.style.visibility = 'hidden';
                filters.style.opacity = '0';
                filters.style.height = '0';
                filters.style.margin = "0";
            }
        },
        sortRestaurants: function(event) {
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
                let ratingSort = document.getElementById('sortByLocation');
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
});