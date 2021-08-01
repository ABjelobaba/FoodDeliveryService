Vue.component("shoppingCart",{
    data: function() {
        return {     
        }
    
    },
    
    template: `
    <section class="shopping-cart-page">
	    <div class="cover-photo">
	        <img class="cover-img" src="images/background.jpg" alt="Cover photo">
	    </div>
	
	    <h1>Pregled korpe</h1>
	    <div class="cart-view">
	        <section class="cart-items-section">
	            <div class="container">
	                <ul class="cart-items">
	                    <li class="shopping-cart-item">
	                        <div class="cart-item-info">
	                            <h2> <span class="food-quantity"> 1 x</span> Burger</h2>
	                            <h3> 450,00 RSD </h3>
	                        </div>
	                        <img class="food-img" src="images/burger.jpg" alt="Food">
	                        <img class="remove-food" src="images/remove-all.png" alt="">
	
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
	                        <img class="remove-food" src="images/remove-all.png" alt="">
	
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
	                        <img class="remove-food" src="images/remove-all.png" alt="">
	
	                        <div class="change-quantity">
	                            <img src="images/add.png" alt="Add one item">
	                            <img src="images/remove.png" alt="Remove one item">
	                        </div>
	                    </li>
	                </ul>
	            </div>
	        </section>
	
	        <section class="right-section">
	            <div class="price-calculation">
	                <div class="total-price-text">
	                        <h3>Ukupna cena artikala</h3>
	
	                        <h3>Dostava </h3>
	
	                        <h3>Ukupna cena </h3>
	                </div>
	                <div class="total-price-values">
	                    <h3>1350,00 RSD </span></h3>
	
	                    <h3 class="delivery-text">200,00 RSD </span></h3>
	
	                    <h3 class="total-price-value">1550,00 RSD </span></h3>
	                </div>
	            </div>
	            <a class="continue-with-order-btn" href="#">Završi narudžbinu</a>
	        </section>
	    </div>
    </section>
                `
})