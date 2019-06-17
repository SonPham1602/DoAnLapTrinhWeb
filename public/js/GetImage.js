$(document).ready(function(){
	$("#HinhMoTa").change(function(){
 		
 		var urlImage = $("#HinhMoTa").val();
 		$("#ImageMoTa").attr("src",urlImage).load();
 	});

 });
