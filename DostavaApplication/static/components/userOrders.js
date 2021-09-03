Vue.component("user-orders", {
    data: function() {
        return {
            mode: 'all',
            modalMode: '',
            selectedOrder: undefined,
            orderStatuses: [
                { id: 'Processing', value: 'Obrada' },
                { id: 'InPreparation', value: 'U pripremi' },
                { id: 'WaitingForDelivery', value: 'Čeka dostavljača' },
                { id: 'InTransport', value: 'U transportu' },
                { id: 'Delivered', value: 'Dostavljena' },
                { id: 'Cancelled', value: 'Otkazana' }
            ],
            cuisines: [
                { id: 'Italian', value: 'Italijanska' },
                { id: 'Chinese', value: 'Kineska' },
                { id: 'Barbecue', value: 'Rostilj' },
                { id: 'American', value: 'Americka hrana' },
                { id: 'Sweets', value: 'Poslastice' }
            ],
            orders: [],
            originalOrders: [],
            hover: '',
            searchText: '',
            fromPrice: '',
            toPrice: '',
            fromDate: '',
            toDate: '',
            comment: 'za ostavljanje ocene boolean, nije izmenjeno'
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.orders = response.data.allOrders;
                    this.originalOrders = this.orders;
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
                <input type="text" placeholder="Pretraži po nazivu restorana.." v-model="searchText" v-on:keyup="findOrder">
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
                    <input type="checkbox" v-bind:id="status.id" name="orderStatus" v-bind:value="status.value" v-on:change="findOrder">
                    <label v-bind:for="status.id">{{status.value}}</label>
                </div>
            </div>
            <h2>Tip restorana</h2>
            <div class="checkbox-btn-container-dark">
                <div v-for="cuisine in cuisines">
                    <input type="checkbox" v-bind:id="cuisine.id" name="cuisine" v-bind:value="cuisine.id" v-on:change="findOrder">
                    <label  v-bind:for="cuisine.id">{{cuisine.value}}</label>
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
        <table class="table-users" name="orders" id="customerOrders">
            <thead>
                <tr>
                    <th v-on:click="sortByDate" id="dateTH">Datum <i class="fa fa-sort "></i></th>
                    <th v-on:click="sortByRestaurant" id="restaurantTH">Restoran <i class="fa fa-sort "></i></th>
                    <th v-on:click="sortByPrice" id="priceTH">Cena <i class="fa fa-sort"></i></th>
                    <th v-on:click="sortByStatus" id="statusTH">Status <i class="fa fa-sort"></i></th>
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
                this.orders = this.orders.filter(function(element) {
                    if (element.status == "Delivered") {
                        return false;
                    } else {
                        return true;
                    }
                });
            } else {
                this.mode = 'all';
                this.orders = this.originalOrders;
            }
        },
        cancelOrder: function(order) {
            axios
                .put("order/cancel/" + order.orderID)
                .then(response => {
                    if (response.data != null) {
                        order.status = "Cancelled";
                    }
                })
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

        },
        invalidate: function() {
            this.toDate = '';
            this.toPrice = '';
            this.fromDate = '';
            this.fromPrice = '';
            this.filerOrder();
        },
        findOrder: function() {

            table = document.getElementById("customerOrders");
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
            searchFunction(this.searchText, tr);

            //FILTER - STATUS
            filterStatusFunction(checkedStatus, tr);

            //FILTER - CUISINE
            filterCuisineFunction(checkedCuisine, tr);

            //PRICE
            filterPriceFunction(this.fromPrice, this.toPrice, tr);

            //DATE
            filterDateFunction(this.fromDate, this.toDate, tr);

        },
        sortByDate: function() {
            let dateTH = document.querySelector('#dateTH');
            if (dateTH.innerHTML.includes('sort-desc')) {
                sortTable('customerOrders', 0, 'date', true);
                dateTH.innerHTML = 'Datum <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('customerOrders', 0, 'date', false);
                dateTH.innerHTML = 'Datum <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('date');
        },
        sortByRestaurant: function() {
            let restaurantTH = document.querySelector('#restaurantTH');
            if (restaurantTH.innerHTML.includes('sort-desc')) {
                sortTable('customerOrders', 1, 'restaurant', true);
                restaurantTH.innerHTML = 'Restoran <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('customerOrders', 1, 'restaurant', false);
                restaurantTH.innerHTML = 'Restoran <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('restaurant');
        },
        sortByPrice: function() {
            let priceTH = document.querySelector('#priceTH');
            if (priceTH.innerHTML.includes('sort-desc')) {
                sortTable('customerOrders', 2, 'price', true);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('customerOrders', 2, 'price', false);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('price');
        },
        sortByStatus: function() {
            let statusTH = document.querySelector('#statusTH');
            if (statusTH.innerHTML.includes('sort-desc')) {
                sortTable('customerOrders', 3, 'status', true);
                statusTH.innerHTML = 'Status <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('customerOrders', 3, 'status', false);
                statusTH.innerHTML = 'Status <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('status');
        },
        resetOtherSorts: function(activeSort) {
            if (activeSort != "date") {
                let dateTH = document.querySelector('#dateTH');
                dateTH.innerHTML = 'Datum <i class="fa fa-sort" aria-hidden="true"></i>';
            }
            if (activeSort != "restaurant") {
                let restaurantTH = document.querySelector('#restaurantTH');
                restaurantTH.innerHTML = 'Restoran <i class="fa fa-sort" aria-hidden="true"></i>';
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

function filterDateFunction(fromDate, toDate, tableRows) {
    for (j = 1; j < tableRows.length; j++) {
        show = false;

        if (tableRows[j].style.display != "none") {
            td = tableRows[j].getElementsByTagName("td")[0];
            date = new Date(td.innerText);
            from = new Date(fromDate);
            to = new Date(toDate);
            if (fromDate != '' && toDate != '') {
                if (from <= date && date <= to) {
                    show = true;
                }
            } else if (fromDate != '' && toDate == '') {
                if (from <= date) {
                    show = true;
                }
            } else if (fromDate == '' && toDate != '') {
                if (date <= to) {
                    show = true;
                }
            } else {
                show = true;
            }

        }

        if (!show) {
            tableRows[j].style.display = 'none';
        } else if (tableRows[j].style.display != 'none') {
            tableRows[j].style.display = '';
        }
    }
}

function filterPriceFunction(fromPrice, toPrice, tableRows) {
    for (j = 1; j < tableRows.length; j++) {
        show = false;

        if (tableRows[j].style.display != "none") {
            td = tableRows[j].getElementsByTagName("td")[2];
            price = parseInt(td.innerText);
            if (fromPrice != '' && toPrice != '') {
                if (fromPrice <= price && price <= toPrice) {
                    show = true;
                }
            } else if (fromPrice != '' && toPrice == '') {
                if (fromPrice <= price) {
                    show = true;
                }
            } else if (fromPrice == '' && toPrice != '') {
                if (price <= toPrice) {
                    show = true;
                }
            } else {
                show = true;
            }

        }

        if (!show) {
            tableRows[j].style.display = 'none';
        } else if (tableRows[j].style.display != 'none') {
            tableRows[j].style.display = '';
        }
    }
}

function filterCuisineFunction(checkedCuisines, tableRows) {
    for (j = 1; j < tableRows.length; j++) {
        show = false;
        for (i = 0; i < checkedCuisines.length; i++) {
            if (tableRows[j].style.display != "none") {
                td = tableRows[j].getElementsByTagName("td")[1];
                label = td.getElementsByTagName("label")[1];
                if (label.innerText.includes(checkedCuisines[i])) {
                    show = true;
                }
            }
        }
        if (!show && checkedCuisines.length != 0) {
            tableRows[j].style.display = 'none';
        } else if (tableRows[j].style.display != 'none') {
            tableRows[j].style.display = '';
        }
    }
}

function filterStatusFunction(checkedStatuses, tableRows) {
    for (j = 1; j < tableRows.length; j++) {
        show = false;
        for (i = 0; i < checkedStatuses.length; i++) {
            if (tableRows[j].style.display != "none") {
                td = tableRows[j].getElementsByTagName("td")[3];
                if (checkedStatuses[i] == "Dostavljena") {
                    if (td.innerText.includes(checkedStatuses[i]) || td.innerText.includes("Oceni")) {
                        show = true;
                    }
                } else if (td.innerText.includes(checkedStatuses[i])) {
                    show = true;
                }
            }
        }
        if (!show && checkedStatuses.length != 0) {
            tableRows[j].style.display = 'none';
        } else if (tableRows[j].style.display != 'none') {
            tableRows[j].style.display = '';
        }
    }
}

function searchFunction(searchTxt, tableRows) {
    let searchParts = searchTxt.trim().split(' ');
    for (i = 0; i < searchParts.length; i++) {
        for (j = 1; j < tableRows.length; j++) {
            td = tableRows[j].getElementsByTagName("td")[1];
            label = td.getElementsByTagName("label")[0];
            if (label.innerText.toLocaleLowerCase().includes(searchParts[i].toLocaleLowerCase())) {
                tableRows[j].style.display = "";
            } else {
                tableRows[j].style.display = "none";
            }
        }
    }
}