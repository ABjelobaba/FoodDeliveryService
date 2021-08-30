package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Customer extends User {
	private List<Order> allOrders;
	private ShoppingCart cart;
	private int totalPoints;
	private CustomerCategory category;
	private String deliveryAddress;

	public Customer(String username, String password, String name, String surname, Gender gender, Date birthdate,
			Role role) {
		super(username, password, name, surname, gender, birthdate, role);
		this.allOrders = new ArrayList<Order>();
		this.cart = new ShoppingCart(username);
		this.totalPoints = 0;
		this.category = new CustomerCategory();
		this.deliveryAddress = "";
	}

	public List<Order> getAllOrders() {
		return allOrders;
	}

	public void setAllOrders(List<Order> allOrders) {
		this.allOrders = allOrders;
	}

	public ShoppingCart getCart() {
		return cart;
	}

	public void setCart(ShoppingCart cart) {
		this.cart = cart;
	}

	public int getTotalPoints() {
		return totalPoints;
	}

	public void setTotalPoints(int totalPoints) {
		this.totalPoints = totalPoints;
	}

	public CustomerCategory getCategory() {
		return category;
	}

	public void setCategory(CustomerCategory category) {
		this.category = category;
	}

	public String getDeliveryAddress() {
		return deliveryAddress;
	}

	public void setDeliveryAddress(String deliveryAddress) {
		this.deliveryAddress = deliveryAddress;
	}

}
