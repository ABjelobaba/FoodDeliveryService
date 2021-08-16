Vue.component("restaurants", {
    data: function() {
        return {
            mode: "logIn"
        }

    },

    template: `
    <section class="header">

    
        
        <div class="modal" >
        <div class="tab">
                <h1 v-on:click="mode = 'logIn'">Uloguj se</h1>
                <h1 v-on:click="mode = 'register'">Registruj se</h1>
            </div>
            <div v-bind:hidden="mode == 'register'">
                <label >
                    <h3>Korisnicko ime:</h3>
                    <input type="text"></input>
                </label>
                <label >
                    <h3>Lozinka:</h3>
                    <input type="text"></input>
                    <button class="hero-btn1">Prijavi se</button>
                </label>
            </div>

            <div v-bind:hidden="mode == 'logIn'">
                <label >
                    <h3>Korisnicko ime:</h3>
                    <input type="text"></input>
                </label>
                <label >
                    <h3>Lozinka:</h3>
                    <input type="text"></input>
                    <button class="hero-btn1">Prijavi se</button>
                </label>
            </div>
        </div>

       
    </section>	
            `
})