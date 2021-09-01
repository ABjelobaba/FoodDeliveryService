Vue.component("rate-restaurant", {
    props: ['selectedOrder'],
    data: function() {
        return {
            restaurant: ''
        }
    },
    created: function() {
        axios.
        get('/restaurant/' + this.selectedOrder.restaurantID)
            .then(response => {
                if (response.data != null) {
                    this.restaurant = response.data;
                }
            })
    },
    template: `
<div>
    <div class="register" style="display:flex;z-index:100">
        <div class="modal" style="height:auto">
            <div v-on:click="$emit('rateClose')" class="close">+</div>

            <div>
                <div class="order-articles-title-div">
                    <div class="order-articles-title">
                        <p> {{restaurant.name}} </p>
                        <p> {{selectedOrder.orderDate}} </p>
                    </div>
                </div>

                <div class="rating-div">
                    <div class="rating">
                        <input type="radio" name="star" id="star1">
                        <label for="star1"></label>
                        <input type="radio" name="star" id="star2">
                        <label for="star2"></label>
                        <input type="radio" name="star" id="star3">
                        <label for="star3"></label>
                        <input type="radio" name="star" id="star4">
                        <label for="star4"></label>
                        <input type="radio" name="star" id="star5">
                        <label for="star5"></label>
                    </div>

                    <label>Komentar:</label>
                    <textarea placeholder="Unesite vas komentar.."></textarea>
                    <button v-if="selectedOrder.status =='Delivered' && !selectedOrder.comment" v-on:click="$emit('orderRated')" class="rate-btn" style="margin: 20px 20%"> Oceni</button>
                </div>
            </div>

        </div>
    </div>
</div> `,
    methods: {}
})