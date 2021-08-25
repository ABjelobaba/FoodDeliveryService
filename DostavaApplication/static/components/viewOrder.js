Vue.component("view-order", {
    props: ['selectedOrder'],
    data: function() {
        return {}

    },

    template: `
    <div>
        <div class="register" style="display:flex;z-index:100" id="viewOrderModal">
            <div class="modal" style="height:auto">
                <div v-on:click="$emit('newUserClose')" class="close">+</div>

                <div >
                    <div class="order-articles-title-div">
                        <div class="order-articles-title" >
                            <p > {{selectedOrder.restaurant.name}} </p>
                            <p > {{selectedOrder.date}} </p>
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

                        <button v-if="selectedOrder.status =='processing'" v-on:click="cancelOrder(selectedOrder)" class="cancle-btn" style="margin: 20px 20%"> Otkaži</button>
                        <button v-if="selectedOrder.status =='finished' && !selectedOrder.comment" v-on:click="$emit('openRateModal')" class="rate-btn" style="margin: 20px 20%"> Oceni</button>
                    </div>
                </div>

            </div>
        </div>

        
    </div>
             `,

    methods: {
        cancelOrder: function(order) {
            order.status = "canceled";
            event.stopPropagation();
        }

    }
})