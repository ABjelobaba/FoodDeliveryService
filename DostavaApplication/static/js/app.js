const Home = { template: '<home></home>' }
const LogIn = { template: '<logIn></logIn>' }
const restaurants = { template: '<restaurants></restaurants>' }
const Admin = { template: '<admin></admin>' }
const AdminRestaurants = { template: '<admin-restaurants></admin-restaurants>' }
const AdminProfile = { template: '<admin-profile></admin-profile>' }
const AdminUsers = { template: '<admin-users></admin-users>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/logIn', component: LogIn },
        { path: '/restaurants', component: restaurants },
        {
            path: '/admin',
            component: Admin,
            children: [
                { path: '', component: AdminRestaurants },
                { path: 'restaurants', component: AdminRestaurants },
                { path: 'profile', component: AdminProfile },
                { path: 'users', component: AdminUsers }
            ]
        }
    ]
});

var app = new Vue({
    router,
    el: '#webApp',
});