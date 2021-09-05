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
            <div class="comment-status-container" v-bind:name="comment.reviewID" v-if="loggedInRole == 'Administrator' || loggedInRole == 'Manager'">

                <div v-if="loggedInRole == 'Manager' && comment.status == 'WaitingForApproval'" class="comment-status-button" name="red" v-on:click="rejectComment">
                    <i class="fa fa-ban fa-2x" aria-hidden="true"></i>
                </div>
                <div v-if="loggedInRole == 'Manager' && comment.status == 'WaitingForApproval'" class="comment-status-button" name="green" v-on:click="approveComment">
                    <i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i>
                </div>
                
            </div>
            <div v-bind:name="comment.reviewID" class="comment-delete" v-if="loggedInRole == 'Administrator'" v-on:click="deleteComment">
                <div class="comment-status"><i class="fa fa-trash-o fa-2x" aria-hidden="true"></i></div>    
            </div>

        

        </li>
             `,
    mounted() {
        if (this.loggedInRole == 'Administrator' || this.loggedInRole == 'Manager') {
            if (this.comment.status == "Rejected") {
                if (this.loggedInRole == 'Administrator') {
                    document.getElementsByName(this.comment.reviewID)[0].innerHTML = '<div class="comment-status" style="background-color: #592C2C;border-left:1px solid rgba(44,53,63,1);border-radius: 0;"><i class="fa fa-ban fa-2x" aria-hidden="true"></i></div>';
                } else if (this.loggedInRole == 'Manager') {
                    document.getElementsByName(this.comment.reviewID)[0].innerHTML = '<div class="comment-status" style="background-color: #592C2C"><i class="fa fa-ban fa-2x" aria-hidden="true"></i></div>';
                }
            } else if (this.comment.status == "Approved") {
                if (this.loggedInRole == 'Administrator') {
                    document.getElementsByName(this.comment.reviewID)[0].innerHTML = '<div class="comment-status" style="background-color: #303F2C;border-left:1px solid rgba(44,53,63,1);border-radius: 0;"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></div>';
                } else if (this.loggedInRole == 'Manager') {
                    document.getElementsByName(this.comment.reviewID)[0].innerHTML = '<div class="comment-status" style="background-color: #303F2C"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></div>';
                }

            } else {
                if (this.loggedInRole == 'Administrator') {
                    document.getElementsByName(this.comment.reviewID)[0].innerHTML =
                        '<div class="comment-status" style="background-color: transparent;border-radius: 0 1em 0 0em;border-left:1px solid rgba(44,53,63,1)">' +
                        '<i class="fa fa-ban fa-2x" aria-hidden="true"></i></div>' +
                        '<div class="comment-status" style="background-color: transparent;border-radius: 0em 0em 1em 0em;border-left:1px solid rgba(44,53,63,1)">' +
                        '<i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></div>';
                }
            }
        }

    },

    methods: {
        rejectComment: function() {
            axios
                .put("/reviews/reject/" + this.comment.reviewID)
                .then(response => {
                    if (response.data != null && response.data != "") {
                        document.getElementsByName(this.comment.reviewID)[0].innerHTML = '<div class="comment-status" style="background-color: #592C2C"><i class="fa fa-ban fa-2x" aria-hidden="true"></i></div>';
                    }
                })
        },
        approveComment: function() {
            axios
                .put("/reviews/approve/" + this.comment.reviewID)
                .then(response => {
                    if (response.data != null && response.data != "") {
                        document.getElementsByName(this.comment.reviewID)[0].innerHTML = '<div class="comment-status" style="background-color: #303F2C"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></div>';
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