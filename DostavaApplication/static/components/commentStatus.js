Vue.component("comment-status", {
    props: ['comment', 'loggedInRole'],
    data: function() {
        return {
            customer: '',
            customerType: ''
        }

    },
    created: function() {
        axios
            .get('/customer/' + this.comment.customerUsername)
            .then(response => {
                this.customer = response.data;
                this.customerType = this.customer.category.type;
            })

    },
    template: `
        <li class="comment">
            <img class="user-img-rp" v-if="customerType == 'Bronze'" src="images/Bronze.png" alt="User">
            <img class="user-img-rp" v-if="customerType == 'Silver'" src="images/Silver.png" alt="User">
            <img class="user-img-rp" v-if="customerType == 'Gold'" src="images/Gold.png" alt="User">
            <div class="review-info-rp">
                <div class="rating-rp review-rating-rp">
                    <img class="star-rating-rp" src="images/white-star.png" alt="Rating">
                    <p> <span class="rating-num-rp"> {{comment.rating}} </span> </p>
                </div>
                <h4>{{comment.review}}</h4>
                <h5>- {{customer.name}}</h5>
            </div>
            <div class="comment-status-container" v-bind:name="comment.reviewID" v-if="loggedInRole == 'Manager'">

                <div v-if="comment.status == 'WaitingForApproval'" class="comment-status-button" name="red" v-on:click="rejectComment">
                    <i class="fa fa-ban fa-2x" aria-hidden="true"></i>
                </div>
                <div v-if="comment.status == 'WaitingForApproval'" class="comment-status-button" name="green" v-on:click="approveComment">
                    <i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
                </div>
                <div v-if="comment.status == 'Rejected'" style="background-color: #592C2C" class="comment-status-button" >
                    <i class="fa fa-ban fa-2x" aria-hidden="true"></i>
                </div>
                <div v-if="comment.status == 'Approved'" class="comment-status-button" style="background-color: #303F2C">
                    <i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
                </div>
                
            </div>
            <div class="comment-status-container" v-bind:name="comment.reviewID" v-else-if="loggedInRole == 'Administrator'">

                <div v-if="comment.status == 'WaitingForApproval'">
                    <div class="comment-status" style="background-color: transparent;border-radius: 0 1em 0 0em;border-left:1px solid rgba(44,53,63,1); height: fit-content;">
                        <i class="fa fa-ban fa-2x" aria-hidden="true"></i>
                    </div>
                    <div class="comment-status" style="background-color: transparent;border-radius: 0em 0em 1em 0em;border-left:1px solid rgba(44,53,63,1); height: fit-content;">
                        <i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
                    </div>
                </div>

                <div v-if="comment.status == 'Rejected'" class="comment-status" style="background-color: #592C2C;border-left:1px solid rgba(44,53,63,1);border-radius: 0;">
                    <i class="fa fa-ban fa-2x" aria-hidden="true"></i>
                </div>
                <div v-if="comment.status == 'Approved'" class="comment-status" style="background-color: #303F2C;border-left:1px solid rgba(44,53,63,1);border-radius: 0;"> 
                    <i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
                </div>
                
            </div>
            <div v-bind:name="comment.reviewID" class="comment-delete" v-if="loggedInRole == 'Administrator'" v-on:click="deleteComment">
                <div class="comment-status"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></div>    
            </div>

        

        </li>
             `,
    methods: {
        rejectComment: function() {
            axios
                .put("/reviews/reject/" + this.comment.reviewID)
                .then(response => {
                    if (response.data != null && response.data != "") {
                        this.comment.status = 'Rejected';
                    }
                })
        },
        approveComment: function() {
            axios
                .put("/reviews/approve/" + this.comment.reviewID)
                .then(response => {
                    if (response.data != null && response.data != "") {
                        this.comment.status = 'Approved';
                        this.$emit('updateComments', true);

                    }
                })
        },
        deleteComment: function() {
            axios
                .delete("/reviews/" + this.comment.reviewID)
                .then(response => {
                    if (response.data != null && response.data != "") {
                        if (this.comment.status == "Approved")
                            this.$emit('updateComments', true);
                        else
                            this.$emit('updateComments', false);
                    }
                })
        }
    }
})