Vue.component("article-in-order", {
    props: ['article'],
    template: `
	<div class="article-col">
        <img src="images/kfc.jpg"  >
        <h3 style="margin-left:5%">{{article.name}} </h3>
        <h3 style="text-align:right">x {{article.quantity}}</h3>
    </div>
	`
});