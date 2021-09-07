Vue.component("manager-orders", {
    data: function() {
        return {
            mode: 'all',
            modalMode: '',
            selectedOrder: undefined,
            orderStatuses: [
                { id: 'Processing', value: 'Obrada' },
                { id: 'InPreparation', value: 'U pripremi' },
                { id: 'WaitingForDelivery', value: 'Čeka dostavljača' },
                { id: 'InTransport', value: 'U transportu' }
            ],
            orders: [],
            originalOrders: [],
            hover: '',
            searchText: '',
            fromPrice: '',
            toPrice: '',
            restaurantID: '',
            fromTime: '',
            toTime: '',
            delivereryRequests: [],
            selectedDeliveryRequest: undefined,
            requestKey: 0
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.restaurantID = response.data.restaurantID;

                    axios
                        .get("/order/getCurrentOrdersByRestaurant/" + this.restaurantID)
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
        <h1 style="text-align: center;">Pregled aktuelnih porudžbina restorana
        </h1>
        <div class="users-search">
            <div class="search-text-div">
                <i style="text-align: center;" class="fa fa-search"></i>
                <input type="text" placeholder="Pretraži po kupcu..." id="search-text-mo" v-model="searchText" v-on:keyup="findOrder">
            </div>
            <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
            <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
            <div >
                <input v-on:click="ordersToBeDelivered" type="checkbox" id="ordersToBeDelivered" value="ordersToBeDelivered">
                <label style="padding: 10px 10px;font-size: 15px;white-space: nowrap;" class="full-radio-btn-label" for="ordersToBeDelivered">Porudžbine koje čekaju dostavljača</label>
            </div>
        </div>
        
        <div class="filter-div" id="filter-div" style="top:250px">
            <div class="filter-modal" id="filter-modal" style="position: relative;">
                <div v-on:click="filterClose" class="close-filter" style="position: absolute; right: 0;">+</div>
    
                <h2>Status porudžbine</h2>
                <div class="checkbox-btn-container-dark" >
                    <div v-for="status in orderStatuses">
                        <input type="checkbox" v-bind:id="status.id" name="orderStatus" v-bind:value="status.value" v-on:change="findOrder">
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
                    <h2>Vreme:</h2>
                    <label>Od:</label><input type="time" name="time" id="fromTime"  v-on:input="findOrder"><br>
                    <label>Do:</label><input type="time" name="time" id="toTime" v-on:input="findOrder" style="margin-left: 1px;">
                </div> 
                <div>
                    <button class="filter-btn" v-on:click="invalidate" id="filter-btn-do" style="white-space: nowrap;float:none">Poništi</button>
                </div>
            </div>
        </div>
                    

        <div class="content" style="display:block" >
            <table class="table-users" name="orders" id="managerCurrentOrders">
                <thead>
                    <tr>
                        <th v-on:click="sortByTime" id="timeTH">Vreme <i class="fa fa-sort "></i></th>
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
                            <div v-if="order.status == 'Processing'" class="order-processed-btn" v-on:click="orderProcessed(order)"
                                @mouseover="hover = order.orderID + 'p'"
                                @mouseleave="hover = ''">

                            <span v-if="hover != order.orderID + 'p'" class="delivery-btn-text">
                                <i class="fa fa-spinner" aria-hidden="true"></i> Obrada
                            </span>
                            <span v-if="hover == order.orderID + 'p'" class="delivery-btn-confirmation-text" style="transition: 0.2s;">
                                <i class="fa fa-cutlery" aria-hidden="true"></i> U pripremi
                            </span>
                            </div>

                            <div v-else-if="order.status == 'InPreparation'" class="order-prepared-btn" v-on:click="orderPrepared(order)"
                                @mouseover="hover = order.orderID + 'i'"
                                @mouseleave="hover = ''">

                            <span v-if="hover != order.orderID + 'i'" class="delivery-btn-text">
                                <i class="fa fa-cutlery" aria-hidden="true"></i> U pripremi
                            </span>
                            <span v-if="hover == order.orderID + 'i'" class="delivery-btn-confirmation-text" style="transition: 0.2s;">
                                <i class="fa fa-spinner" aria-hidden="true"></i> Čeka dostavljača
                            </span>
                            </div>

                            <div v-else class="order-status-black">
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
        v-on:orderProcessed="orderProcessed"
        v-on:orderPrepared="orderPrepared"></view-order>

        <div class="register" style="display:none;z-index:100" v-if="" id="delivery-requests-view" v-bind:selectedOrder="selectedOrder" >
            <div class="modal" style="height:auto; padding-bottom: 35px;">
            <div v-on:click="closeDeliveryRequests" class="close">+</div>
                <div class="login-title" style="margin: auto 0;">
                    <h3 style="color: white; font-weight: bolder;"> ZAHTEVI ZA DOSTAVU </h3>
                </div>
                <label style="color: white;display: block;margin:15px 0 1em 0;font-weight: bold;">Odaberite dostavljača:</label>
                <div class="radio-btn-container" style="width: 60%;height: 200px;box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.2); min-width: fit-content" :key="requestKey">
                    <div v-for="request in delivereryRequests">
                        <input type="radio" v-bind:id=request.deliverer.username name="contact" v-bind:value=request.deliverer.username>
                        <label v-if="request.requestProcessed == false" style="font-size: 1.25em;" class="radio-label" v-bind:for=request.deliverer.username v-on:click="selectDeliveryRequest(request)"> <span style="margin-left: 10px;"> 
                            {{request.deliverer.name}} {{request.deliverer.surname}} </span> 
                            <span style="margin-left: auto; margin-right: 10px;">{{request.deliverer.username}}</span></label>
                    </div>
                    <!-- <div v-if="delivereryRequests.length == 0"> <h3 style="color: white;">Niko nije poslao zahtev</h3> </div> -->
                </div>
                <label class="error" id="deliverRequestErr" name="labels" display="hidden"> </label>

                <div class="delivery-request-btns">
                    <button class="delivery-req-btns refuse-delivery-btn" v-on:click="rejectDeliveryRequest()">Odbi</button>
                    <button class="delivery-req-btns approve-delivery-btn" v-on:click="approveDeliveryRequest()">Odobri</button>
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
            if (order.status != "WaitingForDelivery") {
                this.modalMode = "showOrder";
                this.selectedOrder = order;
            }
            else {
                this.selectedOrder = order;
                this.delivereryRequests = order.deliveryRequests;
                document.querySelector('#delivery-requests-view').style.display = 'flex';
            }
        },
        closeModal: function(event) {
            this.modalMode = "";
            this.selectedOrder = undefined;
        },
        orderProcessed: function(order) {
            if (order == '' || order == undefined || order == null) {
                order = this.selectedOrder;
            }
            axios
                .put("/order/process/" + order.orderID + "/" + order.customerUsername)
                .then(response => {
                    if (response.data != null) {
                        order.status = "InPreparation";
                        this.closeModal();
                    }
                })
            event.stopPropagation();
        },
        orderPrepared: function(order) {
            if (order == '' || order == undefined || order == null) {
                order = this.selectedOrder;
            }
            axios
                .put("/order/prepare/" + order.orderID + "/" + order.customerUsername)
                .then(response => {
                    if (response.data != null) {
                        order.status = "WaitingForDelivery";
                        this.closeModal();
                    }
                })
            event.stopPropagation();
        },
        selectDeliveryRequest: function(request) {
            this.selectedDeliveryRequest = request;
        },
        approveDeliveryRequest: function() {
            if (!this.selectedDeliveryRequest) {
                document.getElementById('deliverRequestErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate selektovati dostavljača!';
            } else {
                let RequestForDeliveryDTO = {
                    orderID: this.selectedOrder.orderID,
                    delivererUsername: this.selectedDeliveryRequest.deliverer.username,
                    customerUsername: this.selectedOrder.customerUsername
                }
                axios
                    .put("/order/approveDeliveryRequest", JSON.stringify(RequestForDeliveryDTO))
                    .then(response => {
                        if (response.data != null) {
                            this.selectedOrder.status = "InTransport";
                            document.querySelector('#delivery-requests-view').style.display = 'none';
                            this.selectedDeliveryRequest = undefined;
                             
                        }
                })

            }
        },
        rejectDeliveryRequest: function() {
            if (!this.selectedDeliveryRequest) {
                document.getElementById('deliverRequestErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Morate selektovati dostavljača!';
            } else {
                let RequestForDeliveryDTO = {
                    orderID: this.selectedOrder.orderID,
                    delivererUsername: this.selectedDeliveryRequest.deliverer.username,
                    customerUsername: this.selectedOrder.customerUsername
                }
                axios
                    .put("/order/rejectDeliveryRequest", JSON.stringify(RequestForDeliveryDTO))
                    .then(response => {
                        if (response.data != null) {
                            this.selectedDeliveryRequest.requestProcessed = true;
                            this.requestKey = this.requestKey + 1;
                        }
                })

            }
        },
        closeDeliveryRequests: function() {
            document.getElementById('deliverRequestErr').style.display = 'none' ;
            document.querySelector('#delivery-requests-view').style.display = 'none';
            this.selectedOrder = undefined;
            this.selectedDeliveryRequest = undefined;
        },
        ordersToBeDelivered: function() {
            if (this.mode == 'all') {
                this.mode = 'toBeDelivered';
                this.orders = this.orders.filter(function(element) {
                    if (element.status == "WaitingForDelivery") {
                        return true;
                    } else {
                        return false;
                    }
                });
            } else {
                this.mode = 'all';
                this.orders = this.originalOrders;
            }
        },
        invalidate: function() {
            this.toPrice = '';
            this.fromPrice = '';
            this.findOrder();
        },
        findOrder: function() {

            table = document.getElementById("managerCurrentOrders");
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

             //TIME
             fromTime = document.getElementById("fromTime").value;
             toTime = document.getElementById("toTime").value;
             filterTimeFunction(fromTime, toTime, tr, 0);
        },
        sortByTime: function() {
            let timeTH = document.querySelector('#timeTH');
            if (timeTH.innerHTML.includes('sort-desc')) {
                sortTable('managerCurrentOrders', 0, 'time', true);
                timeTH.innerHTML = 'Vreme <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerCurrentOrders', 0, 'time', false);
                timeTH.innerHTML = 'Vreme <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('time');
        },
        sortByCustomer: function() {
            let customerTH = document.querySelector('#customerTH');
            if (customerTH.innerHTML.includes('sort-desc')) {
                sortTable('managerCurrentOrders', 1, 'customer', true);
                customerTH.innerHTML = 'Kupac <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerCurrentOrders', 1, 'customer', false);
                customerTH.innerHTML = 'Kupac <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('customer');
        },
        sortByPrice: function() {
            let priceTH = document.querySelector('#priceTH');
            if (priceTH.innerHTML.includes('sort-desc')) {
                sortTable('managerCurrentOrders', 2, 'price', true);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerCurrentOrders', 2, 'price', false);
                priceTH.innerHTML = 'Cena <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('price');
        },
        sortByStatus: function() {
            let statusTH = document.querySelector('#statusTH');
            if (statusTH.innerHTML.includes('sort-desc')) {
                sortTable('managerCurrentOrders', 3, 'status', true);
                statusTH.innerHTML = 'Status <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            } else {
                sortTable('managerCurrentOrders', 3, 'status', false);
                statusTH.innerHTML = 'Status <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('status');
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