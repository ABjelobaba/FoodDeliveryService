package beans;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
	private int restaurantID;
	private List<OrderedItem> orderedItems;
	private String customerUsername;
	private double totalPrice;
	private int points;
	
	public ShoppingCart(String customerUsername) {
		super();
		this.restaurantID = -1;
		this.orderedItems = new ArrayList<OrderedItem>();
		this.customerUsername = customerUsername;
		this.totalPrice = 0;
		this.points = 0;
	}
	
	public ShoppingCart(List<OrderedItem> orderedItems, String customerUsername, double totalPrice) {
		super();
		this.orderedItems = orderedItems;
		this.customerUsername = customerUsername;
		this.totalPrice = totalPrice;
	}
	
	public List<OrderedItem> getOrderedItems() {
		return orderedItems;
	}
	public void setOrderedItems(List<OrderedItem> orderedItems) {
		this.orderedItems = orderedItems;
	}
	public String getCustomerUsername() {
		return customerUsername;
	}
	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}
	public double getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(double totalPrice) {
		this.totalPrice = totalPrice;
	}

	public int getRestaurantID() {
		return restaurantID;
	}
	public void setRestaurantID(int restaurantID) {
		this.restaurantID = restaurantID;
	}

	public int getPoints(){
		return points;
	}

	public void setPoints(int points){
		this.points = points;
	}
	
}
