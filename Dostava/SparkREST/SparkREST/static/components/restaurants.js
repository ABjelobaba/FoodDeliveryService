Vue.component("restaurants",{
    data: function() {
        return {     
            restaurants: null  
        }
    
    },
    
    template: `
    <section class="restaurants">
    <h1> Restorani u ponudi</h1>
    <p></p>
    <div class="row">
        <div class="restaurants-col" v-for="r in restaurants">
            <img src="images/kfc.jpg">
            <h3>{{r.name}}</h3>
            <p>Piletina, Burgeri, Americka hrana</p>
        </div>
        <div class="restaurants-col">
            <img src="images/mcdonalds.png">
            <h3>McDonald's</h3>
            <p>Burgeri, Americka hrana, Poslastice</p>
        </div>
        <div class="restaurants-col">
            <img src="images/burgerhouse.jpg">
            <h3>Burger House</h3>
            <p>Burgeri, Americka hrana, Rostilj</p>
        </div>
    </div>
</section>
            `
})