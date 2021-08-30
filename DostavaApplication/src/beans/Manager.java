package beans;

import java.util.Date;

public class Manager extends User {
	private Restaurant restaurant;

	public Manager(String username, String password, String name, String surname, Gender gender, Date birthdate,
			Role role) {
		super(username, password, name, surname, gender, birthdate, role);
		this.restaurant = null;
	}

	public Restaurant getRestaurant() {
		return restaurant;
	}

	public void setRestaurant(Restaurant restaurant) {
		this.restaurant = restaurant;
	}

}
