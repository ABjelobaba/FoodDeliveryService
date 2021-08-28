package dao;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.reflect.TypeToken;

import beans.Customer;
import beans.Deliverer;
import beans.Manager;
import beans.User;
import utils.*;

public class UserDAO extends JSONStorage<User, String>{
	
	public UserDAO(String fileLocation) {
		super(fileLocation, new TypeToken<List<User>>(){}.getType(), createGson());
	}

	
	private static Gson createGson() {	
		RuntimeTypeAdapterFactory<User> userAdapterFactory = RuntimeTypeAdapterFactory.of(User.class)
	        .registerSubtype(Customer.class)
	        .registerSubtype(Deliverer.class)
	        .registerSubtype(Manager.class);
		
		return new GsonBuilder()
		     .registerTypeAdapterFactory(userAdapterFactory)
	         .create();
	}
}
