package beans;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Deliverer extends User {
	public List<Order> ordersToDeliver;

	public Deliverer(String username, String password, String name, String surname, Gender gender, Date birthdate,
			Role role) {
		super(username, password, name, surname, gender, birthdate, role);
		this.ordersToDeliver = new ArrayList<Order>();
	}

	public List<Order> getOrdersToDeliver() {
		return ordersToDeliver;
	}

	public void setOrdersToDeliver(List<Order> ordersToDeliver) {
		this.ordersToDeliver = ordersToDeliver;
	}

}
