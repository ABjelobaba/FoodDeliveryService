Vue.component("new-restaurant", {
    data: function() {
        return {
            mode: 'dd',
            searchText: '',
            cuisines: [
                { id: 'American', value: 'Američka' },
                { id: 'Barbecue', value: 'Roštilj' },
                { id: 'Chinese', value: 'Kineska' },
                { id: 'Italian', value: 'Italijanska' },
                { id: 'Mexican', value: 'Meksička' }
            ],
            managers: null,
            restaurantName: '',
            street: '',
            houseNumber: '',
            city: '',
            postcode: '',
            latitude: null,
            longitude: null,
            restaurantType: '',
            restaurantLogo: '',
            restaurantManager: null
        }
    },
    created: function() {
        axios
            .get("/user/getAllFreeManagers")
            .then(response => {
                if (response.data != null) {
                    this.managers = response.data;
                }
            })
    },
    template: `
	<div class="register" style="z-index:100" >
			<div class="modal" style="width:500px;" id="newRestaurantModal">
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
							<label class="error" id="restaurantLogoErr" name="labels" display="hidden"> </label>

							<div class="image-preview" id="imagePreview">
								<img style="max-width: 60%;" src="" alt="Image Preview" class="image-preview__image">
								<span class="image-preview__default-text">Image Preview</span>
							</div>

							<label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Odaberite tip hrane:</label>
							<div class="radio-btn-container" style="width: 60%;height: 100px;box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.2);">
                                <div v-for="cuisine in cuisines">
                                    <input type="radio" v-bind:id=cuisine.id name="cuisine" v-bind:value=cuisine.id>
                                    <label  class="radio-label" name="cuisine" v-bind:for=cuisine.id>{{cuisine.value}}</label>
                                </div>
							</div>
							<label style="margin-top: -8px;" class="error" id="restaurantTypeErr" name="labels" display="hidden"> </label>

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

					<div class="search" style="margin: 1% 10%;width:auto;">
							<i class="fa fa-search fa-lg" style="color:white"></i>
							<input style="color: white;margin: 0 0 0 10px;" v-model="searchText" type="text" placeholder="Pretraži po imenu i prezimenu..">
						</div>

					<div style="margin: auto 0px;" >
                        <button v-on:click="newManager" class="btn" style="margin: auto;width: 80%;right:0">Novi menadzer</button>
						<form>
							<div class="radio-btn-container" >
                                <div v-for="manager in managers">
                                    <input type="radio" v-bind:id="manager.username" name="contact" v-bind:value="manager.username">
                                    <label class="radio-label" v-bind:for="manager.username" v-on:click="selectManager(manager)">{{manager.name}} {{manager.surname}}</label>
                                </div>
                            </div>
						</form>
					</div>
                    <label style="margin-top: -8px;" class="error" id="restaurantManagerErr" name="labels" display="hidden"> </label>

					
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


            <new-user v-if="mode == 'newUser'" v-on:closeRegistration="newUserClose"  v-bind:mode="mode"></new-user>
		</div>
	`,
    mounted() {
        const Map = L.map('map').setView([46.392411189814645, 16.270751953125004], 6);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: apiKey
        }).addTo(Map);

        var marker;
        var ref = this;
        Map.on('click', function(e) {
            var coordinate = e.latlng;
            var lon = coordinate.lng;
            var lat = coordinate.lat;
            simpleReverseGeocoding(lon, lat);
            if (marker != undefined) {
                Map.removeLayer(marker);
            }
            ref.longitude = lon;
            ref.latitude = lat;
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

                        ref.longitude = json[0].lon;
                        ref.latitude = json[0].lat;
                    }
                })
            }
        }
        document.getElementById('street').addEventListener('blur', (event) => { findPlace(); });
        document.getElementById('city').addEventListener('blur', (event) => { findPlace(); });
        document.getElementById('number').addEventListener('blur', (event) => { findPlace(); });


    },

    methods: {
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
        selectManager: function(manager) {
            this.restaurantManager = manager;
        },
        nextStep: function(event) {
            event.preventDefault();

            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }

            let errors = false;

            if (document.querySelector('.firstStep').style.display == 'grid') {
                if (!this.restaurantName) {
                    document.getElementById('restaurantNameErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate uneti naziv restorana!';
                    errors = true;
                } 

                if(document.getElementById("inpFile").value == "") {
                    document.getElementById('restaurantLogoErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate odabrati logo restorana!';
                    errors = true;
                }
                
                if (document.getElementById('Italian').checked) {
                    this.restaurantType = 'Italian';
                } else if (document.getElementById('Chinese').checked) {
                    this.restaurantType = 'Chinese';
                } else if (document.getElementById('Barbecue').checked) {
                    this.restaurantType = 'Barbecue';
                } else if (document.getElementById('Mexican').checked) {
                    this.restaurantType = 'Mexican';
                } else if (document.getElementById('American').checked) {
                    this.restaurantType = 'American';
                } else {
                    document.getElementById('restaurantTypeErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate selektovati tip hrane!';
                    errors = true;
                }
                
                if (!errors) {
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

                if (!this.restaurantManager) {
                    document.getElementById('restaurantManagerErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Restoran mora imati menadžera!';
                    errors = true;
                }
                
                if (!errors) {
                    let restaurantDTO = {
                        name: this.restaurantName,
                        type: this.restaurantType,
                        logo: this.restaurantLogo,
                        longitude: Math.round((this.longitude + Number.EPSILON) * 1000000) / 1000000,
                        latitude: Math.round((this.latitude + Number.EPSILON) * 1000000) / 1000000,
                        streetAddress: this.street + ' ' + this.houseNumber,
                        city: this.city,
                        zipCode: this.postcode
                    }
    
                    axios
                        .post('/restaurants/addRestaurant', JSON.stringify(restaurantDTO))
                        .then(response => {
                            if (response.data != null && response.data != "") {
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

                                newRestaurantID = response.data.restaurantID;

                                let restaurantAssignmentDTO = {
                                    username: this.restaurantManager.username,
                                    RestaurantID: newRestaurantID
                                }
            
                                axios
                                    .post('/user/assignRestaurant', JSON.stringify(restaurantAssignmentDTO))
                                    .then(response => {
                                        if (response.data != null && response.data != "") {
                                            setTimeout(function() {
                                                location.reload();
                                            }, 2000);
                                        }
                                    })

                            }
                        })
                        
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
        },
        newManager: function(event) {
            this.mode = 'newUser'
            document.getElementById('newRestaurantModal').style.backgroundColor = "rgb(75,83,92)"
        },
        newUserClose: function(event) {
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
            this.mode = '';
            document.getElementById('newRestaurantModal').style.backgroundColor = "rgb(44,53,63)"

            axios
                .get("/user/getAllFreeManagers")
                .then(response => {
                    if (response.data != null) {
                        this.managers = response.data;
                    }
                })
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
    });
}