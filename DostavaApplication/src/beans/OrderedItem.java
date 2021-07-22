package beans;

public class OrderedItem {
	public FoodItem item;
	public int amount;
	
	public OrderedItem(FoodItem item, int amount) {
		super();
		this.item = item;
		this.amount = amount;
	}

	public FoodItem getItem() {
		return item;
	}

	public void setItem(FoodItem item) {
		this.item = item;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
}
