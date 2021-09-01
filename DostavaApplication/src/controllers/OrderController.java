package controllers;

import static spark.Spark.post;

import java.util.List;

import static spark.Spark.get;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.Order;
import beans.ShoppingCart;
import services.OrderService;
import spark.Session;

public class OrderController {
    private static Gson gs = new GsonBuilder().setDateFormat("dd MMM yyyy").create();

	public OrderController(OrderService orderService) {

        post("/order/create", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
                ShoppingCart cart = session.attribute("cart");
                Customer customer = session.attribute("user");
                Order order = orderService.createOrder(cart, gs.fromJson(req.body(), String.class));
                session.attribute("cart", new ShoppingCart(customer.getUsername()));
				customer = orderService.calculatePoints(customer,cart);
                session.attribute("user", customer);
				session.attribute("address","");
				return gs.toJson(order);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		get("/order/:username", (req, res) -> {
			res.type("application/json");
			List<Order> orders = orderService.getOrdersByUser(req.params("username"));
			return gs.toJson(orders);
		});
    }
}
