Vue.component("restaurants", {
    data: function() {
        return {
            gender: 'Odaberite pol..',
            mode: "logIn",
            usernameRegistration: '',
            passwordRegistration: '',
            usernameLogIn: '',
            passwordLogIn: '',
            name: '',
            surname: '',
            dateOfBirth: '',
            deliveryAddress: ''
        }
    },

    template: `
	<div>

		<div class="small-home-img">
			<ul class="small-nav-navbar">
				<li><a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a></li>
				<li style="float:right" v-on:click="register"><a class="btn">Prijavi se/Registruj se</a></li>
			</ul>

            <div class="address-container">
            <div class="entered-address">
                <i class="fa fa-map-marker fa-lg" ></i>
                <label>{{deliveryAddress}}</label>
                </div>
            </div>
		</div>

		<div class="content">
			<div style="margin: 30px; width:30%">
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
				<div class="search">
					<i class="fa fa-search"></i>
					<input type="text" placeholder="Unesi naziv restorana..">
					<button class="black-btn">Pretraži</button>
				</div>
				<h1> Restorani u ponudi</h1>
				<p></p>

				<div class="restaurants-col">
					<img src="images/kfc.jpg">
					<div class="restaurant-info">
						<h3>KFC</h3>
						<p>Piletina, Burgeri, Americka hrana</p>
						<div class="closed-restaurant" style="width: 157px;"><span>Zatvoren objekat</span></div>
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

		<div class="register">
			<div class="modal">
				<div class="tab">
					<button v-on:click="tabClick('logIn')">Uloguj se</button>
					<button v-on:click="tabClick('register')">Registruj se</button>
				</div>
				<div v-on:click="registrationClose" class="close">+</div>

				<div v-if="mode === 'register'">
					<div class="login-title">
						<h3 style="color: white; font-weight: bolder;"> KREIRAJTE VAŠ NALOG </h3>
					</div>
					
					<div style="margin-top: 20px;" >
						<form>
							<input v-model="usernameRegistration" type="text" class="login-inputs" placeholder="Korisničko ime">
							<label class="error" id="usernameErr" name="labels" display="hidden"> </label>
	
							<input v-model="passwordRegistration" type="password" class="login-inputs" placeholder="Lozinka">
							<label class="error" id="passwordErr" name="labels" display="hidden"> </label>
	
							<input v-model="name" type="text" class="login-inputs" placeholder="Ime">
							<label class="error" id="nameErr" name="labels" display="hidden"> </label>
	
							<input v-model="surname" type="text" class="login-inputs" placeholder="Prezime">
							<label class="error" id="surnameErr" name="labels" display="hidden"> </label>
	
							<select v-model="gender" class="login-inputs-select">
								<option hidden>Odaberite pol..</option>
								<option>MUŠKO</option>
								<option>ŽENSKO</option>
							</select>
							<label class="error" id="genderErr" name="labels" display="hidden"> </label>
	
							<label style="color: white;display: block;margin:15px 0 0 0">Datum rođenja:</label>
							<input type="date" class="login-inputs" style="margin-top: 1px;" id="date_input">
							<label class="error" id="dateErr" name="labels" display="hidden"> </label>
	
							<button v-on:click="registerUser" style="margin: 20px 10px" class="log-btn"> Potvrdi</button>
						</form>
					</div>
				</div>

				<div v-if="mode === 'logIn'">
					<div class="login-title">
						<h3 style="color: white; font-weight: bolder;"> PRIJAVITE SE </h3>
					</div>
					
					<div style="margin-top: 20px;" >
						<form>
							<input v-model="usernameLogIn" type="text" class="login-inputs" placeholder="Korisničko ime">
							<label class="error" id="usernameLogInErr" name="labels" display="hidden"> </label>
	
							<input v-model="passwordLogIn" type="password" class="login-inputs" placeholder="Lozinka">
							<label class="error" id="passwordLogInErr" name="labels" display="hidden"> </label>
	
							<button v-on:click="logInUser" style="margin: 20px 10px" class="log-btn"> Potvrdi</button>
						</form>
					</div>
				</div>

				
			</div>
		</div>


	</div>
	`,
    mounted() {
        let query = window.location.href.split('?');
        this.deliveryAddress = query[1].replace('%20', ' ');
        window.scrollTo(0, 0);
    },

    methods: {
        register: function(event) {
            document.querySelector('.register').style.display = 'flex';
            document.querySelector('.register').style.animation = 'ease-in';
        },
        registrationClose: function(event) {
            this.username = '';
            this.password = '';
            this.name = '';
            this.surname = '';
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            document.querySelector('.register').style.display = 'none';
            this.mode = 'logIn';
        },
        registerUser: function(event) {
            event.preventDefault();

            let genderReg;
            if (this.gender === 'MUŠKO') {
                genderReg = 'MALE';
            } else if (this.gender === 'ŽENSKO') {
                genderReg = 'FEMALE';
            }

            if (!this.usernameRegistration) {
                document.getElementById('usernameErr').innerHTML = "Morate uneti korisničko ime!";
            }
            if (!this.passwordRegistration) {
                document.getElementById('passwordErr').innerHTML = "Morate uneti lozinku!";
            }
            if (this.name[0] < 'A' || this.name[0] > 'Z' || !this.name) {
                document.getElementById('nameErr').innerHTML = "Morate uneti ime koje počinje velikim slovom!";
            }
            if (this.surname[0] < 'A' || this.surname[0] > 'Z' || !this.surname) {
                document.getElementById('surnameErr').innerHTML = "Morate uneti prezime koje počinje velikim slovom!";
            }
            if (!genderReg) {
                document.getElementById('genderErr').innerHTML = "Morate izabrati pol!";
            }
            if (!dates) {
                document.getElementById('dateErr').innerHTML = "Morate izabrati datum rođenja!";
            }
        },
        logInUser: function(event) {
            event.preventDefault();
            if (!this.usernameLogIn) {
                document.getElementById('usernameLogInErr').innerHTML = "Morate uneti korisničko ime!";
            }
            if (!this.passwordLogIn) {
                document.getElementById('passwordLogInErr').innerHTML = "Morate uneti lozinku!";
            }
        },
        tabClick: function(tabClicked) {
            if (tabClicked === 'register') {
                this.mode = 'register';
            } else {
                this.mode = 'logIn';
            }

            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
        }
    }
})