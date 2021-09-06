Vue.component("manager-previous-orders", {
    data: function() {
        return {
            mode: 'all',
            modalMode: '',
            selectedOrder: undefined,
            orderStatuses: [
                { id: 'Delivered', value: 'Dostavljena' },
                { id: 'Cancelled', value: 'Otkazana' }
            ],
            orders: [],
            originalOrders: [],
            hover: '',
            searchText: '',
            fromPrice: '',
            toPrice: '',
            fromDate: '',
            toDate: '',
            restaurantID: ''
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.restaurantID = response.data.restaurantID;

                    axios
                        .get("/order/getPreviousOrdersByRestaurant/" + this.restaurantID)
                        .then(response => {
                            if (response.data != null) {
                                this.orders = response.data;
                                this.originalOrders = this.orders;
                            } else {
                                window.location.href = '#/';
                            }
                        })
                } else {
                    window.location.href = '#/';
                }
            })

    },
    template: `
    <div>
        <h1 style="text-align: center;">Pregled porudžbina restorana
        </h1>
        <div class="users-search">
            <div class="search-text-div">
                <i style="text-align: center;" class="fa fa-search"></i>
                <input type="text" placeholder="Pretraži po kupcu..." id="search-text-mo" v-model="searchText" v-on:keyup="findOrder">
            </div>
            <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
            <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        </div>
        
        <div class="filter-div" id="filter-div" style="top:250px">
            <div class="filter-modal" id="filter-modal" style="position: relative;">
                <div v-on:click="filterClose" class="close-filter" style="position: absolute; right: 0;">+</div>
    
                <h2>Status porudžbine</h2>
                <div class="checkbox-btn-container-dark" >
                    <div v-for="status in orderStatuses">
                        <input type="checkbox" v-bind:id="status.id" name="orderStatus" v-bind:value="status.value"  v-on:change="findOrder">
                        <label v-bind:for="status.id">{{status.value}}</label>
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
            <table class="table-users" name="orders" id="managerPreviousOrders">
                <thead>
                    <tr>
                        <th v-on:click="sortByDate" id="dateTH">Datum <i class="fa fa-sort "></i></th>
                        <th v-on:click="sortByCustomer" id="customerTH">Kupac <i class="fa fa-sort"></i></th>
                        <th v-on:click="sortByPrice" id="priceTH">Cena <i class="fa fa-sort"></i></th>
                        <th v-on:click="sortByStatus" id="statusTH">Status <i class="fa fa-sort"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" v-on:click="showOrder(order)">
                        <td>{{order.orderDate}}</td>
                        <td>
                            <div class="user-address-delivery">
                                <label>
                                    <h3>{{order.customerName}} {{order.customerSurname}}</h3>
                                    <h4>{{order.address}}</h4>
                                </label>
                            </div>
                        </td>
                        <td>{{order.price}}.00 RSD</td>
                        <td >
                            <div class="order-status-black">
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
        v-on:closeModal="closeModal"
        v-on:openRateModal="openRateModal(selectedOrder)"></view-order>

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
            this.modalMode = "showOrder";
            this.selectedOrder = order;
        },
        closeModal: function(event) {
            this.modalMode = "";
            this.selectedOrder = undefined;
        },
        invalidate: function() {
            this.toDate = '';
            this.toPrice = '';
            this.fromDate = '';
            this.fromPrice = '';
            this.findOrder();
        },
        findOrder: function() {

            table = document.getElementById("managerPreviousOrders");
            tr = table.getElementsByTagName("tr");

            checkboxes = document.getElementsByName("orderStatus");
            let checkedStatus = [];
            for (c of checkboxes) {
                if (c.checked) {
                    checkedStatus.push(c.value);
                }
            }

            //SEARCH
            searchFunction(this.searchText, tr, 1);

            //FILTER - STATUS
            filterStatusFunction(checkedStatus, tr, 3);

            //PRICE
            filterPriceFunction(this.fromPrice, this.toPrice, tr, 2);

            //DATE
            filterDateFunction(this.fromDate, this.toDate, tr, 0);

        },
        sortByDate: function() {
            let dateTH = document.querySelector('#dateTH');
            if (dateTH.innerHTML.includes('sort-desc')) {
                sortTable('managerPreviousOrders', 0, 'date', true);
                dateTH.innerHTML = 'Datum <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerPreviousOrders', 0, 'date', false);
                dateTH.innerHTML = 'Datum <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('date');
        },
        sortByCustomer: function() {
            let customerTH = document.querySelector('#customerTH');
            if (customerTH.innerHTML.includes('sort-desc')) {
                sortTable('managerPreviousOrders', 1, 'customer', true);
                customerTH.innerHTML = 'Kupac <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerPreviousOrders', 1, 'customer', false);
                customerTH.innerHTML = 'Kupac <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('customer');
        },
        sortByPrice: function() {
            let priceTH = document.querySelector('#priceTH');
            if (priceTH.innerHTML.includes('sort-desc')) {
                sortTable('managerPreviousOrders', 2, 'price', true);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerPreviousOrders', 2, 'price', false);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('price');
        },
        sortByStatus: function() {
            let statusTH = document.querySelector('#statusTH');
            if (statusTH.innerHTML.includes('sort-desc')) {
                sortTable('managerPreviousOrders', 3, 'status', true);
                statusTH.innerHTML = 'Status <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerPreviousOrders', 3, 'status', false);
                statusTH.innerHTML = 'Status <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('status');
        },
        resetOtherSorts: function(activeSort) {
            if (activeSort != "date") {
                let dateTH = document.querySelector('#dateTH');
                dateTH.innerHTML = 'Datum <i class="fa fa-sort" aria-hidden="true"></i>';
            }
            if (activeSort != "customer") {
                let customerTH = document.querySelector('#customerTH');
                customerTH.innerHTML = 'Kupac <i class="fa fa-sort" aria-hidden="true"></i>';
            }
            if (activeSort != "price") {
                let priceTH = document.querySelector('#priceTH');
                priceTH.innerHTML = 'Cena <i class="fa fa-sort" aria-hidden="true"></i>';
            }
            if (activeSort != "status") {
                let statusTH = document.querySelector('#statusTH');
                statusTH.innerHTML = 'Status <i class="fa fa-sort" aria-hidden="true"></i>';
            }
        }
    }
})