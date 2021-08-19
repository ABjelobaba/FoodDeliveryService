Vue.component("admin-users", {
    data: function() { return { name: 'Lea', surname: 'Kalmar', username: 'lea_kalmar', gender: 'ŽENSKO', oldPassword: '', newPassword: '' } },
    template: `
<div>
    
        <h1 style="text-align: center;">Pregled registrovanih korisnika
        </h1>
        <div class="users-search">
            <i class="fa fa-search"></i>
            <input type="text" placeholder="Pretraži po imenu, prezimenu ili korisničkom imenu..">

            <button class="filter-btn" v-on:click="register"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>

        </div>

        <div class="filter-div" >
            <div class="filter-modal">
                <div v-on:click="registrationClose" class="close-filter">+</div>

                <h2>Uloge</h2>
					<div class="chechbox_types" style="text-align: left;" >
						<div>
							<input type="checkbox" id="manager" name="role" value="manager">
							<label for="manager">Menadzer</label>
						</div>
						<div>
							<input type="checkbox" id="customer" name="role" value="customer">
							<label for="customer">Kupac</label>
						</div>
						<div>
							<input type="checkbox" id="deliverer" name="role" value="deliverer">
							<label for="deliverer">Dostavljac</label>
						</div>
						<div>
							<input type="checkbox" id="admin" name="role" value="admin">
							<label for="admin">Administrator</label>
						</div>
					</div>

                    <h2>Tip kupca</h2>
					<div class="chechbox_types" style="text-align: left;" >
						<div>
							<input type="checkbox" id="gold" name="role" value="gold">
							<label for="gold">Zlatni</label>
						</div>
						<div>
							<input type="checkbox" id="silver" name="role" value="silver">
							<label for="silver">Srebrni</label>
						</div>
						<div>
							<input type="checkbox" id="bronze" name="role" value="bronze">
							<label for="bronze">Bronzani</label>
						</div>
					</div>
            </div>

        
        </div>
            
        
        <table class="table-users">
        <thead>
            <tr>
                <th>Uloga</th>
                <th>Ime</th>
                <th>Prezime</th>
                <th>Korisnicko ime</th>
                <th>Broj bodova</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
            <tr>
                <td>Slika</td>
                <td>Lea</td>
                <td>Kalmar</td>
                <td>lea_kalmar</td>
                <td>3568</td>
            </tr>
        </tbody>

    </table>

</div>
`,
    mounted() {
        window.scrollTo(0, 0);
    },
    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        register: function(event) {
            document.querySelector('.filter-div').style.display = 'inline-table';
            document.querySelector('.table-users').style.top = '-325px';
        },
        registrationClose: function(event) {
            this.username = '';
            this.password = '';
            this.name = '';
            this.surname = '';
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            document.querySelector('.filter-div').style.display = 'none';
            this.mode = 'logIn';
            document.querySelector('.table-users').style.top = '0px';
        }
    }
})