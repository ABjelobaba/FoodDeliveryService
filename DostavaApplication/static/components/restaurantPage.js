Vue.component("restaurantPage", {
    data: function() {
        return {
            comments: [
                { id: 1, rating: 5.0, text: 'Odlicna hrana, brza dostava', userName: 'Nikola', status: 'rejected' },
                { id: 2, rating: 4.0, text: 'Dobra hrana, velike porcije', userName: 'Marko', status: 'approved' },
                { id: 3, rating: 3.0, text: 'Okej hrana', userName: 'Marija', status: 'waiting' }
            ],
            review_states: [
                { value: 'rejected', text: 'Odbijeni' },
                { value: 'approved', text: 'Odobren' },
                { value: 'waiting', text: 'Čeka obradu' }
            ],
            logedInRole: 'user'
        }

    },

    template: `
    <div class="restourant-page-div">
        <div class="nav-rp" id="navmenu-rp" style="visibility: collapse;">
            <a href="#/"><img class="logo-img" style="top:20px" src="images/logo_transparent.png"></a>  
            <a class="btn" style="float:right;top:30px">Odjavi se</a>
        </div>

        <section class="top-section-rp">
            <div class="top-part-rp">
                <div class="top-menu-rp">
                    <a href="#/"><img class="logo-img" style="top:20px" src="images/logo_transparent.png"></a>  
                    <a class="btn" style="float:right;top:30px">Odjavi se</a>
                </div>
        
                <div class="restaurant-info-rp">
                    <div class="top-info-rp">
                        <img class="logo-rp" src="images/kfc-logo.jpg" alt="Restaurant logo">
        
                        <div class="title-and-rating">
                            <h1 class="restaurant-title-rp">KFC</h1>
                            <div class="rating-rp">
                                <img class="star-rating-rp" src="images/star.png" alt="Rating">
                                <p> <span class="rating-num-rp"> 4.6 </span> (14)</p>
                            </div>
                        </div>
        
                        <p class="restaurant-status-rp">Otvoren</p>
                    </div>
    
                    <div class="bottom-info-rp">
                        <h3>američka hrana</h3>
    
                        <div class="full-address-rp">
                            <p>Bulevar Evrope 45</p>
                            <p>Novi Sad 21000</p>
                            <p>23, 48</p>
                        </div>
                    </div>
                </div>

                <nav class="user-nav">
                    <ul style="margin-top: 60px; width: 100%; box-sizing: border-box;">
                        <!-- <li><a name="user-nav" id="profile">Narudžbine</a></li> -->
                        <!-- <div style=" width: 100%; text-align: right;">
                            <li><a>Korpa (0)</a></li>
                        </div> -->
                    </ul>
                </nav>
            </div>

            
        </section>
        <!-- navigacioni meni -->
        
        <section class="bottom-section-rp">
            <div style="height: fit-content;position: sticky;top: 5em;">
                <div v-if="logedInRole =='admin' || logedInRole=='manager'">
                    <input v-on:click="showHideReviews()" type="checkbox" id="viewReviews" value="viewReviews">
                    <label class="full-radio-btn-label" for="viewReviews">Pregled komentara</label>
                </div>
                <div class="nav-menu-rp" id="scrollPanel">
                    <h3>Artikli</h3>
                    <h3>Utisci</h3>
                </div>
                <div class="nav-menu-rp" id="statusFilter" style="display: none">
                    <h2 style="text-align: center;" >Status komentara</h2>
                    <div class="checkbox-btn-container-dark">
                        <div v-for="state in review_states" >
                            <input type="checkbox" v-bind:id=state.value name="order-status" v-bind:value=state.value>
                            <label v-bind:for=state.value style="border:0">{{state.text}}</label>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right-container-rp">
                <div class="nav-cart-rp" id="ncart-rp" v-if="logedInRole == 'user'">
                    <a> Korpa (0)</a>
                </div>

                <div class="articles-rp">
                    <h1>Artikli</h1>
                    <ul class="article-list-rp">
                        <li class="article-rp" v-on:click="showFoodItem">
                            <div class="article-info-rp">
                                <h2>Burger</h2>
                                <p> Zelena salata, paradajz, sir, kiseli krastavac</p>
                                <h3> 450,00 RSD </h3>
                            </div>
                            <div class="food-img-container-rp">
                                <img class="food-img-rp" src="images/burger.jpg" alt="Food">
                            </div>
                        </li>

                        <li class="article-rp" v-on:click="showFoodItem">
                            <div class="article-info-rp">
                                <h2>Burger</h2>
                                <p> Zelena salata, paradajz, sir, kiseli krastavac</p>
                                <h3> 450,00 RSD </h3>
                            </div>
                            <div class="food-img-container-rp">
                                <img class="food-img-rp" src="images/burger.jpg" alt="Food">
                            </div>
                        </li>
                    </ul>
                </div>

                <div class="restaurant-reviews-rp">
                    <h1>Utisci</h1>
                    <ul class="user-reviews-list-rp" >
                        <comment-status v-for="c in comments" v-bind:key="c.id" v-bind:comment="c" v-bind:logedInRole="logedInRole"></comment-status>
                    </ul>
                    <h6>Svi utisci... </h6>
                </div>

                
                <div class="restaurant-reviews-rp" >
                </div>
            </div>
        </section>

        <div class="article-view-rp">
            <div class="selected-item-rp">
                <div class="item-img-av-rp">
                    <img src="images/burger.jpg" alt="Food">
                    <a href="#" class="close-window-btn-rp" v-on:click="closeFoodItem">+</a>
                </div>
                <div class="title-price-rp">
                    <h2>Burger</h2>
                    <h3> 450,00 RSD </h3>
                </div>
                <p class="description-av-rp">
                    Zelena salata, paradajz, sir, kiseli krastavac 
                </p>
                <div class="av-buttons-rp">
                    <div class="cq-buttons-rp">
                        <img src="images/remove-white.png" alt="Remove item" class="change-quantity-rp">
                        <h5>1</h5>
                        <img src="images/add-white.png" alt="Add item" class="change-quantity-rp">
                    </div>
                    <div class="add-to-basket-rp">
                        <a href="#">Dodaj u korpu</a>
                    </div>
                </div>
            </div>
        </div>


    </div>
             `,
    mounted() {
        function createNavMenu() {
            if (window.scrollY >= 250) {
                document.getElementById('navmenu-rp').style.visibility = 'visible';
            } else {
                document.getElementById('navmenu-rp').style.visibility = 'collapse';
            }
        }

        window.addEventListener('scroll', createNavMenu);
    },

    methods: {
        showFoodItem: function() {
            document.querySelector('.article-view-rp').style.display = 'flex';
        },
        closeFoodItem: function(event) {
            document.querySelector('.article-view-rp').style.display = 'none';
        },
        showHideReviews: function(checked) {
            let cb = document.getElementById('viewReviews');
            if (cb.checked) {
                document.querySelector('.articles-rp').style.display = 'none';
                document.getElementById('scrollPanel').style.display = 'none';
                document.getElementById('statusFilter').style.display = 'block';
                window.scrollTo(0, 0);
            } else {
                document.querySelector('.articles-rp').style.display = 'block';
                document.getElementById('scrollPanel').style.display = 'block';
                document.getElementById('statusFilter').style.display = 'none';
                window.scrollTo(0, 0);
            }
        }
    }
})