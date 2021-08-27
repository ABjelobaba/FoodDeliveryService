package beans;

import java.util.List;

public class Restaurant implements IEntity<Integer>{
	public int restaurantID;
	public String name;
	public RestaurantType type;
	public List<FoodItem> items;
	public boolean open;
	public Location location;
	public String logo;
	public boolean deleted;
	
	public Restaurant(String name, RestaurantType type, List<FoodItem> items, boolean open, Location location,
			String logo) {
		super();
		this.name = name;
		this.type = type;
		this.items = items;
		this.open = open;
		this.location = location;
		this.logo = logo;
		this.deleted = false;
	}
	

	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public RestaurantType getType() {
		return type;
	}
	public void setType(RestaurantType type) {
		this.type = type;
	}
	public List<FoodItem> getItems() {
		return items;
	}
	public void setItems(List<FoodItem> items) {
		this.items = items;
	}
	public boolean isOpen() {
		return open;
	}
	public void setOpen(boolean open) {
		this.open = open;
	}
	public Location getLocation() {
		return location;
	}
	public void setLocation(Location location) {
		this.location = location;
	}
	public String getLogo() {
		return logo;
	}
	public void setLogo(String logo) {
		this.logo = logo;
	}
	public boolean isDeleted() {
		return deleted;
	}
	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

	@Override
	public Integer getID() {
		return this.restaurantID;
	}

	@Override
	public void setID(Integer id) {
		this.restaurantID = id;
	}


	@Override
	public boolean isEqual(Integer id) {
		return this.restaurantID == id;
	}

	
}
