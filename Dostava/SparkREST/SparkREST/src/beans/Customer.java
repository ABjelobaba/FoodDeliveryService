package beans;

import java.awt.List;

public class Customer extends User{
	//private List<Order> orders;
	//private Cart cart;
	private int points;
	private String type;
	
	public Customer(int points, String type) {
		super();
		this.points = points;
		this.type = type;
	}

	public int getPoints() {
		return points;
	}

	public void setPoints(int points) {
		this.points = points;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}
	
	
}
