package services;

import java.io.IOException;

import com.google.gson.JsonSyntaxException;

import beans.*;
import dao.UserDAO;
import dto.CartItemDTO;

public class CartService {
    private UserDAO userDAO;
	
	public CartService(UserDAO userDAO) {
        this.userDAO = userDAO;
	}
    
    public ShoppingCart addArticle(ShoppingCart cart, CartItemDTO cartItemDTO) {
        if(cart.getRestaurantID() == -1){
            cart.setRestaurantID(cartItemDTO.getRestaurantID());
        }

        for(OrderedItem oi: cart.getOrderedItems()){
            if(oi.getItem().isEqual(cartItemDTO.getItem().getID())){
                cart.getOrderedItems().remove(oi);
                cart.setTotalPrice(cart.getTotalPrice() - oi.getAmount()*oi.getItem().getPrice());
                break;
            }
        }

        OrderedItem orderItem = new OrderedItem(cartItemDTO.getItem(), cartItemDTO.getQuantity());
        cart.getOrderedItems().add(orderItem);
        double cartPrice = cart.getTotalPrice() + orderItem.getAmount()*orderItem.getItem().getPrice();
        cart.setTotalPrice(cartPrice);
        return cart;
    }

    public ShoppingCart calculateDiscount(ShoppingCart cart) throws JsonSyntaxException, IOException{
        Customer customer = (Customer) userDAO.getByID(cart.getCustomerUsername());
        int discount = (int)cart.getTotalPrice() * customer.getCategory().getDiscount() / 100;
        cart.setPriceWithDiscount(cart.getTotalPrice() - discount);
        return cart;
    }

    public ShoppingCart increaseQuantity(ShoppingCart cart, OrderedItem item) {
        for(OrderedItem oi: cart.getOrderedItems()){
            if(oi.getItem().isEqual(item.getItem().getID())){
                cart.getOrderedItems().remove(oi);
                oi.setAmount(oi.getAmount() + 1);
                cart.getOrderedItems().add(oi);
                cart.setTotalPrice(cart.getTotalPrice() + oi.getItem().getPrice());
                break;
            }
        }
        return cart;
    }

    public ShoppingCart decreaseQuantity(ShoppingCart cart, OrderedItem item) {
        for(OrderedItem oi: cart.getOrderedItems()){
            if(oi.getItem().isEqual(item.getItem().getID())){
                cart.getOrderedItems().remove(oi);
                oi.setAmount(oi.getAmount() - 1);
                cart.getOrderedItems().add(oi);
                cart.setTotalPrice(cart.getTotalPrice() - oi.getItem().getPrice());
                break;
            }
        }
        return cart;
    }

    public ShoppingCart deleteItem(ShoppingCart cart, OrderedItem item) {
        for(OrderedItem oi: cart.getOrderedItems()){
            if(oi.getItem().isEqual(item.getItem().getID())){
                cart.setTotalPrice(cart.getTotalPrice() - (oi.getItem().getPrice() * oi.getAmount()));
                cart.getOrderedItems().remove(oi);
                break;
            }
        }
        if(cart.getOrderedItems().size() == 0){
            cart.setRestaurantID(-1);
        }
        return cart;
    }

    public ShoppingCart calculatePoints(ShoppingCart cart) {
		double newPoints = cart.getTotalPrice()/1000*133;
		cart.setPoints((int)newPoints);
		return cart;
    }
}
