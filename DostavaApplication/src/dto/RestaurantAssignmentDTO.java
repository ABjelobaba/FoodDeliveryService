package dto;

public class RestaurantAssignmentDTO {
		private String username;
		private int RestaurantID;
		
		public RestaurantAssignmentDTO(String username, int restaurantID) {
			super();
			this.username = username;
			RestaurantID = restaurantID;
		}

		public String getUsername() {
			return username;
		}

		public void setUsername(String username) {
			this.username = username;
		}

		public int getRestaurantID() {
			return RestaurantID;
		}

		public void setRestaurantID(int restaurantID) {
			RestaurantID = restaurantID;
		}
		
}
