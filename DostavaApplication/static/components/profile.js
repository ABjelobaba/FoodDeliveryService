Vue.component("profile", {
    data: function() {
        return {
            loggedInUser: '',
            oldPassword: '',
            newPassword: ''
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data;
                }
            })
    },
    template: `
<div>

    <div class="content">

        <div class="float-left-div" style="position:relative; top:0;">
            <div class="restaurant-types">
                <img v-if="loggedInUser.category == undefined" class="user-img" src="images/user-img.png" alt="User">
                <img v-else-if="loggedInUser.category.type == 'Gold'" class="user-img" src="images/gold.png" alt="User">
                <img v-else-if="loggedInUser.category.type == 'Silver'" class="user-img" src="images/silver.png" alt="User">
                <img v-else="loggedInUser.category.type == 'Bronze'" class="user-img" src="images/bronze.png" alt="User">
                <h2 style="text-align: center; margin:0">{{loggedInUser.name}} {{loggedInUser.surname}}</h2>
            </div>

            <div class="restaurant-types" v-bind:id="loggedInUser.category.type" v-if="loggedInUser.role == 'Customer'">
                <h3 style="text-align: center; margin:0 0 5% 0">Sakupljeni bodovi</h3>
                <h2 style="text-align: center; margin:0">{{loggedInUser.totalPoints}}</h2>
            </div>
        </div>

        <div style="width:100%">
            <div class="user-info" v-if="loggedInUser.role == 'Customer'">
                <h3>Adresa za dostavu</h3>

                <div class="inputs-div">
                    <input v-model="loggedInUser.deliveryAddress" type="text" class="profile-change-input" style="width:auto" placeholder="Unesi adresu.." >
                    <label class="error" id="nameErr" name="labels" display="hidden"> </label>
                </div>

                <button style=" margin: 20px auto;width:280px" class="black-btn" v-on:click="changeAddress"> Potvrdi</button>

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
                                <option value="Male">MUŠKO</option>
                                <option value="Female">ŽENSKO</option>
                            </select>
                    </div>
                    <div class="inputs-div">
                        <label class="input-label">Datum rođenja:</label>
                        <input v-model="loggedInUser.birthdate" type="date" class="profile-change-input" style="margin-top: 1px;" id="date_input">
                    </div>

                    
                </form>
                <label class="error" id="userDataErr" name="labels" display="hidden"> </label>
                <button style=" margin: 20px auto;width:280px" class="black-btn" v-on:click="editProfile"> Potvrdi</button>

            </div>

            <div class="user-info">
                <h3>Promena lozinke</h3>
                <form>

                    <div class="inputs-div">
                        <label class="input-label">Trenutna lozinka:</label>
                        <input v-model="oldPassword" type="password" class="profile-change-input" placeholder="Lozinka">
                    </div>

                    <div class="inputs-div">
                        <label class="input-label">Nova lozinka:</label>
                        <input v-model="newPassword" type="password" class="profile-change-input" placeholder="Lozinka">
                    </div>

                </form>
                <label class="error" id="passwordErr" name="labels" display="hidden"> </label>
                <button style="margin: 20px auto;width:280px" class="black-btn" v-on:click="changePassword"> Potvrdi</button>
            </div>

        </div>
    </div>
    <success :text="'Uspešna izmena vaših podataka!'" id="dataSuccess"></success>
    <success :text="'Uspešna izmena lozinke!'" id="passwordSuccess"></success>
</div>
`,
    mounted() {
        window.scrollTo(0, 0);
    },
    methods: {
        editProfile: function(event) {
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }

            let error = false;
            if (this.loggedInUser.name[0] < 'A' || this.loggedInUser.name[0] > 'Z' || !this.loggedInUser.name) {
                document.getElementById('nameErr').innerHTML = "Morate uneti ime koje počinje velikim slovom!";
                error = true;
            }
            if (this.loggedInUser.surname[0] < 'A' || this.loggedInUser.surname[0] > 'Z' || !this.loggedInUser.surname) {
                document.getElementById('surnameErr').innerHTML = "Morate uneti prezime koje počinje velikim slovom!";
                error = true;
            }

            if (!error) {
                this.loggedInUser.type = this.loggedInUser.role;
                axios
                    .put("/user/editProfile", JSON.stringify(this.loggedInUser))
                    .then(response => {
                        if (response.data != null && response.data != "") {
                            document.querySelector('#dataSuccess').style.display = 'flex';
                            let checkMark = document.querySelector('#dataSuccess #checkMark');
                            checkMark.innerHTML = "&#xf10c";

                            setTimeout(function() {
                                checkMark.innerHTML = "&#xf05d";
                            }, 500);

                            setTimeout(function() {
                                document.querySelector('#dataSuccess').style.display = 'none ';
                            }, 1500);
                        } else {
                            this.oldPassword = '';
                            this.newPassword = '';
                            document.getElementById('userDataErr').innerHTML = "Neuspešna izmena podataka!";
                        }
                    })
            }

        },
        changePassword: function(event) {
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            axios
                .put("/user/changePassword", JSON.stringify({ oldPassword: this.oldPassword, newPassword: this.newPassword }))
                .then(response => {
                    if (response.data != null && response.data != "") {
                        this.oldPassword = '';
                        this.newPassword = '';

                        document.querySelector('#passwordSuccess').style.display = 'flex';
                        let checkMark = document.querySelector('#passwordSuccess #checkMark');
                        checkMark.innerHTML = "&#xf10c";

                        setTimeout(function() {
                            checkMark.innerHTML = "&#xf05d";
                        }, 500);

                        setTimeout(function() {
                            document.querySelector('#passwordSuccess').style.display = 'none';
                        }, 1500);
                    } else {
                        this.oldPassword = '';
                        this.newPassword = '';
                        document.getElementById('passwordErr').innerHTML = "Neuspešna izmena lozinke!";
                    }
                })
        },
        changeAddress: function() {
            this.loggedInUser.type = this.loggedInUser.role;
            axios
                .put("/user/editProfile", JSON.stringify(this.loggedInUser))
                .then(response => {
                    if (response.data != null && response.data != "") {
                        document.querySelector('#dataSuccess').style.display = 'flex';
                        let checkMark = document.querySelector('#dataSuccess #checkMark');
                        checkMark.innerHTML = "&#xf10c";

                        setTimeout(function() {
                            checkMark.innerHTML = "&#xf05d";
                        }, 500);

                        setTimeout(function() {
                            document.querySelector('#dataSuccess').style.display = 'none ';
                        }, 1500);
                    } else {
                        this.oldPassword = '';
                        this.newPassword = '';
                        document.getElementById('userDataErr').innerHTML = "Neuspešna izmena podataka!";
                    }
                })
        }
    }
})