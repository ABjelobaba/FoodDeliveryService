Vue.component("article-in-cart", {
    props: ['article'],
    template: `
	<li class="shopping-cart-item">
	    <div class="cart-item-info">
	        <h2> <span class="food-quantity"> {{article.amount}} x</span> {{article.item.name}}</h2>
	        <h3> {{article.item.price}},00 RSD </h3>
	    </div>
	    <img class="food-img" v-bind:src="article.item.image" alt="Food">
	    <div class="remove-item-from-cart" v-on:click="deleteItem">  <h4>+</h4> </div>
	
	    <div class="change-quantity">
	        <img src="images/add.png" alt="Add one item" v-on:click="addItem">
	        <img src="images/remove.png" alt="Remove one item" v-on:click="removeItem">
	    </div>
	</li>
	`,
    methods: {
        addItem: function() {
            axios
                .post('/cart/increaseQuantity', JSON.stringify(this.article))
                .then(response => {
                    if (response.data != null && response.data != "") {
                        this.article.amount = this.article.amount + 1;
                        this.$emit('updateCart', response.data);
                    }
                })
        },
        removeItem: function() {
            if (this.article.amount != 1) {
                axios
                    .post('/cart/decreaseQuantity', JSON.stringify(this.article))
                    .then(response => {
                        if (response.data != null && response.data != "") {
                            this.article.amount = this.article.amount - 1;
                            this.$emit('updateCart', response.data);
                        }
                    })
            }
        },
        deleteItem: function() {
            axios
                .post('/cart/deleteItem', JSON.stringify(this.article))
                .then(response => {
                    if (response.data != null && response.data != "") {
                        window.location.reload(true);
                    }
                })
        }
    }
});