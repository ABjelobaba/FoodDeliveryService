Vue.component("restaurant-cell", {
    props: ['restaurantID'],
    data: function() {
        return {
            restaurant: ''
        }
    },
    created: function() {
        axios.
        get('/restaurant/' + this.restaurantID)
            .then(response => {
                if (response.data != null) {
                    this.restaurant = response.data;
                }
            })
    },
    template: `
	<div class="order-restaurant">
        <img v-bind:src="restaurant.logo">
        <label>{{restaurant.name}}</label>
    </div>
	`
});