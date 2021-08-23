Vue.component("available-orders",{
    data: function() {
        return {    
            name: '',
            surname: '',
            username: '',
            currentRestaurant: [],
            article: '',
            order: '' 
        }
    
    },
    
    template: `
    <div>
        <h1 style="text-align: center;">Pregled dostupnih porudžbina
        </h1>
        <div class="users-search" style="text-align: center;">
            <div>
                <i style="text-align: center;" class="fa fa-search"></i>
                <input type="text" placeholder="Pretraži po nazivu restorana...">
            </div>
        </div>

        <div class="content" style="display:block" >
            <table class="table-users" name="orders">
                <thead>
                    <tr>
                        <th>Vreme <i class="fa fa-sort "></i></th>
                        <th>Restoran <i class="fa fa-sort "></i></th>
                        <th>Cena <i class="fa fa-sort"></i></th>
                        <th> <i class="fa"></i></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-on:click="showOrder">
                        <td>18:20h</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>1235.00 RSD</td>
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                    <tr>
                        <td>18:14h</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/kfc.jpg">
                                <label>KFC</label>
                            </div>
                        </td>
                        <td>1200.00 RSD</td>
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                    <tr>
                        <td>18:11h</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/mcdonalds.png">
                                <label>McDonald's</label>
                            </div>
                        </td>
                        <td>3590.00 RSD</td>
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                    <tr>
                        <td>18:09h</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>560.00 RSD</td>
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                    <tr>
                        <td>18:03h</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>1200.00 RSD</td>
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                    <tr>
                        <td>18:01h</td>
                        <td>
                            <div class="order-restaurant">
                                <img src="images/burgerhouse.jpg">
                                <label>Burger House</label>
                            </div>
                        </td>
                        <td>2560.00 RSD</td>
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <div class="register" style="z-index:100">
            <div class="modal" style="height:auto">
            <div v-on:click="closeOrderView" class="close">+</div>

            <div >
                <div class="order-articles-title-div">
                    <div class="order-articles-title" >
                        <p > {{order.restaurantName}} KFC </p>
                        <p > {{order.date}} 18:20h </p>
                    </div>
                    <div class="order-status-white" style="text-align:right;margin-right:15%">
                        <p><i aria-hidden="true" class="fa fa-spinner"></i> Čeka dostavljača</p>
                        
                    </div>
                </div>
                
                <div style="margin-top: 7%;" >
                    <div class="article-col" style="background-color:transparent;justify-content: space-between;">
                        <img src="images/kfc.jpg" style="height: fit-content;">
                        <h3 style="margin-left:3%">{{article.name}} Burger </h3>
                        <h3 style="text-align:right"> <span class="order-item-price"> 450.00 RSD </span> x1 {{article.quantity}}</h3>
                    </div>
                    <div class="article-col" style="background-color:transparent;justify-content: space-between;">
                        <img src="images/kfc.jpg" style="height: fit-content;">
                        <h3 style="margin-left:3%">{{article.name}} Burger </h3>
                        <h3 style="text-align:right"><span class="order-item-price"> 450.00 RSD </span> x1 {{article.quantity}}</h3>
                    </div>
                    <div class="article-col" style="background-color:transparent;justify-content: space-between;">
                        <img src="images/kfc.jpg" style="height: fit-content;">
                        <h3 style="margin-left:3%">{{article.name}} Burger </h3>
                        <h3 style="text-align:right"><span class="order-item-price"> 450.00 RSD </span> x1 {{article.quantity}}</h3>
                    </div>
                    <div style="border:1px solid white;margin: 5% 10% 2%" ></div>

                    <div class="price-calculation-order-view">
                        <p class="pc-order-view">  <span>Dostava</span>   <span>+ 200.00 RSD</span> </p>
                        <p class="pc-order-view">  <span>Ukupna cena</span>   <span>{{order.sum}} = 1235.00 RSD</span> </p>
                    </div>
                    <button style="margin: 20px 20%;width: -webkit-fill-available;" class="ask-for-delivery-btn"> Zatraži porudžbinu</button>
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
        showOrder: function(event) {
            document.querySelector('.register').style.display = 'flex';
        },
        closeOrderView: function() {
            document.querySelector('.register').style.display = 'none';
        }
    }
})