Vue.component("home",{
    data: function() {
        return {     
        }
    
    },
    
    template: `
    <section class="header">
        
        <div class="text-box">
            <h1>Naruci dostavu!</h1>
            <div class="search">
                <h3>Adresa za dostavu:</h3>
                <i class="fa fa-search"></i>
                <input type="text"></input> 
                <button class="hero-btn">Pretrazi</button>
                <p>Knez Mihajlova 7, Beograd</p>
            </div>
        </div>
    </section>	

    <section class="restaurants">
        <h1> Restorani u ponudi</h1>
        <p></p>
        <div class="row">
            <div class="restaurants-col">
                <img src="images/kfc.jpg">
                <h3>KFC</h3>
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