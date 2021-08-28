Vue.component("profile", {
    data: function() {
        return {
            loggedInUser: {
                name: 'Lea',
                surname: 'Kalmar',
                username: 'lea_kalmar',
                gender: 'ŽENSKO',
                medal: 'bronze',
                birthDate: "1999-04-23",
                role: 'user',
                points: 3456,
                address: 'Zelengorska 27, Subotica'
            },
            oldPassword: '',
            newPassword: ''
        }
    },
    template: `
<div>

    <div class="content">

        <div class="float-left-div" style="position:relative; top:0;">
            <div class="restaurant-types">
                <img v-if="loggedInUser.medal == 'gold'" class="user-img" src="images/gold.png" alt="User">
                <img v-if="loggedInUser.medal == 'silver'" class="user-img" src="images/silver.png" alt="User">
                <img v-if="loggedInUser.medal == 'bronze'" class="user-img" src="images/bronze.png" alt="User">
                <h2 style="text-align: center; margin:0">{{loggedInUser.name}} {{loggedInUser.surname}}</h2>
            </div>

            <div class="restaurant-types" v-bind:id="loggedInUser.medal">
                <h3 style="text-align: center; margin:0 0 5% 0">Sakupljeni bodovi</h3>
                <h2 style="text-align: center; margin:0">{{loggedInUser.points}}</h2>
            </div>
        </div>

        <div style="width:100%">
            <div class="user-info">
                <h3>Adresa za dostavu</h3>
                <form>
                    <div class="inputs-div">
                        <input v-model="loggedInUser.address" type="text" class="profile-change-input" style="width:auto" >
                        <label class="error" id="nameErr" name="labels" display="hidden"> </label>
                    </div>

                    <button style=" margin: 20px auto;width:280px" class="black-btn"> Potvrdi</button>
                </form>

            </div>

            <div class="user-info">
                <h3>Vaši podaci</h3>
                <form>

                    <div class="inputs-div">
                        <label class="input-label">Ime:</label>
                        <input v-model="loggedInUser.name" type="text" class="profile-change-input" >
                        <label class="error" id="nameErr" name="labels" display="hidden"> </label>
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Prezime:</label>
                        <input v-model="loggedInUser.surname" type="text" class="profile-change-input" placeholder="Prezime">
                        <label class="error" id="surnameErr" name="labels" display="hidden"> </label>
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Korisnicko ime:</label>
                        <input disabled v-model="loggedInUser.username" type="text" class="profile-change-disabled" placeholder="Korisničko ime">
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Pol:</label>
                        <select v-model="loggedInUser.gender" class="profile-change-select">
                                <option hidden>Odaberite pol..</option>
                                <option>MUŠKO</option>
                                <option>ŽENSKO</option>
                            </select>
                        <label class="error" id="genderErr" name="labels" display="hidden"> </label>
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Datum rođenja:</label>
                        <input v-model="loggedInUser.birthDate" type="date" class="profile-change-input" style="margin-top: 1px;" id="date_input">
                        <label class="error" id="dateErr" name="labels" display="hidden"> </label>
                    </div>

                    <button style=" margin: 20px auto;width:280px" class="black-btn"> Potvrdi</button>
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

                    <label style="display: block;margin: 20px auto;color:grey">Vaša lozinka mora biti 
                        najmanje 8 znakova <br>duga  i sadržati najmanje jedan broj, jedno <br> veliko i jedno malo slovo.</label>


                    <button style="margin: 20px auto;width:280px" class="black-btn"> Potvrdi</button>
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