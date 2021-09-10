package services;


import java.io.IOException;
import java.util.List;

import com.google.gson.JsonSyntaxException;

import beans.Cuisine;
import dao.CuisineDAO;

public class CuisineService {
    private CuisineDAO cuisineDAO;
	
	public CuisineService(CuisineDAO cuisineDAO) {
        this.cuisineDAO = cuisineDAO;
	}

    public List<Cuisine> getAll() throws JsonSyntaxException, IOException {
       return cuisineDAO.getAll();
    }
}
