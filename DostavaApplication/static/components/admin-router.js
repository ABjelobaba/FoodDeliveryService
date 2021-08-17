const AdminRestaurants = { template: '<admin-restaurants></admin-restaurants>' }
const AdminProfile = { template: '<admin-profile></admin-profile>' }


const router = new VueRouter({
    mode: 'hash',
    routes: [
        { path: '/admin', component: AdminRestaurants },
        { path: '/admin/profile', component: AdminProfile }
    ]
});