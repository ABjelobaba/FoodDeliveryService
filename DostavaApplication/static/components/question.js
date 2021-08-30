Vue.component("question", {
    props: ['question'],
    data: function() {
        return {

        }
    },
    template: `
    <div class="register" id="question" style="display:none">
    <div class="modal" style="height: auto">

            <div style="margin-top: 20px;" >
                <div style="display:flex;align-items: center;margin: 0 20px;">
                <i class="fa fa-question-circle fa-4x" aria-hidden="true" style="color:white;margin-right: 30px;"></i>
                <div class="login-title">
						<h3 style="color: white;">{{question}}</h3>
					</div>
                </div>
                <button v-on:click="answerYes" style="margin: 20px 10px" class="log-btn"> Potvrdi</button>
                <button v-on:click="answerNo" style="margin: 20px 10px" class="log-btn"> Odustani</button>
            </div>

    </div>
</div>
`,
    methods: {
        answerYes: function(event) {
            this.$emit('answer', 'yes');
        },
        answerNo: function(event) {
            this.$emit('answer', 'no');
        }
    }
})