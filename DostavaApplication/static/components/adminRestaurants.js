Vue.component("admin-restaurants", {
    data: function() {
        return {
            restaurantName: '',
            street: '',
            houseNumber: '',
            city: '',
            postcode: '',
            latitude: 0,
            longitude: 0,
            searchText: ''
        }
    },

    template: `
	<div>
		<div class="white-behind-search" style="top:181px">
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
					<div class="checkbox-btn-container-dark" >
						<div>
							<input type="checkbox" id="italian" name="cuisine" value="italian">
							<label  for="italian">Italijanska</label>
						</div>
						<div>
							<input type="checkbox" id="chinese" name="cuisine" value="chinese">
							<label  for="chinese">Kineska</label>
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
					<div class="checkbox-btn-container-dark" >
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
			<div class="modal" style="width:500px;">
				<div v-on:click="newRestaurantClose" class="close">+</div>

				<div style="
				display: grid;height: 100%;
				grid-template-rows: auto auto 50px;" class="firstStep">
					<div class="login-title" style="margin: auto 0;">
						<h3 style="color: white; font-weight: bolder;"> KREIRAJTE NOVI RESTORAN </h3>
					</div>
					
					<div style="margin: auto 0px;" >
						<form>
							<input v-model="restaurantName" type="text" class="login-inputs" placeholder="Naziv restorana">
							<label class="error" id="restaurantNameErr" name="labels" display="hidden"> </label>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Logo:</label>
							<input type="file" class="login-inputs" style="margin: 2px auto 2px;" id="inpFile" v-on:change="fileUploaded">
							<label class="error" id="fileErr" name="labels" display="hidden"> </label>

							<div class="image-preview" id="imagePreview">
								<img src="" alt="Image Preview" class="image-preview__image">
								<span class="image-preview__default-text">Image Preview</span>
							</div>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Odaberite tip hrane:</label>
							<div class="radio-btn-container" style="width: 60%;height: 100px;box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.2);">
								<div>
									<input type="radio" id="newItalian" name="cuisine" value="italian">
									<label name="cuisine" class="radio-label" for="newItalian">Italijanska</label>
								</div>
								<div>
									<input type="radio" id="newChinese" name="cuisine" value="chinese">
									<label name="cuisine" class="radio-label" for="newChinese">Kineska</label>
								</div>
								<div>
									<input type="radio" id="newBarbecue" name="cuisine" value="barbecue">
									<label name="cuisine" class="radio-label" for="newBarbecue">Rostilj</label>
								</div>
								<div>
									<input type="radio" id="newAmerican" name="cuisine" value="american">
									<label name="cuisine" class="radio-label" for="newAmerican">Americka hrana</label>
								</div>
								<div>
									<input type="radio" id="newSweets" name="cuisine" value="sweets">
									<label name="cuisine" class="radio-label" for="newSweets">Poslastice</label>
								</div>
							</div>
							<label class="error" id="logoErr" name="labels" display="hidden"> </label>

						</form>
						<br>
						
					</div>
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
				</div>
				
				<div style="display: none;height: 100%;
				grid-template-rows: auto auto 50px;"  class="secondStep">
					
					<div class="login-title">
						<h3 style="color: white; font-weight: bolder;"> {{restaurantName}} </h3>
						<p id="secondErr">Neophodno je odrediti lokaciju restorana popunjavanjem <b><em>svih</em></b> navedenih polja.  
						Polja je moguće popuniti i klikom na željenu lokaciju na mapi.</p>
					</div>
					
					<div style="margin: auto 0px;" >
						<form>
							<input v-model="street" id="street" type="text" class="login-inputs" placeholder="Ulica">
							<input v-model="houseNumber" id="number" type="text" class="login-inputs" placeholder="Broj">
							<input v-model="city" id="city" type="text" class="login-inputs" placeholder="Grad">
							<input v-model="postcode" id="postcode" type="text" class="login-inputs" placeholder="Postanski broj">
							
							<div id="map"></div>

							
						</form>
					</div>
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
				</div>

				<div style="display: none;height: 100%;grid-template-rows: auto auto auto 50px;" class="thirdStep">
					<div class="login-title">
						<h3 style="color: white; font-weight: bolder;"> Menadžer {{restaurantName}}-a </h3>
						<p>Odaberite nadležnog menadžera restora.</p>
					</div>

					<div class="search" style="margin: auto 5%;width:auto;">
							<i class="fa fa-search fa-lg" style="color:white"></i>
							<input style="color: white;margin: 0 0 0 10px;" v-model="searchText" type="text" placeholder="Pretraži po imenu i prezimenu..">
						</div>

					<div style="margin: auto 0px;" >
						<form>
							<div class="radio-btn-container">
								<input type="radio" id="contactChoice1"
									name="contact" value="email">
								<label class="radio-label" for="contactChoice1">Petar Petovic</label>
							
								<input type="radio" id="contactChoice2"
									name="contact" value="phone">
								<label class="radio-label" for="contactChoice2">Nenad Kostic</label>
							
								<input type="radio" id="contactChoice3"
									name="contact" value="mail">
								<label class="radio-label" for="contactChoice3">Milica Lenov</label>
								
							</div>
						</form>
					</div>
					
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
				</div>
			</div>
		</div>

		<div class="registration-success"> 
			<div class="modal" style="height:auto;">
				<div id="checkMark" class="fa"></div>
				<h1 style="color:white">Uspešno kreiran novi restoran!</h1>
			</div>
		</div>
	</div>
	`,
    mounted() {
        window.scrollTo(0, 0);
        const Map = L.map('map').setView([46.392411189814645, 16.270751953125004], 6);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: apiKey
        }).addTo(Map);

        var marker;
        Map.on('click', function(e) {
            var coordinate = e.latlng;
            var lon = coordinate.lng;
            var lat = coordinate.lat;
            simpleReverseGeocoding(lon, lat);
            if (marker != undefined) {
                Map.removeLayer(marker);
            }

            marker = L.marker([lat, lon]).addTo(Map);
        });

        function findPlace() {
            let search = false;
            let query = '?addressdetails=1&q=';
            if (this.city.value) {
                if (this.street.value) {
                    if (this.number.value) {
                        query += this.number.value.trim() + '+';
                    }
                    query += this.street.value.replace(' ', '+').trim() + '%2C+';
                    search = true;
                }
                query += this.city.value.trim();
            }

            query += '&format=json&limit=1&accept-language=sr-Latn';

            if (search) {
                fetch('http://nominatim.openstreetmap.org/' + query).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    if (json.length != 0) {
                        this.city.value = json[0].address.city;
                        if (this.city.value.startsWith('Grad')) {
                            this.city.value = json[0].address.city.substring(5);
                        } else if (this.city.value.startsWith('Opština')) {
                            this.city.value = json[0].address.city.substring(8);
                        } else if (this.city.startsWith('Gradska opština')) {
                            this.city.value = json[0].address.city.substring(16);
                        }

                        if (marker != undefined) {
                            Map.removeLayer(marker);
                        }
                        this.street.value = json[0].address.road;
                        this.postcode.value = json[0].address.postcode;
                        Map.setView([parseInt(json[0].lat) + 0.15, parseInt(json[0].lon) + 0.65], 9);
                        marker = L.marker([json[0].lat, json[0].lon]).addTo(Map);
                    }
                })
            }
        }
        document.getElementById('street').addEventListener('blur', (event) => { findPlace(); });
        document.getElementById('city').addEventListener('blur', (event) => { findPlace(); });
        document.getElementById('number').addEventListener('blur', (event) => { findPlace(); });


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


            //TO-DO: Dodati proveru za sliku da li je dodata i odabrane kategorije hrane

            if (!errors) {
                if (document.querySelector('.firstStep').style.display == 'grid') {
                    if (!this.restaurantName) {
                        document.getElementById('restaurantNameErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate uneti korisničko ime!';
                        errors = true;
                    } else {
                        document.querySelector('.firstStep').style.display = 'none';
                        document.querySelector('.secondStep').style.display = 'grid';
                    }
                } else if (document.querySelector('.secondStep').style.display == 'grid') {
                    if (!this.street || !this.houseNumber || !this.city || !this.postcode) {
                        document.getElementById('secondErr').style.color = 'red';
                    } else {
                        document.querySelector('.secondStep').style.display = 'none';
                        document.querySelector('.thirdStep').style.display = 'grid';
                    }
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

            if (document.querySelector('.secondStep').style.display == 'grid') {
                document.querySelector('.firstStep').style.display = 'grid';
                document.querySelector('.secondStep').style.display = 'none';
            } else {
                document.querySelector('.secondStep').style.display = 'grid';
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
            document.querySelector('.firstStep').style.display = 'grid';
            document.querySelector('.secondStep').style.display = 'none';
            document.querySelector('.thirdStep').style.display = 'none';
        }
    }
});

function simpleReverseGeocoding(lon, lat) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat + '&accept-language=sr-Latn').then(function(response) {
        return response.json();
    }).then(function(json) {
        let street = document.getElementById("street");
        let city = document.getElementById("city");
        let postcode = document.getElementById("postcode");
        let number = document.getElementById("number");

        if (json.address.house_number) {
            number.value = json.address.house_number;
            number.dispatchEvent(new Event('input'));
        } else {
            number.value = '';
            number.dispatchEvent(new Event('input'));
        }

        if (json.address.road) {
            street.value = json.address.road;
            street.dispatchEvent(new Event('input'));
        } else {
            street.value = '';
            street.dispatchEvent(new Event('input'));
        }

        if (json.address.city) {
            city.value = json.address.city;
            if (city.value.startsWith('Grad')) {
                city.value = json.address.city.substring(5);
            } else if (city.value.startsWith('Opština')) {
                city.value = json.address.city.substring(8);
            } else if (city.value.startsWith('Gradska opština')) {
                city.value = json.address.city.substring(16);
            }
            city.dispatchEvent(new Event('input'));
        } else if (json.address.city_district) {
            city.value = json.address.city_district;
            city.dispatchEvent(new Event('input'));
        } else if (json.address.town) {
            city.value = json.address.town;
            city.dispatchEvent(new Event('input'));
        } else {
            city.value = '';
            city.dispatchEvent(new Event('input'));
        }

        if (json.address.postcode) {
            postcode.value = json.address.postcode;
            postcode.dispatchEvent(new Event('input'));
        } else {
            postcode.value = '';
            postcode.dispatchEvent(new Event('input'));
        }
    })
}