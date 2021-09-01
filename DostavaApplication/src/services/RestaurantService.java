package services;

import java.io.IOException;
import java.util.ArrayList;
import com.google.gson.JsonSyntaxException;

import beans.Address;
import beans.FoodItem;
import beans.Location;
import beans.Restaurant;
import dto.FoodItemDTO;
import dto.RestaurantDTO;
import dao.RestaurantDAO;

public class RestaurantService {

	private RestaurantDAO restaurantDAO;
	
	public RestaurantService(RestaurantDAO restaurantDAO) {
		this.restaurantDAO = restaurantDAO;
	}

	public ArrayList<Restaurant> getAll() throws JsonSyntaxException, IOException {
		return (ArrayList<Restaurant>) restaurantDAO.getAllNotDeleted();
	}
	
	public Restaurant getRestaurantById(int id) throws JsonSyntaxException, IOException {
		return restaurantDAO.getByID(id);
	}
	
	public Restaurant createRestaurant(RestaurantDTO newRestaurantForm) throws JsonSyntaxException, IOException {
		Location location = new Location(newRestaurantForm.getLongitude(), newRestaurantForm.getLatitude(), 
				new Address(newRestaurantForm.getStreetAddress(), newRestaurantForm.getCity(), 
						newRestaurantForm.getZipCode()));
		Restaurant newRestaurant =  new Restaurant(newRestaurantForm.getName(), newRestaurantForm.getType(), 
				null, true, location, newRestaurantForm.getLogo());
		
		newRestaurant.setID(restaurantDAO.generateID());
		
		return restaurantDAO.save(newRestaurant);
		
	}

	public FoodItem createFoodItem(FoodItemDTO foodItemForm) throws JsonSyntaxException, IOException {
		FoodItem newFoodItem = null;
		Restaurant updatedRestaurant = restaurantDAO.getByID(foodItemForm.getRestaurantID());
		ArrayList<FoodItem> restaurantArticles = getAllCurrentArticlesFromRestaurant(foodItemForm.getRestaurantID());
		if (!doesArticleAlreadyExist(foodItemForm.getName(), foodItemForm.getRestaurantID())) {
			newFoodItem = new FoodItem(foodItemForm.getName(), foodItemForm.getPrice(), foodItemForm.getType(),
					foodItemForm.getRestaurantID(), foodItemForm.getQuantity(), foodItemForm.getDescription(), 
					foodItemForm.getImage());
			restaurantArticles.add(newFoodItem);
			updatedRestaurant.setItems(restaurantArticles);
			
			restaurantDAO.update(updatedRestaurant);
		}
		
		return newFoodItem;
	}
	
	public boolean doesArticleAlreadyExist(String articleName, int restaurantID) throws JsonSyntaxException, IOException {
		boolean alreadyExists = false;
		ArrayList<FoodItem> articles = getAllCurrentArticlesFromRestaurant(restaurantID);
		for (FoodItem article : articles) {
			if (article.getName().toUpperCase().equals(articleName.toUpperCase())) {
				alreadyExists = true;
			}
		}
		return alreadyExists;
	}
	
	public ArrayList<FoodItem> getAllCurrentArticlesFromRestaurant(int restaurantID) throws JsonSyntaxException, IOException {
		ArrayList<FoodItem> articles = new ArrayList<FoodItem>();
		if (restaurantDAO.getByID(restaurantID).getItems() != null) {
			for (FoodItem article : restaurantDAO.getByID(restaurantID).getItems()) {
				if (!article.isDeleted()) {
					articles.add(article);
				}
			}
		}
		return articles;
	}
}
