Vue.component("user-orders", {
    data: function() {
        return {
            mode: 'all',
            modalMode: '',
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
                    }],
                    comment: false
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
                    status: 'prep',
                    comment: false
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
                    status: 'processing',
                    comment: true
                },
                {
                    id: 4,
                    date: '05.06.2021.',
                    restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' },
                    summeryPrice: 560,
                    status: 'transporting',
                    comment: true
                },
                {
                    id: 5,
                    date: '20.04.2021.',
                    restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' },
                    summeryPrice: 1200,
                    status: 'finished',
                    comment: false
                },
                {
                    id: 6,
                    date: '15.03.2021.',
                    restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' },
                    summeryPrice: 2560,
                    status: 'canceled',
                    comment: true
                }
            ],
            hover: ''
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
            <label style="padding: 10px 10px;font-size: 15px;" class="full-radio-btn-label" for="undeliveredOrders">Nedostavljane porudžbine</label>
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
                        <div v-if="order.status == 'finished' && !order.comment" class="order-rate-btn"  v-on:click="openRateModal(order)"
                            @mouseover="hover = order.id + 'r'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.id + 'r'" >
                                <i class="fa fa-star" aria-hidden="true" style="color:white"></i> Oceni
                            </span>
                            <span v-if="hover == order.id + 'r'" style="background-color:rgb(255, 217, 0);color:white" >
                                <i class="fa fa-star" aria-hidden="true" style="color:white"></i> Oceni
                            </span>
                        
                        </div>

                        <div v-else-if="order.status == 'processing'" class="order-canceled-btn"  v-on:click="cancelOrder(order)"
                            @mouseover="hover = order.id + 'c'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.id + 'c'" >
                                <i class="fa fa-spinner" aria-hidden="true"></i> Obrada
                            </span>
                            <span v-if="hover == order.id + 'c'" style="color:white;transition: 0.2s;background-color:#5e2121;">
                                <i class="fa fa-ban" aria-hidden="true" style="color:white"></i> Otkaži
                            </span>
                        
                        </div>

                        <div class="order-status-black" v-else>
                            <order-status-cell v-bind:orderStatus="order.status">
                            </order-status-cell>
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
                        <div v-if="order.status == 'finished' && !order.comment" class="order-rate-btn"  v-on:click="openRateModal(order)"
                            @mouseover="hover = order.id + 'r'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.id + 'r'" >
                               <i class="fa fa-star" aria-hidden="true" style="color:white"></i> Oceni
                            </span>
                            <span v-if="hover == order.id + 'r'"  style="color:white;background-color:rgb(197, 168, 1);">
                                <i class="fa fa-star" aria-hidden="true" style="color:white"></i> Oceni
                            </span>
                        
                        </div>

                        <div v-else-if="order.status == 'processing'" class="order-canceled-btn"  v-on:click="cancelOrder(order)"
                            @mouseover="hover = order.id + 'c'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.id + 'c'" >
                                <i class="fa fa-spinner" aria-hidden="true"></i> Obrada
                            </span>
                            <span v-if="hover == order.id + 'c'" style="color:white;transition: 0.2s;background-color:#5e2121;">
                                <i class="fa fa-ban" aria-hidden="true" style="color:white"></i> Otkaži
                            </span>
                        
                        </div>

                        <div class="order-status-black" v-else>
                            <order-status-cell v-bind:orderStatus="order.status">
                            </order-status-cell>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>

    <view-order v-if="modalMode == 'showOrder'" 
                    v-bind:selectedOrder="selectedOrder" 
                    v-on:newUserClose="newUserClose"
                    v-on:openRateModal="openRateModal(selectedOrder)"></view-order>

    <rate-restaurant v-if="modalMode == 'rateOrder'" 
                    v-bind:selectedOrder="selectedOrder" id="rateModal" 
                    v-on:rateClose="rateClose" 
                    v-on:orderRated="orderRated">
    </rate-restaurant>

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
            var filter = document.querySelector('.filter-div');
            if (filter.style.display == 'none' || filter.style.display == '') {
                filter.style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-' + (document.querySelector('.filter-modal').getBoundingClientRect().height + 10) + 'px';
            } else { this.filterClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        showOrder: function(order) {
            this.modalMode = "showOrder";
            this.selectedOrder = order;
        },
        newUserClose: function(event) {
            this.modalMode = "";
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
        },
        openRateModal: function(order) {
            this.modalMode = "rateOrder";
            this.selectedOrder = order;
            event.stopPropagation();
        },
        orderRated: function(event) {
            this.modalMode = "";
            this.selectedOrder.comment = true;
            this.rateClose();
        },
        rateClose: function(event) {
            this.modalMode = "";

        }
    }
})