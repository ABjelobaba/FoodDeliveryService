package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Order;
import beans.ShoppingCart;
import services.OrderService;
import spark.Session;

public class OrderController {
    private static Gson gs = new Gson();

	public OrderController(OrderService orderService) {

        post("/order/create", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
                ShoppingCart cart = session.attribute("cart");
                String userName = cart.getCustomerUsername();
                Order order = orderService.createOrder(cart);
                session.attribute("cart", new ShoppingCart(userName));
				return gs.toJson(order);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
    }
}
