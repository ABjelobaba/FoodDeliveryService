Vue.component("comment-status", {
    props: ['comment', 'logedInRole'],
    data: function() {
        return {}

    },

    template: `
        <li class="comment">
            <img class="user-img-rp" src="images/gold.png" alt="User">
            <div class="review-info-rp">
                <div class="rating-rp review-rating-rp">
                    <img class="star-rating-rp" src="images/white-star.png" alt="Rating">
                    <p> <span class="rating-num-rp"> {{comment.rating}} </span> </p>
                </div>
                <h4>{{comment.text}}</h4>
                <h5>- {{comment.userName}}</h5>
            </div>
            <div class="comment-status-container" v-bind:name="comment.id" v-if="logedInRole == 'admin' || logedInRole == 'manager'">
                
            </div>
        </li>
             `,
    mounted() {
        if (this.logedInRole == 'admin' || this.logedInRole == 'manager') {
            if (this.comment.status == "canceled") {
                document.getElementsByName(this.comment.id)[0].innerHTML = '<div class="comment-status"><i class="fa fa-ban fa-2x" aria-hidden="true"></i></div>';
            } else if (this.comment.status == "approved") {
                document.getElementsByName(this.comment.id)[0].innerHTML = '<div class="comment-status"><i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></div>';
            } else {
                if (this.logedInRole == 'admin') {
                    document.getElementsByName(this.comment.id)[0].innerHTML =
                        '<div class="comment-status" style="background-color: red;border-radius: 0 1em 0 0em">' +
                        '<i class="fa fa-ban fa-2x" aria-hidden="true"></i></div>' +
                        '<div class="comment-status" style="background-color: green;border-radius: 0em 0em 1em 0em">' +
                        '<i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></div>';
                } else if (this.logedInRole == 'manager') {
                    document.getElementsByName(this.comment.id)[0].innerHTML =
                        '<div class="comment-status-button" name="red" v-on:click="cancleComment">' +
                        '<i class="fa fa-ban fa-2x" aria-hidden="true"></i></div>' +
                        '<div class="comment-status-button" name="green" v-on:click="approveComment">' +
                        '<i class="fa fa-check-circle-o fa-2x" aria-hidden="true"></i></div>';
                }
            }
        }

    },

    methods: {
        cancelComment: function() {

        },
        approveComment: function() {

        }

    }
})