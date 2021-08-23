Vue.component("deliverer-orders",{
    data: function() {
        return {   
            name: '',
            surname: '',
            username: '',
            currentRestaurant: [],
            article: '',
            order: '',
            hover: false, 
        }
    },
    
    template: `
    <div>
        <h1 style="text-align: center;">Pregled dostupnih porudžbina
        </h1>
        <div class="users-search">
        <div>
            <i style="text-align: center;" class="fa fa-search"></i>
            <input type="text" placeholder="Pretraži po nazivu restorana, opsegu cene ili opsegu datuma...">
        </div>
        <button class="filter-btn" v-on:click="filterClicked"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        </div>
        
        <div class="filter-div" style="top:250px">
            <div class="filter-modal">
                <div v-on:click="filterClose" class="close-filter">+</div>
    
                <h2>Status porudžbine</h2>
                <div class="checkbox-btn-container-dark" >
                    <div>
                        <input type="checkbox" id="processing" name="orderStatus" value="processing">
                        <label for="processing">Obrada</label>
                    </div>
                    <div>
                        <input type="checkbox" id="prep" name="orderStatus" value="prep">
                        <label for="prep">U pripremi</label>
                    </div>
                    <div>
                        <input type="checkbox" id="transporting" name="orderStatus" value="transporting">
                        <label for="transporting">U transportu</label>
                    </div>
                    <div>
                        <input type="checkbox" id="finished" name="orderStatus" value="finished">
                        <label for="finished">Dostavljena</label>
                    </div>
                    <div>
                        <input type="checkbox" id="canceled" name="orderStatus" value="canceled">
                        <label for="canceled">Otkazana</label>
                    </div>
                </div>
                <h2>Tip kuhine</h2>
                <div class="checkbox-btn-container-dark">
                    <div>
                        <input type="checkbox" id="italian" name="cuisine" value="italian">
                        <label for="italian">Italijanska</label>
                    </div>
                    <div>
                        <input type="checkbox" id="chinese" name="cuisine" value="chinese">
                        <label for="chinese">Kineska</label>
                    </div>
                    <div>
                        <input type="checkbox" id="barbecue" name="cuisine" value="barbecue">
                        <label for="barbecue">Rostilj</label>
                    </div>
                    <div>
                        <input type="checkbox" id="american" name="cuisine" value="american">
                        <label for="american">Americka hrana</label>
                    </div>
                    <div>
                        <input type="checkbox" id="sweets" name="cuisine" value="sweets">
                        <label for="sweets">Poslastice</label>
                    </div>
                </div>
            </div>
        </div>

        <div class="content" style="display:block" >
            <table class="table-users" name="orders">
                <thead>
                    <tr>
                        <th>Datum <i class="fa fa-sort "></i></th>
                        <th>Restoran <i class="fa fa-sort "></i></th>
                        <th>Cena <i class="fa fa-sort"></i></th>
                        <th>Status <i class="fa fa-sort"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-on:click="showOrder">
                        <td>21.08.2021.</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>1235.00 RSD</td>
                        <td>
                            <div class="order-delivered-btn" v-on:click="confirmDelivery"
                                @mouseover="hover = true"
                                @mouseleave="hover = false">

                            <span v-if="!hover" class="delivery-btn-text"><i class="fa fa-bicycle" aria-hidden="true"></i> U transportu</span>
                            <span v-if="hover" class="delivery-btn-confirmation-text" style="transition: 0.2s;"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena</span>
                            
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>17.08.2021.</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/kfc.jpg">
                                <label>KFC</label>
                            </div>
                        </td>
                        <td>1200.00 RSD</td>
                        <td><div class="order-status-black"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena</div></td>
                    </tr>
                    <tr>
                        <td>11.07.2021.</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/mcdonalds.png">
                                <label>McDonald's</label>
                            </div>
                        </td>
                        <td>3590.00 RSD</td>
                        <td><div class="order-status-black"><i class="fa fa-bicycle" aria-hidden="true"></i> U transportu</div></td>
                    </tr>
                    <tr>
                        <td>05.06.2021.</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>560.00 RSD</td>
                        <td><div class="order-status-black"><i class="fa fa-spinner" aria-hidden="true"></i> Obrada</div></td>
                    </tr>
                    <tr>
                        <td>20.04.2021.</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>1200.00 RSD</td>
                        <td><div class="order-status-black"><i class="fa fa-spinner" aria-hidden="true"></i> Ceka dostavljaca</div></td>
                    </tr>
                    <tr>
                        <td>15.03.2021.</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>2560.00 RSD</td>
                        <td><div class="order-status-black"><i class="fa fa-cutlery" aria-hidden="true"></i> U pripremi</div></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="register" style="z-index:100">
            <div class="modal" style="height:auto; padding-bottom: 30px;">
            <div v-on:click="closeOrderView" class="close">+</div>

            <div >
                <div class="order-articles-title-div">
                    <div class="order-articles-title" >
                        <p > {{order.restaurantName}} KFC </p>
                        <p > {{order.date}} 21.08.2021. </p>
                    </div>
                    <div class="order-status-white" style="text-align:right;margin-right:15%">
                        <p><i aria-hidden="true" class="fa fa-spinner"></i> Čeka dostavljača</p>
                        
                    </div>
                </div>
                
                <div style="margin-top: 7%;" >
                    <div class="article-col" style="background-color:transparent;margin: 2% 15%;justify-content: space-between;">
                        <img src="images/kfc.jpg" style="height: fit-content;">
                        <h3 style="margin-left:5%">{{article.name}} Burger </h3>
                        <h3 style="text-align:right"> <span class="order-item-price"> 450.00 RSD </span> x1 {{article.quantity}}</h3>
                    </div>
                    <div class="article-col" style="background-color:transparent;margin: 2% 15%;justify-content: space-between;">
                        <img src="images/kfc.jpg" style="height: fit-content;">
                        <h3 style="margin-left:5%">{{article.name}} Burger </h3>
                        <h3 style="text-align:right"><span class="order-item-price"> 450.00 RSD </span> x1 {{article.quantity}}</h3>
                    </div>
                    <div class="article-col" style="background-color:transparent;margin: 2% 15%;justify-content: space-between;">
                        <img src="images/kfc.jpg" style="height: fit-content;">
                        <h3 style="margin-left:5%">{{article.name}} Burger </h3>
                        <h3 style="text-align:right"><span class="order-item-price"> 450.00 RSD </span> x1 {{article.quantity}}</h3>
                    </div>
                    <div style="border:1px solid white;margin: 5% 15% 2%" ></div>

                    <div class="price-calculation-order-view">
                        <p class="pc-order-view">  <span>Dostava</span>   <span>+ 200.00 RSD</span> </p>
                        <p class="pc-order-view">  <span>Ukupna cena</span>   <span>{{order.sum}} = 1235.00 RSD</span> </p>
                    </div>
                    <button style="margin: 20px 15%;width: -webkit-fill-available; display: none;" class="ask-for-delivery-btn"> Zatraži porudžbinu</button>
                </div>
            </div>

            </div>
        </div>
    </div>
              `,
    mounted() {
        window.scrollTo(0, 0);
    },
    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        filterClicked: function(event) {
            if (document.querySelector('.filter-div').style.display == 'none' || document.querySelector('.filter-div').style.display ==
                '') {
                document.querySelector('.filter-div').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-404px';
            } else { this.filterClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        showOrder: function(event) {
            document.querySelector('.register').style.display = 'flex';
        },
        closeOrderView: function() {
            document.querySelector('.register').style.display = 'none';
        },
        confirmDelivery: function(event) {
            let el;
            if (event.target == 'order-delivered-btn') {
                el = event.target.parentElement;
                event.target.remove();
            }
            else {
                el = event.target.parentElement.parentElement;
                event.target.parentElement.remove();
            }

            el.innerHTML += ('<td><div class="order-status-black"><i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena</div></td>');
        }
    }
})