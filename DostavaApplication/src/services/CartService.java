package services;

import beans.*;
import dto.CartItemDTO;

public class CartService {
    
	
	public CartService() {
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
        cart.setTotalPrice(cart.getTotalPrice() + orderItem.getAmount()*orderItem.getItem().getPrice());

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
        return cart;
    }
}
