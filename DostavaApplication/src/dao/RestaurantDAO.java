package dao;

import java.io.IOException;
import java.util.List;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Restaurant;

public class RestaurantDAO extends JSONStorage<Restaurant, Integer> {

	public RestaurantDAO(String path) {
		super(path, new TypeToken<List<Restaurant>>(){}.getType(), new Gson());
	}
	
	public int generateID() throws JsonSyntaxException, IOException  {
		return getAll().size() + 1;
	}
}
