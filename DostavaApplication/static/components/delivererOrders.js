Vue.component("deliverer-orders", {
    data: function() {
        return {
            name: '',
            surname: '',
            username: '',
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
            hover: false,
            rect: undefined
        }
    },

    template: `
    <div>
        <h1 style="text-align: center;">Pregled porudžbina
        </h1>
        <div class="users-search">
            <div>
                <i style="text-align: center;" class="fa fa-search"></i>
                <input type="text" placeholder="Pretraži po nazivu restorana, opsegu cene ili opsegu datuma...">
            </div>
            <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
            <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
            <button class="new-user-btn">Nedostavljane porudžbine</button>
        </div>
        
        <div class="filter-div" style="top:250px" id="filter-div">
            <div class="filter-modal" id="filter-modal">
                <div v-on:click="filterClose" class="close-filter">+</div>
    
                <h2>Status porudžbine</h2>
                <div class="checkbox-btn-container-dark" >
                    <div v-for="status in orderStatuses" v-if="status.id != 'waitingDeliverer'">
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
                    

        <div class="filter-div" style="top:250px" id="advancedSearch">
            <div class="filter-modal" id="advancedSearch-modal">
                <div v-on:click="advancedSearchClose" class="close-filter">+</div>

                <div>
                    <h2>Cena:</h2>
                    <label>Od:</label><input type="number" name="price" id="fromPrice" placeholder="Pretraži po nazivu restorana, opsegu ocene ili opsegu datuma..">(.00 RSD)<br>
                    <label>Do:</label><input type="number" name="price" id="toPrice" placeholder="Pretraži po nazivu restorana, opsegu ocene ili opsegu datuma..">(.00 RSD)
                </div>
                <div>
                    <h2>Datum:</h2>
                    <label>Od:</label><input type="date" name="date" id="fromDate" placeholder="Pretraži po nazivu restorana, opsegu ocene ili opsegu datuma.."><br>
                    <label>Do:</label><input type="date" name="date" id="toDate" placeholder="Pretraži po nazivu restorana, opsegu ocene ili opsegu datuma..">
                </div> 
            </div>
        </div>

        <div class="content" style="display:block" >
            <table class="table-users" name="orders">
                <thead>
                    <tr>
                        <th>Datum <i class="fa fa-sort "></i></th>
                        <th>Kupac <i class="fa fa-sort"></i></th>
                        <th>Restoran <i class="fa fa-sort "></i></th>
                        <th>Cena <i class="fa fa-sort"></i></th>
                        <th>Status <i class="fa fa-sort"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" v-on:click="showOrder(order)">
                        <td>{{order.date}}</td>
                        <td>
                            <div class="user-address-delivery">
                                <h3>Marko Markovic</h3>
                                <h4>Bulevar Evrope 9, Novi Sad</h4>
                            </div>
                        </td>
                        <td>
                            <restaurant-cell v-bind:restaurant="order.restaurant"></restaurant-cell>
                        </td>
                        <td>{{order.summeryPrice}}.00 RSD</td>
                        <td >
                            <div class="order-status-black" v-if="order.status != 'transporting'">
                                <order-status-cell v-bind:orderStatus="order.status">
                                </order-status-cell>
                            </div>

                            <div v-else class="order-delivered-btn" v-on:click="confirmDelivery(order)"
                                @mouseover="hover = true"
                                @mouseleave="hover = false">

                            <span v-if="!hover" class="delivery-btn-text"><i class="fa fa-bicycle" aria-hidden="true" id="trans-icon-do"></i> U transportu</span>
                            <span v-if="hover" class="delivery-btn-confirmation-text" style="transition: 0.2s;"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena</span>
                            
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="register"  style="display:flex;z-index:100" v-if="selectedOrder != undefined">
            <div class="modal" style="height:auto; padding-bottom: 35px;">
            <div v-on:click="closeOrderView" class="close">+</div>

            <div >
                <div class="order-articles-title-div">
                    <div class="order-articles-title" >
                        <p> {{selectedOrder.restaurant.name}} </p>
                        <p> {{selectedOrder.date}} </p>
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
                    <button style="margin: 20px 20%;width: -webkit-fill-available; display: none;" class="ask-for-delivery-btn"> Zatraži porudžbinu</button>
                </div>
            </div>

            </div>
        </div>
    </div>
              `,
    mounted() {
        window.scrollTo(0, 0);

        var b = document.getElementById('filter-btn-do');
        this.rect = b.getBoundingClientRect();
        document.querySelector('#filter-modal').style.marginRight = $(document).width() - this.rect.right + 'px';

        var a = document.getElementById('advancedSearch-btn-do');
        this.rect = a.getBoundingClientRect();
        document.querySelector('#advancedSearch-modal').style.marginRight = $(document).width() - this.rect.right + 'px';

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
            var filter = document.getElementById('filter-div');
            if (filter.style.display == 'none' || filter.style.display == '') {
                this.advancedSearchClose();
                filter.style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-' + (document.querySelector('#filter-modal').getBoundingClientRect().height + 10) + 'px';
            } else { this.filterClose(); }
        },
        advancedSearchClicked: function(event) {
            if (document.getElementById('advancedSearch').style.display == 'none' || document.getElementById('advancedSearch').style.display == '') {
                this.filterClose();
                document.getElementById('advancedSearch').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-' + (document.querySelector('#advancedSearch-modal').getBoundingClientRect().height + 10) + 'px';

            } else { this.advancedSearchClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        advancedSearchClose: function(event) {
            document.getElementById('advancedSearch').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        showOrder: function(order) {
            this.selectedOrder = order;
        },
        closeOrderView: function() {
            this.selectedOrder = undefined;
        },
        confirmDelivery: function(order) {
            order.status = "finished";
            event.stopPropagation();
        }
    }
})