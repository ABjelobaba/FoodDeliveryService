Vue.component("shopping-cart", {
    data: function() {
        return {
            userMedal: 'gold'
        }

    },

    template: `
    <div class="shopping-cart-page">
		
		<h1 style="text-align:center">Vaša korpa</h1>

		<div class="users-search" id="cart-points" >
			<h2> <i class="fa fa-user-circle-o fa-lg" aria-hidden="true"></i> Vaši bodovi nakon poručivanja : 1230 + <b style="color:#054e72">120</b> = 1350</h2>
		</div>

	    <div class="cart-view">
	        <div class="cart-items-section">
	            <div class="container">
	                <ul class="cart-items">
	                    <li class="shopping-cart-item">
	                        <div class="cart-item-info">
	                            <h2> <span class="food-quantity"> 1 x</span> Burger</h2>
	                            <h3> 450,00 RSD </h3>
	                        </div>
	                        <img class="food-img" src="images/burger.jpg" alt="Food">
	                        <div class="remove-item-from-cart">  <h4>+</h4> </div>
	
	                        <div class="change-quantity">
	                            <img src="images/add.png" alt="Add one item">
	                            <img src="images/remove.png" alt="Remove one item">
	                        </div>
	                    </li>
	                    <li class="shopping-cart-item">
	                        <div class="cart-item-info">
	                            <h2> <span class="food-quantity"> 1 x</span> Burger</h2>
	                            <h3> 450,00 RSD </h3>
	                        </div>
	                        <img class="food-img" src="images/burger.jpg" alt="Food">
	                        <div class="remove-item-from-cart">  <h4>+</h4> </div>
	
	                        <div class="change-quantity">
	                            <img src="images/add.png" alt="Add one item">
	                            <img src="images/remove.png" alt="Remove one item">
	                        </div>
	                    </li>
	                    <li class="shopping-cart-item">
	                        <div class="cart-item-info">
	                            <h2> <span class="food-quantity"> 1 x</span> Burger</h2>
	                            <h3> 450,00 RSD </h3>
	                        </div>
	                        <img class="food-img" src="images/burger.jpg" alt="Food">
	                        <div class="remove-item-from-cart">  <h4>+</h4> </div>
	
	                        <div class="change-quantity">
	                            <img src="images/add.png" alt="Add one item">
	                            <img src="images/remove.png" alt="Remove one item">
	                        </div>
	                    </li>
						<li class="shopping-cart-item">
	                        <div class="cart-item-info">
	                            <h2> <span class="food-quantity"> 1 x</span> Burger</h2>
	                            <h3> 450,00 RSD </h3>
	                        </div>
	                        <img class="food-img" src="images/burger.jpg" alt="Food">
	                        <div class="remove-item-from-cart">  <h4>+</h4> </div>
	
	                        <div class="change-quantity">
	                            <img src="images/add.png" alt="Add one item">
	                            <img src="images/remove.png" alt="Remove one item">
	                        </div>
	                    </li>
						<li class="shopping-cart-item">
	                        <div class="cart-item-info">
	                            <h2> <span class="food-quantity"> 1 x</span> Burger</h2>
	                            <h3> 450,00 RSD </h3>
	                        </div>
	                        <img class="food-img" src="images/burger.jpg" alt="Food">
	                        <div class="remove-item-from-cart">  <h4>+</h4> </div>
	
	                        <div class="change-quantity">
	                            <img src="images/add.png" alt="Add one item">
	                            <img src="images/remove.png" alt="Remove one item">
	                        </div>
	                    </li>
						<li class="shopping-cart-item">
	                        <div class="cart-item-info">
	                            <h2> <span class="food-quantity"> 1 x</span> Burger</h2>
	                            <h3> 450,00 RSD </h3>
	                        </div>
	                        <img class="food-img" src="images/burger.jpg" alt="Food">
	                        <div class="remove-item-from-cart">  <h4>+</h4> </div>
	
	                        <div class="change-quantity">
	                            <img src="images/add.png" alt="Add one item">
	                            <img src="images/remove.png" alt="Remove one item">
	                        </div>
	                    </li>
						
	                </ul>
	            </div>
	        </div>
	
			<div class="right-section">
				<div id="showBill-div">
                    <input v-on:click="showHideBill()" type="checkbox" id="showBill" value="showBill">
                    <label style="max-width:80%;margin:auto" class="full-radio-btn-label" for="showBill">Račun <i class="fa fa-angle-down" aria-hidden="true"></i></label>
                </div>
				<div class="finish-order" id="small-bill" style="visibility: hidden;
				opacity: 0;height:0; margin:0;overflow-y: auto;padding:0;
				transition: visibility 0s, opacity 0.5s linear;">
					<div>
						<h3>Ukupna cena artikala</h3>
						<h3 style="white-space: nowrap;">1350,00 RSD </h3>
					</div>
					<div >
						<h3>Dostava</h3>
						<h3 class="delivery-text">200,00 RSD </h3>
					</div>
					<div >
						<h3>Ukupna cena artikala</h3>
						<h3 class="total-price-value">1550,00 RSD </h3>
					</div>
						
					<a class="continue-with-order-btn" href="#">Završi narudžbinu</a>
				</div>
				<div class="finish-order" id="bill-div">
					<div style="display:block" id="billTitle">
						<h2>Račun</h2>
					</div>
					<div>
						<h3>Ukupna cena artikala</h3>
						<h3 style="white-space: nowrap;">1350,00 RSD </h3>
					</div>
					<div >
						<h3>Dostava</h3>
						<h3 class="delivery-text">200,00 RSD </h3>
					</div>
					<div >
						<h3>Ukupna cena artikala</h3>
						<h3 class="total-price-value">1550,00 RSD </h3>
					</div>
						
					<a class="continue-with-order-btn" href="#">Završi narudžbinu</a>
				</div>
				<a id="back-to-restaurant-btn" href="#">Niste završili sa narudžbinom?</a>
			</div>
			
	    </div>
    </div>
                `,
    mounted() {
        window.scrollTo(0, 0);

        var points = document.querySelector('#cart-points');
        if (this.userMedal == 'gold') {
            points.style.backgroundColor = 'gold';
        } else if (this.userMedal == 'silver') {
            points.style.backgroundColor = 'silver';
        } else {
            points.style.backgroundColor = 'rgb(205, 127, 50)'
        }
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
        }
    }
})