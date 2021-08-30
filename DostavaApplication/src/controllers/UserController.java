package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.User;
import dto.RegistrationDTO;
import services.UserService;
import spark.Session;

import static spark.Spark.post;
import static spark.Spark.get;


public class UserController {
	private static Gson gs = new GsonBuilder().setDateFormat("yyyy-MM-dd").create();

	public UserController(UserService userService) {
		
		get("/user/getLoggedInUser",(req,res)->{
			res.type("application/json");
			Session session = req.session();
			User loggedInUser = session.attribute("user");
			return gs.toJson(loggedInUser);
			
		});
		
		post("/user/register", (req, res) -> {
			res.type("application/json");

			try {
				User user = userService.register(gs.fromJson(req.body(), RegistrationDTO.class));
				if (user != null) {
					Session session = req.session(true);
					User isLoggedIn = session.attribute("user");
					if (isLoggedIn == null) {
						session.attribute("user", user);
					}
					
				} else {
					return "";
				}
				return gs.toJson(user);
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
}
