package services;

import dao.RestaurantDAO;

public class RestaurantService {

	private RestaurantDAO restaurantDAO;
	
	public RestaurantService(RestaurantDAO restaurantDAO) {
		this.restaurantDAO = restaurantDAO;
	}
}
