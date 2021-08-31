package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.ShoppingCart;
import dto.CartItemDTO;
import services.CartService;
import spark.Session;

public class CartController {
	private static Gson gs = new Gson();

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
				session.attribute("cart", cart);
				return gs.toJson(cart);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
    }
}
