package beans;

public class FoodItem {
	public String name;
	public double price;
	public FoodType type;
	public int restaurantID;
	public int quantity;
	public String description;
	public String image;
	public boolean deleted;
	
	public FoodItem(String name, double price, FoodType type, int restaurantID, int quantity, String description,
			String image) {
		super();
		this.name = name;
		this.price = price;
		this.type = type;
		this.restaurantID = restaurantID;
		this.quantity = quantity;
		this.description = description;
		this.image = image;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
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

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
}
