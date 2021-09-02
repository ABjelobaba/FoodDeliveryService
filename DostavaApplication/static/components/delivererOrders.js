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
            orders: [],
            hover: '',
            rect: undefined
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.orders = response.data.ordersToDeliver;
                }
            })
    },
    template: `
    <div>
        <h1 style="text-align: center;">Pregled porudžbina
        </h1>
        <div class="users-search">
            <div class="search-text-div">
                <i style="text-align: center;" class="fa fa-search"></i>
                <input type="text" placeholder="Pretraži po nazivu restorana..." id="search-text-mo">
            </div>
            <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
            <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
            <button class="new-user-btn">Nedostavljane porudžbine</button>
        </div>
        
        <div class="filter-div" style="top:250px" id="filter-div">
            <div class="filter-modal" id="filter-modal" style="position: relative;">
                <div v-on:click="filterClose" class="close-filter" style="position: absolute; right: 0;">+</div>
    
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
            <div class="filter-modal" id="advancedSearch-modal" style="position: relative;">
                <div v-on:click="advancedSearchClose" class="close-filter" style="position: absolute; right: 0;">+</div>

                <div style="margin:20px">
                    <h2>Cena:</h2>
                    <label>Od:</label><input type="number" min='0' name="price" id="fromPrice" placeholder="00000">(.00 RSD)<br>
                    <label>Do:</label><input type="number" min='0'  name="price" id="toPrice" placeholder="00000">(.00 RSD)
                </div>
                <div style="margin:20px">
                    <h2>Datum:</h2>
                    <label>Od:</label><input type="date" name="date" id="fromDate"><br>
                    <label>Do:</label><input type="date" name="date" id="toDate">
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
                        <td>{{order.orderDate}}</td>
                        <td>
                            <div class="user-address-delivery">
                            <h3>{{order.customerName}} {{order.customerSurname}}</h3>
                            <h4>{{order.address}}</h4>
                            </div>
                        </td>
                        <td>
                            <restaurant-cell v-bind:restaurantID="order.restaurantID"></restaurant-cell>
                        </td>
                        <td>{{order.price}}.00 RSD</td>
                        <td >
                            <div class="order-status-black" v-if="order.status != 'InTransport'">
                                <order-status-cell v-bind:orderStatus="order.status">
                                </order-status-cell>
                            </div>

                            <div v-else class="order-delivered-btn" v-on:click="confirmDelivery(order)"
                                @mouseover="hover = order.orderID"
                                @mouseleave="hover = ''">

                            <span v-if="hover != order.orderID" class="delivery-btn-text"><i class="fa fa-bicycle" aria-hidden="true"></i> U transportu</span>
                            <span v-if="hover == order.orderID" class="delivery-btn-confirmation-text" style="transition: 0.2s;"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena</span>
                            
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        
        <view-order v-if="selectedOrder != undefined" 
                    v-bind:selectedOrder="selectedOrder" 
                    v-on:closeModal="closeModal"
                    v-on:confirmDelivery="confirmDelivery"></view-order>

        
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
        closeModal: function() {
            this.selectedOrder = undefined;
        },
        confirmDelivery: function(order) {
            if (order == null) {
                order = this.selectedOrder;
            }
            order.status = "Delivered";
            event.stopPropagation();
        }
    }
})