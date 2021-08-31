package controllers;

import com.google.gson.Gson;

import services.OrderService;

public class OrderController {
    private static Gson gs = new Gson();

	public OrderController(OrderService orderService) {

    }
}
