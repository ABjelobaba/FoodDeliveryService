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
            originalOrders: [],
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
                    this.originalOrders = response.data;
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
            <table class="table-users" id="orders" >
                <thead>
                    <tr>
                        <th v-on:click="sortByDate" id="dateTH">Datum <i class="fa fa-sort "></i></th>
                        <th v-on:click="sortByCustomer" id="customerTH">Kupac <i class="fa fa-sort"></i></th>
                        <th v-on:click="sortByRestaurant" id="restaurantTH">Restoran <i class="fa fa-sort "></i></th>
                        <th v-on:click="sortByPrice" id="priceTH">Cena <i class="fa fa-sort"></i></th>
                        <th v-on:click="sortByStatus" id="statusTH">Status <i class="fa fa-sort"></i></th>
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
                            <div class="order-status-black" v-if="order.status != 'InTransport'" id="order.status">
                                <order-status-cell v-bind:orderStatus="order.status">
                                </order-status-cell>
                            </div>

                            <div v-else class="order-delivered-btn" id="order.status" v-on:click="confirmDelivery(order)"
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

            table = document.getElementById("orders");
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

        },
        sortByDate: function() {
            let dateTH = document.querySelector('#dateTH');
            if (dateTH.innerHTML.includes('sort-desc')) {
                sortTable('orders', 0, 'date', true);
                dateTH.innerHTML = 'Datum <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('orders', 0, 'date', false);
                dateTH.innerHTML = 'Datum <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('date');
        },
        sortByCustomer: function() {
            let customerTH = document.querySelector('#customerTH');
            if (customerTH.innerHTML.includes('sort-desc')) {
                sortTable('orders', 1, 'customer', true);
                customerTH.innerHTML = 'Kupac <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('orders', 1, 'customer', false);
                customerTH.innerHTML = 'Kupac <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('customer');
        },
        sortByRestaurant: function() {
            let restaurantTH = document.querySelector('#restaurantTH');
            if (restaurantTH.innerHTML.includes('sort-desc')) {
                sortTable('orders', 2, 'restaurant', true);
                restaurantTH.innerHTML = 'Restoran <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('orders', 2, 'restaurant', false);
                restaurantTH.innerHTML = 'Restoran <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('restaurant');
        },
        sortByPrice: function() {
            let priceTH = document.querySelector('#priceTH');
            if (priceTH.innerHTML.includes('sort-desc')) {
                sortTable('orders', 3, 'price', true);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('orders', 3, 'price', false);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('price');
        },
        sortByStatus: function() {
            let statusTH = document.querySelector('#statusTH');
            if (statusTH.innerHTML.includes('sort-desc')) {
                sortTable('orders', 4, 'status', true);
                statusTH.innerHTML = 'Status <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('orders', 4, 'status', false);
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

function sortTable(tableID, tdNumber, sortCriteria, reverse) {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById(tableID);
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[tdNumber];
            y = rows[i + 1].getElementsByTagName("TD")[tdNumber];

            if (sortCriteria == "date" && dateSort(x, y, reverse)) {
                shouldSwitch = true;
                break;
            } else if (sortCriteria == "customer" && customerSort(x, y, reverse)) {
                shouldSwitch = true;
                break;
            } else if (sortCriteria == "restaurant" && restaurantSort(x, y, reverse)) {
                shouldSwitch = true;
                break;
            } else if (sortCriteria == "price" && priceSort(x, y, reverse)) {
                shouldSwitch = true;
                break;
            } else if (sortCriteria == "status" && statusSort(x, y, reverse)) {
                shouldSwitch = true;
                break;
            } else if (sortCriteria == "time" && timeSort(x, y, reverse)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}

function timeSort(a, b, reverse) {
    var retVal;
    var aParts = a.innerHTML.slice(0, 5).split(':');
    aTime = new Date().setHours(aParts[0], aParts[1], 0);
    var bParts = b.innerHTML.slice(0, 5).split(':');
    bTime = new Date().setHours(bParts[0], bParts[1], 0);

    if (Number(aTime) < Number(bTime)) {
        retVal = true;
    } else {
        retVal = false;
    }

    if (reverse && Number(aTime) != Number(bTime)) {
        retVal = !retVal;
    }

    return retVal;
}

function dateSort(a, b, reverse) {
    var retVal;
    if (Number(Date.parse(a.innerHTML)) < Number(Date.parse(b.innerHTML))) {
        retVal = true;
    } else {
        retVal = false;
    }

    if (reverse && Number(Date.parse(a.innerHTML)) != Number(Date.parse(b.innerHTML))) {
        retVal = !retVal;
    }
    return retVal;
}

function customerSort(a, b, reverse) {
    var retVal;
    var aText = a.getElementsByTagName('h3')[0].innerHTML;
    var bText = b.getElementsByTagName('h3')[0].innerHTML;
    if (aText.localeCompare(bText) == -1) {
        retVal = true;
    } else {
        retVal = false;
    }

    if (reverse && aText.localeCompare(bText) != 0) {
        retVal = !retVal;
    }
    return retVal;
}

function restaurantSort(a, b, reverse) {
    var retVal;
    var aText = a.getElementsByTagName('label')[0].innerHTML;
    var bText = b.getElementsByTagName('label')[0].innerHTML;
    if (aText.localeCompare(bText) == -1) {
        retVal = true;
    } else {
        retVal = false;
    }

    if (reverse && aText.localeCompare(bText) != 0) {
        retVal = !retVal;
    }
    return retVal;
}

function priceSort(a, b, reverse) {
    var retVal;
    var aText = a.innerHTML.slice(0, -7);
    var bText = b.innerHTML.slice(0, -7);
    if (parseInt(aText) < parseInt(bText)) {
        retVal = true;
    } else {
        retVal = false;
    }

    if (reverse && parseInt(aText) != parseInt(bText)) {
        retVal = !retVal;
    }
    return retVal;
}

function statusSort(a, b, reverse) {
    var retVal;
    var aText = a.outerText.trim();
    var bText = b.outerText.trim();
    if (aText.localeCompare(bText) == -1) {
        retVal = true;
    } else {
        retVal = false;
    }

    if (reverse && aText.localeCompare(bText) != 0) {
        retVal = !retVal;
    }
    return retVal;
}