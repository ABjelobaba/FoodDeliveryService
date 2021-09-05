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
	@SuppressWarnings("unused")
	public static void main(String[] args) throws IOException {

		port(8080);
		staticFiles.externalLocation(new File("./static").getCanonicalPath());

		UserDAO userDAO = new UserDAO("./files/users.json");
		UserService userService = new UserService(userDAO);
		UserController userController = new UserController(userService);
		
		CustomerReviewDAO reviewDAO = new CustomerReviewDAO("./files/reviews.json");
		CustomerReviewService reviewService = new CustomerReviewService(reviewDAO);
		CustomerReviewController reviewController = new CustomerReviewController(reviewService);
		
		RestaurantDAO restaurantDAO = new RestaurantDAO("./files/restaurants.json");
		RestaurantService restaurantService = new RestaurantService(restaurantDAO, reviewDAO);
		RestaurantController restaurantController = new RestaurantController(restaurantService);
		
		CartService cartService = new CartService();
		CartController cartController = new CartController(cartService);

		OrderService orderService = new OrderService(userDAO);
		OrderController ordereController = new OrderController(orderService);
		
		
		
		get("/test", (req, res) -> {
			return "Works";
		});
		
	}
}
