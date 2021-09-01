package controllers;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.put;

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
				customer = orderService.addOrder(customer,order);
                session.attribute("cart", new ShoppingCart(customer.getUsername()));
                session.attribute("user", customer);
				session.attribute("address","");
				return gs.toJson(order);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		put("/order/cancel/:orderID", (req, res) -> {
			res.type("application/json");

			try {
                Session session = req.session();
                Customer customer = session.attribute("user");
				orderService.cancelOrder(customer, req.params("orderID"));
				customer = orderService.cancelledOrderPoints(customer, req.params("orderID"));
                session.attribute("user", customer);
				return gs.toJson(customer);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
    }
}
