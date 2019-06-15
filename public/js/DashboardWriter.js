 $(document).ready(function(){

 	$(".panel").hide();
 		$(".TrangChuDashboard").fadeIn(200);
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
 	$("#li-cho-kiem-duyet").click(function(event){
 		$(".panel").hide();
 		$(".DanhSachBaiVietChoKiemDuyetDashboard").fadeIn(200);
 	});
 	$("#li-trang-chu").click(function(event){
 		$(".panel").hide();
 		$(".TrangChuDashboard").fadeIn(200);
 	});
 	$("#li-bai-viet-tam").click(function(event){
 		$(".panel").hide();
 		$(".BaiVietTamDashboard").fadeIn(200);
 	});
 	$(".drop-down-menu").mouseleave(function(event) {
 		/* Act on the event */
 		$(this).delay(800).fadeOut(400, function() {
 			

 		});
 	});
 	$(".tin_nhan_dashboard").click(function(event) {
 		$("#tin-nhan-drop-down-menu").toggle(300);
 	});
 	$(".btn-toggle").click(function(event) {
 		$(".navigation nav").fadeToggle('300', function() {
 			
 		});;
 		
 		
 		/* Act on the event */
 	});

});

