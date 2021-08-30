Vue.component("admin-users", {
    data: function() {
        return {
            mode: '',
            roles: [
                { id: 'Manager', value: 'Menadžer' },
                { id: 'Customer', value: 'Kupac' },
                { id: 'Deliverer', value: 'Dostavljač' },
                { id: 'Administrator', value: 'Administrator' }
            ],
            types: [
                { id: 'Silver', value: 'Srebrni' },
                { id: 'Bronze', value: 'Bronzani' },
                { id: 'Gold', value: 'Zlatni' }
            ],
            users: [
                { id: '1', role: 'Manager', name: 'Nikolina', surname: 'Stanković', username: 'nikolina_stankovic', points: '-', suspicious: false, blocked: false, deleted: true },
                { id: '2', role: 'Deliverer', name: 'Petar', surname: 'Brankov', username: 'petar_brankov', points: '-', suspicious: true, blocked: false, deleted: false },
                { id: '3', role: 'Administrator', name: 'Darko', surname: 'Horvat', username: 'darko_horvat', points: '-', suspicious: true, blocked: false, deleted: false },
                { id: '4', role: 'Customer', medal: 'Bronze', name: 'Ivana', surname: 'Kolar', username: 'ivana_kolar', points: 1784, suspicious: true, blocked: false, deleted: false },
                { id: '5', role: 'Customer', medal: 'Silver', name: 'Stefan', surname: 'Vuković', username: 'stefan_vukovic', points: 2564, suspicious: true, blocked: false, deleted: false },
                { id: '6', role: 'Customer', medal: 'Gold', name: 'Anita', surname: 'Marić', username: 'anita_maric', points: 5486, suspicious: true, blocked: false, deleted: false }
            ],
            searchText: '',
            searchResults: [
                { id: '1', role: 'Manager', name: 'Nikolina', surname: 'Stanković', username: 'nikolina_stankovic', points: '-', suspicious: false, blocked: false, deleted: true },
                { id: '2', role: 'Deliverer', name: 'Petar', surname: 'Brankov', username: 'petar_brankov', points: '-', suspicious: true, blocked: false, deleted: false },
                { id: '3', role: 'Administrator', name: 'Darko', surname: 'Horvat', username: 'darko_horvat', points: '-', suspicious: true, blocked: false, deleted: false },
                { id: '4', role: 'Customer', medal: 'Bronze', name: 'Ivana', surname: 'Kolar', username: 'ivana_kolar', points: 1784, suspicious: true, blocked: false, deleted: false },
                { id: '5', role: 'Customer', medal: 'Silver', name: 'Stefan', surname: 'Vuković', username: 'stefan_vukovic', points: 2564, suspicious: true, blocked: false, deleted: false },
                { id: '6', role: 'Customer', medal: 'Gold', name: 'Anita', surname: 'Marić', username: 'anita_maric', points: 5486, suspicious: true, blocked: false, deleted: false }
            ]
        }
    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled registrovanih korisnika
    </h1>
    <div class="users-search">
        <div class="search-text-div">
            <i class="fa fa-search"></i>
            <input type="text" style="min-width: 470px" placeholder="Pretraži po imenu, prezimenu ili korisničkom imenu.." v-on:keyup="searchUser" v-model="searchText">
        </div>
        <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        <button class="new-user-btn" v-on:click="newUserClicked">+ Novi korisnik</button>
    </div>

    <div class="filter-div" id="filter-div">
        <div class="filter-modal" id="filter-modal" style="position: relative;">
            <div v-on:click="filterClose" class="close-filter" style="position: absolute; right: 0;">+</div>

            <h2>Uloge</h2>
            <div class="checkbox-btn-container-dark" style="text-align: left;">
                <div v-for="role in roles">
                    <input type="checkbox" v-bind:id="role.id" name="role" v-bind:value="role.id" v-on:change="filterChanged">
                    <label v-bind:for="role.id">{{role.value}}</label>
                </div>
            </div>

            <h2>Tip kupca</h2>
            <div class="checkbox-btn-container-dark" >
                <div v-for="type in types"> 
                    <input type="checkbox" v-bind:id="type.id" name="type" v-bind:value="type.id" v-on:change="filterChanged">
                    <label v-bind:for="type.id">{{type.value}}</label>
                </div>
            </div>
        </div>


    </div>

    <div class="content" style="display:block">
        <table class="table-users">
            <thead>
                <tr>
                    <th>Uloga</th>
                    <th>Ime <i class="fa fa-sort "></i></th>
                    <th>Prezime <i class="fa fa-sort"></i></th>
                    <th>Korisnicko ime <i class="fa fa-sort"></i></th>
                    <th>Broj bodova <i class="fa fa-sort"></i></th>
                    <th>Blokiraj</th>
                    <th>Obriši</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in searchResults" v-if="!user.deleted">
                    <td>
                        <i v-if="user.role == 'Manager'" class="fa fa-line-chart fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'Deliverer'" class="fa fa-bicycle fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'Administrator'" class="fa fa-cog fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'Customer' && user.medal == 'Gold'" style="color:gold" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'Customer' && user.medal == 'Silver'" style="color:silver" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'Customer' && user.medal == 'Bronze'" style="color:#cd7f32" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        </td>
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.points}}</td>
                    <td>
                        <button class="black-btn" v-if="user.role=='admin' || user.blocked"  disabled ><i class="fa fa-ban" aria-hidden="true"></i> Blokiraj</button>
                        <button class="black-btn" v-else v-on:click="blockUser(user)"><i class="fa fa-ban" aria-hidden="true"></i> Blokiraj</button>
                    </td>
                    <td>
                        <button class="black-btn" v-on:click="deleteUser(user)"><i class="fa fa-trash-o" aria-hidden="true"></i> Obriši</button>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>

    <new-user v-if="mode == 'newUser'" v-on:closeRegistration="newUserClose"></new-user>
    <success></success>
</div>
`,
    mounted() {
        window.scrollTo(0, 0);
        var b = document.getElementById('filter-btn-do');
        this.rect = b.getBoundingClientRect();
        document.querySelector('.filter-modal').style.marginRight = $(document).width() - this.rect.right + 'px';

        if (document.body.clientWidth <= 900) {

            document.querySelector('.filter-modal').style.width = 550 + 'px';
            document.querySelector('.filter-modal').style.marginRight = 'auto';

        }


    },
    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        filterClicked: function(event) {
            if (document.querySelector('.filter-div').style.display == 'none' || document.querySelector('.filter-div').style.display ==
                '') {
                document.querySelector('.filter-div').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-' + (document.querySelector('.filter-modal').getBoundingClientRect().height + 10) + 'px';
            } else { this.filterClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        newUserClicked: function(event) {
            this.mode = 'newUser';
        },
        newUserClose: function(event) {
            this.role = 'Odaberite ulogu korisnika..';
            this.username = '';
            this.password = '';
            this.name = '';
            this.surname = '';
            this.gender = 'Odaberite pol..';
            $("input[type=date]").val("");
            for (element of document.getElementsByName('labels')) {
                element.innerHTML = '';
                element.style.display = 'hidden';
            }
            this.mode = '';
        },
        blockUser: function(user) {
            user.suspicious = false;
            user.blocked = true;
        },
        deleteUser: function(user) {
            user.deleted = true;
        },
        searchUser: function(event) {
            if (this.searchText != '' && this.searchText.trim().lenght != 0) {

                let searchParts = this.searchText.trim().split(' ');

                this.searchResults = [];
                for (user of this.users) {
                    let matches = true;
                    for (let i = 0; i < searchParts.length; i++) {
                        if (!user.name.includes(searchParts[i]) && !user.surname.includes(searchParts[i]) && !user.username.includes(searchParts[i])) {
                            matches = false;
                            break;
                        }
                    }
                    if (matches) {
                        this.searchResults.push(user);
                    }
                }

            } else {
                this.searchResults = this.users;
            }
        }
    }
});