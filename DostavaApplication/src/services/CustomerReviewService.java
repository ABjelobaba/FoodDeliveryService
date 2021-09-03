package services;

import java.io.IOException;
import java.util.ArrayList;

import com.google.gson.JsonSyntaxException;

import beans.CustomerReview;
import beans.ReviewStatus;
import dao.CustomerReviewDAO;

public class CustomerReviewService {

	private CustomerReviewDAO reviewDAO;
	
	public CustomerReviewService(CustomerReviewDAO reviewDAO) {
		this.reviewDAO = reviewDAO;
	}
	
	public ArrayList<CustomerReview> getAll() throws JsonSyntaxException, IOException {
		return (ArrayList<CustomerReview>) reviewDAO.getAll();
	}
	
	public ArrayList<CustomerReview> getAllByRestaurant(int restaurantID) throws JsonSyntaxException, IOException {
		ArrayList<CustomerReview> reviews = new ArrayList<CustomerReview>();
		
		for (CustomerReview review : getAll()) {
			if (restaurantID == review.getID() && !review.isDeleted()) {
				reviews.add(review);
			}
		}
		
		return reviews;
	}
	
	public CustomerReview getReviewByID(int reviewID) throws JsonSyntaxException, IOException {
		return reviewDAO.getByID(reviewID);
	}
	
	public void approveReview(int reviewID) throws JsonSyntaxException, IOException {
		CustomerReview review = getReviewByID(reviewID);
		review.setStatus(ReviewStatus.Approved);
		
		reviewDAO.update(review);
	}
	
	public void rejectReview(int reviewID) throws JsonSyntaxException, IOException {
		CustomerReview review = getReviewByID(reviewID);
		review.setStatus(ReviewStatus.Rejected);
		
		reviewDAO.update(review);
	}
	
	public void deleteReview(int reviewID) throws JsonSyntaxException, IOException {
		CustomerReview review = getReviewByID(reviewID);
		
		reviewDAO.delete(review);
	}

}
