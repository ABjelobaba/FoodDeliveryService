package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Order implements IEntity<String>{
	private String orderID;
	private List<OrderedItem> orderedItems;
	private int restaurantID;
	private Date orderDate;
	private double price;
	private String customerName;
	private String customerSurname;
	private String customerUsername;
	private OrderStatus status;
	private boolean deleted;
	private String address;
	private List<DeliveryRequest> deliveryRequests;
	
	public Order(List<OrderedItem> orderedItems, int restaurantID, Date orderDate, double price,
			String customerName, String customerSurname, String customerUsername, OrderStatus status, 
			String address) {
		super();
		this.orderedItems = orderedItems;
		this.restaurantID = restaurantID;
		this.orderDate = orderDate;
		this.price = price;
		this.customerName = customerName;
		this.customerSurname = customerSurname;
		this.customerUsername = customerUsername;
		this.status = status;
		this.deleted = false;
		this.address = address;
		this.deliveryRequests = new ArrayList<DeliveryRequest>();
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


	public String getCustomerName() {
		return customerName;
	}


	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustomerSurname() {
		return customerSurname;
	}


	public void setCustomerSurname(String customerSurname) {
		this.customerSurname = customerSurname;
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

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public List<DeliveryRequest> getDeliveryRequests() {
		return deliveryRequests;
	}

	public void setDeliveryRequests(List<DeliveryRequest> deliveryRequests) {
		this.deliveryRequests = deliveryRequests;
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


	@Override
	public boolean isEqual(String id) {
		return this.orderID.equals(id);
	}
	
	
}
