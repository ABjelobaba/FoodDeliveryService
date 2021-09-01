package controllers;

import static spark.Spark.get;
import static spark.Spark.post;


import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.OrderedItem;
import beans.ShoppingCart;
import dto.CartItemDTO;
import services.CartService;
import spark.Session;

public class CartController {
	private static Gson gs = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();

    public CartController(CartService cartService){

        get("/cart",(req,res)->{
			res.type("application/json");
			Session session = req.session();
			ShoppingCart cart = session.attribute("cart");
			return gs.toJson(cart);
		});

        post("/cart/addArticle", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
                ShoppingCart cart = session.attribute("cart");
                cart = cartService.addArticle(cart, gs.fromJson(req.body(), CartItemDTO.class));
                cart = cartService.calculatePoints(cart);
				session.attribute("cart", cart);
				return gs.toJson(cart);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/cart/increaseQuantity", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
                ShoppingCart cart = session.attribute("cart");
                cart = cartService.increaseQuantity(cart,gs.fromJson(req.body(), OrderedItem.class));
                cart = cartService.calculatePoints(cart);
				session.attribute("cart", cart);
				return gs.toJson(cart);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/cart/decreaseQuantity", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
                ShoppingCart cart = session.attribute("cart");
                cart = cartService.decreaseQuantity(cart,gs.fromJson(req.body(), OrderedItem.class));
                cart = cartService.calculatePoints(cart);
				session.attribute("cart", cart);
				return gs.toJson(cart);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/cart/deleteItem", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
                ShoppingCart cart = session.attribute("cart");
                cart = cartService.deleteItem(cart,gs.fromJson(req.body(), OrderedItem.class));
                cart = cartService.calculatePoints(cart);
				session.attribute("cart", cart);
				return gs.toJson(cart);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/cart/searchAddress", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
				session.attribute("address", gs.fromJson(req.body(), String.class));
				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/cart/getAddress", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
				String s = session.attribute("address");
				return  s == null ? "":s;
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
    }
}
