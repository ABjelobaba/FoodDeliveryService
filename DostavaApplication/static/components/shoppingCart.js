Vue.component("shopping-cart", {
    data: function() {
        return {
            loggedInUser: '',
            articles: [
                { id: 1, name: 'Burger', price: 450, quantity: 1 },
                { id: 2, name: 'Pomfrit', price: 250, quantity: 1 },
                { id: 3, name: 'Milk Shake', price: 200, quantity: 2 }
            ],
            cart: '',
            deliveryAddress: ''
        }

    },
    template: `
    <div class="shopping-cart-page">
		
		<h1 style="text-align:center">Vaša korpa</h1>

		<div class="users-search" style="padding:0" id="cart-points" >
			<h2> <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> Vaši bodovi nakon poručivanja : {{loggedInUser.totalPoints}} + <b style="color:#054e72">{{cart.points}}</b> = {{loggedInUser.totalPoints + cart.points}}</h2>
		</div>
		
	    <div class="cart-view">
		
	        <div class="cart-items-section">
	            <div class="container">
	                <ul class="cart-items">
	                    <article-in-cart v-on:updateCart="updateCart" v-for="article in cart.orderedItems" v-bind:key="article.item.name" v-bind:article="article"></article-in-cart>
	                </ul>
	            </div>
	        </div>
	
			<div class="right-section">
			<div class="address-container" id="cartAddress">
			<div class="entered-address" style="border:1px solid black;box-shadow:none;margin-bottom:35px" >
				<i class="fa fa-map-marker fa-2x" style="color:black"></i>
				<input placeholder="Unesite adresu.." class="deliveryAddress" v-model="deliveryAddress"></input>
			</div>
			</div>
				<div id="showBill-div">
                    <input v-on:click="showHideBill()" type="checkbox" id="showBill" value="showBill">
                    <label style="max-width:80%;margin:auto" class="full-radio-btn-label" for="showBill">Račun <i class="fa fa-angle-down" aria-hidden="true"></i></label>
                </div>
				<div class="finish-order" id="small-bill" style="visibility: hidden;
				opacity: 0;height:0; margin:0;overflow-y: auto;padding:0;
				transition: visibility 0s, opacity 0.5s linear;">
					<div>
						<h3>Ukupna cena artikala</h3>
						<h3 style="white-space: nowrap;">{{cart.totalPrice}},00 RSD </h3>
					</div>
					<div >
						<h3>Dostava</h3>
						<h3 class="delivery-text">200,00 RSD </h3>
					</div>
					<div >
						<h3>Ukupna cena artikala</h3>
						<h3 class="total-price-value">{{cart.totalPrice + 200}},00 RSD </h3>
					</div>
						
					<a class="continue-with-order-btn" v-on:click="createOrder">Završi narudžbinu</a>
				</div>
				<div class="finish-order" id="bill-div">
					<div style="display:block" id="billTitle">
						<h2>Račun</h2>
					</div>
					<div>
						<h3>Ukupna cena artikala</h3>
						<h3 style="white-space: nowrap;">{{cart.totalPrice}},00 RSD </h3>
					</div>
					<div >
						<h3>Dostava</h3>
						<h3 class="delivery-text">200,00 RSD </h3>
					</div>
					<div >
						<h3>Ukupna cena artikala</h3>
						<h3 class="total-price-value">{{cart.totalPrice + 200}},00 RSD </h3>
					</div>
						
					<a class="continue-with-order-btn" v-on:click="createOrder">Završi narudžbinu</a>
				</div>
				<a id="back-to-restaurant-btn" v-on:click="goBack">Niste završili sa narudžbinom?</a>
			</div>
			
	    </div>

		<success :text="'Molimo Vas unesite adresu za dostavu.'"></success>
    </div>
                `,
    mounted() {
        window.scrollTo(0, 0);

        axios.get("/user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data;
                    if (this.deliveryAddress == '') {
                        this.deliveryAddress = this.loggedInUser.deliveryAddress;
                    }
                    var points = document.querySelector('#cart-points');
                    if (this.loggedInUser.category.type == 'Gold') {
                        points.style.backgroundColor = 'gold';
                    } else if (this.loggedInUser.category.type == 'Silver') {
                        points.style.backgroundColor = 'silver';
                    } else {
                        points.style.backgroundColor = 'rgb(205, 127, 50)'
                    }
                }
            })

        axios.get("/cart")
            .then(response => {
                if (response.data != null) {
                    this.cart = response.data;
                }
            })

        axios.get("/cart/getAddress")
            .then(response => {
                if (response.data != null) {
                    this.deliveryAddress = response.data;
                }
            })



    },

    methods: {
        logOut: function() {

        },
        showHideBill: function(event) {
            let filters = document.getElementById('small-bill');
            if (filters.style.visibility == 'hidden') {
                filters.style.visibility = 'visible';
                filters.style.opacity = '1';
                filters.style.height = "22vh";
                filters.style.margin = "10% 0";
                filters.style.padding = "0 1em 2em";
            } else {
                filters.style.visibility = 'hidden';
                filters.style.opacity = '0';
                filters.style.height = '0';
                filters.style.margin = "auto";
                filters.style.padding = "0";
            }
        },
        goBack: function() {
            if (this.cart.restaurantID == -1) {
                if (this.deliveryAddress == '' || this.deliveryAddress == undefined) {
                    window.location.href = "#/";
                } else {
                    window.location.href = "#/account?" + this.deliveryAddress.replace(' ', '%20');
                    window.location.reload(true);
                }
            } else {
                window.location.href = "#/restaurant?id=" + this.cart.restaurantID;
            }
        },
        createOrder: function() {
            if (this.deliveryAddress == '' || this.deliveryAddress == undefined) {
                document.querySelector('.registration-success').style.display = 'flex';
                let checkMark = document.getElementById('checkMark');
                checkMark.innerHTML = "&#xf06a";

                setTimeout(function() {
                    document.querySelector('.registration-success').style.display = 'none';
                }, 2000);
            } else if (this.cart.orderedItems.length == 0) {
                this.goBack();
            } else {
                axios
                    .post('/order/create', JSON.stringify(this.deliveryAddress))
                    .then(response => {
                        if (response.data != null && response.data != "") {
                            window.location.href = "#/account/rOrders";
                        }
                    })


            }

        },
        updateCart: function(cart) {
            this.cart = cart;
        }
    }
})