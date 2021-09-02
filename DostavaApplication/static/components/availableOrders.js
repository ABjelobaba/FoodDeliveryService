Vue.component("available-orders", {
    data: function() {
        return {
            name: '',
            surname: '',
            username: '',
            currentRestaurant: [],
            article: '',
            order: '',
            selectedOrder: undefined,
            orderStatuses: [
                { id: 'Processing', value: 'Obrada' },
                { id: 'InPreparation', value: 'U pripremi' },
                { id: 'WaitingForDelivery', value: 'Čeka dostavljača' },
                { id: 'InTransport', value: 'U transportu' },
                { id: 'Delivered', value: 'Dostavljena' },
                { id: 'Cancelled', value: 'Otkazana' }
            ],
            cuisines: [
                { id: 'italian', value: 'Italijanska' },
                { id: 'chinese', value: 'Kineska' },
                { id: 'barbecue', value: 'Rostilj' },
                { id: 'american', value: 'Americka hrana' },
                { id: 'sweets', value: 'Poslastice' }
            ],
            orders: []
        }

    },
    created: function() {
        axios
            .get("order/getWaitingDeliveryOrders")
            .then(response => {
                if (response.data != null) {
                    this.orders = response.data;
                }
            })
    },
    template: `
    <div>
        <h1 style="text-align: center;">Pregled dostupnih porudžbina
        </h1>
        <div class="users-search">
                <div class="search-text-div">
                    <i style="text-align: center;" class="fa fa-search"></i>
                    <input type="text" placeholder="Pretraži po nazivu restorana.." >
                </div>  
                <button class="filter-btn" v-on:click="advancedSearchClicked" id="advancedSearch-btn-do"><i class="fa fa-angle-down fa-lg"></i></button>
        </div>


        <div class="filter-div" style="top:250px" id="advancedSearch">
            <div class="filter-modal" id="advancedSearch-modal" style="position: relative;">
                <div v-on:click="advancedSearchClose" class="close-filter" style="position: absolute; right: 0;">+</div>

                <div style="margin:20px">
                    <h2>Cena:</h2>
                    <label>Od:</label><input type="number" min='0' name="price" id="fromPrice" placeholder="00000">(.00 RSD)<br>
                    <label>Do:</label><input type="number" min='0' name="price" id="toPrice" placeholder="00000">(.00 RSD)
                </div>
                <div style="margin:20px">
                    <h2>Datum:</h2>
                    <label>Od:</label><input type="date" name="date" id="fromDate" ><br>
                    <label>Do:</label><input type="date" name="date" id="toDate" >
                </div> 
            </div>
        </div>

        <div class="content" style="display:block" >
            <table class="table-users" name="orders">
                <thead>
                    <tr>
                        <th>Vreme <i class="fa fa-sort "></i></th>
                        <th>Kupac <i class="fa fa-sort"></i></th>
                        <th>Restoran <i class="fa fa-sort "></i></th>
                        <th>Cena <i class="fa fa-sort"></i></th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="order in orders" v-on:click="showOrder(order)">
                        <td>{{order.orderDate}}</td>
                        <td>
                            <div class="user-address-delivery">
                                <h3>{{order.customerName}} {{order.customerSurname}}</h3>
                                <h4>{{order.address}}</h4>
                            </div>
                        </td>
                        <td>
                            <restaurant-cell v-bind:restaurantID="order.restaurantID"></restaurant-cell>
                        </td>
                        <td>{{order.price}}.00 RSD</td>
                        <td ><div class="permission-to-deliver-btn"> Zatraži porudžbinu </div></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <view-order v-if="selectedOrder != undefined" 
                    v-bind:selectedOrder="selectedOrder" 
                    v-on:closeModal="closeModal"></view-order>

    </div>

              `,
    mounted() {
        window.scrollTo(0, 0);

        var a = document.getElementById('advancedSearch-btn-do');
        this.rect = a.getBoundingClientRect();
        document.querySelector('#advancedSearch-modal').style.marginRight = $(document).width() - this.rect.right + 'px';

        if (document.body.clientWidth <= 900) {

            document.querySelector('.filter-modal').style.width = 550 + 'px';
            document.querySelector('.filter-modal').style.marginRight = 'auto';

        }
    },
    methods: {
        logOut: function(event) {
            window.location.href = "/#/"
        },
        showOrder: function(order) {
            this.selectedOrder = order;
        },
        closeModal: function() {
            this.selectedOrder = undefined;
        },
        advancedSearchClose: function(event) {
            document.getElementById('advancedSearch').style.display = 'none';
            document.querySelector('.table-users').style.top = '0px';
        },
        advancedSearchClicked: function(event) {
            if (document.getElementById('advancedSearch').style.display == 'none' || document.getElementById('advancedSearch').style.display == '') {
                document.getElementById('advancedSearch').style.display = 'inline-table';
                document.querySelector('.table-users').style.top = '-' + (document.querySelector('#advancedSearch-modal').getBoundingClientRect().height + 10) + 'px';

            } else { this.advancedSearchClose(); }
        }
    }
})