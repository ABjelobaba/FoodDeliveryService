package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;

import com.google.gson.JsonSyntaxException;

import java.util.List;

import beans.Customer;
import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
import beans.Role;
import beans.ShoppingCart;
import beans.User;
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
		User user = userDAO.getByID(cart.getCustomerUsername());
        Order order = new Order(cart.getOrderedItems(), cart.getRestaurantID(), new Date(), 
							cart.getTotalPrice() + 200, user.getName(), user.getSurname(), user.getUsername(), 
							OrderStatus.Processing,string);
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

    public void cancelOrder(Customer customer, String orderID) throws JsonSyntaxException, IOException {
		Order order = getByID(customer, orderID);
		order.setStatus(OrderStatus.Cancelled);
		userDAO.update(customer);
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

    public Customer cancelledOrderPoints(Customer customer, String orderID) throws JsonSyntaxException, IOException {
		double price = getByID(customer, orderID).getPrice();
		int lostPoints = (int) (price/1000*133*4);
		int remainingPoints = (int)(customer.getTotalPoints() - lostPoints);
		if(remainingPoints < 0){
			customer.setTotalPoints(0);
		}else{
			customer.setTotalPoints(remainingPoints);
		}
		userDAO.update(customer);
		return customer;
    }

	public List<Order> getWaitingDeliveryOrders() throws JsonSyntaxException, IOException {
		List<Order> waitingDeliveryOrders = new ArrayList<Order>();
		for(User user: userDAO.getAll()){
			if(user.getRole() == Role.Customer){
				waitingDeliveryOrders.addAll(getWaitingDeliveryOrdersFromUser((Customer)user));
			}
		}
		return waitingDeliveryOrders;
	}

	private List<Order> getWaitingDeliveryOrdersFromUser(Customer customer){
		List<Order> orders = new ArrayList<Order>();
		for(Order order: customer.getAllOrders()){
			if(order.getStatus() == OrderStatus.WaitingForDelivery){
				orders.add(order);
			}
		}
		return orders;
	}

	public Order setOrderInTransport(Deliverer deliverer, String orderID, String username) throws JsonSyntaxException, IOException {
		//TODO: prepraviti za menadzera, zaboravila sam na slanje zahteva
		User user = userDAO.getByID(username);
		Order foundOrder = null;

		for(Order order: ((Customer)user).getAllOrders()){
			if(order.getID().equals(orderID)){
				order.setStatus(OrderStatus.InTransport);
				userDAO.update(user);
				foundOrder = order;
				break;
			}
		}

		if(foundOrder != null){
			deliverer.getOrdersToDeliver().add(foundOrder);
			userDAO.save(deliverer);
		}

		return foundOrder;
	}

}
