package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import com.google.gson.JsonSyntaxException;

import beans.Customer;
import beans.Order;
import beans.OrderStatus;
import beans.ShoppingCart;
import dao.UserDAO;

public class OrderService {
    private UserDAO userDAO;
	
	public OrderService(UserDAO userDAO) {
		this.userDAO = userDAO;
	}

	private String generateID() throws JsonSyntaxException, IOException  {
		String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		Random random = new Random();
	    StringBuilder builder = new StringBuilder(10);

	    for (int i = 0; i < 10; i++) {
	        builder.append(alphabet.charAt(random.nextInt(alphabet.length())));
	    }

	    return builder.toString();
	}

    public Order createOrder(ShoppingCart cart, String string) throws JsonSyntaxException, IOException {
        Order order = new Order(cart.getOrderedItems(), cart.getRestaurantID(), new Date(), 
							cart.getTotalPrice() + 200, cart.getCustomerUsername(), OrderStatus.Processing,string);
		order.setID(generateID());
		return order;
    }

	
	public Customer addOrder(Customer customer, Order order) throws JsonSyntaxException, IOException {
		customer.getAllOrders().add(order);
		int totalPoints = customer.getTotalPoints();
		customer.setTotalPoints((int)(totalPoints + newPoints(order)));
		userDAO.update(customer);
		return customer;
	}

	private int newPoints(Order order){
		return (int) (order.getPrice()/1000*133);
	}


	private Order getByID(Customer customer, String orderID){
		Order foundOrder = null;
		for(Order order: customer.getAllOrders()){
			if(order.getID().equals(orderID)){
				foundOrder = order;
				break;
			}
		}
		return foundOrder;
    }
}
