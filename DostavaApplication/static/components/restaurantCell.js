Vue.component("restaurant-cell", {
    props: ['restaurant'],
    template: `
	<div class="order-restaurant">
        <img v-bind:src="restaurant.img">
        <label>{{restaurant.name}}</label>
    </div>
	`
});