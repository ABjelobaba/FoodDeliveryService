package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.CustomerReview;

public class CustomerReviewDAO extends JSONStorage<CustomerReview, Integer> {

	public CustomerReviewDAO(String path) {
		super(path, new TypeToken<List<CustomerReview>>(){}.getType(), new Gson());
	}
	
	public int generateID() throws JsonSyntaxException, IOException  {
		return getAll().size() + 1;
	}
}

