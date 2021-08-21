const Home = { template: '<home></home>' }
const LogIn = { template: '<logIn></logIn>' }
const restaurants = { template: '<restaurants></restaurants>' }
const Account = { template: '<account></account>' }
const AdminRestaurants = { template: '<admin-restaurants></admin-restaurants>' }
const AdminProfile = { template: '<admin-profile></admin-profile>' }
const AdminUsers = { template: '<admin-users></admin-users>' }
const UserOrders = { template: '<user-orders></user-orders>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/logIn', component: LogIn },
        { path: '/restaurants', component: restaurants },
        {
            path: '/account',
            component: Account,
            children: [
                { path: '', component: AdminRestaurants },
                { path: 'restaurants', component: AdminRestaurants },
                { path: 'profile', component: AdminProfile },
                { path: 'users', component: AdminUsers },
                { path: 'orders', component: UserOrders }
            ]
        }
    ]
});

var app = new Vue({
    router,
    el: '#webApp',
});