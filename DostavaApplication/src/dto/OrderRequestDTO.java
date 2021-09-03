package dto;

public class OrderRequestDTO {
    private String username;
    private String orderID;

    public OrderRequestDTO(String username, String orderID){
        this.username = username;
        this.orderID = orderID;
    }

    public String getUsername(){
        return username;
    }

    public String getOrderID(){
        return orderID;
    }
}
