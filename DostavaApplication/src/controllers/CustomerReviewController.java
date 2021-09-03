package controllers;

import static spark.Spark.get;
import static spark.Spark.post;

import com.google.gson.Gson;

import beans.CustomerReview;
import dto.CustomerReviewDTO;
import services.CustomerReviewService;


public class CustomerReviewController {
	
	private static Gson gs = new Gson();

	public CustomerReviewController(CustomerReviewService reviewService) {
		
		post("/reviews/addReview", (req, res) -> {
			res.type("application/json");

			try {
				CustomerReview review = reviewService.addReview(gs.fromJson(req.body(), CustomerReviewDTO.class));
				
				return (review != null) ? gs.toJson(review) : "";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		get("/reviews/:id", (req, res) -> {
			res.type("application/json");
			return gs.toJson(reviewService.getAllByRestaurant(Integer.parseInt(req.params("id"))));
		});
	}
}
