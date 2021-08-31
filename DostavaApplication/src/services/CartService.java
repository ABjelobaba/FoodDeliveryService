package services;

import beans.*;
import dao.RestaurantDAO;
import dto.CartItemDTO;

public class CartService {
    
    private RestaurantDAO restaurantDAO;
	
	public CartService(RestaurantDAO restaurantDAO) {
		this.restaurantDAO = restaurantDAO;
	}
    
    public ShoppingCart addArticle(ShoppingCart cart, CartItemDTO cartItemDTO) {
        if(cart.getRestaurantID() == -1){
            cart.setRestaurantID(cartItemDTO.getRestaurantID());
        }

        for(OrderedItem oi: cart.getOrderedItems()){
            if(oi.getItem().isEqual(cartItemDTO.getItem().getID())){
                cart.getOrderedItems().remove(oi);
                break;
            }
        }

        OrderedItem orderItem = new OrderedItem(cartItemDTO.getItem(), cartItemDTO.getQuantity());
        cart.getOrderedItems().add(orderItem);
        return cart;
    }


}
