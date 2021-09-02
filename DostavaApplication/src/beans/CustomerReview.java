package beans;

public class CustomerReview implements IEntity<Integer>{
	private int reviewID;
	private String customerUsername;
	private int restaurantID;
	private String review;
	private int rating;
	private boolean deleted;
	
	public CustomerReview(String customerUsername, int restaurantID, String review, int rating) {
		super();
		this.customerUsername = customerUsername;
		this.restaurantID = restaurantID;
		this.review = review;
		this.rating = rating;
		this.deleted = false;
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

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public Integer getID() {
		return this.reviewID;
	}

	@Override
	public void setID(Integer id) {
		this.reviewID = id;		
	}

	@Override
	public boolean isEqual(Integer id) {
		return this.reviewID == id;
	}
	
}
