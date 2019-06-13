-- create database doubles;
create table category(
	id mediumint not null auto_increment,
	name varchar(50) not null,
	primary key (id)
);
create table category2(
	id mediumint not null auto_increment,
    id_cat mediumint not null,
    name varchar(50) not null,
    primary key(id),
    foreign key (id_cat) references category(id)
);
create table tag(
	id mediumint not null auto_increment,
    name varchar(50) not null,
    primary key (id)
);

create table article(
	id mediumint not null auto_increment,
	id_cat	mediumint not null,
    id_cat2 mediumint,
    title varchar(100),
    date_post date,
	image varchar(50),
    image2 varchar(50),
    abstract varchar(500),
    content text,
    id_writer mediumint,
    status varchar(50),
    view int default 0,
    premium int default 0 check (premium = 0 or premium = 1),  
	primary key (id),
	foreign key (id_cat) references category(id),
    foreign key(id_cat2) references category2(id)
);

create table tag_article(
	id_tag mediumint not null,
    id_art mediumint not null,
	primary key(id_tag, id_art),
	foreign key(id_tag) references tag(id),
	foreign key (id_art) references article(id)
);

create table comment(
	id mediumint not null auto_increment,
    id_art mediumint not null,
    date_comment date,
    image_reader varchar(50),
    name_reader varchar(100),
    content varchar(500),
    
    primary key(id),
    foreign key (id_art) references article(id)
);

create table usertype(
	id mediumint not null auto_increment,
    name varchar(50),
    
    primary key(id)
);

create table account(
	id mediumint not null auto_increment,
    name_account varchar(50),
    password varchar(50),
    time_expired date,
    
    primary key(id)
);

create table user(
	id mediumint not null auto_increment,
    id_account mediumint not null unique,
    id_type mediumint not null,
    name varchar(50),
    email varchar(100),
    birthday date,
	
    primary key(id),
	foreign key(id_type) references usertype(id),
    foreign key(id_account) references account(id)
);

-- table bang writer luu but danh quan he 1 - 1 voi bang user qua id
create table writer(
	-- but danh
	name_writer varchar(50),
    id_user mediumint unique,
    
    primary key(name_writer),
    foreign key(id_user) references user(id)
);


insert into category(name) values('Xã hội');
insert into category(name) values('Giải trí');
insert into category(name) values('Sức khỏe');
insert into category(name) values('Kinh doanh');
insert into category(name) values('Công nghệ');

insert into category2(id_cat, name) values('1', 'Thời sự');
insert into category2(id_cat, name) values('1', 'Pháp luật');
insert into category2(id_cat, name) values('2', 'Ngôi sao');
insert into category2(id_cat, name) values('2', 'Điện ảnh');
insert into category2(id_cat, name) values('4', 'Nông sản');
insert into category2(id_cat, name) values('4', 'Hải sản ');
insert into category2(id_cat, name) values('5', 'Game');
insert into category2(id_cat, name) values('5', 'Thiết bị');


insert article(id_cat, id_cat2, title, date_post, image, image2, abstract, content) 
value(5, null, 'Apple bị tố "chèn ép" các ứng dụng theo dõi màn hình','2019-04-29','/images/CongNghe/hinh5.jpg','/images/CongNghe/hinh5/1.jpg',
'Dftimeime và App Control đã trở thành những nạn nhân mới nhất của Apple, sau khi công ty này đưa tính năng Screen Time đến với iOS 12.',
'<p>
	Theo PhoneArena, được biết đến là ứng dụng giới hạn thời gian trên màn hình hoặc thực thi các biện pháp kiểm soát bởi phụ huynh, Screen Time đang được Apple hỗ trợ mạnh mẽ so với các ứng dụng có chức năng tương tự trên App Store. Đó là lý do khiến công ty hạn chế hoặc gỡ bỏ Dftimeime và App Control ngay sau khi Screen Time được ra mắt.
</p>
<p>
	Apple bị tố "chèn ép" các ứng dụng theo dõi màn.
</p>
<p>
	Apple tiếp tục thói quen gây khó cho các ứng dụng đối thủ sau khi ra mắt một tính năng mới
</p>
<p>
	Dftimeime và App Control không phải là những ứng dụng duy nhất bị Apple đối xử như vậy. Các báo cáo cho thấy công ty còn tìm cách chèn ép, buộc các nhà sản xuất ứng dụng rút ứng dụng của mình khỏi App Store vì cho rằng họ đã vi phạm nguyên tắc không cho phép các ứng dụng kiểm soát các thiết bị khác, mặc dù chúng đã được phê duyệt trước đây và có mặt trên App Store trong nhiều năm.
</p>
<p>
	Để ứng dụng tiếp tục làm việc, nhiều nhà phát triển đã buộc phải xóa các tính năng khỏi ứng dụng khiến người dùng phải thử tìm giải pháp thay thế hoặc sử dụng tùy chọn gốc của Apple. Vấn đề là, nhiều người cho rằng các tính năng gốc của Apple thường phức tạp hơn khi thiết lập và không cung cấp mức độ kiểm soát như các ứng dụng của bên thứ ba.
</p>
<p>
	Apple đã bị đưa ra tòa trước khi có các hành vi chống cạnh tranh trong App Store và thậm chí còn có một vụ kiện đang chờ Tòa án Tối cao Mỹ tuyên bố liên quan đến việc kiểm soát App Store của Apple thể hiện sự độc quyền.
</p>');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, 8, 'Huawei - Qualcom: Đối thủ trong cuộc chiến chip modem 5G cho smartphone?','2019-02-15','/images/CongNghe/hinh6.jpg',
'Việc Apple và Qualcomm “đình chiến” trong tháng này đã vẽ lại bản đồ chiến trận ở thị trường chip 5G, giữa lúc các nhà sản xuất smartphone và nhà mạng rục rịch triển khai thử nghiệm thế hệ mạng di động mới.');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, null, 'Docker Hub bị tấn công, 190.000 người dùng bị ảnh hưởng','2019-01-01','/images/CongNghe/hinh7.jpg',
'Dịch vụ Docker Hub mới đây đã thông báo bị tin tặc tấn công lộ tên đăng nhập, mật khẩu và các token truy cập GitHub và Bitbucker.');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, 8, 'Sony xuất xưởng lượng smartphone thấp kỷ lục','2019-05-01','/images/CongNghe/hinh8.jpg',
'Sản lượng smartphone mà Sony bán ra trong năm tài chính 2018 thấp hơn rất nhiều so với ước tính đưa ra cách đây 1 năm, mặc dù công ty đã nhiều lần phải điều chỉnh hạ giá bán sản phẩm.');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, null, 'Tính năng thẻ mới của Windows 10 biến mất','2019-02-02','/images/CongNghe/hinh9.jpg',
'Microsoft đã hủy kế hoạch giới thiệu tính năng ứng dụng dạng thẻ mới trong hệ điều hành Windows 10 được đặt tên là Sets.');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, null, 'Google mở rộng tính năng gọi nhóm Google Duo','2018-12-20','/images/CongNghe/hinh11.jpg',
'Google Duo được cho là câu trả lời của Google đối với FaceTime, và hiện đã bắt đầu triển khai tính năng cuộc gọi nhóm đến với một số thị trường nhất định.');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, 7, 'Nvidia công bố card màn hình mới','2019-04-29','/images/CongNghe/hinh12.jpg',
'Nvidia vừa chính thức ra mắt dòng card đồ họa mới với tên gọi Geforce GTX 1660 Ti và GTX 1650, dựa trên kiến trúc Turing dành cho các laptop chơi game.');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, 7, 'Muốn mua PlayStation 5, hãy chờ hơn một năm nữa','2018-12-01','/images/CongNghe/hinh13.jpg',
'Bình luận về tương lai của PlayStation, bộ phận Interactive Entertainment (SIE) của Sony cho biết phiên bản kế nhiệm của PlayStation 4 sẽ không lên kệ các cửa hàng trước tháng 5.2020.');

insert article(id_cat, id_cat2, title, date_post, image, abstract) 
value(5, null, 'iOS 13 sẽ giúp iPad kết nối được với chuột máy tính','2019-11-18','/images/CongNghe/hinh14.jpg',
'Thiếu hỗ trợ chuột là một trong những điểm yếu của iPad, khiến máy không được đánh giá tốt như máy tính xách tay. Tuy nhiên mọi thứ có thể sớm thay đổi.');

insert article(id_cat, id_cat2, title, date_post, image, image2, abstract, content)
value(5,7,'Khám phá các tính năng vui vẻ, tiện ích của ColorOS 6 trên Realme 3','2019-04-21','/images/CongNghe/hinh15.jpg','/images/CongNghe/hinh15/1.jpg',
'Với phiên bản ColorOS 6 mới nhất từ OPPO, Realme 3 được thừa hưởng những tiện ích, tính năng thông minh giúp mang lại những trải nghiệm hoàn hảo, tiện lợi hơn.',
			'<p>
				(Techz.vn) Với phiên bản ColorOS 6 mới nhất từ OPPO, Realme 3 được thừa hưởng những tiện ích, tính năng thông minh giúp mang lại những trải nghiệm hoàn hảo, tiện lợi hơn.
			</p>
			<h3>
				Giao diện mới đơn giản và thân thiện
			</h3>
			<img src="/images/CongNghe/hinh15/2.jpg" alt="">
			<p>
				Một trong những điểm nâng cấp sáng giá nhất của Realme 3 đó là việc máy được tích hợp sẵn hệ điều hành ColorOS 6 trên nền Android 9 Pie mới nhất, được tích hợp những tính năng phần mềm thông minh độc đáo. ColorOS 6 có giao diện mới 1 lớp, với thiết kế phẳng, đẹp, đơn giản và rất thân thiện. Cùng với đó, việc sử dụng các biểu tượng có màu chuyển sắc tươi tắn, trẻ trung phù hợp cho đối tượng người dùng trẻ trung, năng động.
			</p>
			<h3>
				Đẹp chưa đủ, còn phải thông minh
			</h3>
			<p>
				Ngoài sự thay đổi về mặt giao diện, ColorOS 6 còn chú trọng đến các trải nghiệm tiện lợi hơn, như việc thay đổi các phím “điều hướng thông minh”. Chức năng này cho phép bạn có thể ẩn hoàn toàn các phím điều hướng cơ bản. Thay vào đó, bạn chỉ cần vuốt nhẹ lên để thực hiện chức năng đó. Điều hướng thông minh không chỉ mang đến trải nghiệm tiện lợi hơn mà còn giúp màn hình thể hiện nội dung đầy đủ hơn thay vì phải cắt thêm không gian để hiển thị thanh điều hướng.
			</p>
			<p>
				Bên cạnh các chức năng nhanh trên thanh trạng thái, chế độ “Thanh bên thông minh” sẽ giúp bạn thiết lập các tính năng thường sử dụng nhất để mở nhanh khi bạn cần đến như: chụp ảnh màn hình, quay phim màn hình hay các ứng dụng thường sử dụng ...
			</p>
			<p>
				Ngoài ra, nếu bạn đã quen dùng chức năng trợ lý dạng bong bóng, ColorOS 6 còn trang bị chế độ “bóng trợ lý”, chức năng này cho phép có thể thay thế hoàn toàn cử chỉ điều hướng bên cạnh dưới, và các thiết lập mở các ứng dụng thường dùng.
			</p>
			<h3>
				Trợ thủ đắc lực của game thủ
			</h3>
			<img src="/images/CongNghe/hinh15/3.jpg" alt="">
			<p>
				Chế độ “Không gian trò chơi” mang đến trải nghiệm tối ưu dành riêng cho game, tránh mọi phiền phức phát sinh trong quá trình chơi game, ưu tiên cho việc tập trung chơi của game thủ. Có thể nói, ở “không gian trò chơi”, bạn được tuỳ chọn ứng dụng/game để ưu tiên. Khi các ứng dụng/game này khởi chạy, sẽ được tối ưu hoá về hiệu năng và điện năng, cũng như tránh các thông báo hay cuộc gọi đến khiến bạn bị che mất thông tin trong game hoặc bị “out”.
			</p>
			<p class="border-bot">
				Như vậy, có thể thấy, với một smartphone chỉ 3,99 triệu, nhưng Realme rất chăm chút cho từng tính năng trên Realme 3, để đảm bảo trải nghiệm người dùng thoải mái, tiện lợi nhất.
			</p>');

insert comment(id_art, date_comment,image_reader,name_reader,content)
value(1, '2019-05-25','/images/avatar.jpg','Sơn Hứa','Bài viết khá hay!');
-- insert into tag_article(idtag, id_art)
-- select tag.id, article.id from tag, article

-- drop table tag_article;
-- drop table tag;
-- drop table writer;
-- drop table user;
-- drop table account;
-- drop table comment;
-- drop table usertype;
-- drop table article;
-- drop table category2;
-- drop table category;


