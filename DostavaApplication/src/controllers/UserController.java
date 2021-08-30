package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import org.eclipse.jetty.io.Connection.UpgradeFrom;

import beans.*;
import dto.*;
import services.UserService;
import spark.Session;
import utils.RuntimeTypeAdapterFactory;

import static spark.Spark.post;
import static spark.Spark.get;


public class UserController {
	private static Gson gs = createGson();
	
	private static Gson createGson() {	
		RuntimeTypeAdapterFactory<User> userAdapterFactory = RuntimeTypeAdapterFactory.of(User.class)
	        .registerSubtype(Customer.class)
	        .registerSubtype(Deliverer.class)
	        .registerSubtype(Manager.class)
			.registerSubtype(Administrator.class);
		
		return new GsonBuilder()
		     .registerTypeAdapterFactory(userAdapterFactory)
	         .create();
	}

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

		post("/user/editProfile", (req, res) -> {
			res.type("application/json");
			
			try {
				User updatedUser = gs.fromJson(req.body(), User.class);
				Session session = req.session();
				session.attribute("user",updatedUser);
				userService.editProfile(updatedUser);
				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		post("/user/changePassword", (req, res) -> {
			res.type("application/json");
			
			try {
				Session session = req.session();
				User user = session.attribute("user");
				User updatedUser = userService.changePassword(user, gs.fromJson(req.body(), ChangePasswordDTO.class));
				if(updatedUser != null){
					session.attribute("user", updatedUser);
				}
				return (updatedUser != null) ? gs.toJson(updatedUser) : "";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});
	}
}
