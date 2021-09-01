Vue.component("user-orders", {
    data: function() {
        return {
            mode: 'all',
            modalMode: '',
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
            orders: [],
            hover: '',
            comment: 'za ostavljanje ocene boolean, nije izmenjeno'
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    axios
                        .get("order/" + response.data.username)
                        .then(response => {
                            if (response.data != null) {
                                this.orders = response.data;
                            }
                        })
                } else {
                    window.location.href = '#/';
                }
            })

    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled vaših porudžbina
    </h1>
    <div class="users-search">
            <div class="search-text-div">
                <i style="text-align: center;" class="fa fa-search"></i>
                <input type="text" placeholder="Pretraži po nazivu restorana.." >
            </div>  
        <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
        <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do" style="white-space: nowrap;"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        <div >
            <input v-on:click="undeliveredOrders" type="checkbox" id="undeliveredOrders" value="undeliveredOrders">
            <label style="padding: 10px 10px;font-size: 15px;white-space: nowrap;" class="full-radio-btn-label" for="undeliveredOrders">Nedostavljane porudžbine</label>
        </div>
    </div>

    <div class="filter-div" style="top:250px" id="filter-div">
        <div class="filter-modal" id="filter-modal" style="position: relative;">
            <div v-on:click="filterClose" class="close-filter" style="position: absolute; right: 0;">+</div>

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
                    <td>{{order.orderDate}}</td>
                    <td>
                        <restaurant-cell v-bind:restaurantID="order.restaurantID"></restaurant-cell>
                    </td>
                    <td>{{order.price}}.00 RSD</td>
                    <td >
                        <div v-if="order.status == 'Delivered' && !order.comment" class="order-rate-btn"  v-on:click="openRateModal(order)"
                            @mouseover="hover = order.orderID + 'r'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.orderID + 'r'" >
                                <i class="fa fa-star" aria-hidden="true" style="color:white"></i> Oceni
                            </span>
                            <span v-if="hover == order.orderID + 'r'" style="color:white" >
                                <i class="fa fa-star" aria-hidden="true" style="color:white; transition: 0.5s"></i> Oceni
                            </span>
                        
                        </div>

                        <div v-else-if="order.status == 'Processing'" class="order-canceled-btn"  v-on:click="cancelOrder(order)"
                            @mouseover="hover = order.orderID + 'c'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.orderID + 'c'" >
                                <i class="fa fa-spinner" aria-hidden="true"></i> Obrada
                            </span>
                            <span v-if="hover == order.orderID + 'c'" style="color:white;">
                                <i class="fa fa-ban" aria-hidden="true" style="color:white; transition: 0.5s"></i> Otkaži
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
                <tr v-for="order in orders" v-on:click="showOrder(order)" v-if="order.status != 'Delivered' && order.status != 'Cancelled'">
                    <td>{{order.orderDate}}</td>
                    <td>
                        <restaurant-cell v-bind:restaurantID="order.restaurantID"></restaurant-cell>
                    </td>
                    <td>{{order.price}}.00 RSD</td>
                    <td >
                        <div v-if="order.status == 'Delivered' && !order.comment" class="order-rate-btn"  v-on:click="openRateModal(order)"
                            @mouseover="hover = order.orderID + 'r'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.orderID + 'r'" >
                               <i class="fa fa-star" aria-hidden="true" style="color:white"></i> Oceni
                            </span>
                            <span v-if="hover == order.orderID + 'r'"  style="color:white;background-color:rgb(197, 168, 1);">
                                <i class="fa fa-star" aria-hidden="true" style="color:white"></i> Oceni
                            </span>
                        
                        </div>

                        <div v-else-if="order.status == 'Processing'" class="order-canceled-btn"  v-on:click="cancelOrder(order)"
                            @mouseover="hover = order.orderID + 'c'"
                            @mouseleave="hover = ''">

                            <span v-if="hover != order.orderID + 'c'" >
                                <i class="fa fa-spinner" aria-hidden="true"></i> Obrada
                            </span>
                            <span v-if="hover == order.orderID + 'c'" style="color:white;transition: 0.2s;">
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
            order.status = "Cancelled";
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