Vue.component("article-in-restaurant", {
    props: ['article'],
    template: `
	<li class="article-rp" v-on:click="showFoodItem">
        <div class="article-info-rp">
            <h2>{{article.name}} <span style="font-style: italic; font-weight: 100; font-size: 0.9em;"> {{article.quantity}} 
                <span v-if="article.type == 'Food'">g</span> 
                <span v-if="article.type == 'Drink'">ml</span>
            </span></h2>
            <p> {{article.description}} 
                
            </p>
            <h3> {{article.price}}.00 RSD </h3>
        </div>
        <div class="food-img-container-rp">
            <img class="food-img-rp" v-bind:src="article.image" alt="Food">
        </div>
    </li>
	`,
    methods: {
        showFoodItem: function() {
            document.querySelector('.article-view-rp').style.display = 'flex';
        }
    }
});