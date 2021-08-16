const Home = { template: '<home></home>' }
const LogIn = { template: '<logIn></logIn>' }
const restaurants = { template: '<restaurants></restaurants>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/logIn', component: LogIn },
        { path: '/restaurants', component: restaurants }
    ]
});

var app = new Vue({
    router,
    el: '#webApp',
});