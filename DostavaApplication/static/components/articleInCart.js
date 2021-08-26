Vue.component("article-in-cart", {
    props: ['article'],
    template: `
	<li class="shopping-cart-item">
	    <div class="cart-item-info">
	        <h2> <span class="food-quantity"> {{article.quantity}} x</span> {{article.name}}</h2>
	        <h3> {{article.price}},00 RSD </h3>
	    </div>
	    <img class="food-img" src="images/burger.jpg" alt="Food">
	    <div class="remove-item-from-cart">  <h4>+</h4> </div>
	
	    <div class="change-quantity">
	        <img src="images/add.png" alt="Add one item">
	        <img src="images/remove.png" alt="Remove one item">
	    </div>
	</li>
	`,
    methods: {}
});