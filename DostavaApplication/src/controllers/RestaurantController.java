package controllers;

import com.google.gson.Gson;

import beans.FoodItem;
import beans.Restaurant;
import dto.FoodItemDTO;
import dto.RestaurantDTO;
import services.RestaurantService;

import static spark.Spark.get;
import static spark.Spark.post;

public class RestaurantController {
	private static Gson gs = new Gson();

	public RestaurantController(RestaurantService restaurantService) {
		
		get("/restaurants/getAllRestaurants", (req, res) -> {
			res.type("application/json");
			return gs.toJson(restaurantService.getAll());	//need exceptions?
		});
		
		post("/restaurants/addRestaurant", (req, res) -> {
			res.type("application/json");

			try {
				Restaurant restaurant = restaurantService.createRestaurant(gs.fromJson(req.body(), RestaurantDTO.class));
				
				return (restaurant != null) ? gs.toJson(restaurant) : "";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/restaurant/:id", (req, res) -> {
			res.type("application/json");
			return gs.toJson(restaurantService.getRestaurantById(Integer.parseInt(req.params("id"))));
		});
		
		post("/restaurant/addArticle", (req, res) -> {
			res.type("application/json");

			try {
				FoodItem article = restaurantService.createFoodItem(gs.fromJson(req.body(), FoodItemDTO.class));
				
				return (article != null) ? gs.toJson(article) : "";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
}
