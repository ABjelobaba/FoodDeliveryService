Vue.component("available-orders", {
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
                    date: '18:20h',
                    restaurant: {
                        id: 1,
                        img: 'images/kfc.jpg',
                        name: 'KFC',
                        type: 'Americka hrana',
                        status: 'OPENED'
                    },
                    summeryPrice: 1235,
                    status: 'waitingDeliverer',
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
                    date: '18:14h',
                    restaurant: {
                        id: 2,
                        img: 'images/mcdonalds.png',
                        name: "McDonald's",
                        type: 'Americka hrana',
                        status: 'OPENED'
                    },
                    summeryPrice: 1200,
                    status: 'waitingDeliverer'
                },
                {
                    id: 3,
                    date: '18:11h',
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
                { id: 4, date: '18:09h', restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' }, summeryPrice: 560, status: 'waitingDeliverer' },
                { id: 5, date: '18:03h', restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' }, summeryPrice: 1200, status: 'waitingDeliverer' },
                { id: 6, date: '18:01h', restaurant: { id: 3, img: 'images/burgerhouse.jpg', name: 'Burger House', type: 'Americka hrana', status: 'CLOSED' }, summeryPrice: 2560, status: 'waitingDeliverer' }
            ]
        }

    },

    template: `
    <div>
        <h1 style="text-align: center;">Pregled dostupnih porudžbina
        </h1>
        <div class="users-search">
                <div class="search-text-div">
                    <i style="text-align: center;" class="fa fa-search"></i>
                    <input type="text" placeholder="Pretraži po nazivu restorana.." >
                </div>  
                <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
        </div>


        <div class="filter-div" style="top:250px" id="advancedSearch">
            <div class="filter-modal" id="advancedSearch-modal" style="position: relative;">
                <div v-on:click="advancedSearchClose" class="close-filter" style="position: absolute; right: 0;">+</div>

                <div style="margin:20px">
                    <h2>Cena:</h2>
                    <label>Od:</label><input type="number" min='0' name="price" id="fromPrice" placeholder="00000">(.00 RSD)<br>
                    <label>Do:</label><input type="number" min='0' name="price" id="toPrice" placeholder="00000">(.00 RSD)
                </div>
                <div style="margin:20px">
                    <h2>Datum:</h2>
                    <label>Od:</label><input type="date" name="date" id="fromDate" ><br>
                    <label>Do:</label><input type="date" name="date" id="toDate" >
                </div> 
            </div>
        </div>

        <div class="content" style="display:block" >
            <table class="table-users" name="orders">
                <thead>
                    <tr>
                        <th>Vreme <i class="fa fa-sort "></i></th>
                        <th>Kupac <i class="fa fa-sort"></i></th>
                        <th>Restoran <i class="fa fa-sort "></i></th>
                        <th>Cena <i class="fa fa-sort"></i></th>
                        <th> </th>
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
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="register" style="display:flex;z-index:100" v-if="selectedOrder != undefined">
            <div class="modal" style="height:auto">
            <div v-on:click="closeOrderView" class="close">+</div>

            <div >
                <div class="order-articles-title-div">
                    <div class="order-articles-title" >
                        <p > {{selectedOrder.restaurant.name}}  </p>
                        <p > {{selectedOrder.date}}  </p>
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
                    <button style="margin: 20px 20%;width: -webkit-fill-available;" class="ask-for-delivery-btn"> Zatraži porudžbinu</button>
                </div>
            </div>

            </div>
        </div>
    </div>

              `,
    mounted() {
        window.scrollTo(0, 0);

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
        showOrder: function(order) {
            this.selectedOrder = order;
        },
        closeOrderView: function() {
            this.selectedOrder = undefined;
        },
        advancedSearchClose: function(event) {
            document.getElementById('advancedSearch').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        advancedSearchClicked: function(event) {
            if (document.getElementById('advancedSearch').style.display == 'none' || document.getElementById('advancedSearch').style.display == '') {
                document.getElementById('advancedSearch').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-' + (document.querySelector('#advancedSearch-modal').getBoundingClientRect().height + 10) + 'px';

            } else { this.advancedSearchClose(); }
        }
    }
})