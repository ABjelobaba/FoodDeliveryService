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
            dateOfBirth: '',
            mode: "logIn"
        }
    },
    template: `
	<div class="register">
			<div class="modal" style="height: auto">
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
								<option selected disabled>Odaberite pol..</option>
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
});