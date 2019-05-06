$(document).ready(function() {
	$("#back-to-top").click(function(event) {
		/* Act on the event */
		$('body,html').animate({scrollTop:0}, 600);
	});
	$(".btn-sumnit-user").click(function(event) {
		/* Act on the event */
		$(".NavbarUser").toggle(300);
	
	});
});