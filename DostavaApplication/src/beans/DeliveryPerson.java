package beans;

import java.util.Date;
import java.util.List;

public class DeliveryPerson extends User {
	public List<Order> ordersToDeliver;

	public DeliveryPerson(String username, String password, String name, String surname, Gender gender, Date birthdate,
			Role role) {
		super(username, password, name, surname, gender, birthdate, role);
	}

	public List<Order> getOrdersToDeliver() {
		return ordersToDeliver;
	}

	public void setOrdersToDeliver(List<Order> ordersToDeliver) {
		this.ordersToDeliver = ordersToDeliver;
	}

}
