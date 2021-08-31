package services;

import java.io.IOException;
import java.util.Date;

import com.google.gson.JsonSyntaxException;

import beans.Order;
import beans.OrderStatus;
import beans.ShoppingCart;
import dao.OrderDAO;

public class OrderService {
    private OrderDAO orderDAO;
	
	public OrderService(OrderDAO orderDAO) {
		this.orderDAO = orderDAO;
	}

    public Order createOrder(ShoppingCart cart, String string) throws JsonSyntaxException, IOException {
        Order order = new Order(cart.getOrderedItems(), cart.getRestaurantID(), new Date(), 
							cart.getTotalPrice(), cart.getCustomerUsername(), OrderStatus.Processing,string);
		orderDAO.save(order);
		return order;
    }
}
