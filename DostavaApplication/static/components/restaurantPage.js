Vue.component("restaurant-page", {
    data: function() {
        return {
            loggedInUser: '',
            comments: [],
            review_states: [
                { value: 'Rejected', text: 'Odbijen' },
                { value: 'Approved', text: 'Odobren' },
                { value: 'WaitingForApproval', text: ' Čeka obradu' }
            ],
            restaurant: "",
            restaurantTypes: [
                { id: 'Italian', value: 'italijanska hrana' },
                { id: 'Chinese', value: 'kineska hrana' },
                { id: 'Barbecue', value: 'roštilj' },
                { id: 'Mexican', value: 'meksička hrana' },
                { id: 'American', value: 'američka hrana' }
            ],
            address: null,
            streetAddress: null,
            city: null,
            zipCode: null,
            longitude: null,
            latitude: null,
            articleName: null,
            articlePrice: null,
            articleType: null,
            articleQuantity: null,
            articleDescription: null,
            articleImage: null,
            selectedArticle: undefined,
            selectedArticleQuantity: 1,
            cart: { restaurantID: -1, orderedItems: [], customerUsername: '', totalPrice: 0 }
        }
    },
    created: function() {
        axios.get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    this.loggedInUser = response.data;
                }
            })

        axios.get("cart")
            .then(response => {
                if (response.data != null) {
                    this.cart = response.data;
                }
            })
    },
    updated: function() {
        var container = L.DomUtil.get('map-rp');
        if (container != null) {
            container._leaflet_id = null;
        }

        if (this.restaurant != '' && this.restaurant != undefined) {
            const Map = L.map('map-rp').setView([this.restaurant.location.latitude,
                this.restaurant.location.longitude
            ], 13);
            L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', { maxZoom: 18, id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1, accessToken: apiKey }).addTo(Map);
            marker
                = L.marker([this.restaurant.location.latitude, this.restaurant.location.longitude]).addTo(Map);
        }


    },
    template: `
<div class="restourant-page-div">
    <div class="nav-rp" id="navmenu-rp" style="visibility: collapse;">
        <a href="#/"><img class="logo-img" style="top:20px" src="images/logo_transparent.png"></a>
        <a v-if="loggedInUser == '' || loggedInUser == undefined" v-on:click="register" class="btn" style="float:right;top:30px">Prijavi se/Registruj se</a>
        <a v-else class="btn" style="float:right;top:30px">Odjavi se</a>
    </div>

    <section class="top-section-rp">
        <div class="top-part-rp">
            <div class="top-menu-rp">
                <a href="#/"><img class="logo-img" style="top:20px" src="images/logo_transparent.png"></a>
                <a v-if="loggedInUser == '' || loggedInUser == undefined" v-on:click="register" class="btn" style="float:right;top:30px">Prijavi se/Registruj se</a>
                <a v-else class="btn" style="float:right;top:30px">Odjavi se</a>
            </div>

            <div class="restaurant-info-rp">
                <div class="top-info-rp">
                    <img class="logo-rp" v-bind:src="restaurant.logo" alt="Restaurant logo">

                    <div class="title-and-rating">
                        <h1 class="restaurant-title-rp">{{restaurant.name}}</h1>
                        <div class="rating-rp">
                            <img class="star-rating-rp" src="images/star.png" alt="Rating">
                            <p> <span class="rating-num-rp"> 4.6 </span> (14)</p>
                        </div>
                    </div>

                    <p class="restaurant-status-rp" v-if="restaurant.open">Otvoren</p>
                    <p class="restaurant-status-rp" v-else>Zatvoren</p>
                </div>

                <div class="bottom-info-rp">
                    <h3 v-for="restaurantType in restaurantTypes" v-if="restaurantType.id == restaurant.type">{{restaurantType.value}}</h3>

                    <div class="full-address-rp">
                        <p>{{streetAddress}}</p>
                        <p>{{city}} {{zipCode}}</p>
                        <p>{{latitude}}, {{longitude}}</p>
                    </div>
                </div>
            </div>

            <nav class="user-nav">
                <ul style="margin-top: 60px; width: 100%; box-sizing: border-box;">
                    <!-- <li><a name="user-nav" id="profile">Narudžbine</a></li> -->
                    <!-- <div style=" width: 100%; text-align: right;">
                            <li><a v-on:click="openCart">Korpa ( {{cart.orderedItems.length}} )</a></li>
                        </div> -->
                </ul>
            </nav>
        </div>

    </section>
    <!-- navigacioni meni -->

    <div class="bottom-section-rp">
        <div style="position: sticky;top: 65px;text-align: right;align-self: start;">
            <div v-if="loggedInUser.role == 'Manager'">
                <button v-on:click="showNewArticleWindow()" class="add-article-btn">+ Novi artikal</button>
            </div>
            <div v-if="loggedInUser.role =='Administrator' || loggedInUser.role =='Manager'">
                <input v-on:click="showHideReviews()" type="checkbox" id="viewReviews" value="viewReviews">
                <label class="full-radio-btn-label" style="min-width: fit-content;margin:1.5em 0 0 0" for="viewReviews">Pregled utisaka</label>
            </div>
            <div class="nav-menu-rp" id="scrollPanel">
                <h3>Artikli</h3>
                <h3>Utisci</h3>
            </div>
            <div class="nav-menu-rp" id="statusFilter" style="display: none">
                <h2 style="text-align: center;">Status utiska</h2>
                <div class="checkbox-btn-container-dark">
                    <div v-for="state in review_states">
                        <input type="checkbox" v-bind:id=state.value name="order-status" v-bind:value=state.value>
                        <label v-bind:for=state.value style="border:0">{{state.text}}</label>
                    </div>
                </div>
            </div>
            <div id="map-rp"></div>
        </div>
        <div class="right-container-rp">
            <div class="nav-cart-rp" id="ncart-rp" v-if="loggedInUser.role == 'Customer'">
                <a v-on:click="openCart"> Korpa ( {{cart.orderedItems.length}} )</a>
            </div>

            <div class="articles-rp">
                <h1>Artikli</h1>
                <ul class="article-list-rp">
                    <a v-for="article in restaurant.items" v-on:click="showArticle(article)">
                        <article-in-restaurant v-bind:key="article.id" v-bind:article="article"></article-in-restaurant>
                    </a>
                </ul>
            </div>

            <div class="restaurant-reviews-rp">
                <h1>Utisci</h1>
                <ul class="user-reviews-list-rp">
                    <comment-status v-for="c in comments" v-bind:key="c.id" v-bind:comment="c" v-bind:loggedInRole="loggedInUser.role"></comment-status>
                </ul>
                <h6 id="allReviews">Svi utisci... </h6>
            </div>
        </div>
    </div>

    <div class="article-view-rp" v-if="selectedArticle != undefined">
        <div class="selected-item-rp">
            <div class="item-img-av-rp">
                <img v-bind:src="selectedArticle.image" alt="Food">
                <a href="#" class="close-window-btn-rp" v-on:click="closeArticle">+</a>
            </div>
            <div class="title-price-rp">
                <h2>{{selectedArticle.name}}</h2>
                <h3> {{selectedArticle.price}}.00 RSD </h3>
            </div>
            <p class="description-av-rp">
                {{selectedArticle.description}}
            </p>
            <div class="av-buttons-rp">
                <div class="cq-buttons-rp">
                    <img src="images/remove-white.png" alt="Remove item" v-on:click="decreaseQuantity" class="change-quantity-rp">
                    <h5>{{selectedArticleQuantity}}</h5>
                    <img src="images/add-white.png" alt="Add item" v-on:click="increaseQuantity" class="change-quantity-rp">
                </div>
                <div class="add-to-basket-rp">
                    <a href="#" v-if="loggedInUser.role != 'Administrator'" v-on:click="addToCart" >Dodaj u korpu</a>
                    <a href="#" v-else><i class="fa fa-trash-o fa-lg" aria-hidden="true"> </i> Obrisi</a>
                </div>

            </div>
        </div>
    </div>

    <div class="new-article-view-rp">
        <div class="selected-item-rp" style="width:500px; margin: auto auto; text-align: center;">
            <div v-on:click="closeNewArticleWindow" class="close">+</div>

            <div style="display: grid; height: 100%; grid-template-rows: auto auto;" class="firstStep">
                <form>
                    <div class="login-title" style="margin: auto 0;">
                        <h3 style="color: white; font-weight: bolder;"> DODAJTE NOVI ARTIKAL </h3>
                    </div>

                    <div style="margin: auto 0px;">

                        <input v-model="articleName" type="text" class="login-inputs" placeholder="Naziv artikla">
                        <label class="error" id="articleNameErr" name="labels" display="hidden"> </label>

                        <label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Slika:</label>
                        <input type="file" class="login-inputs" style="margin: 2px auto 2px;" id="inpFile" v-on:change="fileUploaded">
                        <label class="error" id="articleImageErr" name="labels" display="hidden"> </label>

                        <div class="image-preview" id="imagePreview">
                            <img id="imgPreview" src="" alt="Image Preview" class="image-preview__image" style="max-width: 60%;">
                            <span class="image-preview__default-text">Image Preview</span>
                        </div>

                        <label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Opis artikla:</label>
                        <div class="radio-btn-container" style="width: 60%;height: 100px;box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.2);">
                            <textarea v-model="articleDescription" class="article-desc-ta" placeholder="Unesite opis artikla..."></textarea>
                        </div>

                    </div>

                    <div style="display: inline-flex; justify-content: space-between; width: 60%;">
                        <input v-model="articleQuantity" type="text" class="login-inputs" style="margin-right: 10%;" placeholder="Kolicina (g)">
                        <input v-model="articlePrice" type="text" class="login-inputs" id="article-price-input" placeholder="Cena (RSD)">
                    </div>
                    <label class="error" id="articleQPErr" name="labels" display="hidden"> </label>

                    <br>
                </form>
            </div>
            <button v-on:click="addNewArticle" style="margin-top:5px; width: 25%;" class="log-btn"> 
				Dodaj
			</button>

        </div>
    </div>
    <success :text="'Neophodno je da se prijavite kako bi naručili željene proizvode!'"></success>
    <logIn-register></logIn-register>
</div>


`,
    mounted() {
        window.scrollTo(0, 0);
        let id;
        axios.get('/restaurant/' + this.$route.query.id).then(response => {
            this.restaurant = response.data;
            id = this.$route.query.id;
            this.streetAddress = response.data.location.address.streetAddress;
            this.city = response.data.location.address.city;
            this.zipCode = response.data.location.address.zipCode;
            this.longitude = response.data.location.longitude;
            this.latitude = response.data.location.latitude;
        })

        axios.get('/reviews/' + this.$route.query.id).then(response => {
            this.comments = response.data;
            
        })

        function createNavMenu() {
            if (window.location.href.endsWith('restaurant?id=' + id)) {
                if (window.scrollY >= 240) {
                    document.getElementById('navmenu-rp').style.visibility = 'visible';
                } else {
                    document.getElementById('navmenu-rp').style.visibility = 'collapse';
                }
            }
        }
        window.addEventListener('scroll', createNavMenu);
    },
    methods: {
        register: function(event) {
            document.querySelector('.register').style.display = 'flex';
        },
        showArticle: function(article) {
            if (this.loggedInUser != '' && this.loggedInUser != undefined) {
                this.selectedArticle = article;
                for (orderItem of this.cart.orderedItems) {
                    if (orderItem.item.name === article.name) {
                        this.selectedArticleQuantity = orderItem.amount;
                    }
                }
            } else {
                document.querySelector('.registration-success').style.display = 'flex';
                let checkMark = document.getElementById('checkMark');
                checkMark.innerHTML = "&#xf06a";
                setTimeout(function() {
                    document.querySelector('.registration-success').style.display = 'none';
                }, 2000);
            }
        },
        closeArticle: function() {
            this.selectedArticle = undefined;
            this.selectedArticleQuantity = 1;
        },
        showHideReviews: function(checked) {
            let cb = document.getElementById('viewReviews');
            if (cb.checked) {
                document.querySelector('.articles-rp').style.display = 'none';
                document.getElementById('scrollPanel').style.display = 'none';
                document.getElementById('allReviews').style.display = 'none';
                document.getElementById('statusFilter').style.display = 'block';
                document.getElementsByClassName('restaurant-reviews-rp')[0].style.height = '100%';
            } else {
                document.querySelector('.articles-rp').style.display = 'block';
                document.getElementById('scrollPanel').style.display = 'block';
                document.getElementById('statusFilter').style.display = 'none';
                document.getElementById('allReviews').style.display = 'block';
                document.getElementsByClassName('restaurant-reviews-rp')[0].style.height = 'fit-content';
            }
        },
        fileUploaded: function(event) {
            let inpFile = document.getElementById("inpFile");
            let
                imagePreviewContainer = document.getElementById("imagePreview");
            let previewImage = imagePreviewContainer.querySelector(".image-preview__image");
            let previewDefaultText = imagePreviewContainer.querySelector(".image-preview__default-text");
            let file =
                inpFile.files[0];
            if (file) {
                let reader = new FileReader();
                previewDefaultText.style.display = "none";
                previewImage.style.display = "block";
                reader.addEventListener("load", function() { previewImage.setAttribute("src", this.result); });
                reader.readAsDataURL(file);
            } else {
                previewDefaultText.style.display = null;
                previewImage.style.display = null;
                previewImage.setAttribute("src", "");
            }
        },
        addNewArticle: function(event) {
            event.preventDefault();
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            let errors = false;

            if (!this.articleName) {
                document.getElementById('articleNameErr').innerHTML = '<i class="fa fa-exclamation-circle"></i>Morate uneti naziv artikla!';
                errors = true;
            }

            if(document.getElementById("inpFile").value == "") {
                document.getElementById('articleImageErr').innerHTML = '<i class="fa fa-exclamation-circle"></i>Morate odabrati sliku!';
                errors = true;
            }

            var reg = /[0-9]+/;
            if (!reg.test(this.articlePrice)) {
                document.getElementById('articleQPErr').innerHTML = ' <i class = "fa fa-exclamation-circle" ></i> I količina i cena moraju biti brojčane vrednosti!';
                errors = true;
            }
            if (this.articleQuantity) {
                if (!reg.test(this.articleQuantity)) {
                    document.getElementById('articleQPErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> I količina i cena moraju biti brojčane vrednosti!';
                    errors = true;
                }
            }
            if (!this.articlePrice) {
                document.getElementById('articleQPErr').innerHTML = ' <i class = "fa fa-exclamation-circle"> </i> Cena mora biti uneta!';
                errors = true;
            }
            if (!errors) {
                let articleDTO = {
                    name: this.articleName,
                    price: this.articlePrice,
                    type: 'Food',
                    //this.articleType, 
                    restaurantID: this.restaurant.restaurantID,
                    quantity: this.articleQuantity,
                    description: this.articleDescription,
                    image: 'images/burger.jpg'
                        //fix 
                }
                axios
                    .post('/restaurant/addArticle', JSON.stringify(articleDTO))
                    .then(response => {
                        if (response.data == null || response.data == "") {
                            document.getElementById('articleNameErr').innerHTML = '<i class="fa fa-exclamation-circle"></i> Već postoji artikal sa unetim nazivom!';
                        } else {
                            document.querySelector('.new-article-view-rp').style.display = 'none ';
                            location.reload();
                        }
                    })
            }
        },
        showNewArticleWindow: function() {
            document.querySelector('.new-article-view-rp').style.display = 'flex';
        },
        closeNewArticleWindow: function() {
            document.querySelector('.new-article-view-rp').style.display = 'none';
        },
        decreaseQuantity: function() {
            if (this.selectedArticleQuantity != 1) {
                this.selectedArticleQuantity = this.selectedArticleQuantity - 1;
            }
        },
        increaseQuantity: function() {
            this.selectedArticleQuantity = this.selectedArticleQuantity + 1;
        },
        addToCart: function() {
            axios
                .post(
                    '/cart/addArticle',
                    JSON.stringify({
                        restaurantID: this.restaurant.restaurantID,
                        item: this.selectedArticle,
                        quantity: this.selectedArticleQuantity
                    })
                )
                .then(response => {
                    if (response.data != null && response.data != "") {
                        this.cart = response.data;
                        this.closeArticle();
                    }
                })

        },
        openCart: function() {
            window.location.href = '#/account/cart';
        }
    }
});