Vue.component("new-user", {
    props: ['mode'],
    data: function() {
        return {
            gender: '',
            name: '',
            surname: '',
            username: '',
            password: '',
            role: '',
            dateOfBirth: ''
        }
    },
    template: `
	
    <div class="register" style="z-index:100;display:flex">
        <div class="modal" style="height:auto">
            <div v-on:click="$emit('newUserClose')" class="close">+</div>

            <div >
                <div class="login-title">
                    <h3 style="color: white; font-weight: bolder;"> KREIRAJTE NOVOG KORISNIKA </h3>
                </div>
                
                <div style="margin-top: 20px;" >
                    <form>
                        <select v-model="role" class="login-inputs-select" id="selectRole">
                            <option selected disabled value="">Odaberite ulogu korisnika..</option>
                            <option value="Deliverer">Dostavljač</option>
                            <option value="Manager">Menadžer</option>
                        </select>
                        <label class="error" id="roleErr" name="labels" display="hidden"> </label>

                        <input v-model="username" type="text" class="login-inputs" placeholder="Korisničko ime">
                        <label class="error" id="usernameErr" name="labels" display="hidden"> </label>

                        <input v-model="password" type="password" class="login-inputs" placeholder="Lozinka">
                        <label class="error" id="passwordErr" name="labels" display="hidden"> </label>

                        <input v-model="name" type="text" class="login-inputs" placeholder="Ime">
                        <label class="error" id="nameErr" name="labels" display="hidden"> </label>

                        <input v-model="surname" type="text" class="login-inputs" placeholder="Prezime">
                        <label class="error" id="surnameErr" name="labels" display="hidden"> </label>

                        <select v-model="gender" class="login-inputs-select">
                            <option selected disabled value="">Odaberite pol..</option>
                            <option value="Male">Muško</option>
                            <option value="Female">Žensko</option>
                        </select>
                        <label class="error" id="genderErr" name="labels" display="hidden"> </label>

                        <label style="color: white;display: block;margin:15px 0 0 0">Datum rođenja:</label>
                        <input type="date" class="login-inputs" style="margin-top: 1px;" id="date_input" v-model="dateOfBirth" min="1896-01-01">
                        <label class="error" id="dateErr" name="labels" display="hidden"> </label>

                        <button v-on:click="registerUser" style="margin: 20px 10px" class="log-btn"> Potvrdi</button>
                        <label class="error" id="emptyFieldsError" name="labels" display="hidden"> </label>
                    </form>
                </div>
            </div>

        </div>
    </div>
	`,
    mounted() {
        var today = new Date().toISOString().split('T')[0];
        document.getElementById("date_input").setAttribute('max', today);

        if (this.mode == "newUser") {
            this.role = "Manager";
            document.getElementById('selectRole').setAttribute('disabled', true);
        }
    },
    methods: {
        registerUser: function(event) {
            event.preventDefault();

            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }

            let error = false;

            var today = Number(new Date());
            var minDate = Number(new Date(1896, 1, 1, 0, 0, 0, 0));
            var date = Number(new Date(this.dateOfBirth));
            if (minDate <= date && date <= today) {
                //Do nothing
            } else {
                document.getElementById('emptyFieldsError').innerHTML = "Neispravan datum rođenja!";
                error = true;
            }

            if (!this.username || !this.password || this.gender == "" || !this.dateOfBirth || this.role == "") {
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
                    username: this.username,
                    password: this.password,
                    gender: this.gender,
                    birthdate: this.dateOfBirth,
                    role: this.role
                }

                axios
                    .post('/user/register', JSON.stringify(registrationDTO))
                    .then(response => {
                        if (response.data == null || response.data == "") {
                            document.getElementById('emptyFieldsError').innerHTML = "Neuspešna registracija!";
                        } else {
                            this.$emit('newUserRegistered', response.data);
                        }
                    })

            }
        }
    }
});