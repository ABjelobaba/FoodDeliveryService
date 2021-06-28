package services;

import java.util.Collection;

import beans.Product;
import beans.Products;

public class ProductService {
	
	private Products products = new Products();
	
	public Collection<Product> getProducts() {
		return this.products.getProductList();
	}
	
	public Product getProduct(String id) {
		return this.products.getProduct(id);
	}
	
	public void addProduct(Product product) {
		this.products.addProduct(product);
	}

	public void updateProduct(Product product) {
		this.products.update(product.getId(), product);
	}
	
	public void deleteProduct(String id) {
		this.products.delete(id);
	}
}
