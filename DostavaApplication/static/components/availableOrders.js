Vue.component("available-orders", {
    data: function() {
        return {
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
                { id: 'italian', value: 'Italijanska' },
                { id: 'chinese', value: 'Kineska' },
                { id: 'barbecue', value: 'Rostilj' },
                { id: 'american', value: 'Americka hrana' },
                { id: 'sweets', value: 'Poslastice' }
            ],
            orders: [],
            searchText: '',
            fromPrice: '',
            toPrice: '',
            fromTime: '',
            toTime: ''
        }

    },
    created: function() {

    },
    template: `
    <div>
        <h1 style="text-align: center;">Pregled dostupnih porudžbina
        </h1>
        <div class="users-search">
                <div class="search-text-div">
                    <i style="text-align: center;" class="fa fa-search"></i>
                    <input type="text" placeholder="Pretraži po nazivu restorana.." v-model="searchText" v-on:keyup="findOrder">
                </div>  
                <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
        </div>


        <div class="filter-div" style="top:250px" id="advancedSearch">
            <div class="filter-modal" id="advancedSearch-modal" style="position: relative;">
                <div v-on:click="advancedSearchClose" class="close-filter" style="position: absolute; right: 0;">+</div>

                <div style="margin:20px">
                    <h2>Cena:</h2>
                    <label>Od:</label><input type="number" min='0' name="price" id="fromPrice" v-model="fromPrice" v-on:change="findOrder" placeholder="00000">(.00 RSD)<br>
                    <label>Do:</label><input type="number" min='0' name="price" id="toPrice" v-model="toPrice" v-on:change="findOrder" placeholder="00000">(.00 RSD)
                </div>
                <div style="margin:20px">
                    <h2>Vreme:</h2>
                    <label>Od:</label><input type="time" name="time" id="fromTime"  v-on:input="findOrder"><br>
                    <label>Do:</label><input type="time" name="time" id="toTime" v-on:input="findOrder">
                </div> 
            </div>
        </div>

        <div class="content" style="display:block" >
            <table class="table-users" id="orders">
                <thead>
                    <tr>
                        <th v-on:click="sortByTime" id="timeTH">Vreme <i class="fa fa-sort "></i></th>
                        <th v-on:click="sortByCustomer" id="customerTH">Kupac <i class="fa fa-sort"></i></th>
                        <th v-on:click="sortByRestaurant" id="restaurantTH">Restoran <i class="fa fa-sort "></i></th>
                        <th v-on:click="sortByPrice" id="priceTH">Cena <i class="fa fa-sort"></i></th>
                        <th> </th>
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
                        <td ><div class="permission-to-deliver-btn" v-on:click="requestOrder(order)"> Zatraži porudžbinu </div></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <view-order v-if="selectedOrder != undefined" 
                    v-bind:selectedOrder="selectedOrder" 
                    v-on:closeModal="closeModal"
                    v-on:requestOrder="requestOrder"></view-order>

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

        axios
            .get("order/getWaitingDeliveryOrders")
            .then(response => {
                if (response.data != null) {
                    this.orders = response.data;
                }
            })
    },
    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        showOrder: function(order) {
            this.selectedOrder = order;
        },
        closeModal: function() {
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
        },
        requestOrder: function(order) {
            /* if (order == '' || order == undefined || order == null) {
                order = this.selectedOrder;
            }
            axios
                .put("/order/setInTransport/" + order.orderID + "/" + order.customerUsername)
                .then(response => {
                    if (response.data != null && response.data != "") {
                        order.status = "InTransport";
                        this.orders = this.orders.filter(function(value, index, arr) {
                            if (value.status == "WaitingForDelivery") {
                                return true;
                            } else {
                                return false;
                            }
                        });
                        this.closeModal();
                    }
                })
            event.stopPropagation(); */
        },
        findOrder: function() {
            tr = document.getElementById("orders").getElementsByTagName('tr');
            //SEARCH
            searchFunction(this.searchText, tr, 2);

            //PRICE
            filterPriceFunction(this.fromPrice, this.toPrice, tr, 3);

            //TIME
            fromTime = document.getElementById("fromTime").value;
            toTime = document.getElementById("toTime").value;
            filterTimeFunction(fromTime, toTime, tr, 0);
        },
        sortByTime: function() {
            let timeTH = document.querySelector('#timeTH');
            if (timeTH.innerHTML.includes('sort-desc')) {
                sortTable('orders', 0, 'time', true);
                timeTH.innerHTML = 'Vreme <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('orders', 0, 'time', false);
                timeTH.innerHTML = 'Vreme <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('time');
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
        resetOtherSorts: function(activeSort) {
            if (activeSort != "time") {
                let timeTH = document.querySelector('#timeTH');
                timeTH.innerHTML = 'Vreme <i class="fa fa-sort" aria-hidden="true"></i>';
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
        }
    }
})

function filterTimeFunction(fromTime, toTime, tableRows, cellWithData) {
    for (j = 1; j < tableRows.length; j++) {
        show = false;

        if (tableRows[j].style.display != "none") {
            td = tableRows[j].getElementsByTagName("td")[cellWithData];
            tdTimeSplit = td.innerText.split(':');
            tdTime = new Date();
            tdTime.setHours(tdTimeSplit[0], tdTimeSplit[1].slice(0, 2), 0);
            from = new Date();
            tdTimeSplit = fromTime.split(':');
            from.setHours(tdTimeSplit[0], tdTimeSplit[1], 0);
            to = new Date();
            tdTimeSplit = toTime.split(':');
            to.setHours(tdTimeSplit[0], tdTimeSplit[1], 0);
            if (fromTime != '' && toTime != '') {
                if (from <= tdTime && tdTime <= to) {
                    show = true;
                }
            } else if (fromTime != '' && toTime == '') {
                if (from <= tdTime) {
                    show = true;
                }
            } else if (fromTime == '' && toTime != '') {
                if (tdTime <= to) {
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