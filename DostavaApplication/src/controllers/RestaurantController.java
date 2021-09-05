package controllers;

import com.google.gson.Gson;

import beans.FoodItem;
import beans.Restaurant;
import dto.FoodItemDTO;
import dto.RestaurantDTO;
import services.RestaurantService;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

public class RestaurantController {
	private static Gson gs = new Gson();

	public RestaurantController(RestaurantService restaurantService) {
		
		get("/restaurants/getAllRestaurants", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(restaurantService.getAll());
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
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
		
		put("/restaurant/updateRating/:id", (req, res) -> {
			res.type("application/json"); 

			try {
				double newRating = restaurantService.updateRestaurantRating(Integer.parseInt(req.params("id")));
				return newRating;
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		delete("/restaurants/:id", (req, res) -> {
			res.type("application/json"); 

			try {
				restaurantService.deleteRestaurant(Integer.parseInt(req.params("id")));
				
				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		delete("/restaurants/deleteArticle/:restaurantID/:articleName", (req, res) -> {
			res.type("application/json"); 

			try {
				Restaurant restaurant = restaurantService.deleteArticle(Integer.parseInt(req.params("restaurantID")),req.params("articleName"));
				return gs.toJson(restaurant);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
	}
}
