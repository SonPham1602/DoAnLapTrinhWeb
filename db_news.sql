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

create table status(
	id  mediumint not null auto_increment,
    name varchar(50),
    primary key (id)
);

create table article(
	id mediumint not null auto_increment,
	id_cat	mediumint not null,
    id_cat2 mediumint,
    title varchar(100),
    date_post date,
	image varchar(150),
    image2 varchar(150),
    abstract varchar(500),
    content text,
    id_writer mediumint,
    status mediumint check (status = 1 or status = 2 or status = 3 or status = 4),
    -- status 1: Đã được duyệt, chờ xuất bản
    -- status 2: Đã xuất bản
    -- status 3: Bị từ chối
    -- status 4: Chưa được duyệt
    
    view int default 0,
    premium int default 0 check (premium = 0 or premium = 1), 
	primary key (id),
	foreign key (id_cat) references category(id),
    foreign key(id_cat2) references category2(id),
    foreign key (status) references status(id)
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
    id_type mediumint not null,
    id_account mediumint unique,
    name varchar(50),
    email varchar(100),
    birthday date,
    premium int default 0 check (premium = 0 or premium = 1), 
	
    primary key(id),
	foreign key(id_type) references usertype(id)
   --  foreign key(id_account) references account(id)
);

-- table bang writer luu but danh quan he 1 - 1 voi bang user qua id
create table writer(
	-- but danh
    id_user mediumint,
	name_writer varchar(50),
    
    primary key(name_writer),
    foreign key(id_user) references user(id)
);
-- table editor phan quyen editor
create table editor(
	id mediumint,
    id_cat mediumint,
    primary key (id),
	foreign key(id) references user(id),
    foreign key(id_cat) references category(id)
);
insert into usertype(name) value ('Admin');
insert into usertype(name) value ('Độc giả');
insert into usertype(name) value ('Phóng viên');
insert into usertype(name) value ('Biên tập viên');

insert into account (name_account, password) value ('huathanhson','1');
insert into account (name_account, password) value ('phamngocson','2');
insert into account (name_account, password) value ('nguyenhoangsang','3');
insert into account (name_account, password) value ('tranphusy','4');
insert into account (name_account, password) value ('phamtuuyen','5');
insert into account (name_account, password) value ('nguyenthianh','6');
insert into account (name_account, password) value ('dangtuangoc','7');
insert into account (name_account, password) value ('thanhthieu','8');
insert into account (name_account, password) value ('phamhuuthang','9');
insert into account (name_account, password) value ('vodongtrieu','10');
insert into account (name_account, password) value ('buithanhdat','11');


insert into user(id_account, id_type, name, email) value (1, 1,'Hứa Thanh Sơn', 'huason@gmail.com');
insert into user(id_account, id_type, name, email) value (2, 1,'Phạm Ngọc Sơn', 'ngocson.cla@gmail.com');
insert into user(id_account, id_type, name, email, premium) value (3, 2,'Nguyễn Hoàng Sang', 'nguyenhoangsang@gmail.com', 1);
insert into user(id_account, id_type, name, email) value (4, 2,'Trần Phú Sý', 'tranphusy@gmail.com');
insert into user(id_account, id_type, name, email, premium) value (5, 2,'Phạm Tú Uyên', 'phamtuuyen@gmail.com', 1);
insert into user(id_account, id_type, name, email) value (6, 2,'Nguyễn Thi Anh', 'nguyenthianh@gmail.com');
insert into user(id_account, id_type, name, email) value (7, 3,'Đặng Tuấn Ngọc', 'dangtuangoc@gmail.com');
insert into user(id_account, id_type, name, email) value (8, 3,'Thành Thiếu', 'thanhthieu@gmail.com');
insert into user(id_account, id_type, name, email) value (9, 4,'Phạm Hữu Thắng', 'phamhuuthang@gmail.com');
insert into user(id_account, id_type, name, email) value (10, 4,'Võ Đông Triều', 'vodongtrieu@gmail.com');
insert into user(id_account, id_type, name, email) value (11, 3,'Bùi Thành Đạt', 'buithanhdat@gmail.com');

insert into category(name) values('Xã hội');
insert into category(name) values('Giải trí');
insert into category(name) values('Sức khỏe');
insert into category(name) values('Kinh doanh');
insert into category(name) values('Công nghệ');

insert into editor(id, id_cat) value (9, 1);
insert into editor(id, id_cat) value (10, 2);

insert into category2(id_cat, name) values('1', 'Thời sự');
insert into category2(id_cat, name) values('1', 'Pháp luật');
insert into category2(id_cat, name) values('2', 'Ngôi sao');
insert into category2(id_cat, name) values('2', 'Điện ảnh');
insert into category2(id_cat, name) values('4', 'Nông sản');
insert into category2(id_cat, name) values('4', 'Hải sản ');
insert into category2(id_cat, name) values('5', 'Game');
insert into category2(id_cat, name) values('5', 'Thiết bị');

insert into status(name) values('Chờ xuất bản');
insert into status(name) values('Đã xuất bản');
insert into status(name) values('Bị từ chối');
insert into status(name) values('Chưa được duyệt');


insert article(id_cat, id_cat2, title, date_post, image, image2, abstract, content, status) 
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
</p>', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, 8, 'Huawei - Qualcom: Đối thủ trong cuộc chiến chip modem 5G cho smartphone?','2019-02-15','/images/CongNghe/hinh6.jpg',
'Việc Apple và Qualcomm “đình chiến” trong tháng này đã vẽ lại bản đồ chiến trận ở thị trường chip 5G, giữa lúc các nhà sản xuất smartphone và nhà mạng rục rịch triển khai thử nghiệm thế hệ mạng di động mới.', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, null, 'Docker Hub bị tấn công, 190.000 người dùng bị ảnh hưởng','2019-01-01','/images/CongNghe/hinh7.jpg',
'Dịch vụ Docker Hub mới đây đã thông báo bị tin tặc tấn công lộ tên đăng nhập, mật khẩu và các token truy cập GitHub và Bitbucker.', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, 8, 'Sony xuất xưởng lượng smartphone thấp kỷ lục','2019-05-01','/images/CongNghe/hinh8.jpg',
'Sản lượng smartphone mà Sony bán ra trong năm tài chính 2018 thấp hơn rất nhiều so với ước tính đưa ra cách đây 1 năm, mặc dù công ty đã nhiều lần phải điều chỉnh hạ giá bán sản phẩm.', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, null, 'Tính năng thẻ mới của Windows 10 biến mất','2019-02-02','/images/CongNghe/hinh9.jpg',
'Microsoft đã hủy kế hoạch giới thiệu tính năng ứng dụng dạng thẻ mới trong hệ điều hành Windows 10 được đặt tên là Sets.', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, null, 'Google mở rộng tính năng gọi nhóm Google Duo','2018-12-20','/images/CongNghe/hinh11.jpg',
'Google Duo được cho là câu trả lời của Google đối với FaceTime, và hiện đã bắt đầu triển khai tính năng cuộc gọi nhóm đến với một số thị trường nhất định.', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, 7, 'Nvidia công bố card màn hình mới','2019-04-29','/images/CongNghe/hinh12.jpg',
'Nvidia vừa chính thức ra mắt dòng card đồ họa mới với tên gọi Geforce GTX 1660 Ti và GTX 1650, dựa trên kiến trúc Turing dành cho các laptop chơi game.', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, 7, 'Muốn mua PlayStation 5, hãy chờ hơn một năm nữa','2018-12-01','/images/CongNghe/hinh13.jpg',
'Bình luận về tương lai của PlayStation, bộ phận Interactive Entertainment (SIE) của Sony cho biết phiên bản kế nhiệm của PlayStation 4 sẽ không lên kệ các cửa hàng trước tháng 5.2020.', 2);

insert article(id_cat, id_cat2, title, date_post, image, abstract, status) 
value(5, null, 'iOS 13 sẽ giúp iPad kết nối được với chuột máy tính','2019-11-18','/images/CongNghe/hinh14.jpg',
'Thiếu hỗ trợ chuột là một trong những điểm yếu của iPad, khiến máy không được đánh giá tốt như máy tính xách tay. Tuy nhiên mọi thứ có thể sớm thay đổi.', 2);

insert article(id_cat, id_cat2, title, date_post, image, image2, abstract, content, status)
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
			</p>', 2);

insert article(id_cat, id_cat2, title, date_post, image, image2, abstract, content, status) 
value(5, 7,'LMHT: Đội hình full đóng lồng cực thốn trong Liên Minh Huyền Thoại','2019-06-16','http://genknews.genkcdn.vn/zoom/260_162/2019/6/16/photo-4-15606918440322131050150.jpg',
'https://genknews.genkcdn.vn/2019/6/16/photo-4-15606918440322131050150.jpg',
'Một đội hình vui vẻ để bạn trải nghiệm cùng bạn bè nhưng không kém phần ức chế dành cho team địch.', 
'<h2 data-field="sapo">Một đội h&igrave;nh vui vẻ để bạn trải nghiệm c&ugrave;ng bạn b&egrave; nhưng kh&ocirc;ng k&eacute;m phần ức chế d&agrave;nh cho team địch.</h2>
<div data-check-position="gamek_detail_position_start">&nbsp;</div>
<div class="rightdetail_content" data-field="body">
<p>Bạn muốn khiến kẻ địch khốn đốn trong mọi giao tranh? Bạn muốn b&aacute;n h&agrave;nh trong cả trận đấu? H&atilde;y thử đội h&igrave;nh nhốt team địch đến chết sau đ&acirc;y.</p>
<p><strong>Camille</strong></p>
<p>Camille sẽ l&agrave; c&aacute;i lồng đầu ti&ecirc;n trong đội h&igrave;nh n&agrave;y với nhiệm vụ nhốt c&aacute;c mục ti&ecirc;u quan trọng trong đội h&igrave;nh đối phương v&agrave;o cho đồng đội nh&agrave;o tới "l&agrave;m thịt". Trong thời điểm hiện tại, c&ocirc; n&agrave;ng l&agrave; một tướng đường tr&ecirc;n kh&aacute; ổn với khả năng đi được với nhiều k&egrave;o đấu v&agrave; c&oacute; thể trụ đường tốt trong trường hợp gặp k&egrave;o bất lợi. Kết hợp với Jarvan IV, Camille sẽ rất dễ d&agrave;ng lăn cầu tuyết nhờ khả năng dồn khống chế đơn giản của m&igrave;nh. Chỉ cần v&agrave;i lần hỏi thăm l&agrave; c&ocirc; n&agrave;ng n&agrave;y ho&agrave;n to&agrave;n c&oacute; thể chơi tr&ecirc;n đầu tr&ecirc;n cổ đối thủ rồi.</p>
<div class="VCSortableInPreviewMode noCaption">
<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/16/photo-1-15606918411211435535858.jpg" target="_blank" data-fancybox-group="img-lightbox"><img id="img_f0db7d50-903a-11e9-b3ee-d9422bf87fe7" class="lightbox-content gif-content" title="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 1." src="https://genknews.genkcdn.vn/thumb_w/640/2019/6/16/photo-1-15606918411211435535858.jpg" alt="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 1." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/16/photo-1-15606918411211435535858.jpg" /></a></div>
<div class="PhotoCMS_Caption">&nbsp;</div>
</div>
<p>M&agrave; một khi đ&atilde; lăn cầu tuyết, đ&acirc;y l&agrave; một vị tướng m&agrave; kh&ocirc;ng đường giữa hay xạ thủ n&agrave;o muốn gặp phải v&igrave; khả năng khiến 3/4 b&igrave;nh m&aacute;u bay m&agrave;u với s&aacute;t thương chuẩn. Nhưng trong trường hợp gặp k&egrave;o tr&ecirc;n, nếu kh&ocirc;ng biết đ&aacute;nh th&igrave; Camille rất dễ biến th&agrave;nh ATM của đối phương. Do đ&oacute; c&ocirc; n&agrave;ng n&agrave;y sẽ cần sự chăm s&oacute;c tận t&igrave;nh từ người đi rừng.</p>
<p><strong>Jarvan IV</strong></p>
<p>Khả năng đ&oacute;ng lồng của vị tướng n&agrave;y th&igrave; quả thực l&agrave; miễn b&agrave;n rồi, mỗi lần &uacute;p ai cũng đồng nghĩa với việc c&oacute; người nằm xuống hoặc bắt buộc phải tốc biến. V&agrave; c&ograve;n g&igrave; th&iacute;ch th&uacute; hơn khi m&agrave; đường n&agrave;o cũng c&oacute; khống chế cứng. Đ&atilde; vậy lại c&ograve;n thuộc dạng dễ sử dụng nữa chứ. Trong đội h&igrave;nh n&agrave;y, Jarvan IV c&oacute; thể l&ecirc;n kiểu đỡ đ&ograve;n hoặc thậm ch&iacute; l&agrave; full s&aacute;t thương t&ugrave;y v&agrave;o t&igrave;nh h&igrave;nh của trận đấu. Mặc d&ugrave; c&oacute; bị giảm sức mạnh một ch&uacute;t nhưng đừng khinh thường Jarvan IV nh&eacute;. Điều đ&aacute;ng lưu &yacute; l&agrave; phải &uacute;p lồng v&agrave;o mục ti&ecirc;u quan trọng để đồng đội c&oacute; thể dồn s&aacute;t thương đồng thời đợi tr&uacute;ng khống chế rồi hẵng combo để dồn.</p>
<div class="VCSortableInPreviewMode noCaption">
<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/16/photo-1-15606918440291586523012.jpg" target="_blank" data-fancybox-group="img-lightbox"><img id="img_f2b98c20-903a-11e9-b0c6-8f292a4123a0" class="lightbox-content gif-content" title="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 2." src="https://genknews.genkcdn.vn/thumb_w/640/2019/6/16/photo-1-15606918440291586523012.jpg" alt="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 2." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/16/photo-1-15606918440291586523012.jpg" /></a></div>
<div class="PhotoCMS_Caption">&nbsp;</div>
</div>
<p><strong>Veigar</strong></p>
<p>Veigar sẽ l&agrave; người đ&oacute;ng lồng cuối c&ugrave;ng v&agrave; cũng l&agrave; vị tướng đặt dấu chấm hết cho c&aacute;c nạn nh&acirc;n. Giai đoạn đầu trận, Veigar c&oacute; lẽ sẽ hơi yếu một ch&uacute;t nhưng với sự trợ gi&uacute;p từ Jarvan IV, ph&aacute;p sư hắc &aacute;m n&agrave;y sẽ c&oacute; thể lăn cầu tuyết cực kỳ nhanh ch&oacute;ng. May ra đ&aacute;nh Zed th&igrave; c&ograve;n c&oacute; cửa chạy trốn chứ vớ phải c&aacute;c tướng lướt lướt như đấng th&igrave; đ&uacute;ng l&agrave; vui miễn b&agrave;n. C&ugrave;ng với Kai&rsquo;Sa, Veigar sẽ đ&oacute;ng vai tr&ograve; l&agrave; nguồn s&aacute;t thương ch&iacute;nh của đội. Nhờ v&agrave;o c&aacute;c hiệu ứng khống chế, việc dồn kỹ năng sẽ trở n&ecirc;n đơn giản hơn v&agrave; hắn c&oacute; thể t&iacute;ch cộng dồn&nbsp;<strong>Sức Mạnh Quỷ Quyệt&nbsp;</strong>nhanh ch&oacute;ng.</p>
<div id="admzone508553" class="wp100 mt-10">&nbsp;</div>
<div class="VCSortableInPreviewMode noCaption">
<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/16/photo-2-15606918440302127591989.jpg" target="_blank" data-fancybox-group="img-lightbox"><img id="img_f283fd30-903a-11e9-bb97-6d115d1f27d6" class="lightbox-content gif-content" title="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 3." src="https://genknews.genkcdn.vn/thumb_w/640/2019/6/16/photo-2-15606918440302127591989.jpg" alt="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 3." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/16/photo-2-15606918440302127591989.jpg" /></a></div>
<div class="PhotoCMS_Caption">&nbsp;</div>
</div>
<p>Veigar kị nhất l&agrave; gặp tướng cơ động v&agrave; s&aacute;t thủ. Ở k&egrave;o h&ograve;a đường, c&agrave;ng đ&aacute;nh vị tướng n&agrave;y sẽ c&agrave;ng khỏe. Nhưng với c&aacute;c tướng cơ động, Veigar sẽ dễ bị lừa mất&nbsp;<strong>Bẻ Cong Kh&ocirc;ng Gian (E)</strong><strong>&nbsp;</strong>rồi trở th&agrave;nh miếng mồi ngon trong thời gian kỹ năng n&agrave;y chưa hồi. Do đ&oacute; người sử dụng Veigar cần phải c&oacute; c&aacute;i đầu b&igrave;nh tĩnh hoặc được chăm s&oacute;c tận t&igrave;nh từ người đi rừng. Ngậm đắng nuốt cay trong giai đoạn đầu trận l&agrave; ổn nhất v&igrave; c&agrave;ng đ&aacute;nh, Veigar sẽ c&agrave;ng khỏe.</p>
<p><strong>Kai&rsquo;Sa</strong></p>
<p>Như đ&atilde; n&oacute;i ở tr&ecirc;n, Kai&rsquo;Sa sẽ l&agrave; một trong hai nguồn s&aacute;t thương ch&iacute;nh của đội h&igrave;nh "đ&oacute;ng lồng" b&ecirc;n cạnh Veigar. C&oacute; một thứ m&agrave; Kai&rsquo;Sa rất th&iacute;ch, đ&oacute; ch&iacute;nh l&agrave; đồng đội c&oacute; hiệu ứng khống chế do n&oacute; gi&uacute;p c&ocirc; n&agrave;ng n&agrave;y c&oacute; thể thoải m&aacute;i bay nhảy trong giao tranh với chi&ecirc;u cuối của m&igrave;nh. Hoặc đơn giản l&agrave; l&agrave;m c&aacute;c pha gank bất ngờ bằng chi&ecirc;u cuối. Đi c&ugrave;ng với Zyra, Kai&rsquo;Sa sẽ c&oacute; thể đ&aacute;nh rất hổ b&aacute;o nhờ khả năng kiểm so&aacute;t đường của Gai Nổi Loạn. Bộ đ&ocirc;i n&agrave;y sẽ gần như kh&ocirc;ng phải ngại k&egrave;o n&agrave;o v&agrave; c&oacute; thể đi từ h&ograve;a đến thắng nếu c&oacute; sự trợ gi&uacute;p từ rừng.</p>
<div class="VCSortableInPreviewMode active noCaption">
<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/16/photo-3-1560691844031243601479.jpg" target="_blank" data-fancybox-group="img-lightbox"><img id="img_f24cc090-903a-11e9-b3ee-d9422bf87fe7" class="lightbox-content gif-content" title="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 4." src="https://genknews.genkcdn.vn/thumb_w/640/2019/6/16/photo-3-1560691844031243601479.jpg" alt="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 4." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/16/photo-3-1560691844031243601479.jpg" /></a></div>
<div class="PhotoCMS_Caption">&nbsp;</div>
</div>
<p>Trong trường hợp gặp đội h&igrave;nh nhiều s&aacute;t thủ, đấu sĩ lao v&agrave;o, Kai&rsquo;Sa cũng sẽ kh&ocirc;ng phải sợ v&igrave; lượng khống chế từ đội h&igrave;nh n&agrave;y l&agrave; qu&aacute; đủ để giữ c&ocirc; n&agrave;ng bắn từ đầu đến cuối giao tranh.</p>
<p><strong>Zyra</strong></p>
<p>Tại sao lại chọn Zyra v&agrave;o trong đội h&igrave;nh n&agrave;y? đ&oacute; ch&iacute;nh l&agrave; v&igrave; khả năng dồn khống chế diện rộng của c&ocirc; n&agrave;ng. Với&nbsp;Tối Hậu Thư (R), Đại Địa Chấn (R)&nbsp;v&agrave;&nbsp;Bẻ Cong Kh&ocirc;ng Gian (E),&nbsp;Rễ C&acirc;y Tr&oacute;i Buộc (E)&nbsp;của Zyra sẽ c&oacute; thể tr&uacute;ng nhiều mục ti&ecirc;u hơn. Mở đường cho&nbsp;Bụi Gai Kỳ Dị (R)&nbsp;c&oacute; thể hất tung v&ocirc; số người. Đ&atilde; vậy, tầm t&aacute;c dụng của&nbsp;Bụi Gai Kỳ Dị (R)&nbsp;lại c&ograve;n to hơn cả&nbsp;Tối Hậu Thư (R)&nbsp;n&ecirc;n mỗi lần combo cả hai, sẽ chẳng kh&aacute;c g&igrave; bộ đ&ocirc;i Camille-Galio nổi tiếng cả, thậm ch&iacute; n&oacute; c&ograve;n khủng khiếp v&agrave; nhiều s&aacute;t thương hơn.</p>
<div class="VCSortableInPreviewMode active noCaption">
<div><a class="detail-img-lightbox" title="" href="https://genknews.genkcdn.vn/2019/6/16/photo-4-15606918440322131050150.jpg" target="_blank" data-fancybox-group="img-lightbox"><img id="img_f2a6ee80-903a-11e9-a850-f119d3f9e9bd" class="lightbox-content gif-content" title="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 5." src="https://genknews.genkcdn.vn/thumb_w/640/2019/6/16/photo-4-15606918440322131050150.jpg" alt="LMHT: Đội h&igrave;nh full đ&oacute;ng lồng cực thốn trong Li&ecirc;n Minh Huyền Thoại - Ảnh 5." width="" height="" data-original="https://genknews.genkcdn.vn/2019/6/16/photo-4-15606918440322131050150.jpg" /></a></div>
<div class="PhotoCMS_Caption">&nbsp;</div>
</div>
<p>Nếu gặp k&egrave;o bất lợi hoặc giao tranh sai lầm th&igrave; bộ đ&ocirc;i Kai&rsquo;Sa-Zyra cũng kh&oacute; bị &eacute;p trụ hơn do khả năng dọn l&iacute;nh của cả hai. B&ecirc;n cạnh đ&oacute;, nhỡ m&agrave; gặp c&aacute;c tướng k&eacute;o th&igrave; c&aacute;c mầm c&acirc;y của Zyra sẽ c&oacute; thể thoải m&aacute;i chắn ch&uacute;ng. Bất lợi nhất c&oacute; lẽ l&agrave; khi gặp c&aacute;c k&egrave;o dồn hiệu ứng khống chế từ xa hoặc dồn thẳng v&agrave;o đầu. Trong trường hợp n&agrave;y th&igrave; cần nhờ đến Jarvan IV rồi.</p>
</div>', 2); 
insert comment(id_art, date_comment,image_reader,name_reader,content)
value(1, '2019-05-25','/images/avatar.jpg','Sơn Hứa','Bài viết khá hay!');	


-- drop table tag_article;
-- drop table tag;
-- drop table writer;
-- drop table editor;
-- drop table user;
-- drop table comment;
-- drop table usertype;
-- drop table article;
-- drop table category2;
-- drop table category;
-- drop table status;
-- drop table account;


