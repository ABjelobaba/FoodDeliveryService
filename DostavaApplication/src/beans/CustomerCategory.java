package beans;

public class CustomerCategory {
	public CustomerType type;
	public int discount;
	public int pointsRequired;
	
	public CustomerCategory(CustomerType type, int discount, int pointsRequired) {
		super();
		this.type = type;
		this.discount = discount;
		this.pointsRequired = pointsRequired;
	}
	
	public CustomerType getType() {
		return type;
	}
	public void setType(CustomerType type) {
		this.type = type;
	}
	public int getDiscount() {
		return discount;
	}
	public void setDiscount(int discount) {
		this.discount = discount;
	}
	public int getPointsRequired() {
		return pointsRequired;
	}
	public void setPointsRequired(int pointsRequired) {
		this.pointsRequired = pointsRequired;
	}
	
	
}
