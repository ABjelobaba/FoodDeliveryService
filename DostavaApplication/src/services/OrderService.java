package services;

import dao.OrderDAO;

public class OrderService {
    private OrderDAO orderDAO;
	
	public OrderService(OrderDAO orderDAO) {
		this.orderDAO = orderDAO;
	}
}
