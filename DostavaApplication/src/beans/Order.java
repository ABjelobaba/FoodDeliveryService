package beans;

import java.util.Date;
import java.util.List;

public class Order implements IEntity<String>{
	public String orderID;
	public List<OrderedItem> orderedItems;
	public int restaurantID;
	public Date orderDate;
	public double price;
	public String customerUsername;
	public OrderStatus status;
	public boolean deleted;
	
	public Order(List<OrderedItem> orderedItems, int restaurantID, Date orderDate, double price,
			String customerUsername, OrderStatus status) {
		super();
		this.orderedItems = orderedItems;
		this.restaurantID = restaurantID;
		this.orderDate = orderDate;
		this.price = price;
		this.customerUsername = customerUsername;
		this.status = status;
		this.deleted = false;
	}


	public String getOrderID() {
		return orderID;
	}


	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}


	public List<OrderedItem> getOrderedItems() {
		return orderedItems;
	}


	public void setOrderedItems(List<OrderedItem> orderedItems) {
		this.orderedItems = orderedItems;
	}


	public int getRestaurantID() {
		return restaurantID;
	}


	public void setRestaurantID(int restaurantID) {
		this.restaurantID = restaurantID;
	}


	public Date getOrderDate() {
		return orderDate;
	}


	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}


	public double getPrice() {
		return price;
	}


	public void setPrice(double price) {
		this.price = price;
	}


	public String getCustomerUsername() {
		return customerUsername;
	}


	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}


	public OrderStatus getStatus() {
		return status;
	}


	public void setStatus(OrderStatus status) {
		this.status = status;
	}


	@Override
	public String getID() {
		return this.orderID;
	}


	@Override
	public void setID(String id) {
		this.orderID = id;
	}


	@Override
	public boolean isDeleted() {
		return this.deleted;
	}


	@Override
	public void setDeleted(boolean value) {
		this.deleted = value;
	}
	
	
}
