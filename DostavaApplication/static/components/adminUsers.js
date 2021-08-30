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
            users: '',
            selectedUser: '',
            question: ''
        }
    },
    created: function() {
        axios
            .get("user/getAll")
            .then(response => {
                if (response.data != null) {
                    this.users = response.data;
                }
            })
    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled registrovanih korisnika
    </h1>
    <div class="users-search">
        <div class="search-text-div">
            <i class="fa fa-search"></i>
            <input type="text" style="min-width: 470px" placeholder="Pretraži po imenu, prezimenu ili korisničkom imenu..">
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
                    <input type="checkbox" v-bind:id="role.id" name="role" v-bind:value="role.id">
                    <label v-bind:for="role.id">{{role.value}}</label>
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
                    <th>Blokiraj</th>
                    <th>Obriši</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" v-if="!user.deleted">
                    <td>
                        <i v-if="user.role == 'Manager'" class="fa fa-line-chart fa-lg" aria-hidden="true"></i>
                        <i v-else-if="user.role == 'Deliverer'" class="fa fa-bicycle fa-lg" aria-hidden="true"></i>
                        <i v-else-if="user.role == 'Administrator'" class="fa fa-cog fa-lg" aria-hidden="true"></i>
                        <i v-else-if="user.category.type == 'Gold'" style="color:gold" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-else-if="user.category.type == 'Silver'" style="color:silver" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-else-if="user.category.type == 'Bronze'" style="color:#cd7f32" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        </td>
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.totalPoints}}</td>
                    <td>
                        <button class="black-btn" v-if="user.role=='Administrator' || user.blocked"  disabled ><i class="fa fa-ban" aria-hidden="true"></i> Blokiraj</button>
                        <button class="black-btn" v-else v-on:click="blockUser(user)"><i class="fa fa-ban" aria-hidden="true"></i> Blokiraj</button>
                    </td>
                    <td>
                        <button class="black-btn" v-if="user.role=='Administrator' || user.blocked"  disabled ><i class="fa fa-trash-o" aria-hidden="true"></i> Obrisi</button>
                        <button class="black-btn" v-else v-on:click="askToDelete(user)"><i class="fa fa-trash-o" aria-hidden="true"></i> Obriši</button>
                    </td>
                </tr>
            </tbody>

        </table>
    </div>

    <new-user v-if="mode == 'newUser'" v-on:closeRegistration="newUserClose"></new-user>
    <success></success>
    <question :question="question" v-on:answer="answer"></question>
    
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
        askToDelete: function(user) {
            this.question = "Da li ste sigurni da želite da obrišete korisnika '" + user.username + "'?";
            this.selectedUser = user;
            document.querySelector("#question").style.display = "flex";
        },
        answer: function(receivedAnswer) {
            document.querySelector("#question").style.display = "none";
            if (receivedAnswer == 'yes') {
                this.deleteUser();
            } else {
                this.selectedUser = '';
            }
        },
        deleteUser: function() {
            axios
                .delete("user/" + this.selectedUser.username)
                .then(response => {
                    if (response.data != null) {
                        this.users = response.data;
                    }

                })
        }

    }
})