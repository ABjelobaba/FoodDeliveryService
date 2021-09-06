Vue.component("restaurant-customers", {
    data: function() {
        return {
            mode: '',
            users: [],
            customerTypes: [
                { id: 'Gold', value: 'Zlatni' },
                { id: 'Silver', value: 'Srebrni' },
                { id: 'Bronze', value: 'Bronzani' }
            ],
            searchText: '',
            searchResults: ''
        }
    },
    created: function() {
        axios
            .get("user/getLoggedInUser")
            .then(response => {
                if (response.data != null) {
                    axios
                        .get("user/getAllRestaurantCustomers/" + response.data.restaurantID)
                        .then(response => {
                            if (response.data != null) {
                                this.users = response.data;
                                this.searchResults = response.data;
                            }
                        })
                }
            })
    },
    template: `
<div>

    <h1 style="text-align: center;">Pregled kupaca
    </h1>
    <div class="users-search">
        <div class="search-text-div">
            <i class="fa fa-search"></i>
            <input type="text" style="min-width: 470px" v-model="searchText"  v-on:keyup="searchUser" placeholder="Pretraži po imenu, prezimenu ili korisničkom imenu...">
        </div>
        <button class="filter-btn" v-on:click="filterClicked" id="filter-btn-do"><i class="fa fa-sliders fa-lg"></i>Filteri<i class="fa fa-angle-down fa-lg"></i></button>
    </div>

    <div class="filter-div" id="filter-div" >
        <div class="filter-modal" id="filter-modal" style="position: relative;">
            <div v-on:click="filterClose" class="close-filter" style="position: absolute; right: 0;">+</div>

            <h2>Tip kupca</h2>
            <div class="checkbox-btn-container-dark" >
                <div v-for="type in customerTypes">
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
                    <th>Tip</th>
                    <th v-on:click="sortByName" id="name-th">Ime <i class="fa fa-sort "></i></th>
                    <th v-on:click="sortBySurname" id="surname-th">Prezime <i class="fa fa-sort"></i></th>
                    <th v-on:click="sortByUsername" id="username-th">Korisničko ime <i class="fa fa-sort"></i></th>
                    <th v-on:click="sortByPoints" id="points-th">Broj bodova <i class="fa fa-sort"></i></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in searchResults">
                    <td>
                        <i v-if="user.category.type == 'Gold'" style="color:gold" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.category.type == 'Silver'" style="color:silver" class="fa fa-user fa-lg" aria-hidden="true"></i>
                        <i v-if="user.category.type == 'Bronze'" style="color:#cd7f32" class="fa fa-user fa-lg" aria-hidden="true"></i>
                    </td>
                    <td>{{user.name}}</td>
                    <td>{{user.surname}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.totalPoints}}</td>
                </tr>
            </tbody>

        </table>
    </div>
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
        filterClicked: function(event) {
            if (document.querySelector('.filter-div').style.display == 'none' || document.querySelector('.filter-div').style.display ==
                '') {
                document.querySelector('.filter-div').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-182px';
            } else { this.filterClose(); }
        },
        filterClose: function(event) {
            document.querySelector('.filter-div').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        searchUser: function(event) {
            if (this.searchText != '' && this.searchText.trim().lenght != 0) {

                let searchParts = this.searchText.trim().split(' ');

                this.searchResults = [];
                for (user of this.users) {
                    let matches = true;
                    for (let i = 0; i < searchParts.length; i++) {
                        if (!user.name.toLocaleLowerCase().includes(searchParts[i].toLocaleLowerCase()) &&
                            !user.surname.toLocaleLowerCase().includes(searchParts[i].toLocaleLowerCase()) &&
                            !user.username.toLocaleLowerCase().includes(searchParts[i].toLocaleLowerCase())) {
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
        },
        filterChanged: function(event) {
            this.searchResults = [];
            var cbType = document.getElementsByName('type');
            var cbCheckedType = [];
            for (var i = 0; i < cbType.length; i++) {
                if (cbType[i].checked) {
                    cbCheckedType.push(cbType[i].defaultValue);
                }
            }

            if (cbCheckedType.length == 0) {
                this.searchResults = this.users;
                return;
            }

            for (user of this.users) {
                for (cb of cbCheckedType) {
                    if (user.category.type === cb) {
                        this.searchResults.push(user);
                    }
                }
            }
        },
        sortByName: function() {
            let nameTH = document.querySelector('#name-th');
            if (nameTH.innerHTML.includes('sort-asc')) {
                this.searchResults = this.searchResults.sort(function compareFn(a, b) { return a.name.localeCompare(b.name) }).reverse();
                nameTH.innerHTML = 'Ime <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            } else {
                this.searchResults = this.searchResults.sort(function compareFn(a, b) { return a.name.localeCompare(b.name) });
                nameTH.innerHTML = 'Ime <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('name');
        },
        sortBySurname: function() {
            let surnameTH = document.querySelector('#surname-th');
            if (surnameTH.innerHTML.includes('sort-asc')) {
                this.searchResults = this.searchResults.sort(function compareFn(a, b) { return a.surname.localeCompare(b.surname) }).reverse();
                surnameTH.innerHTML = 'Prezime <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            } else {
                this.searchResults = this.searchResults.sort(function compareFn(a, b) { return a.surname.localeCompare(b.surname) });
                surnameTH.innerHTML = 'Prezime <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('surname');
        },
        sortByUsername: function() {
            let usernameTH = document.querySelector('#username-th');
            if (usernameTH.innerHTML.includes('sort-asc')) {
                this.searchResults = this.searchResults.sort(function compareFn(a, b) { return a.username.localeCompare(b.username) }).reverse();
                usernameTH.innerHTML = 'Korisničko ime <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            } else {
                this.searchResults = this.searchResults.sort(function compareFn(a, b) { return a.username.localeCompare(b.username) });
                usernameTH.innerHTML = 'Korisničko ime <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('username');
        },
        sortByPoints: function() {
            let pointsTH = document.querySelector('#points-th');
            if (pointsTH.innerHTML.includes('sort-asc')) {
                this.searchResults = this.searchResults.sort(function(a, b) {
                    if (a.totalPoints == undefined) {
                        return 1;
                    } else if (b.totalPoints == undefined) {
                        return -1;
                    } else {
                        return b.totalPoints - a.totalPoints
                    }
                });
                pointsTH.innerHTML = 'Broj bodova <i class="fa fa-sort-desc" aria-hidden="true"></i>';
            } else {
                this.searchResults = this.searchResults.sort(function(a, b) {
                    if (a.totalPoints == undefined) {
                        return 1;
                    } else if (b.totalPoints == undefined) {
                        return -1;
                    } else {
                        return b.totalPoints - a.totalPoints
                    }
                }).reverse();
                pointsTH.innerHTML = 'Broj bodova <i class="fa fa-sort-asc" aria-hidden="true"></i>';
            }
            this.resetOtherSorts('points');
        },
        resetOtherSorts: function(activeSort) {
            if (activeSort != "name") {
                let nameTH = document.querySelector('#name-th');
                nameTH.innerHTML = 'Ime <i class="fa fa-sort" aria-hidden="true"></i>';
            }
            if (activeSort != "surname") {
                let surnameTH = document.querySelector('#surname-th');
                surnameTH.innerHTML = 'Prezime <i class="fa fa-sort" aria-hidden="true"></i>';
            }
            if (activeSort != "username") {
                let usernameTH = document.querySelector('#username-th');
                usernameTH.innerHTML = 'Korisničko ime <i class="fa fa-sort" aria-hidden="true"></i>';
            }
            if (activeSort != "points") {
                let pointsTH = document.querySelector('#points-th');
                pointsTH.innerHTML = 'Broj bodova <i class="fa fa-sort" aria-hidden="true"></i>';
            }
        }
    }
})