Vue.component("restaurant-card", {
    props: ['restaurant'],
    data: function() {
        return {}
    },

    template: `
	<div class="restaurants-col" v-bind:name="restaurant.status">
		<img v-bind:src="restaurant.img">
		<div class="restaurant-info">
			<h3>{{restaurant.name}}</h3>
			<p>{{restaurant.type}}</p>
			
		</div>
		<div class="closed-restaurant"><div v-if="restaurant.status === 'CLOSED'" style="margin:5%">Zatvoren objekat</div></div>
	</div>
	`,
    mounted() {
        if (restaurant.status == "CLOSED") {
            document.getElementById(restaurant.id).style.backgroundColor = "#f7c8c8";
        }
    },

    methods: {}
});