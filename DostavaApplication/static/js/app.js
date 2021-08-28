const apiKey = 'pk.eyJ1IjoibGVha2FsbWFyIiwiYSI6ImNrc2pkNDVjYjExMDMyb21ieWp4cGoxMnIifQ.grYjuwulOL83SVRPz6M8_A';
const Home = { template: '<home></home>' }
const restaurants = { template: '<restaurants></restaurants>' }
const Account = { template: '<account></account>' }
const AdminRestaurants = { template: '<admin-restaurants></admin-restaurants>' }
const AdminProfile = { template: '<admin-profile></admin-profile>' }
const AdminUsers = { template: '<admin-users></admin-users>' }
const RestaurantPage = { template: '<restaurant-page></restaurant-page>' }
const ShoppingCart = { template: '<shopping-cart></shopping-cart>' }
const UserOrders = { template: '<user-orders></user-orders>' }
const DelivererOrders = { template: '<deliverer-orders></deliverer-orders>' }
const AvailableOrders = { template: '<available-orders></available-orders>' }
const ManagerOrders = { template: '<manager-orders></manager-orders>' }
const ManagerPreviousOrders = { template: '<manager-previous-orders></manager-previous-orders>' }
const RestaurantCustomers = { template: '<restaurant-customers></restaurant-customers>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/', name: 'home', component: Home },
        { path: '/restaurants', component: restaurants },
        { path: '/cart', component: ShoppingCart },
        {
            path: '/account',
            component: Account,
            children: [
                { path: '', component: AdminRestaurants },
                { path: 'restaurants', component: AdminRestaurants },
                { path: 'profile', component: AdminProfile },
                { path: 'users', component: AdminUsers },
                { path: 'orders', component: UserOrders },
                { path: 'allOrders', component: DelivererOrders },
                { path: 'availableOrders', component: AvailableOrders },
                { path: 'restaurantOrders', component: ManagerOrders },
                { path: 'restaurantPreviousOrders', component: ManagerPreviousOrders },
                { path: 'customers', component: RestaurantCustomers }

            ]
        },
        { path: '/restaurantPage', component: RestaurantPage }
    ]
});

var app = new Vue({
    router,
    el: '#webApp',
});