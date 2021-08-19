Vue.component("admin", {
    data: function() {
        return {}
    },

    template: `
	<div class="page">

		<div class="small-home-img">
        <div >
                <a href="#/"><img class="logo-img" src="images/logo_transparent.png"></a>  
                 
                <a v-on:click="logOut" class="btn">Odjavi se</a>
                
                </div>
                <nav class="user-nav">
                    <ul>
                        <li><a v-on:click="profileView" name="user-nav" id="profile">Profil</a></li>
                        <li><a v-on:click="usersView" name="user-nav" id="users">Korisnici</a></li>
                        <li><a v-on:click="restaurantsView" name="user-nav" id="restaurants">Restorani</a></li>
                    </ul>
                </nav>
		</div>

        <div >
            <router-view></router-view>
        </div>
		
	</div>
	`,
    mounted() {
        window.scrollTo(0, 0);
        if (window.location.href.endsWith('restaurants')) {
            document.getElementById('restaurants').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('users')) {
            document.getElementById('users').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else if (window.location.href.endsWith('profile')) {
            document.getElementById('profile').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        } else {
            document.getElementById('restaurants').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
        }


    },

    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        restaurantsView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('restaurants').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/admin/restaurants";
        },
        profileView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('profile').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/admin/profile";
        },
        usersView: function(event) {
            for (element of document.getElementsByName("user-nav")) {
                element.style.backgroundColor = "transparent";
            }
            document.getElementById('users').style.backgroundColor = "rgba(255, 255, 255, 0.3)";
            window.location.href = "#/admin/users";
        }
    }
})