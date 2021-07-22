Vue.component("home",{
    data: function() {
        return {     
        }
    
    },
    
    template: `
    <div >
    	<div class = "navigation-area">
		    	<ul class = "nav-navbar">
		    		<li><a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a></li>
		    		<li style="float:right" ><a class="btn">Prijavi se/Registruj se</a></li>
		 		</ul>
         </div>    
         
         <div class="home-img">
         	<div class="greet">
         		<h1>Naruci dostavu!</h1>
         		<div class="address">
         			<h2>Adresa za dostavu:</h2>
         			<div class="search">
	         			<i class="fa fa-search"></i>
	         			<input type="text">
	         			<button class="btn">Pretrazi</button>
	         		</div>
         			<p>Knez Mihajlova 7, Beograd</p>
         		</div>
         	</div>			
         </div>
         
         <div class="content">
		         <div class="restaurant-types">
		         	<h2>Kuhinje</h2>
		         	
		         </div>
		         
		         <div class="restaurants">
		         	<div class="search">
		         		<i class="fa fa-search"></i>
	         			<input type="text">
	         			<button class="black-btn">Pretrazi</button>
		         	</div>
				    <h1> Restorani u ponudi</h1>
				    <p></p>
		
					        <div class="restaurants-col" >
					            <img src="images/kfc.jpg">
					            <div class="restaurant-info">
						            <h3>KFC</h3>
						            <p>Piletina, Burgeri, Americka hrana</p>
						            <div class="closed-restaurant"><span>Zatvoren objekat</div>
					            </div>
					            
					        </div>
					        <div class="restaurants-col">
					            <img src="images/mcdonalds.png">
					        <div class="restaurant-info">
					            <h3>McDonald's</h3>
					            <p>Burgeri, Americka hrana, Poslastice</p>
					            </div>
					        </div>
					        <div class="restaurants-col">
					            <img src="images/burgerhouse.jpg">
					        <div class="restaurant-info">
					            <h3>Burger House</h3>
					            <p>Burgeri, Americka hrana, Rostilj</p>
					        </div>
					        </div>
					        <div class="restaurants-col">
					       
					            <img src="images/burgerhouse.jpg">
					             <div class="restaurant-info">
					            <h3>Burger House</h3>
					            <p>Burgeri, Americka hrana, Rostilj</p>
					        </div>
					        </div>
		
				</div>
	         </div>
         
         
    </div>
            `
})