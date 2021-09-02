package beans;

import java.util.Date;

public class Manager extends User {
	private int restaurantID;

	public Manager(String username, String password, String name, String surname, Gender gender, Date birthdate,
			Role role) {
		super(username, password, name, surname, gender, birthdate, role);
		this.restaurantID = -1;
	}

	public int getRestaurantID() {
		return restaurantID;
	}

	public void setRestaurantID(int restaurantID) {
		this.restaurantID = restaurantID;
	}

}
