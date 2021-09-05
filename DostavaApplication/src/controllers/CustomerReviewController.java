package controllers;

import static spark.Spark.delete;
import static spark.Spark.get;
import static spark.Spark.post;
import static spark.Spark.put;

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
		
		put("/reviews/reject/:id", (req, res) -> {
			res.type("application/json");
			
			try {
				reviewService.rejectReview(Integer.parseInt(req.params("id")));

				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		put("/reviews/approve/:id", (req, res) -> {
			res.type("application/json");
			
			try {
				reviewService.approveReview(Integer.parseInt(req.params("id")));

				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		delete("/reviews/:id", (req, res) -> {
			res.type("application/json"); 

			try {
				reviewService.deleteReview(Integer.parseInt(req.params("id")));
				
				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
	}
}
