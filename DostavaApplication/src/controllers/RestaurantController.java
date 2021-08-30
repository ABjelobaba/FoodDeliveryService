package controllers;

import com.google.gson.Gson;
import services.RestaurantService;
import static spark.Spark.get;

public class RestaurantController {
	private static Gson gs = new Gson();

	public RestaurantController(RestaurantService restaurantService) {
		
		get("/restaurants/getAllRestaurants", (req, res) -> {
			res.type("application/json");
			return gs.toJson(restaurantService.getAll());	//need exceptions?
		});
	}
}
