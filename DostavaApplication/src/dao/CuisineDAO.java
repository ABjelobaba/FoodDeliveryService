package dao;

import java.util.List;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;

import beans.Cuisine;

public class CuisineDAO extends JSONStorage<Cuisine, String>{

    public CuisineDAO(String fileLocation) {
		super(fileLocation, new TypeToken<List<Cuisine>>(){}.getType(), new Gson());
	}
}
