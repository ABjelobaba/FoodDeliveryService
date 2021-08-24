Vue.component("user-orders", {
    data: function() {
        return {
            mode: 'all',
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
            ],
            hover: false
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
        <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        <div >
            <input v-on:click="undeliveredOrders" type="checkbox" id="undeliveredOrders" value="undeliveredOrders">
            <label style="margin:0;padding:3%" class="full-radio-btn-label" for="undeliveredOrders">Nedostavljane porudžbine</label>
        </div>
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
        <table class="table-users" name="orders" id="allOrders" v-if="mode=='all'">
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
                    <td >
                        <div class="order-status-black" v-if="order.status != 'processing'">
                            <order-status-cell v-bind:orderStatus="order.status">
                            </order-status-cell>
                        </div>

                        <div v-else class="order-canceled-btn"  v-on:click="cancelOrder(order)"
                            @mouseover="hover = true"
                            @mouseleave="hover = false">

                        <span v-if="!hover" ><i class="fa fa-spinner" aria-hidden="true"></i> Obrada</span>
                        <span v-if="hover" class="canceled-btn-confirmation-text" style="transition: 0.2s;background-color:#5e2121;"><i class="fa fa-ban" aria-hidden="true"></i> Otkaži</span>
                        
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="table-users" name="orders" id="undeliveredOrders" v-if="mode=='undelivered'">
            <thead>
                <tr>
                    <th>Datum <i class="fa fa-sort "></i></th>
                    <th>Restoran <i class="fa fa-sort "></i></th>
                    <th>Cena <i class="fa fa-sort"></i></th>
                    <th>Status <i class="fa fa-sort"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" v-on:click="showOrder(order)" v-if="order.status != 'finished' && order.status != 'canceled'">
                    <td>{{order.date}}</td>
                    <td>
                        <restaurant-cell v-bind:restaurant="order.restaurant"></restaurant-cell>
                    </td>
                    <td>{{order.summeryPrice}}.00 RSD</td>
                    <td >
                        <div class="order-status-black" v-if="order.status != 'processing'">
                            <order-status-cell v-bind:orderStatus="order.status">
                            </order-status-cell>
                        </div>

                        <div v-else class="order-canceled-btn"  v-on:click="cancelOrder(order)"
                            @mouseover="hover = true"
                            @mouseleave="hover = false">

                        <span v-if="!hover" ><i class="fa fa-spinner" aria-hidden="true"></i> Obrada</span>
                        <span v-if="hover" class="canceled-btn-confirmation-text" style="transition: 0.2s;background-color:#5e2121;"><i class="fa fa-ban" aria-hidden="true"></i> Otkaži</span>
                        
                        </div>
                    </td>
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

                <div style="border:1px solid white;margin: 5% 10% 2%" ></div>
                <div class="price-calculation-order-view">
                        <p class="pc-order-view">  <span>Dostava</span>   <span>+ 200.00 RSD</span> </p>
                        <p class="pc-order-view">  <span>Ukupna cena</span>   <span>{{selectedOrder.summeryPrice}}.00 RSD</span> </p>
                </div>

                <button v-if="selectedOrder.status =='processing'" v-on:click="cancelOrder(selectedOrder)" class="cancle-btn" style="margin: 20px 20%"> Otkaži</button>
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

        var b = document.getElementById('filter-btn-do');
        this.rect = b.getBoundingClientRect();
        document.querySelector('.filter-modal').style.marginRight = $(document).width() - this.rect.right + 'px';

        if (document.body.clientWidth <= 900) {

            document.querySelector('.filter-modal').style.width = 550 + 'px';
            document.querySelector('.filter-modal').style.marginRight = 'auto';

        }
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
        newUserClose: function(event) {
            this.selectedOrder = undefined;
        },
        undeliveredOrders: function(event) {
            if (this.mode == 'all') {
                this.mode = 'undelivered';
            } else {
                this.mode = 'all';
            }
        },
        cancelOrder: function(order) {
            order.status = "canceled";
            event.stopPropagation();
        }
    }
})