Vue.component("admin-users", {
    data: function() {
        return {
            gender: 'Odaberite pol..',
            name: '',
            surname: '',
            username: '',
            password: '',
            role: 'Odaberite ulogu korisnika..',
            dateOfBirth: '',
            roles: [
                { id: 'manager', value: 'Menadžer' },
                { id: 'customer', value: 'Kupac' },
                { id: 'deliverer', value: 'Dostavljač' },
                { id: 'admin', value: 'Administrator' }
            ],
            users: [
                { id: '1', role: 'manager', name: 'Nikolina', surname: 'Stanković', username: 'nikolina_stankovic', points: '-' },
                { id: '2', role: 'deliverer', name: 'Petar', surname: 'Brankov', username: 'petar_brankov', points: '-' },
                { id: '3', role: 'admin', name: 'Darko', surname: 'Horvat', username: 'darko_horvat', points: '-' },
                { id: '4', role: 'bronze', name: 'Ivana', surname: 'Kolar', username: 'ivana_kolar', points: 1784 },
                { id: '5', role: 'silver', name: 'Stefan', surname: 'Vuković', username: 'stefan_vukovic', points: 2564 },
                { id: '6', role: 'gold', name: 'Anita', surname: 'Marić', username: 'anita_maric', points: 5486 }
            ]
        }
    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled registrovanih korisnika
    </h1>
    <div class="users-search">
        <div>
            <i class="fa fa-search"></i>
            <input type="text" style="min-width: 470px" placeholder="Pretraži po imenu, prezimenu ili korisničkom imenu..">
        </div>
        <button class="filter-btn" v-on:click="filterClicked"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        <button class="new-user-btn" v-on:click="newUserClicked">+ Novi korisnik</button>
    </div>

    <div class="filter-div">
        <div class="filter-modal">
            <div v-on:click="filterClose" class="close-filter">+</div>

            <h2>Uloge</h2>
            <div class="checkbox-btn-container-dark" style="text-align: left;">
                <div v-for="role in roles">
                    <input type="checkbox" v-bind:id="role.id" name="role" v-bind:value="role.id">
                    <label v-bind:for="role.id">{{role.value}}</label>
                </div>
            </div>

            <h2>Sumnjiv kupac</h2>
            <div class="checkbox-btn-container-dark" >
                <div>
                    <input type="checkbox" id="yes" name="suspicious" value="yes">
                    <label for="yes">Da</label>
                </div>
                <div>
                    <input type="checkbox" id="no" name="suspicious" value="no">
                    <label for="no">Ne</label>
                </div>
            </div>

            <h2>Tip kupca</h2>
            <div class="checkbox-btn-container-dark" >
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

    <div class="content" style="display:block">
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
                <tr v-for="user in users">
                    <td>
                        <i v-if="user.role == 'manager'" class="fa fa-line-chart fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'deliverer'" class="fa fa-bicycle fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'admin'" class="fa fa-cog fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'gold'" style="color:gold" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'silver'" style="color:silver" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'bronze'" style="color:#cd7f32" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        </td>
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.points}}</td>
                </tr>
            </tbody>

        </table>
    </div>

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

    <success></success>
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
                document.querySelector('.table-users').style.top = '-464px';
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