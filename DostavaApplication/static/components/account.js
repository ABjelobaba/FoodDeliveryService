Vue.component("account", {
    data: function() {
        return {
            deliveryAddress: '',
            loggedInUser: '',
            mode: '',
            cart: { restaurantID: -1, orderedItems: [], customerUsername: '', totalPrice: 0 },
            restaurantName: ''
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data;

                    if (this.loggedInUser.role == 'Manager' && this.loggedInUser.restaurantID != -1) {
                        axios.get('/restaurant/' + this.loggedInUser.restaurantID).then(response => {
                            this.restaurantName = response.data.name;
                        })
                    }
                } else {
                    window.location.href = '#/';
                }
            })
    },
    updated: function() {

        if (this.deliveryAddress != '' && this.deliveryAddress != undefined && window.location.href.includes('account')) {
            document.querySelector('#user-nav-ul').style.marginTop = '0';
            document.querySelector('#user-nav-ul-second').style.marginTop = '0';
        } else if (window.location.href.includes('account')) {
            document.querySelector('#user-nav-ul-second').style.margin = '80px 7% 20px 0';
        }

        if (window.location.href.endsWith('restaurants')) {
            document.getElementById('restaurants').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('users')) {
            document.getElementById('users').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('profile')) {
            document.getElementById('profile').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('orders')) {
            document.getElementById('orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('rOrders')) {
            this.deliveryAddress = '';
            this.cart.orderedItems = [];
            window.location.href = "#/account/orders";
            document.querySelector('#user-nav-ul').style.marginTop = '0';
            document.querySelector('#user-nav-ul-second').style.marginTop = '0';
            document.querySelector('#user-nav-ul-second').style.margin = '80px 7% 20px 0';
        } else if (window.location.href.endsWith('restaurants')) {
            document.getElementById('restaurants').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('availableOrders')) {
            document.getElementById('available-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('allOrders')) {
            document.getElementById('deliverers-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('suspiciousUsers')) {
            document.getElementById('suspicious-users').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('cart')) {
            document.getElementById('shopping-cart').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('restaurantOrders')) {
            document.getElementById('managers-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('restaurantPreviousOrders')) {
            document.getElementById('managers-prev-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('customers')) {
            document.getElementById('restaurant-customer-list').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        }



        if (document.getElementById('accountAddress') != null) {
            if (document.getElementById('cartAddress') != null)
                document.getElementById('cartAddress').style.display = 'none';
        }
    },
    template: `
	<div class="page">

		<div class="small-home-img">
            <div class="nav-navbar" style="background-color:transparent;margin-top:15px;grid-template-rows: auto auto; grid-template-columns: auto auto;">
                <a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a>  
                <span class="main-nav">
                    <a v-on:click="logOut" class="btn">Odjavi se</a>
                </span>
                <div class="address-container">
                    <div class="entered-address" id="accountAddress" v-if="deliveryAddress != '' && deliveryAddress != undefined">
                        <i class="fa fa-map-marker fa-lg" ></i>
                        <label>{{deliveryAddress}}</label>
                    </div>
                </div>
            </div>
            <nav class="user-nav" style="align-items:flex-end;">
                <ul id="user-nav-ul" v-if="deliveryAddress=='' || deliveryAddress==undefined">
                    <li><a v-on:click="profileView" name="user-nav" id="profile">Profil</a></li>
                    <li v-if="loggedInUser.role == 'Administrator'"><a v-on:click="restaurantsView" name="user-nav" id="restaurants">Restorani</a></li>
                    <li v-if="loggedInUser.role == 'Administrator'"><a v-on:click="usersView" name="user-nav" id="users">Korisnici</a></li>
                    <li v-if="loggedInUser.role == 'Customer'"><a v-on:click="ordersView" name="user-nav" id="orders">Porudžbine</a></li>
                    <li v-if="loggedInUser.role == 'Deliverer'"><a v-on:click="availableOrdersView" name="user-nav" id="available-orders">Dostupne porudžbine</a></li>
                    <li v-if="loggedInUser.role == 'Deliverer'"><a v-on:click="deliverersOrdersView" name="user-nav" id="deliverers-orders">Porudžbine</a></li>
                    <li v-if="loggedInUser.role == 'Administrator'"><a v-on:click="suspiciousUsersView" name="user-nav" id="suspicious-users">Sumnjivi korisnici</a></li>
                    <li v-if="loggedInUser.role == 'Manager' && loggedInUser.restaurantID != -1"><a v-on:click="managersRestaurantView" name="user-nav" id="managers-restaurant"> {{restaurantName}}</a></li>
                    <li v-if="loggedInUser.role == 'Manager'"><a v-on:click="managersOrdersView" name="user-nav" id="managers-orders"> Aktuelne porudžbine</a></li>
                    <li v-if="loggedInUser.role == 'Manager'"><a v-on:click="managersPreviousOrdersView" name="user-nav" id="managers-prev-orders"> Prethodne porudžbine</a></li>
                    <li v-if="loggedInUser.role == 'Manager'"><a v-on:click="restaurantCustomersView" name="user-nav" id="restaurant-customer-list">Kupci</a></li>
                </ul>
                <ul id="user-nav-ul" v-else></ul>
                <ul id="user-nav-ul-second" >
                    <li ><a v-if="loggedInUser.role == 'Customer'" v-on:click="shoppingCartView" name="user-nav" id="shopping-cart" >Korpa ( {{cart.orderedItems.length}} )</a></li>
                </ul>
                
            </nav>
		</div>

        <div >
            <router-view></router-view>
        </div>
		
	</div>
	`,
    mounted() {
        window.scrollTo(0, 0);

        axios.get("cart")
            .then(response => {
                if (response.data != null) {
                    this.cart = response.data;
                }
            })
        if (window.location.href.split('?').length == 2) {
            let query = window.location.href.split('?');
            this.deliveryAddress = query[1].replace('%20', ' ');
            this.deliveryAddress = this.deliveryAddress.replace('%20', ' ');
            this.deliveryAddress = this.deliveryAddress.replace(',%20', ', ');
        }

        if ((this.deliveryAddress == '' || this.deliveryAddress == undefined) && window.location.href.includes('cart')) {
            axios.get("/cart/getAddress")
                .then(response => {
                    if (response.data != null) {
                        this.deliveryAddress = response.data;
                    }
                })
        }


    },

    methods: {
        logOut: function(event) {
            axios
                .get("user/logOut")
                .then(response => {
                    window.location.href = '#/';
                })
        },
        restaurantsView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('restaurants').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/restaurants";
        },
        profileView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('profile').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/profile";
        },
        usersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('users').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/users";
        },
        ordersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/orders";
        },
        availableOrdersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('available-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/availableOrders";
        },
        deliverersOrdersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('deliverers-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/allOrders";
        },
        suspiciousUsersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('suspicious-users').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/suspiciousUsers";
        },
        shoppingCartView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('shopping-cart').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/cart";
        },
        managersRestaurantView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('managers-restaurant').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/restaurant?id=" + this.loggedInUser.restaurantID;
        },
        managersOrdersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('managers-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/restaurantOrders";
        },
        managersPreviousOrdersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('managers-prev-orders').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/restaurantPreviousOrders";
        },
        restaurantCustomersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('restaurant-customer-list').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/account/customers";
        }
    }
})