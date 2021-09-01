Vue.component("order-status-cell", {
    props: ['orderStatus'],
    template: `
	<div>
        <div v-if="orderStatus == 'Cancelled'">
            <i class="fa fa-ban" aria-hidden="true"></i> Otkazana
        </div> 
        <div v-if="orderStatus == 'Processing'">
            <i class="fa fa-spinner" aria-hidden="true"></i> Obrada
        </div> 
        <div v-if="orderStatus == 'InPreparation'">
            <i class="fa fa-cutlery" aria-hidden="true"></i> U pripremi
        </div> 
        <div v-if="orderStatus == 'WaitingForDelivery'">
            <i class="fa fa-spinner" aria-hidden="true"></i> Čeka dostavljača
        </div> 
        <div v-if="orderStatus == 'InTransport'">
            <i class="fa fa-bicycle" aria-hidden="true"></i> U transportu
        </div> 
        <div v-if="orderStatus == 'Delivered'">
            <i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena
        </div>
    </div> 
	`
});