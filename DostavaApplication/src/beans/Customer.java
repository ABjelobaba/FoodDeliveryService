package beans;

import java.util.Date;
import java.util.List;

public class Customer extends User {
	public List<Order> allOrders;
	public ShoppingCart cart;
	public int totalPoints;
	public CustomerCategory category;

	public Customer(String username, String password, String name, String surname, Gender gender, Date birthdate,
			Role role) {
		super(username, password, name, surname, gender, birthdate, role);
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

}
