package controllers;

import com.google.gson.Gson;

import beans.User;
import dto.LogInDTO;
import dto.RegistrationDTO;
import services.UserService;
import spark.Session;

import static spark.Spark.post;
import static spark.Spark.get;


public class UserController {
	private static Gson gs = new Gson();

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
					Session session = req.session();
					session.attribute("user", user);
				} 
				return (user != null) ? gs.toJson(user) : "";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/user/logIn", (req, res) -> {
			res.type("application/json");
			
			try {
				User user = userService.logIn(gs.fromJson(req.body(), LogInDTO.class));
				if (user != null) {			
					Session session = req.session();
					session.attribute("user", user);				
				} 
				return (user != null) ? gs.toJson(user) : "";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		get("/user/logOut", (req, res) -> {
			res.type("application/json");

			Session session = req.session();
			if (session.attribute("user") != null) {
				session.invalidate();
			}
			return "";
		});
	}
}
