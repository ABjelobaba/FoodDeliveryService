package beans;

import java.util.ArrayList;
import java.util.List;

public class ShoppingCart {
	public List<OrderedItem> orderedItems;
	public String customerUsername;
	public double totalPrice;
	
	public ShoppingCart(String customerUsername) {
		super();
		this.orderedItems = new ArrayList<OrderedItem>();
		this.customerUsername = customerUsername;
		this.totalPrice = 0;
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
	
}
