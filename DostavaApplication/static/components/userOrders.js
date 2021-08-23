Vue.component("user-orders", {
    data: function() {
        return {
            gender: 'Odaberite pol..',
            name: '',
            surname: '',
            username: '',
            password: '',
            role: 'Odaberite ulogu korisnika..',
            dateOfBirth: '',
            currentRestaurant: [],
            article: '',
            order: '',
            selectedOrder: undefined,
            orderStatuses: [
                { id: 'processing', value: 'Obrada' },
                { id: 'prep', value: 'U pripremi' },
                { id: 'waitingDeliverer', value: 'Čeka dostavljača' },
                { id: 'transporting', value: 'U transportu' },
                { id: 'finished', value: 'Dostavljena' },
                { id: 'canceled', value: 'Otkazana' }
            ],
            cuisines: [
                { id: 'italian', value: 'Italijanska' },
                { id: 'chinese', value: 'Kineska' },
                { id: 'barbecue', value: 'Rostilj' },
                { id: 'american', value: 'Americka hrana' },
                { id: 'sweets', value: 'Poslastice' }
            ],
            orders: [{
                    id: 1,
                    date: '21.08.2021.',
                    restaurant: {
                        id: 1,
                        img: 'images/kfc.jpg',
                        name: 'KFC',
                        type: 'Americka hrana',
                        status: 'OPENED'
                    },
                    summeryPrice: 1235,
                    status: 'processing',
                    articles: [{
                        id: 1,
                        name: 'Burger',
                        quantity: 2
                    }, {
                        id: 2,
                        name: 'Pomfrit',
                        quantity: 2
                    }]
                },
                {
                    id: 2,
                    date: '17.08.2021.',
                    restaurant: {
                        id: 2,
                        img: 'images/mcdonalds.png',
                        name: "McDonald's",
                        type: 'Americka hrana',
                        status: 'OPENED'
                    },
                    summeryPrice: 1200,
                    status: 'prep'
                },
                {
                    id: 3,
                    date: '11.07.2021.',
                    restaurant: {
                        id: 3,
                        img: 'images/burgerhouse.jpg',
                        name: 'Burger House',
                        type: 'Americka hrana',
                        status: 'CLOSED'
                    },
                    summeryPrice: 3590,
                    status: 'waitingDeliverer'
                },
                { id: 4, date: '05.06.2021.', restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' }, summeryPrice: 560, status: 'transporting' },
                { id: 5, date: '20.04.2021.', restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' }, summeryPrice: 1200, status: 'finished' },
                { id: 6, date: '15.03.2021.', restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' }, summeryPrice: 2560, status: 'canceled' }
            ]
        }
    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled vaših porudžbina
    </h1>
    <div class="users-search">
        <div>
            <i style="text-align: center;" class="fa fa-search"></i>
            <input type="text" placeholder="Pretraži po nazivu restorana, opsegu ocene ili opsegu datuma..">
        </div>
        <button class="filter-btn" v-on:click="filterClicked"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
    </div>

    <div class="filter-div" style="top:250px">
        <div class="filter-modal">
            <div v-on:click="filterClose" class="close-filter">+</div>

            <h2>Status porudžbine</h2>
            <div class="checkbox-btn-container-dark">
                <div v-for="status in orderStatuses">
                    <input type="checkbox" v-bind:id="status.id" name="orderStatus" v-bind:value="status.id">
                    <label v-bind:for="status.id">{{status.value}}</label>
                </div>
            </div>
            <h2>Tip restorana</h2>
            <div class="checkbox-btn-container-dark">
                <div v-for="cuisine in cuisines">
                    <input type="checkbox" v-bind:id=cuisine.id name="cuisine" v-bind:value=cuisine.id>
                    <label  v-bind:for=cuisine.id>{{cuisine.value}}</label>
                </div>
            </div>
        </div>


    </div>

    <div class="content" style="display:block" >
        <table class="table-users" name="orders">
            <thead>
                <tr>
                    <th>Datum <i class="fa fa-sort "></i></th>
                    <th>Restoran <i class="fa fa-sort "></i></th>
                    <th>Cena <i class="fa fa-sort"></i></th>
                    <th>Status <i class="fa fa-sort"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" v-on:click="showOrder(order)">
                    <td>{{order.date}}</td>
                    <td>
                        <restaurant-cell v-bind:restaurant="order.restaurant"></restaurant-cell>
                    </td>
                    <td>{{order.summeryPrice}}.00 RSD</td>
                    <td ><div class="order-status-black"><order-status-cell v-bind:orderStatus="order.status"></order-status-cell></div></td>
                </tr>
            </tbody>
        </table>
    </div>

    <div class="register" style="display:flex;z-index:100" v-if="selectedOrder != undefined" >
        <div class="modal" style="height:auto">
        <div v-on:click="newUserClose" class="close">+</div>

        <div >
            <div class="order-articles-title-div">
                <div class="order-articles-title" >
                    <p > {{selectedOrder.restaurant.name}} </p>
                    <p > {{selectedOrder.date}} </p>
                </div>
                <div class="order-status-white" style="text-align:right;margin-right:15%">
                    <order-status-cell v-bind:orderStatus="selectedOrder.status"></order-status-cell>
                    
                </div>
            </div>
            
            <div style="margin-top: 7%;" >
                <article-in-order v-for="article in selectedOrder.articles" v-bind:key="article.id" v-bind:article="article"></article-in-order>

                <div style="border:1px solid white;margin: 5% 15% 2%" ></div>
                <p class="summeryPrice"> = {{selectedOrder.summeryPrice}}.00 RSD</p>
                <button disabled v-on:click="cancleOrder" class="cancle-btn"> Otkazi</button>
            </div>
        </div>

        </div>
    </div>

    <success></success>
</div>
`,
    mounted() {
        window.scrollTo(0, 0);
        var today = new Date().toISOString().split('T')[0];
    },
    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        filterClicked: function(event) {
            if (document.querySelector('.filter-div').style.display == 'none' || document.querySelector('.filter-div').style.display ==
                '') {
                document.querySelector('.filter-div').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-404px';
            } else { this.filterClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        showOrder: function(order) {
            this.selectedOrder = order;
        },
        cancleOrder: function(event) {
            this.selectedOrder = undefined;

        },
        newUserClose: function(event) {
            this.selectedOrder = undefined;
        }
    }
})