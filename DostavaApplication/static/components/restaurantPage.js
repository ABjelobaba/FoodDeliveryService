Vue.component("restaurantPage",{
    data: function() {
        return {     
        }

    },

    template: `
    <div class="restourant-page-div">
        <div class="nav-rp" id="navmenu-rp" style="visibility: collapse;">
            <a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a>  
            <a class="btn">Odjavi se</a>
        </div>

        <section class="top-section-rp">
            <div class="top-part-rp">
                <div class="top-menu-rp">
                    <a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a>  
                    <a class="btn">Odjavi se</a>
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
            <div class="nav-menu-rp">
                <h3>Artikli</h3>
                <h3>Utisci</h3>
            </div>
            <div class="right-container-rp">
                <div class="nav-cart-rp" id="ncart-rp">
                    <a> Korpa (0)</a>
                </div>

                <div class="articles-rp">
                    <ul class="article-list-rp">
                        <li class="article-rp" v-on:click="showFoodItem">
                            <div class="article-info-rp">
                                <h2>Burger</h2>
                                <p> Zelena salata, paradajz, sir, kiseli krastavac</p>
                                <h3> 450,00 RSD </h3>
                            </div>
                            <img class="food-img-rp" src="images/burger.jpg" alt="Food">
                        </li>

                        <li class="article-rp" v-on:click="showFoodItem">
                            <div class="article-info-rp">
                                <h2>Burger</h2>
                                <p> Zelena salata, paradajz, sir, kiseli krastavac</p>
                                <h3> 450,00 RSD </h3>
                            </div>
                            <img class="food-img-rp" src="images/burger.jpg" alt="Food">
                        </li>
                    </ul>
                </div>

                <div class="restaurant-reviews-rp">
                    <h1>Utisci</h1>
                    <ul class="user-reviews-list-rp">
                        <li class="review-rp">
                            <img class="user-img-rp" src="images/gold.png" alt="User">
                            <div class="review-info-rp">
                                <div class="rating-rp review-rating-rp">
                                    <img class="star-rating-rp" src="images/white-star.png" alt="Rating">
                                    <p> <span class="rating-num-rp"> 5.0 </span> </p>
                                </div>
                                <h4>Odlicna hrana, brza dostava </h4>
                                <h5>- Nikola</h5>
                            </div>
                        </li>

                        <li class="review-rp">
                            <img class="user-img-rp" src="images/regular-user.png" alt="User">
                            <div class="review-info-rp">
                                <div class="rating-rp review-rating-rp">
                                    <img class="star-rating-rp" src="images/white-star.png" alt="Rating">
                                    <p> <span class="rating-num-rp"> 4.0 </span> </p>
                                </div>
                                <h4>Dobra hrana, velike porcije</h4>
                                <h5>- Marko</h5>
                            </div>
                        </li>

                        <li class="review-rp">
                            <img class="user-img-rp" src="images/bronze.png" alt="User">
                            <div class="review-info-rp">
                                <div class="rating-rp review-rating-rp">
                                    <img class="star-rating-rp" src="images/white-star.png" alt="Rating">
                                    <p> <span class="rating-num-rp"> 3.0 </span> </p>
                                </div>
                                <h4>Okej hrana</h4>
                                <h5>- Marija</h5>
                            </div>
                        </li>
                    </ul>
                    <h6>Svi utisci... </h6>
                </div>
            </div>
        </section>

        <div class="article-view-rp">
            <div class="selected-item-rp">
                <div class="item-img-av-rp">
                    <img src="images/burger.jpg" alt="Food">
                    <a href="#" class="close-window-btn-rp" v-on:click="closeFoodItem">X</a>
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
                        <img src="images/remove.png" alt="Remove item" class="change-quantity-rp">
                        <h5>1</h5>
                        <img src="images/add.png" alt="Add item" class="change-quantity-rp">
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
                    }
                    else {
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
                }
             }
         })