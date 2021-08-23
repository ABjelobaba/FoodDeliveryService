Vue.component("order-status-cell", {
    props: ['orderStatus'],
    template: `
	<div>
        <div v-if="orderStatus == 'canceled'">
            <i class="fa fa-ban" aria-hidden="true"></i> Otkazana
        </div> 
        <div v-if="orderStatus == 'processing'">
            <i class="fa fa-spinner" aria-hidden="true"></i> Obrada
        </div> 
        <div v-if="orderStatus == 'prep'">
            <i class="fa fa-cutlery" aria-hidden="true"></i> U pripremi
        </div> 
        <div v-if="orderStatus == 'waitingDeliverer'">
            <i class="fa fa-spinner" aria-hidden="true"></i> Čeka dostavljača
        </div> 
        <div v-if="orderStatus == 'transporting'">
            <i class="fa fa-bicycle" aria-hidden="true"></i> U transportu
        </div> 
        <div v-if="orderStatus == 'finished'">
            <i class="fa fa-check-circle-o" aria-hidden="true"></i> Dostavljena
        </div>
    </div> 
	`
});