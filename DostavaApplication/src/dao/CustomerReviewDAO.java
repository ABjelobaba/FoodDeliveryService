package dao;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.CustomerReview;

public class CustomerReviewDAO extends JSONStorage<CustomerReview, Integer> {

	public CustomerReviewDAO(String path) {
		super(path, new TypeToken<List<CustomerReview>>(){}.getType(), new Gson());

	}
}

