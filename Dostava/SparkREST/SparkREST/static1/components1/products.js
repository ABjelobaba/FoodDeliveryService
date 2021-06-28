Vue.component("products", {
	data: function () {
		return {
			products: null
		}
	},
	template: ` 
    	<div>
    		<h3>Prikaz proizvoda</h3>
    		<table border="1">
	    		<tr bgcolor="lightgrey">
	    			<th>Naziv</th>
	    			<th>Cena</th>
	    			<th>Izmeni</th>
	    			<th>Obrisi</th>
	    		</tr>
	    			
	    		<tr v-for="(p, index) in products">
	    			<td>{{p.name}}</td>
	    			<td>{{p.price}}</td>
	    			<td><button v-on:click = "updateProduct(p)">Izmeni</button></td>
	    			<td><button v-on:click = "deleteProduct(p)">Obrisi</button></td>
	    		</tr>
	    	</table>
    		<button v-on:click = "addProduct">Dodaj nov proizvod</button>
    	</div>		  
    	`,
	mounted() {
		axios
			.get('rest/products/')
			.then(response => (this.products = response.data))
	},
	methods: {
		addProduct: function () {
			router.push(`/products/-1`);
		},
		updateProduct: function (product) {
			router.push(`/products/` + product.id);
		},
		deleteProduct: function (product) {
			axios
				.delete('rest/products/delete/'+ product.id)
				.then(response => (axios
					.get('rest/products/')
					.then(response => (this.products = response.data))))
		}
	}
});