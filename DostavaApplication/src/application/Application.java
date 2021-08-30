package application;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

import beans.Address;
import beans.Location;
import beans.Restaurant;
import beans.RestaurantType;
import controllers.*;
import dao.*;
import services.*;


public class Application {
	public static void main(String[] args) throws IOException {

		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		UserDAO userDAO = new UserDAO("./files/users.json");
		UserService userService = new UserService(userDAO);
		UserController userController = new UserController(userService);
		
		RestaurantDAO restaurantDAO = new RestaurantDAO("./files/restaurants.json");
		RestaurantService restaurantService = new RestaurantService(restaurantDAO);
		RestaurantController restaurantController = new RestaurantController(restaurantService);
		
		/*Address add1 = new Address("Bulevar Oslobođenja 119", "Novi Sad", 2100);
		Location loc1 = new Location(45.24588390248755, 19.84292983961903, add1);
		Restaurant rest1 = new Restaurant("KFC", RestaurantType.American, null, true, loc1, "./static/images/kfc-logo.jpg");
		
		Address add2 = new Address("Bulevar Oslobođenja 53", "Novi Sad", 2100);
		Location loc2 = new Location(45.24116862819092, 19.805846691370963, add2);
		Restaurant rest2 = new Restaurant("Sarajevski cevap", RestaurantType.Barbecue, null, true, loc2, "./static/images/sarajevski-logo.png");
		
		Address add3 = new Address("Bulevar Jaše Tomića бб", "Novi Sad", 2100);
		Location loc3 = new Location(45.2646140028131, 19.83136076520988, add3);
		Restaurant rest3 = new Restaurant("McDonald's", RestaurantType.American, null, true, loc3, "./static/images/mcdonalds-logo.png");
		
		restaurantDAO.save(rest1);
		restaurantDAO.save(rest2);
		restaurantDAO.save(rest3);*/
		
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
	}
}
