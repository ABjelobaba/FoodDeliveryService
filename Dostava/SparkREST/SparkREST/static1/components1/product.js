Vue.component("edit-product", {
	data: function () {
		    return {
		      title: "Dodaj proizvod",
		      value: "Dodaj",
		      id : -1,
		      product: {id: '', name:null, price:null}
		    }
	},
	template: ` 
<div>
	{{title}}
	<form>
		<label>Ime</label>
		<input type = "text" v-model = "product.name" name = "name">
		<label>Cena</label>
		<input type = "number" v-model = "product.price" name = "price">
		<input type = "submit" v-on:click = "editProduct" v-bind:value = "this.value">
	</form>
</div>		  
`
	, 
	mounted() {
		if(this.$route.params.id !== "-1"){
			this.title = "Izmena proizvoda"
			this.value = "Izmena"
			axios
				.get('rest/products/' + this.$route.params.id)
				.then(response => (this.product = response.data))
		}
		
	},
	methods : {
		editProduct : function () {
			event.preventDefault();
			if(this.value == "Dodaj"){
				axios.post('rest/products/add', this.product).
				then(response => (router.push(`/`)));
			}else{
				axios.put('rest/products/update', this.product).
				then(response => (router.push(`/`)));
			}
		}
	}
});