package dao;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Order;

public class OrderDAO extends JSONStorage<Order, String> {

	public OrderDAO(String path) {
		super(path, new TypeToken<List<Order>>(){}.getType(), new Gson());

	}

}

