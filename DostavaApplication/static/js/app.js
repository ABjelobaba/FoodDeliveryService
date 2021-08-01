const Home = { template: '<home></home>' }
const LogIn = { template: '<logIn></logIn>' }
const Restaurants = {template: '<restaurants></restaurants>' }
const ShoppingCart = { template: '<shoppingCart></shoppingCart>' }


const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/login', component: LogIn},
		{ path: '/cart', component: ShoppingCart}
	  ]
});

var app = new Vue({
	router,
	el: '#webApp',
});