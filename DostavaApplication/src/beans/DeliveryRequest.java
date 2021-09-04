package beans;

public class DeliveryRequest {
    private Deliverer deliverer;
    private boolean requestProcessed;

    public DeliveryRequest(Deliverer deliverer){
        this.deliverer = deliverer;
        this.requestProcessed = false;
    }

    public Deliverer getDeliverer(){
        return deliverer;
    }

    public boolean getRequestProcessed(){
        return requestProcessed;
    }
    
}
