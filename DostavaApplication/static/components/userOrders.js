Vue.component("user-orders", {
    data: function() {
        return {
            gender: 'Odaberite pol..',
            name: '',
            surname: '',
            username: '',
            password: '',
            role: 'Odaberite ulogu korisnika..',
            dateOfBirth: '',
            currentRestaurant: [],
            article: '',
            order: ''
        }
    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled vaših porudžbina
    </h1>
    <div class="users-search">
        <i class="fa fa-search"></i>
        <input type="text" placeholder="Pretraži po nazivu restorana..">

        <button class="filter-btn" v-on:click="filterClicked"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
    </div>

    <div class="filter-div" style="top:250px">
        <div class="filter-modal">
            <div v-on:click="filterClose" class="close-filter">+</div>

            <h2>Status porudžbine</h2>
            <div class="chechbox_types" style="text-align: left;">
                <div>
                    <input type="checkbox" id="processing" name="orderStatus" value="processing">
                    <label for="processing">Obrada</label>
                </div>
                <div>
                    <input type="checkbox" id="prep" name="orderStatus" value="prep">
                    <label for="prep">U pripremi</label>
                </div>
                <div>
                    <input type="checkbox" id="waitinDeliverer" name="orderStatus" value="waitinDeliverer">
                    <label for="waitinDeliverer">Čeka dostavljača</label>
                </div>
                <div>
                    <input type="checkbox" id="transporting" name="orderStatus" value="transporting">
                    <label for="transporting">U transportu</label>
                </div>
                <div>
                    <input type="checkbox" id="finished" name="orderStatus" value="finished">
                    <label for="finished">Dostavljena</label>
                </div>
                <div>
                    <input type="checkbox" id="canceled" name="orderStatus" value="canceled">
                    <label for="canceled">Otkazana</label>
                </div>
            </div>
            <h2>Status porudžbine</h2>
            <div class="chechbox_types" style="text-align: left;">
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
        </div>


    </div>

    <div class="content" style="display:block" >
        <table class="table-users" name="orders">
            <thead>
                <tr>
                    <th>Datum <i class="fa fa-sort "></i></th>
                    <th>Restoran <i class="fa fa-sort "></i></th>
                    <th>Cena <i class="fa fa-sort"></i></th>
                    <th>Status <i class="fa fa-sort"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr v-on:click="showOrder">
                    <td>21.08.2021.</td>
                    <td>
                        <div class="order-restaurant">
                            <img src="images/burgerhouse.jpg">
                            <label>Burger House</label>
                        </div>
                    </td>
                    <td>1235.00 RSD</td>
                    <td><i class="fa fa-ban" aria-hidden="true"></i> Otkazana </td>
                </tr>
                <tr>
                    <td>17.08.2021.</td>
                    <td>
                        <div class="order-restaurant">
                            <img src="images/kfc.jpg">
                            <label>KFC</label>
                        </div>
                    </td>
                    <td>1200.00 RSD</td>
                    <td><i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena</td>
                </tr>
                <tr>
                    <td>11.07.2021.</td>
                    <td>
                        <div class="order-restaurant">
                            <img src="images/mcdonalds.png">
                            <label>McDonald's</label>
                        </div>
                    </td>
                    <td>3590.00 RSD</td>
                    <td><i class="fa fa-bicycle" aria-hidden="true"></i> U transportu</td>
                </tr>
                <tr>
                    <td>05.06.2021.</td>
                    <td>
                        <div class="order-restaurant">
                            <img src="images/burgerhouse.jpg">
                            <label>Burger House</label>
                        </div>
                    </td>
                    <td>560.00 RSD</td>
                    <td><i class="fa fa-spinner" aria-hidden="true"></i> Obrada</td>
                </tr>
                <tr>
                    <td>20.04.2021.</td>
                    <td>
                        <div class="order-restaurant">
                            <img src="images/burgerhouse.jpg">
                            <label>Burger House</label>
                        </div>
                    </td>
                    <td>1200.00 RSD</td>
                    <td><i class="fa fa-spinner" aria-hidden="true"></i> Ceka dostavljaca</td>
                </tr>
                <tr>
                    <td>15.03.2021.</td>
                    <td>
                        <div class="order-restaurant">
                            <img src="images/burgerhouse.jpg">
                            <label>Burger House</label>
                        </div>
                    </td>
                    <td>2560.00 RSD</td>
                    <td><i class="fa fa-cutlery" aria-hidden="true"></i> U pripremi</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="register" style="z-index:100">
        <div class="modal">
        <div v-on:click="newUserClose" class="close">+</div>

        <div >
            <div class="order-articles" style="margin: 5% 0;">
                <div style="text-align:left;margin-left:15%">
                    <h3 style="color: white; font-weight: bolder;margin:auto"> {{order.restaurantName}} KFC </h3>
                    <p style="color: white; font-weight: bolder;margin:auto"> {{order.date}} 21.08.2021. </p>
                </div>
                <div class="order-status" style="text-align:right;margin-right:15%">
                    <p><i aria-hidden="true" class="fa fa-ban"></i> Otkazana</p>
                    
                </div>
            </div>
            
            <div style="margin-top: 20px;" >
                <div class="restaurants-col" style="background-color:transparent;margin: 2% 15%;justify-content: space-between;">
                    <img src="images/kfc.jpg" style="height: fit-content;">
                    <h3 style="width: -webkit-fill-available;color:white;margin-left:5%">{{article.name}} Burger </h3>
                    <h3 style="width: -webkit-fill-available;color:white;text-align:right">x1 {{article.quantity}}</h3>
                </div>
                <div class="restaurants-col" style="background-color:transparent;margin: 2% 15%;justify-content: space-between;">
                    <img src="images/kfc.jpg" style="height: fit-content;">
                    <h3 style="width: -webkit-fill-available;color:white;margin-left:5%">{{article.name}} Burger </h3>
                    <h3 style="width: -webkit-fill-available;color:white;text-align:right">x1 {{article.quantity}}</h3>
                </div>
                <div class="restaurants-col" style="background-color:transparent;margin: 2% 15%;justify-content: space-between;">
                    <img src="images/kfc.jpg" style="height: fit-content;">
                    <h3 style="width: -webkit-fill-available;color:white;margin-left:5%">{{article.name}} Burger </h3>
                    <h3 style="width: -webkit-fill-available;color:white;text-align:right">x1 {{article.quantity}}</h3>
                </div>

                <div style="border:1px solid white;margin: 5% 15% 2%" ></div>
                <p style="color:white;font-weight:bold;float:right;margin:0 15% 0 0">{{order.sum}} = 1235.00 RSD</p>
                <button disabled v-on:click="registerUser" style="margin: 20px 15%;width: -webkit-fill-available;" class="cancle-btn"> Otkazi</button>
            </div>
        </div>

        </div>
    </div>

    <div class="registration-success"> 
        <div class="modal">
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
                document.querySelector('.table-users').style.top = '-404px';
            } else { this.filterClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        showOrder: function(event) {
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
                document.getElementById('roleErr').innerHTML = "Morate odabrati ulogu!";
                errors = true;
            }
            if (!this.username) {
                document.getElementById('usernameErr').innerHTML = "Morate uneti korisničko ime!";
                errors = true;
            }
            if (!this.password) {
                document.getElementById('passwordErr').innerHTML = "Morate uneti lozinku!";
                errors = true;
            }
            if (this.name[0] < 'A' || this.name[0] > 'Z' || !this.name) {
                document.getElementById('nameErr').innerHTML = "Morate uneti ime koje počinje velikim slovom!";
                errors = true;
            }
            if (this.surname[0] < 'A' || this.surname[0] > 'Z' || !this.surname) {
                document.getElementById('surnameErr').innerHTML = "Morate uneti prezime koje počinje velikim slovom!";
                errors = true;
            }
            if (this.gender === 'Odaberite pol..') {
                document.getElementById('genderErr').innerHTML = "Morate izabrati pol!";
                errors = true;
            }

            if (this.dateOfBirth > new Date()) {
                document.getElementById('dateErr').innerHTML = "Morate izabrati datum rođenja!";
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