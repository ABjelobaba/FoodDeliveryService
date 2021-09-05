package services;

import java.io.IOException;
import java.util.ArrayList;
import com.google.gson.JsonSyntaxException;

import beans.Address;
import beans.CustomerReview;
import beans.FoodItem;
import beans.Location;
import beans.Restaurant;
import beans.ReviewStatus;
import dto.FoodItemDTO;
import dto.RestaurantDTO;
import utils.StringToImageDecoder;
import dao.CustomerReviewDAO;
import dao.RestaurantDAO;

public class RestaurantService {

	private RestaurantDAO restaurantDAO;
	private CustomerReviewDAO reviewDAO;

	public RestaurantService(RestaurantDAO restaurantDAO, CustomerReviewDAO reviewDAO) {
		this.restaurantDAO = restaurantDAO;
		this.reviewDAO = reviewDAO;
	}

	public ArrayList<Restaurant> getAll() throws JsonSyntaxException, IOException {
		return (ArrayList<Restaurant>) restaurantDAO.getAllNotDeleted();
	}

	public Restaurant getRestaurantById(int id) throws JsonSyntaxException, IOException {
		return restaurantDAO.getByID(id);
	}

	public Restaurant createRestaurant(RestaurantDTO newRestaurantForm) throws JsonSyntaxException, IOException {
		StringToImageDecoder decoder = new StringToImageDecoder();
		Location location = new Location(newRestaurantForm.getLongitude(), newRestaurantForm.getLatitude(),
				new Address(newRestaurantForm.getStreetAddress(), newRestaurantForm.getCity(),
						newRestaurantForm.getZipCode()));
		Restaurant newRestaurant =  new Restaurant(newRestaurantForm.getName(), newRestaurantForm.getType(),
				null, true, location, "");

		newRestaurant.setID(restaurantDAO.generateID());

		String logoLocation = "./images/" + newRestaurant.getName() + newRestaurant.getID() + ".jpg";
		decoder.decodeBase64ToImage(newRestaurantForm.getLogo(), "./static/" + logoLocation.substring(2));
		newRestaurant.setLogo(logoLocation);

		return restaurantDAO.save(newRestaurant);

	}

	public FoodItem createFoodItem(FoodItemDTO foodItemForm) throws JsonSyntaxException, IOException {
		StringToImageDecoder decoder = new StringToImageDecoder();
		FoodItem newFoodItem = null;
		Restaurant updatedRestaurant = restaurantDAO.getByID(foodItemForm.getRestaurantID());
		ArrayList<FoodItem> restaurantArticles = getAllCurrentArticlesFromRestaurant(foodItemForm.getRestaurantID());
		if (!doesArticleAlreadyExist(foodItemForm.getName(), foodItemForm.getRestaurantID())) {
			newFoodItem = new FoodItem(foodItemForm.getName(), foodItemForm.getPrice(), foodItemForm.getType(),
					foodItemForm.getRestaurantID(), foodItemForm.getQuantity(), foodItemForm.getDescription(),
					"");
			
			String imageLocation = "./images/" + newFoodItem.getName() + newFoodItem.getRestaurantID() + ".jpg";
			decoder.decodeBase64ToImage(foodItemForm.getImage(), "./static/" + imageLocation.substring(2));
			newFoodItem.setImage(imageLocation);
			System.out.print(imageLocation);
			restaurantArticles.add(newFoodItem);
			updatedRestaurant.setItems(restaurantArticles);

			restaurantDAO.update(updatedRestaurant);
		}

		return newFoodItem;
	}

	private boolean doesArticleAlreadyExist(String articleName, int restaurantID) throws JsonSyntaxException, IOException {
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

	public void updateRestaurantRating(int restaurantID) throws JsonSyntaxException, IOException {
		Restaurant restaurant = restaurantDAO.getByID(restaurantID);
		ArrayList<CustomerReview> reviews = getAllReviewsForRestaurant(restaurantID);

		restaurant.setRating(calculateRestaurantRating(reviews));

		restaurantDAO.update(restaurant);
	}

	private ArrayList<CustomerReview> getAllReviewsForRestaurant(int restaurantID) throws JsonSyntaxException, IOException {
		ArrayList<CustomerReview> restaurantReviews = new ArrayList<CustomerReview>();

		for (CustomerReview review : reviewDAO.getAllNotDeleted()) {
			if ((review.getRestaurantID() == restaurantID) && (review.getStatus().equals(ReviewStatus.Approved))) {
				restaurantReviews.add(review);
			}
		}

		return restaurantReviews;
	}

	private double calculateRestaurantRating(ArrayList<CustomerReview> reviews) {
		double rating = 0;
		int cnt = 0;
		for (CustomerReview review : reviews) {
			++cnt;
			rating += review.getRating();
		}
		if (cnt != 0) {
			rating = rating/cnt;
			rating = (double) (Math.round(rating*100.0)/100.0);
		}

		return rating;
	}

}
