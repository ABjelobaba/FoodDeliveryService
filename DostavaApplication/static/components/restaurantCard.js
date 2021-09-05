Vue.component("restaurant-card", {
    props: ['restaurant', 'loggedInRole'],
    data: function() {
        return {
			restaurantTypes: [
                { id: 'Italian', value: 'Italijanska hrana' },
                { id: 'Chinese', value: 'Kineska hrana' },
                { id: 'Barbecue', value: 'Roštilj' },
                { id: 'Mexican', value: 'Meksička hrana' },
                { id: 'American', value: 'Američka hrana' }
            ]
		}
    },

    template: `
	<div class="restaurants-col" v-bind:name="restaurant.status">
		<img style="width: 150px; height: 130px;" v-bind:src="restaurant.logo">
		<div class="restaurant-info">
			<h3>{{restaurant.name}}</h3>
			<p v-for="restaurantType in restaurantTypes" v-if="restaurantType.id == restaurant.type"> {{restaurantType.value}} </p>
			<p>{{restaurant.location.address.streetAddress}}</p>
			<p>{{restaurant.location.address.city}}</p>
			
		</div>
		<div style="width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;">
		
			<i class="fa fa-star" aria-hidden="true" style="margin:10% 0 0 0;text-align:right"> {{restaurant.rating}}</i>
			<div class="closed-restaurant" style="width:auto" v-if="!restaurant.open">
				<div  style="margin:5%">Zatvoren objekat</div>
			</div>
		</div>
		<div class="comment-delete" v-on:click="deleteRestaurant" v-if="loggedInRole == 'admin'">
                <div class="comment-status" style="background-color:rgba(44,53,63,1);" ><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></div>    
            </div>
	</div>
	`,
    mounted() {
		this.restaurant.rating = (Number(this.restaurant.rating)).toFixed(2);
	},

    methods: {
        deleteRestaurant: function() {

        }
    }
});