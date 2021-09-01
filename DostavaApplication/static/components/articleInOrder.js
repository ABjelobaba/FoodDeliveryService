Vue.component("article-in-order", {
    props: ['article'],
    template: `
	<div class="article-col">
        <img src="images/kfc.jpg"  >
        <h3 style="margin-left:5%">{{article.item.name}} </h3>
        <h3 style="text-align:right"> <span class="order-item-price"> {{article.item.price}}.00 RSD </span> x {{article.amount}}</h3>
    </div>
	`
});