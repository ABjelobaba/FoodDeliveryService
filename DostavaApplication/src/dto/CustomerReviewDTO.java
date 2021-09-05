package dto;

public class CustomerReviewDTO {
	private String customerUsername;
	private int restaurantID;
	private String review;
	private int rating;
	
	public CustomerReviewDTO(String customerUsername, int restaurantID, String review, int rating) {
		super();
		this.customerUsername = customerUsername;
		this.restaurantID = restaurantID;
		this.review = review;
		this.rating = rating;
	}

	public String getCustomerUsername() {
		return customerUsername;
	}

	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}

	public int getRestaurantID() {
		return restaurantID;
	}

	public void setRestaurantID(int restaurantID) {
		this.restaurantID = restaurantID;
	}

	public String getReview() {
		return review;
	}

	public void setReview(String review) {
		this.review = review;
	}

	public int getRating() {
		return rating;
	}

	public void setRating(int rating) {
		this.rating = rating;
	}

}
