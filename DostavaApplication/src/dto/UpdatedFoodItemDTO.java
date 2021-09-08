package dto;

import beans.FoodType;

public class UpdatedFoodItemDTO {
	private String newName;
	private double price;
	private FoodType type;
	private int restaurantID;
	private int quantity;
	private String description;
	private String image;
	private String oldName;
	
	public UpdatedFoodItemDTO(String newName, double price, FoodType type, int restaurantID, int quantity,
			String description, String image, String oldName) {
		super();
		this.newName = newName;
		this.price = price;
		this.type = type;
		this.restaurantID = restaurantID;
		this.quantity = quantity;
		this.description = description;
		this.image = image;
		this.oldName = oldName;
	}

	public String getNewName() {
		return newName;
	}

	public void setNewName(String newName) {
		this.newName = newName;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public FoodType getType() {
		return type;
	}

	public void setType(FoodType type) {
		this.type = type;
	}

	public int getRestaurantID() {
		return restaurantID;
	}

	public void setRestaurantID(int restaurantID) {
		this.restaurantID = restaurantID;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getOldName() {
		return oldName;
	}

	public void setOldName(String oldName) {
		this.oldName = oldName;
	}
	
	
	
}
