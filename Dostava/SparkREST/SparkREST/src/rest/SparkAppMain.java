package rest;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.post;
import static spark.Spark.put;
import static spark.Spark.delete;
import static spark.Spark.staticFiles;

import java.io.File;

import com.google.gson.Gson;

import beans.Product;
import services.ProductService;

public class SparkAppMain {

	private static Gson g = new Gson();
	private static ProductService productService = new ProductService();
	
	public static void main(String[] args) throws Exception {
		port(8080);

		staticFiles.externalLocation(new File("./static").getCanonicalPath());
		
		get("rest/products/", (req, res) -> {
			res.type("application/json");
			return g.toJson(productService.getProducts());
		});
		get("rest/products/:id", (req, res) -> {
			res.type("application/json");
			return g.toJson(productService.getProduct(req.params(":id")));
		});
		
		post("rest/products/add", (req, res) -> {
			res.type("application/json");
			Product pd = g.fromJson(req.body(), Product.class);
			productService.addProduct(pd);
			return "SUCCESS";
		});
		
		put("rest/products/update", (req, res) -> {
			res.type("application/json");
			Product pd = g.fromJson(req.body(), Product.class);
			productService.updateProduct(pd);
			return "SUCCESS";
		});
		
		delete("rest/products/delete/:id", (req, res) -> {
			res.type("application/json");
			productService.deleteProduct(req.params(":id"));
			return "SUCCESS";
		});
	}
}
