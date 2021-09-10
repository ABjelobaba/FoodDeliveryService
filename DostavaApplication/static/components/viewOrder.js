Vue.component("view-order", {
    props: ['selectedOrder'],
    data: function() {
        return {
            restaurant: '',
            mode: '',
            loggedInUser: ''
        }

    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data.role;
                } else {
                    window.location.href = '#/';
                }
            })

        axios.
        get('/restaurant/' + this.selectedOrder.restaurantID)
            .then(response => {
                if (response.data != null) {
                    this.restaurant = response.data;
                }
            })

        if (window.location.href.includes('availableOrders')) {
            this.mode = 'waitingDeliveryOrders';
        } else if (window.location.href.includes('allOrders')) {
            this.mode = 'allOrders';
        }
    },
    template: `
    <div>
        <div class="register" style="display:flex;z-index:100" id="viewOrderModal">
            <div class="modal" style="height:auto">
                <div v-on:click="$emit('closeModal')" class="close">+</div>

                <div >
                    <div class="order-articles-title-div">
                        <div class="order-articles-title" >
                            <p > {{restaurant.name}} </p>
                            <p > {{selectedOrder.orderDate}} </p>
                        </div>
                        <div class="order-status-white" style="text-align:right;margin-right:15%">
                            <order-status-cell v-bind:orderStatus="selectedOrder.status" style="margin: 0 auto;"></order-status-cell> 
                        </div>
                    </div>
                    
                    <div style="margin-top: 7%;" >
                        <div style="overflow-y: auto; max-height: 290px;">
                        <article-in-order v-for="article in selectedOrder.orderedItems" v-bind:key="article.item.name" v-bind:article="article"></article-in-order>
                        </div>

                        <div style="border:1px solid white;margin: 5% 10% 2%" ></div>
                        <div class="price-calculation-order-view">
                                <p class="pc-order-view">  <span>Dostava</span>   <span>+ 200.00 RSD</span> </p>
                                <p class="pc-order-view">  <span>Ukupna cena</span>   <span>{{selectedOrder.price}}.00 RSD</span> </p>
                        </div>

                        <button v-if="selectedOrder.status =='Processing' && loggedInUser == 'Customer'" v-on:click="cancelOrder(selectedOrder)" class="cancle-btn" style="margin: 20px 20%"> Otkaži</button>
                        <button v-if="mode == '' && selectedOrder.status =='Delivered' && !selectedOrder.comment && loggedInUser == 'Customer' && !selectedOrder.reviewed" v-on:click="$emit('openRateModal')" class="rate-btn" style="margin: 20px 20%"> Oceni</button>
                        <button v-if="mode == 'waitingDeliveryOrders'" style="margin: 20px 20%;width: -webkit-fill-available;" class="ask-for-delivery-btn" v-on:click="$emit('requestOrder')"> Zatraži porudžbinu</button>
                        <button v-if="mode == 'allOrders' && selectedOrder.status == 'InTransport'" style="margin: 20px 20%;width: -webkit-fill-available;" class="ask-for-delivery-btn" v-on:click="$emit('confirmDelivery')"> Dostavi porudžbinu</button>
                        <button v-if="selectedOrder.status =='Processing' && loggedInUser == 'Manager'" class="ask-for-delivery-btn" style="margin: 20px 20%" v-on:click="$emit('orderProcessed')"> Prihvati porudžbinu</button>
                        <button v-if="selectedOrder.status =='InPreparation' && loggedInUser == 'Manager'" class="ask-for-delivery-btn" style="margin: 20px 20%" v-on:click="$emit('orderPrepared')"> Porudžbina je spremna</button>
                    </div>
                </div>

            </div>
        </div>

        
    </div>
             `,
    methods: {
        cancelOrder: function(order) {
            axios
                .put("order/cancel/" + order.orderID)
                .then(response => {
                    if (response.data != null) {
                        order.status = "Cancelled";
                    }
                })
            event.stopPropagation();
        }

    }
})