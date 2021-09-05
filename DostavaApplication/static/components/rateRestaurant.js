Vue.component("rate-restaurant", {
    props: ['selectedOrder'],
    data: function() {
        return {
            restaurant: '',
            commentText: ''
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
                        <input type="radio" name="star" id="star1" value="5">
                        <label for="star1"></label>
                        <input type="radio" name="star" id="star2" value="4">
                        <label for="star2"></label>
                        <input type="radio" name="star" id="star3" value="3">
                        <label for="star3"></label>
                        <input type="radio" name="star" id="star4" value="2">
                        <label for="star4"></label>
                        <input type="radio" name="star" id="star5" value="1">
                        <label for="star5"></label>
                    </div>

                    <label>Komentar:</label>
                    <textarea placeholder="Unesite vaš komentar.." v-model="commentText"></textarea>
                    <button v-if="selectedOrder.status =='Delivered' && !selectedOrder.comment" v-on:click="rate" class="rate-btn" style="margin: 20px 20%"> Oceni</button>
                    <label class="error" style="color:#ee2929" id="error" name="labels" display="hidden"> </label>
                </div>
            </div>

        </div>
    </div>
</div> `,
    methods: {
        rate: function() {
            let stars = document.querySelector("input[type='radio'][name='star']:checked");
            if (stars != null || (this.commentText != '' && this.commentText != undefined)) {
                if (document.getElementById('star1').checked) {
                    reviewRating = 5;
                } else if (document.getElementById('star2').checked) {
                    reviewRating = 4;
                } else if (document.getElementById('star3').checked) {
                    reviewRating = 3;
                } else if (document.getElementById('star4').checked) {
                    reviewRating = 2;
                } else {
                    reviewRating = 1;
                }

                let reviewDTO = {
                    customerUsername: this.selectedOrder.customerUsername,
                    restaurantID: this.restaurant.restaurantID,
                    review: this.commentText,
                    rating: reviewRating
                }

                axios
                    .post('/reviews/addReview', JSON.stringify(reviewDTO))
                    .then(response => {
                        if (response.data != null && response.data != "") {
                            this.$emit('orderRated');
                        }
                    })

            } else {
                document.getElementById('error').innerHTML = "Popunite jedno od navedenih polja kako bi podelili vaše mišljenje o restoranu sa drugima!";
            }
        }
    }
})