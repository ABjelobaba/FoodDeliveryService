package controllers;

import static spark.Spark.post;

import com.google.gson.Gson;

import beans.Customer;
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
                Customer customer = session.attribute("user");
                Order order = orderService.createOrder(cart, gs.fromJson(req.body(), String.class));
                session.attribute("cart", new ShoppingCart(customer.getUsername()));
				return gs.toJson(order);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
    }
}
