package beans;

public class Cuisine implements IEntity<String>{
    private String cuisineID;
    private String value;
    private String fullValue;
	private boolean deleted;

    public Cuisine(String cuisineID,String fullValue, String value) {
        this.cuisineID = cuisineID;
        this.value = value;
        this.fullValue = fullValue;
        this.deleted = false;
    }

    public String getValue() {
        return this.value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    public String getFullValue() {
        return this.fullValue;
    }

    public void setFullValue(String fullValue) {
        this.fullValue = fullValue;
    }
    @Override
    public String getID() {
        return cuisineID;
    }

    @Override
    public void setID(String id) {
        this.cuisineID = id;
    }

    @Override
    public boolean isDeleted() {
        return deleted;
    }

    @Override
    public void setDeleted(boolean value) {
        this.deleted = value;
    }

    @Override
    public boolean isEqual(String id) {
		return this.cuisineID.equals(id);
    }

}
