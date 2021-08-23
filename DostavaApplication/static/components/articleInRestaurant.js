Vue.component("article-in-restaurant", {
    props: ['article'],
    template: `
	<li class="article-rp" v-on:click="showFoodItem">
        <div class="article-info-rp">
            <h2>{{article.name}}</h2>
            <p> {{article.composition}}</p>
            <h3> {{article.price}},00 RSD </h3>
        </div>
        <div class="food-img-container-rp">
            <img class="food-img-rp" src="images/burger.jpg" alt="Food">
        </div>
    </li>
	`,
    methods: {
        showFoodItem: function() {
            document.querySelector('.article-view-rp').style.display = 'flex';
        }
    }
});