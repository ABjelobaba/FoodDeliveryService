Vue.component("restaurant-card", {
    props: ['restaurant', 'loggedInRole'],
    data: function() {
        return {}
    },

    template: `
	<div class="restaurants-col" v-bind:name="restaurant.status">
		<img v-bind:src="restaurant.img">
		<div class="restaurant-info">
			<h3>{{restaurant.name}}</h3>
			<p>{{restaurant.type}}</p>
			<p>{{restaurant.address}}</p>
			
		</div>
		<div style="width: 100%;
			display: flex;
			flex-direction: column;
			align-items: center;">
		
			<i class="fa fa-star" aria-hidden="true" style="margin:10% 0 0 0;text-align:right"> {{restaurant.rating}}</i>
			<div class="closed-restaurant" style="width:auto" v-if="restaurant.status === 'CLOSED'">
				<div  style="margin:5%">Zatvoren objekat</div>
			</div>
		</div>
		<div class="comment-delete" v-on:click="deleteRestaurant" v-if="loggedInRole == 'admin'">
                <div class="comment-status" style="background-color:rgba(44,53,63,1);" ><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></div>    
            </div>
	</div>
	`,
    mounted() {},

    methods: {
        deleteRestaurant: function() {

        }
    }
});