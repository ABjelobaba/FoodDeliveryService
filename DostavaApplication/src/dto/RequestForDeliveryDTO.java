package dto;

public class RequestForDeliveryDTO {
	String orderID;
	String delivererUsername;
	String customerUsername;
	
	public RequestForDeliveryDTO(String orderID, String delivererUsername, String customerUsername) {
		super();
		this.orderID = orderID;
		this.delivererUsername = delivererUsername;
		this.customerUsername = customerUsername;
	}

	public String getOrderID() {
		return orderID;
	}

	public void setOrderID(String orderID) {
		this.orderID = orderID;
	}

	public String getDelivererUsername() {
		return delivererUsername;
	}

	public void setDelivererUsername(String delivererUsername) {
		this.delivererUsername = delivererUsername;
	}

	public String getCustomerUsername() {
		return customerUsername;
	}

	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}
	
	
}
