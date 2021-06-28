const Home = { template: '<home></home>' }
const LogIn = { template: '<logIn></logIn>' }

const router = new VueRouter({
	mode: 'hash',
	  routes: [
		{ path: '/', name: 'home', component: Home},
		{ path: '/login', component: LogIn}
	  ]
});

var app = new Vue({
	router,
	el: '#webApp',
});