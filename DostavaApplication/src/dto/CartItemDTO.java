package dto;

import beans.FoodItem;

public class CartItemDTO {
    private int restaurantID;
    private FoodItem item;
    private int quantity;

    public CartItemDTO(int restaurantID, FoodItem item, int quantity){
        this.restaurantID = restaurantID;
        this.item = item;
        this.quantity = quantity;
    }

    public int getRestaurantID(){
        return restaurantID;
    }

    public FoodItem getItem(){
        return item;
    }

    public int getQuantity(){
        return quantity;
    }
}
