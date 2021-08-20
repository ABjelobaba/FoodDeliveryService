Vue.component("admin-users", {
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
<div>

    <h1 style="text-align: center;">Pregled registrovanih korisnika
    </h1>
    <div class="users-search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Pretraži po imenu, prezimenu ili korisničkom imenu..">

        <button class="filter-btn" v-on:click="filterClicked"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        <button class="new-user-btn" v-on:click="newUserClicked">+ Novi korisnik</button>
    </div>

    <div class="filter-div">
        <div class="filter-modal">
            <div v-on:click="filterClose" class="close-filter">+</div>

            <h2>Uloge</h2>
            <div class="chechbox_types" style="text-align: left;">
                <div>
                    <input type="checkbox" id="manager" name="role" value="manager">
                    <label for="manager">Menadzer</label>
                </div>
                <div>
                    <input type="checkbox" id="customer" name="role" value="customer">
                    <label for="customer">Kupac</label>
                </div>
                <div>
                    <input type="checkbox" id="deliverer" name="role" value="deliverer">
                    <label for="deliverer">Dostavljac</label>
                </div>
                <div>
                    <input type="checkbox" id="admin" name="role" value="admin">
                    <label for="admin">Administrator</label>
                </div>
            </div>

            <h2>Tip kupca</h2>
            <div class="chechbox_types" style="text-align: left;">
                <div>
                    <input type="checkbox" id="gold" name="role" value="gold">
                    <label for="gold">Zlatni</label>
                </div>
                <div>
                    <input type="checkbox" id="silver" name="role" value="silver">
                    <label for="silver">Srebrni</label>
                </div>
                <div>
                    <input type="checkbox" id="bronze" name="role" value="bronze">
                    <label for="bronze">Bronzani</label>
                </div>
            </div>
        </div>


    </div>


    <table class="table-users">
        <thead>
            <tr>
                <th>Uloga</th>
                <th>Ime <i class="fa fa-sort "></i></th>
                <th>Prezime <i class="fa fa-sort"></i></th>
                <th>Korisnicko ime <i class="fa fa-sort"></i></th>
                <th>Broj bodova <i class="fa fa-sort"></i></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
        </tbody>

    </table>

    <div class="register" style="z-index:100">
        <div class="modal" style="height:auto">
        <div v-on:click="newUserClose" class="close">+</div>

        <div >
            <div class="login-title">
                <h3 style="color: white; font-weight: bolder;"> KREIRAJTE NOVOG KORISNIKA </h3>
            </div>
            
            <div style="margin-top: 20px;" >
                <form>
                    <select v-model="role" class="login-inputs-select">
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

    <div class="registration-success"> 
        <div class="modal" style="height:auto">
            <div id="checkMark" class="fa"></div>
            <h1 style="color:white">Korisnik uspešno registrovan!</h1>
        </div>
    </div>
</div>
`,
    mounted() {
        window.scrollTo(0, 0);
        var today = new Date().toISOString().split('T')[0];
        document.getElementById("date_input").setAttribute('max', today);
    },
    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        filterClicked: function(event) {
            if (document.querySelector('.filter-div').style.display == 'none' || document.querySelector('.filter-div').style.display ==
                '') {
                document.querySelector('.filter-div').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-348px';
            } else { this.filterClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        newUserClicked: function(event) {
            document.querySelector('.register').style.display = 'flex';
        },
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
            document.querySelector('.register').style.display = 'none';
        }
    }
})