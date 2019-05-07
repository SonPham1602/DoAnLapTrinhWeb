$(document).ready(function() {
	$("#back-to-top").click(function(event) {
		/* Act on the event */
		$('body,html').animate({scrollTop:0}, 600);
	});
	$(".btn-sumnit-user").click(function(event) {
		/* Act on the event */
		$(".NavbarUser").toggle(300);

	});
	$(".btn-submit-search").click(function(event) {
		/* Act on the event */
		event.preventDefault(); 
		$("#search-text-div").fadeToggle(400);
	});
	$(window).scroll(function(){
		if ($(this).scrollTop()>300) {
			$("#back-to-top").fadeIn(300);
		}
		else{
			$("#back-to-top").fadeOut(300);
		}
	});

});