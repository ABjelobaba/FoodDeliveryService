Vue.component("admin-restaurants", {
    data: function() {
        return {
            restaurantName: ""
        }
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

		<div class="register" style="z-index:100">
			<div class="modal">
				<div v-on:click="newRestaurantClose" class="close">+</div>

				<div >
					<div class="login-title">
						<h3 style="color: white; font-weight: bolder;"> KREIRAJTE NOVI RESTORAN </h3>
					</div>
					
					<div style="margin-top: 20px;display:block;" class="firstStep">
						<form>
							<input v-model="restaurantName" type="text" class="login-inputs" placeholder="Naziv restorana">
							<label class="error" id="restaurantNameErr" name="labels" display="hidden"> </label>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Logo:</label>
							<input type="file" class="login-inputs" style="margin: 2px auto 2px;" id="inpFile" v-on:change="fileUploaded">
							<label class="error" id="logoErr" name="labels" display="hidden"> </label>

							<div class="image-preview" id="imagePreview">
								<img src="" alt="Image Preview" class="image-preview__image">
								<span class="image-preview__default-text">Image Preview</span>
							</div>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Odaberite tip hrane:</label>
							<div class="choose-type">
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
							<label class="error" id="logoErr" name="labels" display="hidden"> </label>

							<div class="steps-div">
								<div style="margin-left: 150px;color:white">
									<i class="fa fa-square" aria-hidden="true"></i>
									<i class="fa fa-square-o" aria-hidden="true"></i>
									<i class="fa fa-square-o" aria-hidden="true"></i>
								</div>
								<button v-on:click="nextStep" style="float:right;padding: 10px 20px;margin-top:10px" class="log-btn"> 
									Nastavi<i class="fa fa-chevron-right" style="margin-left: 10px;"></i>
								</button>
							</div>
						</form>
					</div>
					<div style="margin-top: 20px;display: none" class="secondStep">
						<form>
							<input v-model="restaurantName" type="text" class="login-inputs" placeholder="Naziv restorana">
							<label class="error" id="restaurantNameErr" name="labels" display="hidden"> </label>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Logo:</label>
							<input type="file" class="login-inputs" style="margin: 2px auto 2px;" id="inpFile" v-on:change="fileUploaded">
							<label class="error" id="logoErr" name="labels" display="hidden"> </label>

							<div class="image-preview" id="imagePreview">
								<img src="" alt="Image Preview" class="image-preview__image">
								<span class="image-preview__default-text">Image Preview</span>
							</div>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Odaberite tip hrane:</label>
							<div class="choose-type">
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
							<label class="error" id="logoErr" name="labels" display="hidden"> </label>

							<div class="steps-div" style="grid-template-columns: 30% 40% 30%;">
								<button v-on:click="backStep" style="float:right;padding: 10px 20px;margin-top:10px" class="log-btn"> 
								<i class="fa fa-chevron-left" style="margin-right: 10px;"></i>Nazad</i>
								</button>
								<div style="color:white">
									<i class="fa fa-square" aria-hidden="true"></i>
									<i class="fa fa-square" aria-hidden="true"></i>
									<i class="fa fa-square-o" aria-hidden="true"></i>
								</div>
								<button v-on:click="nextStep" style="float:right;padding: 10px 20px;margin-top:10px" class="log-btn"> 
									Nastavi<i class="fa fa-chevron-right" style="margin-left: 10px;"></i>
								</button>
							</div>
						</form>
					</div>
					<div style="margin-top: 20px;display: none" class="thirdStep">
						<form>
							<input v-model="restaurantName" type="text" class="login-inputs" placeholder="Naziv restorana">
							<label class="error" id="restaurantNameErr" name="labels" display="hidden"> </label>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Logo:</label>
							<input type="file" class="login-inputs" style="margin: 2px auto 2px;" id="inpFile" v-on:change="fileUploaded">
							<label class="error" id="logoErr" name="labels" display="hidden"> </label>

							<div class="image-preview" id="imagePreview">
								<img src="" alt="Image Preview" class="image-preview__image">
								<span class="image-preview__default-text">Image Preview</span>
							</div>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Odaberite tip hrane:</label>
							<div class="choose-type">
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
							<label class="error" id="logoErr" name="labels" display="hidden"> </label>

							<div class="steps-div" style="grid-template-columns: 30% 40% 30%;">
								<button v-on:click="backStep" style="float:right;padding: 10px 20px;margin-top:10px" class="log-btn"> 
								<i class="fa fa-chevron-left" style="margin-right: 10px;"></i>Nazad
								</button>
								<div style="color:white">
									<i class="fa fa-square" aria-hidden="true"></i>
									<i class="fa fa-square" aria-hidden="true"></i>
									<i class="fa fa-square" aria-hidden="true"></i>
								</div>
								<button v-on:click="nextStep" style="float:right;padding: 10px 20px;margin-top:10px" class="log-btn"> 
									Gotovo<i class="fa fa-chevron-right" style="margin-left: 10px;"></i>
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>

		<div class="registration-success"> 
			<div class="modal">
				<div id="checkMark" class="fa"></div>
				<h1 style="color:white">Uspešno kreiran novi restoran!</h1>
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
        },
        newRestaurantClicked: function(event) {
            document.querySelector('.register').style.display = 'flex';
        },
        fileUploaded: function(event) {
            let inpFile = document.getElementById("inpFile");
            let imagePreviewContainer = document.getElementById("imagePreview");
            let previewImage = imagePreviewContainer.querySelector(".image-preview__image");
            let previewDefaultText = imagePreviewContainer.querySelector(".image-preview__default-text");

            let file = inpFile.files[0];

            if (file) {
                let reader = new FileReader();

                previewDefaultText.style.display = "none";
                previewImage.style.display = "block";

                reader.addEventListener("load", function() {
                    previewImage.setAttribute("src", this.result);
                });

                reader.readAsDataURL(file);
            } else {
                previewDefaultText.style.display = null;
                previewImage.style.display = null;
                previewImage.setAttribute("src", "");
            }
        },
        nextStep: function(event) {
            event.preventDefault();

            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }

            let errors = false;

            if (!this.restaurantName) {
                document.getElementById('restaurantNameErr').innerHTML = "Morate uneti korisničko ime!";
                errors = true;
            }
            //TO-DO: Dodati proveru za sliku da li je dodata i odabrane kategorije hrane

            if (!errors) {
                if (document.querySelector('.firstStep').style.display == 'block') {
                    document.querySelector('.firstStep').style.display = 'none';
                    document.querySelector('.secondStep').style.display = 'block';
                } else if (document.querySelector('.secondStep').style.display == 'block') {
                    document.querySelector('.secondStep').style.display = 'none';
                    document.querySelector('.thirdStep').style.display = 'block';
                } else {

                    document.querySelector('.register').style.display = 'none';
                    document.querySelector('.registration-success').style.display = 'flex';
                    let checkMark = document.getElementById('checkMark');
                    checkMark.innerHTML = "&#xf10c";

                    setTimeout(function() {
                        checkMark.innerHTML = "&#xf05d";
                    }, 500);

                    setTimeout(function() {
                        document.querySelector('.registration-success').style.display = 'none';
                    }, 1500);
                }

            }


        },
        backStep: function(event) {
            event.preventDefault();

            if (document.querySelector('.secondStep').style.display == 'block') {
                document.querySelector('.firstStep').style.display = 'block';
                document.querySelector('.secondStep').style.display = 'none';
            } else {
                document.querySelector('.secondStep').style.display = 'block';
                document.querySelector('.thirdStep').style.display = 'none';
            }
        },
        newRestaurantClose: function(event) {
            this.role = 'Odaberite ulogu korisnika..';
            this.username = '';
            this.password = '';
            this.name = '';
            this.surname = '';
            this.gender = 'Odaberite pol..';
            $("input[type=date]").val("");
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            document.querySelector('.register').style.display = 'none';
            document.querySelector('.firstStep').style.display = 'block';
            document.querySelector('.secondStep').style.display = 'none';
            document.querySelector('.thirdStep').style.display = 'none';
        }
    }
})