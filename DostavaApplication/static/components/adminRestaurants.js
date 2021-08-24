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
                { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED', address: 'Jevrejska 11, Novi Sad', rating: 4.32 }

            ]
        }
    },

    template: `
	<div>
		<div class="white-behind-search" style="top:181px">
			<div class="search-restaurants">
				<button class="black-btn" style="
										font-size: 17px;
										min-height: fit-content;
										display: inline-block;
										width: 400px;
										margin-right: 80px;"
						v-on:click="newRestaurantClicked"
				>+ Novi restoran</button>
				
				<i class="fa fa-search"></i>
				<input type="text" placeholder="Unesi naziv restorana..">
				<button class="black-btn">Pretraži</button>
				
			</div>
		</div>
		<div class="content">
        
			<div class="float-left-div" style="top: 276px;margin-top: 0;">
				

				<div class="restaurant-types">
					<h2 style="text-align: center;" >Kuhinje</h2>
					<div class="checkbox-btn-container-dark" style="margin: 20px;font-size: 17px;">
						<div v-for="cuisine in cuisines">
							<input type="checkbox" v-bind:id=cuisine.id name="cuisine" v-bind:value=cuisine.id>
							<label  v-bind:for=cuisine.id>{{cuisine.value}}</label>
						</div>
					</div>
					<h2 style="text-align: center;" >Ocene</h2>
					<div class="checkbox-btn-container-dark" style="margin: 20px;font-size: 17px;">
						<div v-for="raiting in raitings">
							<input type="checkbox" v-bind:id=raiting.id name="stars" v-bind:value=raiting.id>
							<label v-bind:for=raiting.id>{{raiting.value}}</label>
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
        }
    }
});