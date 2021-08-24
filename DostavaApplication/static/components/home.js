Vue.component("home", {
    data: function() {
        return {
            logedInUser: '',
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
					<li v-if="logedInUser == ''" v-on:click="register"><a class="btn" >Prijavi se/Registruj se</a></li>
					<li v-if="logedInUser != ''" style="display:flex;align-items: center;margin-left: 4%;" v-on:click="register"><a class="btn" style="border: 0;padding: 0;">
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
		<div class="white-behind-search">
			<div class="search-restaurants">
				<i class="fa fa-search"></i>
				<input type="text" placeholder="Unesi naziv restorana..">
				<button class="black-btn">Pretraži</button>
			</div>
		</div>
		
		<div class="content">
			<div class="float-left-div" >
				<div >
                    <input v-on:click="showHideFilters()" type="checkbox" id="showFilters" value="showFilters">
                    <label style="margin:0" class="full-radio-btn-label" for="showFilters">Filteri <i class="fa fa-angle-down" aria-hidden="true"></i></label>
                </div>
				<div class="restaurant-types" id="filters" style="visibility: hidden;
				opacity: 0;height:0;
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

        window.addEventListener('resize', function() {
            var b = document.getElementById('filter-btn-do');
            if (b != null && document.body.clientWidth > 900) {
                this.rect = b.getBoundingClientRect();
                document.querySelector('.filter-modal').style.marginRight = $(document).width() - this.rect.right + 'px';
                if (this.rect.width > 175) {
                    document.querySelector('.filter-modal').style.width = this.rect.width + 'px';
                }

            } else if (b != null && document.body.clientWidth <= 900) {

                document.querySelector('.filter-modal').style.width = 550 + 'px';
                document.querySelector('.filter-modal').style.marginRight = 'auto';

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
            if (document.getElementById('filters').style.visibility == 'hidden') {
                document.getElementById('filters').style.visibility = 'visible';
                document.getElementById('filters').style.opacity = '1';
                document.getElementById('filters').style.height = "auto";
            } else {
                document.getElementById('filters').style.visibility = 'hidden';
                document.getElementById('filters').style.opacity = '0';
                document.getElementById('filters').style.height = '0';
            }
        },
        sortRestaurants: function(event) {
            if (event.currentTarget.innerText.includes('Naziv')) {
                if (this.nameSort == '') {
                    document.getElementById('sortByName').innerHTML = '<label>Naziv</label> <i class="fa fa-sort-desc" aria-hidden="true"></i>';
                    this.nameSort = 'desc';
                } else if (this.nameSort == 'desc') {
                    document.getElementById('sortByName').innerHTML = '<label>Naziv</label> <i class="fa fa-sort-asc" aria-hidden="true"></i>';
                    this.nameSort = 'asc';
                } else {
                    document.getElementById('sortByName').innerHTML = '<label>Naziv</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                    this.nameSort = '';
                }

            } else if (event.currentTarget.innerText.includes('Lokacija')) {
                if (this.locationSort == '') {
                    document.getElementById('sortByLocation').innerHTML = '<label>Lokacija</label> <i class="fa fa-sort-desc" aria-hidden="true"></i>';
                    this.locationSort = 'desc';
                } else if (this.locationSort == 'desc') {
                    document.getElementById('sortByLocation').innerHTML = '<label>Lokacija</label> <i class="fa fa-sort-asc" aria-hidden="true"></i>';
                    this.locationSort = 'asc';
                } else {
                    document.getElementById('sortByLocation').innerHTML = '<label>Lokacija</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                    this.locationSort = '';
                }

            } else if (event.currentTarget.innerText.includes('Prosecna ocena')) {
                if (this.ratingSort == '') {
                    document.getElementById('sortByRating').innerHTML = '<label>Prosecna ocena</label> <i class="fa fa-sort-desc" aria-hidden="true"></i>';
                    this.ratingSort = 'desc';
                } else if (this.ratingSort == 'desc') {
                    document.getElementById('sortByRating').innerHTML = '<label>Prosecna ocena</label> <i class="fa fa-sort-asc" aria-hidden="true"></i>';
                    this.ratingSort = 'asc';
                } else {
                    document.getElementById('sortByRating').innerHTML = '<label>Prosecna ocena</label> <i class="fa fa-sort" aria-hidden="true"></i>';
                    this.ratingSort = '';
                }

            }
        }
    }
})