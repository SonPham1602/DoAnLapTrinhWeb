 $(document).ready(function(){
 	$("#btn-luu-bai-viet").click(function(event){
 		alert("As you can see, the link no longer took you to jquery.com");
 		event.preventDefault();
 	});
 	$(".user_dashboard").click(function(event){
 		$("#user-drop-down-menu").toggle(200);
 	});
 	$(".thong_bao_dashboard").click(function(event){

 		$("#thong-bao-drop-down-menu").toggle(200);
 	});
 	$("#li-cho-xuat-ban").click(function(event){
 		$(".panel").hide();
 		$(".DanhSachBaiVietChoXuatBaniDashboard").fadeIn(200);
 	});
 	$("#li-da-xuat-ban").click(function(event){
 		$(".panel").hide();
 		$(".DanhSachBaiVietDashboard").fadeIn(200);
 	});
 	$("#li-bi-tu-choi").click(function(event){
 		$(".panel").hide();
 		$(".DanhSachBaiVietBiTuChoiDashboard").fadeIn(200);
 	});
 	$("#li-bai-viet-moi").click(function(event){
 		$(".panel").hide();
 		$(".VietBaiDashboard").fadeIn(200);
 	});


 });
