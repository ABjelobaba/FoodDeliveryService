Vue.component("restaurant-page", {
    data: function() {
        return {
            articles: [
                { id: 1, img: '', name: 'Burger', composition: 'Zelena salata, paradajz, sir, kiseli krastavac', price: 450 }, {

                    id: 2,
                    img: '',
                    name: 'Burger',
                    composition: 'Zelena salata, paradajz,sir,kiseli krastavac ',
                    price: 450
                }
            ],
            comments: [
                { id: 1, rating: 5.0, text: ' Odlicna hrana, brza dostava ', userName: 'Nikola ', status: 'rejected ' },
                { id: 2, rating: 4.0, text: 'Dobra hrana,velike porcije ', userName: 'Marko ', status: 'approved ' },
                { id: 3, rating: 3.0, text: 'Okej hrana ', userName: 'Marija ', status: ' waiting ' }
            ],
            review_states: [
                { value: 'rejected ', text: 'Odbijen ' }, { value: 'approved ', text: 'Odobren ' },
                { value: 'waiting ', text: 'Čeka obradu ' }
            ],
            logedInRole: 'admin'
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
                        <p>45.256420, 19.811140</p>
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

    <div class="bottom-section-rp">
        <div style="position: sticky;top: 65px;text-align: right;align-self: start;">
            <div v-if="logedInRole =='manager'">
                <button v-on:click="showNewArticleWindow()" class="add-article-btn">+ Novi artikal</button>
            </div>
            <div v-if="logedInRole =='admin' || logedInRole =='manager'">
                <input v-on:click="showHideReviews()" type="checkbox" id="viewReviews" value="viewReviews">
                <label class="full-radio-btn-label" style="min-width: fit-content;" for="viewReviews">Pregled utisaka</label>
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
            <div class="nav-cart-rp" id="ncart-rp" v-if="logedInRole == 'user'">
                <a> Korpa (0)</a>
            </div>

            <div class="articles-rp">
                <h1>Artikli</h1>
                <ul class="article-list-rp">
                    <article-in-restaurant v-for="article in articles" v-bind:key="article.id" v-bind:article="article"></article-in-restaurant>
                </ul>
            </div>

            <div class="restaurant-reviews-rp">
                <h1>Utisci</h1>
                <ul class="user-reviews-list-rp">
                    <comment-status v-for="c in comments" v-bind:key="c.id" v-bind:comment="c" v-bind:logedInRole="logedInRole"></comment-status>
                </ul>
                <h6 id="allReviews">Svi utisci... </h6>
            </div>
        </div>
    </div>

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
                    <a href="#" v-if="logedInRole != 'admin'">Dodaj u korpu</a>
                    <a href="#" v-else ><i class="fa fa-trash-o fa-lg" aria-hidden="true"> </i> Obrisi</a>
                </div>
                
            </div>
        </div>
    </div>

    <div class="new-article-view-rp">
        <div class="selected-item-rp" style="width:500px; margin: auto auto; text-align: center;">
            <div v-on:click="closeNewArticleWindow" class="close">+</div>

            <div style="display: grid; height: 100%; grid-template-rows: auto auto 50px;" class="firstStep">
                <form>
                    <div class="login-title" style="margin: auto 0;">
                        <h3 style="color: white; font-weight: bolder;"> DODAJTE NOVI ARTIKAL </h3>
                    </div>

                    <div style="margin: auto 0px;">
                    
                        <input v-model="restaurantName" type="text" class="login-inputs" placeholder="Naziv artikla">
                        <label class="error" id="restaurantNameErr" name="labels" display="hidden"> </label>

                        <label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Slika:</label>
                        <input type="file" class="login-inputs" style="margin: 2px auto 2px;" id="inpFile" v-on:change="fileUploaded">
                        <label class="error" id="fileErr" name="labels" display="hidden"> </label>

                        <div class="image-preview" id="imagePreview">
                            <img src="" alt="Image Preview" class="image-preview__image" style="max-width: 60%;">
                            <span class="image-preview__default-text">Image Preview</span>
                        </div>

                        <label style="color: white;display: block;margin:15px 0 0 0;font-weight: bold;">Opis artikla:</label>
                        <div class="radio-btn-container" style="width: 60%;height: 100px;box-shadow: 10px 20px 20px 0 rgba(0, 0, 0, 0.2);">
                            <textarea class="article-desc-ta" placeholder="Unesite opis artikla..."></textarea>

                        </div>
                    
                    </div>
                    <!-- <label class="error" id="logoErr" name="labels" display="hidden"> </label> -->

                    <div style="display: inline-flex; justify-content: space-between; width: 60%;">
                        <input v-model="restaurantName" type="text" class="login-inputs" style="margin-right: 10%;" placeholder="Kolicina (g)">
                        <input v-model="restaurantName" type="text" class="login-inputs" id="article-price-input" placeholder="Cena (RSD)">
                    </div>
                    
                    <br>
                </form>
            </div>
            <button v-on:click="nextStep" style="margin-top:10px; width: 25%;" class="log-btn"> 
							Dodaj
			</button>

        </div>
    </div>
</div>


</div>
`,
    mounted() {
        window.scrollTo(0, 0);

        function createNavMenu() {
            if (window.location.href.endsWith('restaurantPage')) {
                if (window.scrollY >= 250) { document.getElementById('navmenu-rp').style.visibility = 'visible'; } else {
                    document.getElementById('navmenu-rp').style.visibility = 'collapse';
                }
            }
        }
        window.addEventListener('scroll', createNavMenu);
        const Map = L.map('map-rp').setView([45.256420, 19.811140], 13);
        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
            maxZoom: 18,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1,
            accessToken: apiKey
        }).addTo(Map);
        marker = L.marker([45.256420, 19.811140]).addTo(Map);
    },
    methods: {
        showFoodItem: function() { document.querySelector('.article-view-rp').style.display = 'flex'; },
        closeFoodItem: function() { document.querySelector('.article-view-rp').style.display = 'none'; },
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
            let imagePreviewContainer = document.getElementById("imagePreview");
            let previewImage = imagePreviewContainer.querySelector(".image-preview__image");
            let previewDefaultText = imagePreviewContainer.querySelector(".image-preview__default-text");
            let file = inpFile.files[0];
            if (file) {
                let reader = new FileReader();
                previewDefaultText.style.display = "none";
                previewImage.style.display = "block";
                reader.addEventListener("load", function() { previewImage.setAttribute("src", this.result); });
                reader.readAsDataURL(file);
            } else {
                previewDefaultText.style.display = null;
                previewImage.style.display =
                    null;
                previewImage.setAttribute("src", "");
            }
        },
        nextStep: function(event) {
            event.preventDefault();
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            let errors = false; //TO-DO: Dodati proveru za sliku da li je dodata i odabrane kategorije hrane
            if (!errors) {
                if (document.querySelector('.firstStep').style.display == 'grid') {
                    if (!this.restaurantName) {
                        document.getElementById('restaurantNameErr').innerHTML = '<i class="fa fa-exclamation-circle"></i>Morate uneti naziv artikla!';
                        errors = true;
                    } else {
                        document.querySelector('.firstStep').style.display = 'none';
                        document.querySelector('.secondStep').style.display = 'grid';
                    }
                } else { document.querySelector('.register').style.display = 'none'; }
            }
        },
        showNewArticleWindow: function() { document.querySelector('.new-article-view-rp').style.display = 'flex'; },
        closeNewArticleWindow: function() { document.querySelector('.new-article-view-rp').style.display = 'none'; }
    }
});

function simpleReverseGeocoding(lon,
    lat) {
    fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat + '&accept-language=sr-Latn').then(function(response) { return response.json(); }).then(function(json) {
        let street = document.getElementById("street");
        let
            city = document.getElementById("city");
        let postcode = document.getElementById("postcode");
        let number = document.getElementById("number");
        if (json.address.house_number) {
            number.value = json.address.house_number;
            number.dispatchEvent(new Event('input'));
        } else {
            number.value = '';
            number.dispatchEvent(new Event('input'));
        }
        if (json.address.road) {
            street.value = json.address.road;
            street.dispatchEvent(new Event('input'));
        } else {
            street.value = '';
            street.dispatchEvent(new Event('input'));
        }
        if (json.address.city) {
            city.value = json.address.city;
            if (city.value.startsWith('Grad')) { city.value = json.address.city.substring(5); } else if (city.value.startsWith('Opština')) { city.value = json.address.city.substring(8); } else if (city.value.startsWith('Gradska opština')) { city.value = json.address.city.substring(16); }
            city.dispatchEvent(new Event('input'));
        } else if (json.address.city_district) {
            city.value = json.address.city_district;
            city.dispatchEvent(new Event('input'));
        } else if (json.address.town) {
            city.value = json.address.town;
            city.dispatchEvent(new Event('input'));
        } else {
            city.value = '';
            city.dispatchEvent(new Event('input'));
        }
        if (json.address.postcode) {
            postcode.value = json.address.postcode;
            postcode.dispatchEvent(new Event('input'));
        } else {
            postcode.value = '';
            postcode.dispatchEvent(new Event('input'));
        }
    });
}