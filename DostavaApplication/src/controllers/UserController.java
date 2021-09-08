package controllers;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

import beans.*;
import dto.*;
import services.UserService;
import spark.Session;
import utils.RuntimeTypeAdapterFactory;

import static spark.Spark.post;
import static spark.Spark.get;
import static spark.Spark.delete;
import static spark.Spark.put;

import java.util.List;


public class UserController {
	private static Gson gs = createGson();
	
	private static Gson createGson() {	
		RuntimeTypeAdapterFactory<User> userAdapterFactory = RuntimeTypeAdapterFactory.of(User.class)
	        .registerSubtype(Customer.class)
	        .registerSubtype(Deliverer.class)
	        .registerSubtype(Manager.class)
			.registerSubtype(Administrator.class);
		
		return new GsonBuilder()
			.setDateFormat("yyyy-MM-dd")
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
					if(user.getRole() == Role.Customer){
						session.attribute("user", user);
						session.attribute("cart", new ShoppingCart(user.getUsername()));
						session.attribute("address", ((Customer)user).getDeliveryAddress());
					}
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
					
					if(user.getRole() == Role.Customer){
						session.attribute("cart", new ShoppingCart(user.getUsername()));
						session.attribute("address", ((Customer)user).getDeliveryAddress());
					}
				} 
				return (user != null && !user.isDeleted()) ? user.isBlocked() : "";
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

		put("/user/editProfile", (req, res) -> {
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

		put("/user/changePassword", (req, res) -> {
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

		get("/user/getAll", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(userService.getAll());
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		delete("/user/:username", (req, res) -> {
			res.type("application/json"); 

			try {
				userService.deleteUser(gs.fromJson(req.params("username"), String.class));
				return gs.toJson(userService.getAll());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});

		get("/user/getSuspiciousUsers", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(userService.getSuspiciousUsers());
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		put("/user/:username", (req, res) -> {
			res.type("application/json"); 

			try {
				userService.blockUser(gs.fromJson(req.params("username"), String.class));
				return gs.toJson(userService.getSuspiciousUsers());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/user/getAllFreeManagers", (req, res) -> {
			res.type("application/json");
			
			try {
				return gs.toJson(userService.getAllFreeManagers());
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});
		
		post("/user/assignRestaurant", (req, res) -> {
			res.type("application/json");
			
			
			try {
				userService.assignRestaurantToManager(gs.fromJson(req.body(), RestaurantAssignmentDTO.class));
				return "ok";
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		put("/user/unblock/:username", (req, res) -> {
			res.type("application/json"); 

			try {
				userService.unblockUser(gs.fromJson(req.params("username"), String.class));
				return gs.toJson(userService.getSuspiciousUsers());
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		});
		
		get("/customer/:username", (req, res) -> {
			res.type("application/json"); 

			try {
				return gs.toJson(userService.getCustomerByID(req.params("username")));
			} catch (Exception e) {
				e.printStackTrace();
				return "";
			}
		});

		get("/user/getAllRestaurantCustomers/:restaurantID", (req, res) -> {
			res.type("application/json");
			
			try {
				List<Customer> restaurantCustomers = userService.getAllRestaurantCustomers(Integer.parseInt(req.params("restaurantID")));
				return gs.toJson(restaurantCustomers);
			} catch(Exception e) {
				e.printStackTrace();
				return "";
			}
		});

	}
}
