Vue.component("logIn-register", {
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
            dateOfBirth: ''
        }
    },
    template: `
	<div class="register">
			<div class="modal" style="height: auto">
				<div class="tab">
					<button v-on:click="tabClick('logIn')">Prijavi se</button>
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
	
							<input v-model="passwordRegistration" type="password" class="login-inputs" placeholder="Lozinka">
	
							<input v-model="name" type="text" class="login-inputs" placeholder="Ime">
							<label class="error" id="nameErr" name="labels" display="hidden"> </label>
	
							<input v-model="surname" type="text" class="login-inputs" placeholder="Prezime">
							<label class="error" id="surnameErr" name="labels" display="hidden"> </label>
	
							<select v-model="gender" class="login-inputs-select">
								<option selected disabled>Odaberite pol..</option>
								<option>Muško</option>
								<option>Žensko</option>
							</select>
	
							<label style="color: white;display: block;margin:15px 0 0 0">Datum rođenja:</label>
							<input type="date" v-model="dateOfBirth" class="login-inputs" style="margin-top: 1px;" id="date_input">
	
							<button v-on:click="registerUser" style="margin: 20px 10px" class="log-btn"> Potvrdi</button>
							<label class="error" id="emptyFieldsError" name="labels" display="hidden"> </label>
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
							<input v-model="passwordLogIn" type="password" class="login-inputs" placeholder="Lozinka">
	
							<button v-on:click="logInUser" style="margin: 20px 10px" class="log-btn"> Potvrdi</button>
							<label class="error" id="logInErr" name="labels" display="hidden"> </label>
						</form>
					</div>
				</div>

				
			</div>
		</div>
	`,
    methods: {
        registrationClose: function(event) {
            this.username = '';
            this.password = '';
            this.name = '';
            this.surname = '';
            this.gender = 'Odaberite pol..';
            this.dateOfBirth = '';
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            document.querySelector('.register').style.display = 'none';
            this.mode = 'logIn';
        },
        registerUser: function(event) {
            event.preventDefault();

            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }

            let genderEnum;
            if (this.gender === 'Muško') {
                genderEnum = 'Male';
            } else if (this.gender === 'Žensko') {
                genderEnum = 'Female';
            }

            let error = false;
            if (!this.usernameRegistration || !this.passwordRegistration || !genderEnum || !this.dateOfBirth) {
                document.getElementById('emptyFieldsError').innerHTML = "Sva polja moraju biti popunjena!";
                error = true;
            }

            if (this.name[0] < 'A' || this.name[0] > 'Z' || !this.name) {
                document.getElementById('nameErr').innerHTML = "Morate uneti ime koje počinje velikim slovom!";
                error = true;
            }
            if (this.surname[0] < 'A' || this.surname[0] > 'Z' || !this.surname) {
                document.getElementById('surnameErr').innerHTML = "Morate uneti prezime koje počinje velikim slovom!";
                error = true;
            }

            if (!error) {

                let registrationDTO = {
                    name: this.name,
                    surname: this.surname,
                    username: this.usernameRegistration,
                    password: this.passwordRegistration,
                    gender: genderEnum,
                    role: 'Customer'
                }

                axios
                    .post('/user/register', JSON.stringify(registrationDTO))
                    .then(response => {
                        if (response.data == null || response.data == "") {
                            document.getElementById('emptyFieldsError').innerHTML = "Korisničko ime je zauzeto!";
                        } else {
                            window.location.href = "#/account";
                        }
                    })

            }
        },
        logInUser: function(event) {
            event.preventDefault();

            let error = false;
            if (!this.usernameLogIn || !this.passwordLogIn) {
                document.getElementById('logInErr').innerHTML = "Morate popuniti sva polja!";
                error = true;
            }

            if (!error) {
                let logInDTO = {
                    username: this.usernameLogIn,
                    password: this.passwordLogIn
                }

                axios
                    .post('/user/logIn', JSON.stringify(logInDTO))
                    .then(response => {
                        if (response.data == null || response.data == "") {
                            document.getElementById('logInErr').innerHTML = "Neispravno korisničko ime ili lozinka!";
                        } else {
                            window.location.href = "#/account";
                        }
                    })
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
});