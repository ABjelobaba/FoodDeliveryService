package beans;

public class CustomerReview {
	public String customerUsername;
	public int restourantID;
	public String review;
	public int rating;
	public boolean deleted;
	
	public CustomerReview(String customerUsername, int restourantID, String review, int rating) {
		super();
		this.customerUsername = customerUsername;
		this.restourantID = restourantID;
		this.review = review;
		this.rating = rating;
	}

	public String getCustomerUsername() {
		return customerUsername;
	}

	public void setCustomerUsername(String customerUsername) {
		this.customerUsername = customerUsername;
	}

	public int getRestourantID() {
		return restourantID;
	}

	public void setRestourantID(int restourantID) {
		this.restourantID = restourantID;
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
	
}
