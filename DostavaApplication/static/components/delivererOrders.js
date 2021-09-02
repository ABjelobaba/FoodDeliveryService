Vue.component("deliverer-orders", {
    data: function() {
        return {
            mode: 'all',
            selectedOrder: undefined,
            cuisines: [
                { id: 'Italian', value: 'Italijanska' },
                { id: 'Chinese', value: 'Kineska' },
                { id: 'Barbecue', value: 'Rostilj' },
                { id: 'American', value: 'Americka hrana' },
                { id: 'Sweets', value: 'Poslastice' }
            ],
            orders: [],
            hover: '',
            searchText: '',
            fromPrice: '',
            toPrice: '',
            fromDate: '',
            toDate: '',
            rect: undefined
        }
    },
    created: function() {
        axios
            .get("order/getDelivererOrders")
            .then(response => {
                if (response.data != null) {
                    this.orders = response.data;
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
                <input type="text" placeholder="Pretraži po nazivu restorana..." id="search-text-mo" v-model="searchText"  v-on:keyup="findOrder">
            </div>
            <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
            <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
            <div >
                <input v-on:click="undeliveredOrders" type="checkbox" id="undeliveredOrders" value="undeliveredOrders">
                <label style="padding: 10px 10px;font-size: 15px;white-space: nowrap;" class="full-radio-btn-label" for="undeliveredOrders">Nedostavljane porudžbine</label>
            </div>
        </div>
        
        <div class="filter-div" style="top:250px" id="filter-div">
            <div class="filter-modal" id="filter-modal" style="position: relative;">
                <div v-on:click="filterClose" class="close-filter" style="position: absolute; right: 0;">+</div>
                <h2>Tip restorana</h2>
                <div class="checkbox-btn-container-dark">
                    <div v-for="cuisine in cuisines">
                        <input type="checkbox" v-bind:id=cuisine.id name="cuisine" v-bind:value=cuisine.id v-on:change="findOrder">
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
                    <label>Od:</label><input type="number" min='0' name="price" id="fromPrice" placeholder="00000" v-model="fromPrice" v-on:change="findOrder" v-on:keyup="findOrder">(.00 RSD)<br>
                    <label>Do:</label><input type="number" min='0' name="price" id="toPrice" placeholder="00000" v-model="toPrice" v-on:change="findOrder" v-on:keyup="findOrder">(.00 RSD)
                </div>
                <div style="margin:20px">
                    <h2>Datum:</h2>
                    <label>Od:</label><input type="date" name="date" id="fromDate" v-model="fromDate" v-on:change="findOrder"><br>
                    <label>Do:</label><input type="date" name="date" id="toDate" v-model="toDate" v-on:change="findOrder">
                </div> 
                <div>
                    <button class="filter-btn" v-on:click="invalidate" id="filter-btn-do" style="white-space: nowrap;float:none">Poništi</button>
                </div>
            </div>
        </div>

        <div class="content" style="display:block" >
            <table class="table-users" id="allOrders" v-if="mode=='all'">
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

            <table class="table-users" id="undeliveredOrdersTable" v-if="mode=='undelivered'">
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
                    <tr v-for="order in orders" v-on:click="showOrder(order)"  v-if="order.status != 'Delivered'">
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
        undeliveredOrders: function(event) {
            if (this.mode == 'all') {
                this.mode = 'undelivered';
            } else {
                this.mode = 'all';
            }
        },
        confirmDelivery: function(order) {
            if (order == null) {
                order = this.selectedOrder;
            }
            axios
                .put("/order/confirmDelivery", JSON.stringify(order))
                .then(response => {
                    if (response.data != null) {
                        order.status = "Delivered";
                        this.closeModal();
                    }
                })

            event.stopPropagation();
        },
        invalidate: function() {
            this.toDate = '';
            this.toPrice = '';
            this.fromDate = '';
            this.fromPrice = '';
            this.findOrder();
        },
        findOrder: function() {

            table = document.getElementById("allOrders");
            if (table == null) {
                table = document.getElementById("undeliveredOrdersTable");
            }
            tr = table.getElementsByTagName("tr");

            checkboxes = document.getElementsByName("orderStatus");
            let checkedStatus = [];
            for (c of checkboxes) {
                if (c.checked) {
                    checkedStatus.push(c.value);
                }
            }

            checkboxes = document.getElementsByName("cuisine");
            let checkedCuisine = [];
            for (c of checkboxes) {
                if (c.checked) {
                    checkedCuisine.push(c.value);
                }
            }

            //SEARCH
            searchFunction(this.searchText, tr, 2);

            //FILTER - CUISINE
            filterCuisineFunction(checkedCuisine, tr, 2);

            //PRICE
            filterPriceFunction(this.fromPrice, this.toPrice, tr, 3);

            //DATE
            filterDateFunction(this.fromDate, this.toDate, tr, 0);

        }
    }
})