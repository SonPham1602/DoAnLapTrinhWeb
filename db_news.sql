create table category(
	id mediumint not null auto_increment,
	name varchar(50) not null,
	primary key (id)
);

create table tag(
	id mediumint not null auto_increment,
    name varchar(50) not null,
    primary key (id)
);

create table article(
	id mediumint not null auto_increment,
	id_cat	mediumint not null,
    title varchar(100),
    date_post date,
	image varchar(50),
    abstract varchar(500),
    content varchar(1000),
    id_writer mediumint,
    status varchar(50),
    premium int default 0 check (premium = 0 or premium = 1),  
	primary key (id),
	foreign key (id_cat) references category(id)
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
    date_comt date,
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


-- insert into category(name) values('Moba');
-- insert into tag(name) values ('Game');
-- insert into tag(name) values('Music');
-- insert article(id_cat) value(1);
-- insert article(id_cat) value(1);

-- insert into tag_article(id_tag, id_art)
-- select tag.id, article.id from tag, article

-- drop table tag_article;
-- drop table tag;
-- drop table writer;
-- drop table user;
-- drop table account;
-- drop table comment;
-- drop table usertype;
-- drop table article;
-- drop table category;
