package controllers;

import static spark.Spark.get;

import com.google.gson.Gson;

import services.CuisineService;

public class CuisineController {
    private static Gson gs = new Gson();

	public CuisineController(CuisineService cuisineService) {

        get("/cuisines/getAll", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(cuisineService.getAll());
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});
    }
	
}
