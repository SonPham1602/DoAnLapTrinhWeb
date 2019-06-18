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


 	$("#li-quan-ly-bai-viet").click(function(event) {
 		$(".panel").hide();
 		$(".QuanLyBaiViet").fadeIn(200);
 	});
 	$("#li-quan-ly-chuyen-muc").click(function(event) {
 		$(".panel").hide();
 		$(".QuanLyChuyenMuc").fadeIn(200);
 	});
 	$("#li-quan-ly-doc-gia").click(function(event) {
 		$(".panel").hide();
 		$(".QuanLyDocGia").fadeIn(200);
 	});
 	$("#li-quan-ly-premium").click(function(event) {
 		$(".panel").hide();
 		$(".QuanLyDocGiaPremium").fadeIn(200);
 	});
 	$("#li-quan-ly-phong-vien").click(function(event) {
 		$(".panel").hide();
 		$(".QuanlyPhongVien").fadeIn(200);
 	});


 });
