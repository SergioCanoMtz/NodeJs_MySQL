create database database_link;

use database_link;

create table users(
    id int(11) not null primary key,
    username varchar(20) not null,
    password varchar(60) not null,
    fullname varchar(100) not null
)

alter table users
    modify id int(11) not null auto_increment, auto_increment = 2;

describe users;

--links table

create table link (
    id int(11) not null,
    title varchar(150) not null,
    url varchar(200) not null,
    description text,
    created_at timestamp not null default current_timestamp,
    user_id int(11),
    constraint fk_user foreign key (user_id) references users(id)
);

alter table link
    add primary key (id);

alter table link
    modify id int(11) not null auto_increment, auto_increment = 2;