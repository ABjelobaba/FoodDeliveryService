package dao;

import java.io.IOException;
import java.util.List;
import java.util.Random;

import com.google.gson.Gson;
import com.google.gson.JsonSyntaxException;
import com.google.gson.reflect.TypeToken;

import beans.Order;

public class OrderDAO extends JSONStorage<Order, String> {

	public OrderDAO(String path) {
		super(path, new TypeToken<List<Order>>(){}.getType(), new Gson());
	}
	
	public String generateID() throws JsonSyntaxException, IOException  {
		String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
		Random random = new Random();
	    StringBuilder builder = new StringBuilder(10);

	    for (int i = 0; i < 10; i++) {
	        builder.append(alphabet.charAt(random.nextInt(alphabet.length())));
	    }

	    return builder.toString();
	}

	
}

