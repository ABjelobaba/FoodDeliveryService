Vue.component("new-user", {
    props: ['mode'],
    data: function() {
        return {
            gender: 'Odaberite pol..',
            name: '',
            surname: '',
            username: '',
            password: '',
            role: 'Odaberite ulogu korisnika..',
            dateOfBirth: ''
        }
    },
    template: `
	
    <div class="register" style="z-index:100;display:flex">
        <div class="modal" style="height:auto">
            <div v-on:click="$emit('closeRegistration')" class="close">+</div>

            <div >
                <div class="login-title">
                    <h3 style="color: white; font-weight: bolder;"> KREIRAJTE NOVOG KORISNIKA </h3>
                </div>
                
                <div style="margin-top: 20px;" >
                    <form>
                        <select v-model="role" class="login-inputs-select" id="selectRole">
                            <option selected disabled>Odaberite ulogu korisnika..</option>
                            <option value="deliverer">Dostavljač</option>
                            <option value="manager">Menadžer</option>
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
                            <option selected disabled>Odaberite pol..</option>
                            <option value="male">Muško</option>
                            <option value="female">Žensko</option>
                        </select>
                        <label class="error" id="genderErr" name="labels" display="hidden"> </label>

                        <label style="color: white;display: block;margin:15px 0 0 0">Datum rođenja:</label>
                        <input type="date" class="login-inputs" style="margin-top: 1px;" id="date_input" v-model="dateOfBirth" min="1896-01-01">
                        <label class="error" id="dateErr" name="labels" display="hidden"> </label>

                        <button v-on:click="registerUser" style="margin: 20px 10px" class="log-btn"> Potvrdi</button>
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
            this.role = "manager";
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

            let errors = false;

            if (this.role === 'Odaberite ulogu korisnika..') {
                document.getElementById('roleErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate odabrati ulogu!';
                errors = true;
            }
            if (!this.username) {
                document.getElementById('usernameErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate uneti korisničko ime!';
                errors = true;
            }
            if (!this.password) {
                document.getElementById('passwordErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate uneti lozinku!';
                errors = true;
            }
            if (this.gender === 'Odaberite pol..') {
                document.getElementById('genderErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate izabrati pol!';
                errors = true;
            }

            if (this.dateOfBirth > new Date()) {
                document.getElementById('dateErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate izabrati datum rođenja!';
                errors = true;
            }

            if (!errors) {
                document.querySelector('.register').style.display = 'none';
                document.querySelector('.registration-success').style.display = 'flex';
                let checkMark = document.getElementById('checkMark');
                checkMark.innerHTML = "&#xf10c";

                setTimeout(function() {
                    checkMark.innerHTML = "&#xf05d";
                }, 500);

                setTimeout(function() {
                    document.querySelector('.registration-success').style.display = 'none';
                }, 1100);
            }


        }
    }
});