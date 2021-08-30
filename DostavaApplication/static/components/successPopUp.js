Vue.component("success", {
    props: ['text'],
    template: `
	<div class="registration-success"> 
        <div class="modal" style="height:auto">
            <div id="checkMark" class="fa"></div>
            <h1 style="color:white">{{text}}</h1>
        </div>
    </div>
	`
});