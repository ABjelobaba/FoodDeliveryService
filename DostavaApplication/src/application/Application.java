package application;

import static spark.Spark.get;
import static spark.Spark.port;
import static spark.Spark.staticFiles;

import java.io.File;
import java.io.IOException;

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
		
		
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
	}
}
