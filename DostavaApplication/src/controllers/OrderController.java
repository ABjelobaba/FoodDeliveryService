package controllers;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.put;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.Customer;
import beans.Deliverer;
import beans.Order;
import beans.ShoppingCart;
import services.OrderService;
import spark.Session;

public class OrderController {
    private static Gson gs = new GsonBuilder().setDateFormat("dd MMM yyyy").create();
    private static Gson gsTime = new GsonBuilder().setDateFormat("HH:mm'h'").create();

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

		get("/order/getWaitingDeliveryOrders",(req, res)->{
			res.type("application/json");

			try {
				List<Order> orders = orderService.getWaitingDeliveryOrders();
				return gsTime.toJson(orders);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		put("/order/setInTransport/:orderID/:username",(req, res)->{
			res.type("application/json");

			try {
                Session session = req.session();
                Deliverer deliverer = session.attribute("user");
				Order order = orderService.setOrderInTransport(deliverer, req.params("orderID"), req.params("username"));
				return gs.toJson(order);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		get("/order/getDelivererOrders",(req, res)->{
			res.type("application/json");

			try {
                Session session = req.session();
                Deliverer deliverer = session.attribute("user");
				return gs.toJson(deliverer.getOrdersToDeliver());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		put("/order/confirmDelivery",(req, res)->{
			res.type("application/json");

			try {
                Session session = req.session();
                Deliverer deliverer = session.attribute("user");
				deliverer = orderService.confirmDelivery(deliverer, gs.fromJson(req.body(), Order.class));
				session.attribute("user", deliverer);
				return gs.toJson(deliverer);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
    }
}
