package dto;

import beans.RestaurantType;

public class RestaurantDTO {
	private String name;
	private RestaurantType type;
	private String logo;
	private double longitude;
	private double latitude;
	private String streetAddress;
	private String city;
	private int zipCode;
	private String managerUsername;
	
	public RestaurantDTO(String name, RestaurantType type, String logo, double longitude, double latitude,
			String streetAddress, String city, int zipCode, String managerUsername) {
		super();
		this.name = name;
		this.type = type;
		this.logo = logo;
		this.longitude = longitude;
		this.latitude = latitude;
		this.streetAddress = streetAddress;
		this.city = city;
		this.zipCode = zipCode;
		this.managerUsername = managerUsername;
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

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public double getLongitude() {
		return longitude;
	}

	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}

	public double getLatitude() {
		return latitude;
	}

	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}

	public String getStreetAddress() {
		return streetAddress;
	}

	public void setStreetAddress(String streetAddress) {
		this.streetAddress = streetAddress;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public int getZipCode() {
		return zipCode;
	}

	public void setZipCode(int zipCode) {
		this.zipCode = zipCode;
	}

	public String getManagerUsername() {
		return managerUsername;
	}

	public void setManagerUsername(String managerUsername) {
		this.managerUsername = managerUsername;
	}
	
}
