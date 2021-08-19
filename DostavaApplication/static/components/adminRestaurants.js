Vue.component("admin-restaurants", {
    data: function() {
        return {}
    },

    template: `
	<div>
		<div class="white-behind-search" style="top:166px">
			<div class="search-restaurants">
				<button class="black-btn" style="
				font-size: 17px;
				height: 40px;
				display: inline-block;
				width: 400px;
				margin-right: 80px;">+ Novi restoran</button>
				<i class="fa fa-search"></i>
				<input type="text" placeholder="Unesi naziv restorana..">
				<button class="black-btn">Pretraži</button>
				
			</div>
		</div>
		<div class="content">
        
			<div class="float-left-div" style="top: 276px;margin-top: 0;">
				

				<div class="restaurant-types">
					<h2 style="text-align: center;" >Kuhinje</h2>
					<div class="chechbox_types">
						<div>
							<input type="checkbox" id="italian" name="cuisine" value="italian">
							<label for="italian">Italijanska</label>
						</div>
						<div>
							<input type="checkbox" id="chinese" name="cuisine" value="chinese">
							<label for="chinese">Kineska</label>
						</div>
						<div>
							<input type="checkbox" id="barbecue" name="cuisine" value="barbecue">
							<label for="barbecue">Rostilj</label>
						</div>
						<div>
							<input type="checkbox" id="american" name="cuisine" value="american">
							<label for="american">Americka hrana</label>
						</div>
						<div>
							<input type="checkbox" id="sweets" name="cuisine" value="sweets">
							<label for="sweets">Poslastice</label>
						</div>
					</div>
					<h2 style="text-align: center;" >Ocene</h2>
					<div class="chechbox_types">
						<div>
							<input type="checkbox" id="one" name="stars" value="one">
							<label for="one">1</label>
						</div>
						<div>
							<input type="checkbox" id="two" name="stars" value="two">
							<label for="two">2</label>
						</div>
						<div>
							<input type="checkbox" id="three" name="stars" value="three">
							<label for="three">3</label>
						</div>
						<div>
							<input type="checkbox" id="four" name="stars" value="four">
							<label for="four">4</label>
						</div>
						<div>
							<input type="checkbox" id="five" name="stars" value="five">
							<label for="five">5</label>
						</div>
					</div>
				</div>
			</div>

			<div class="restaurants">
				<h1> Restorani u ponudi</h1>
				<p></p>

				<div class="restaurants-col">
					<img src="images/kfc.jpg">
					<div class="restaurant-info">
						<h3>KFC</h3>
						<p>Piletina, Burgeri, Americka hrana</p>
						<div class="closed-restaurant"><span>Zatvoren objekat</span></div>
					</div>

				</div>
				<div class="restaurants-col">
					<img src="images/mcdonalds.png">
					<div class="restaurant-info">
						<h3>McDonald's</h3>
						<p>Burgeri, Americka hrana, Poslastice</p>
					</div>
				</div>
				<div class="restaurants-col">
					<img src="images/burgerhouse.jpg">
					<div class="restaurant-info">
						<h3>Burger House</h3>
						<p>Burgeri, Americka hrana, Rostilj</p>
					</div>
				</div>
				<div class="restaurants-col">

					<img src="images/burgerhouse.jpg">
					<div class="restaurant-info">
						<h3>Burger House</h3>
						<p>Burgeri, Americka hrana, Rostilj</p>
					</div>
				</div>
				<div class="restaurants-col">

					<img src="images/burgerhouse.jpg">
					<div class="restaurant-info">
						<h3>Burger House</h3>
						<p>Burgeri, Americka hrana, Rostilj</p>
					</div>
				</div>
				<div class="restaurants-col">

					<img src="images/burgerhouse.jpg">
					<div class="restaurant-info">
						<h3>Burger House</h3>
						<p>Burgeri, Americka hrana, Rostilj</p>
					</div>
				</div>

			</div>
		</div>
	</div>
	`,
    mounted() {
        window.scrollTo(0, 0);
    },

    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        }
    }
})