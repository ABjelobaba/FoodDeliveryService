package services;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Random;

import com.google.gson.JsonSyntaxException;

import java.util.List;

import beans.Customer;
import beans.CustomerCategory;
import beans.CustomerType;
import beans.Deliverer;
import beans.Order;
import beans.OrderStatus;
import beans.Role;
import beans.ShoppingCart;
import beans.User;
import dao.UserDAO;
import dto.OrderRequestDTO;

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
							cart.getPriceWithDiscount() + 200, user.getName(), user.getSurname(), user.getUsername(), 
							OrderStatus.Processing,string);
		order.setID(generateID());
		return order;
    }

	
	public Customer addOrder(Customer customer, Order order) throws JsonSyntaxException, IOException {
		customer.getAllOrders().add(order);
		int totalPoints = customer.getTotalPoints();
		int newTotalPoints =totalPoints + calculateNewPoints(order);
		customer.setTotalPoints((int)newTotalPoints);
		customer.setCategory(getCustomerCategory((int)newTotalPoints));
		userDAO.update(customer);
		return customer;
	}

	private int calculateNewPoints(Order order){
		return (int) (order.getPrice()/1000*133);
	}

	private CustomerCategory getCustomerCategory(int points){
		CustomerCategory category;
		if(points <= 2000){
			category = new CustomerCategory(CustomerType.Bronze, 0, 0);
		}else if(points <= 5000){
			category = new CustomerCategory(CustomerType.Silver, 2, 2000);
		}else{
			category = new CustomerCategory(CustomerType.Gold, 5, 5000);
		}
		return category;
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

	public List<Order> getWaitingDeliveryOrders(Deliverer deliverer) throws JsonSyntaxException, IOException {
		List<Order> waitingDeliveryOrders = new ArrayList<Order>();
		for(User user: userDAO.getAll()){
			if(user.getRole() == Role.Customer){
				waitingDeliveryOrders.addAll(getWaitingDeliveryOrdersFromUser((Customer)user, deliverer));
			}
		}
		return waitingDeliveryOrders;
	}

	private List<Order> getWaitingDeliveryOrdersFromUser(Customer customer, Deliverer deliverer){
		List<Order> orders = new ArrayList<Order>();
		for(Order order: customer.getAllOrders()){
			if(order.getStatus() == OrderStatus.WaitingForDelivery && !isAlreadyRequested(order, deliverer)){
				orders.add(order);
			}
		}
		return orders;
	}

	private boolean isAlreadyRequested(Order order, Deliverer deliverer){
		boolean isRequested = false;
		for(Deliverer orderDeliverer: order.getDeliveryRequests()){
			if(orderDeliverer.isEqual(deliverer.getID())){
				isRequested = true;
				break;
			}
		}	
		return isRequested;
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

	public Deliverer confirmDelivery(Deliverer deliverer, Order order) throws JsonSyntaxException, IOException {
		Customer customer = (Customer)userDAO.getByID(order.getCustomerUsername());
		for(Order customerOrder: customer.getAllOrders()){
			if(customerOrder.getID().equals(order.getID())){
				customerOrder.setStatus(OrderStatus.Delivered);
				userDAO.update(customer);
				break;
			}
		}
		for(Order delivererOrder: deliverer.getOrdersToDeliver()){
			if(delivererOrder.getID().equals(order.getID())){
				delivererOrder.setStatus(OrderStatus.Delivered);
				userDAO.update(deliverer);
				break;
			}
		}
		return deliverer;
	}

	public void requestOrder(Deliverer deliverer, OrderRequestDTO orderRequestDTO) throws JsonSyntaxException, IOException {
		User user = userDAO.getByID(orderRequestDTO.getUsername());
		for(Order customerOrder: ((Customer)user).getAllOrders()){
			if(customerOrder.isEqual(orderRequestDTO.getOrderID())){
				customerOrder.getDeliveryRequests().add(deliverer);
				userDAO.update(user);
				break;
			}
		}
	}

}
