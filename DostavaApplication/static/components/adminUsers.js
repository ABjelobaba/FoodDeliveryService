Vue.component("admin-users", {
    data: function() {
        return {
            mode: '',
            roles: [
                { id: 'manager', value: 'Menadžer' },
                { id: 'customer', value: 'Kupac' },
                { id: 'deliverer', value: 'Dostavljač' },
                { id: 'admin', value: 'Administrator' }
            ],
            users: [
                { id: '1', role: 'manager', name: 'Nikolina', surname: 'Stanković', username: 'nikolina_stankovic', points: '-' },
                { id: '2', role: 'deliverer', name: 'Petar', surname: 'Brankov', username: 'petar_brankov', points: '-' },
                { id: '3', role: 'admin', name: 'Darko', surname: 'Horvat', username: 'darko_horvat', points: '-' },
                { id: '4', role: 'bronze', name: 'Ivana', surname: 'Kolar', username: 'ivana_kolar', points: 1784 },
                { id: '5', role: 'silver', name: 'Stefan', surname: 'Vuković', username: 'stefan_vukovic', points: 2564 },
                { id: '6', role: 'gold', name: 'Anita', surname: 'Marić', username: 'anita_maric', points: 5486 }
            ]
        }
    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled registrovanih korisnika
    </h1>
    <div class="users-search">
        <div>
            <i class="fa fa-search"></i>
            <input type="text" style="min-width: 470px" placeholder="Pretraži po imenu, prezimenu ili korisničkom imenu..">
        </div>
        <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
        <button class="new-user-btn" v-on:click="newUserClicked">+ Novi korisnik</button>
    </div>

    <div class="filter-div" >
        <div class="filter-modal">
            <div v-on:click="filterClose" class="close-filter">+</div>

            <h2>Uloge</h2>
            <div class="checkbox-btn-container-dark" style="text-align: left;">
                <div v-for="role in roles">
                    <input type="checkbox" v-bind:id="role.id" name="role" v-bind:value="role.id">
                    <label v-bind:for="role.id">{{role.value}}</label>
                </div>
            </div>

            <h2>Sumnjiv kupac</h2>
            <div class="checkbox-btn-container-dark" >
                <div>
                    <input type="checkbox" id="yes" name="suspicious" value="yes">
                    <label for="yes">Da</label>
                </div>
                <div>
                    <input type="checkbox" id="no" name="suspicious" value="no">
                    <label for="no">Ne</label>
                </div>
            </div>

            <h2>Tip kupca</h2>
            <div class="checkbox-btn-container-dark" >
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

    <div class="content" style="display:block">
        <table class="table-users">
            <thead>
                <tr>
                    <th>Uloga</th>
                    <th>Ime <i class="fa fa-sort "></i></th>
                    <th>Prezime <i class="fa fa-sort"></i></th>
                    <th>Korisnicko ime <i class="fa fa-sort"></i></th>
                    <th>Broj bodova <i class="fa fa-sort"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users">
                    <td>
                        <i v-if="user.role == 'manager'" class="fa fa-line-chart fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'deliverer'" class="fa fa-bicycle fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'admin'" class="fa fa-cog fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'gold'" style="color:gold" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'silver'" style="color:silver" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.role == 'bronze'" style="color:#cd7f32" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        </td>
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.points}}</td>
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
        }
    }
})