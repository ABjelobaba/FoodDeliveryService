Vue.component("admin-profile", {
    data: function() {
        return {
            name: 'Lea',
            surname: 'Kalmar',
            username: 'lea_kalmar',
            gender: 'ŽENSKO',
            oldPassword: '',
            newPassword: ''
        }
    },
    template: `
<div>

    <div class="content">

        <div class="left-side-div">
            <div class="restaurant-types">
                <img class="user-img" src="images/user-img.png">
                <h2 style="text-align: center; margin:0">Lea Kalmar</h2>
            </div>
        </div>

        <div style="width:100%">
            <div class="user-info">
                <h3>Vaši podaci</h3>
                <form>

                    <div class="inputs-div">
                        <label class="input-label">Ime:</label>
                        <input v-model="name" type="text" class="profile-change-input">
                        <label class="error" id="nameErr" name="labels" display="hidden"> </label>
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Prezime:</label>
                        <input v-model="surname" type="text" class="profile-change-input" placeholder="Prezime">
                        <label class="error" id="surnameErr" name="labels" display="hidden"> </label>
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Korisnicko ime:</label>
                        <input disabled v-model="username" type="text" class="profile-change-disabled" placeholder="Korisničko ime">
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Pol:</label>
                        <select v-model="gender" class="profile-change-select">
                                <option hidden>Odaberite pol..</option>
                                <option>MUŠKO</option>
                                <option>ŽENSKO</option>
                            </select>
                        <label class="error" id="genderErr" name="labels" display="hidden"> </label>
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Datum rođenja:</label>
                        <input type="date" class="profile-change-input" style="margin-top: 1px;" id="date_input">
                        <label class="error" id="dateErr" name="labels" display="hidden"> </label>
                    </div>

                    <button style=" margin: 20px 10px 10px 50px;width:280px" class="black-btn"> Potvrdi</button>
                </form>

            </div>

            <div class="user-info">
                <h3>Promena lozinke</h3>
                <form>

                    <div class="inputs-div">
                        <label class="input-label">Trenutna lozinka:</label>
                        <input v-model="oldPassword" type="password" class="profile-change-input" placeholder="Lozinka">
                        <label class="error" id="passwordErr" name="labels" display="hidden"> </label>
                    </div>

                    <div class="inputs-div">
                        <label class="input-label">Nova lozinka:</label>
                        <input v-model="newPassword" type="password" class="profile-change-input" placeholder="Lozinka">
                        <label class="error" id="passwordErr" name="labels" display="hidden"> </label>
                    </div>

                    <label style="display: block;margin:15px 0 0 50px;;color:grey">Vaša lozinka mora biti 
                        najmanje 8 znakova <br>duga  i sadržati najmanje jedan broj, jedno <br> veliko i jedno malo slovo.</label>


                    <button style="margin: 20px 10px 10px 50px;width:280px" class="black-btn"> Potvrdi</button>
                </form>
            </div>

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
        }
    }
})