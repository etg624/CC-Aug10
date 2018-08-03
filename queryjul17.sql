create table distribution_list (ListID varchar(50),
ListName tinytext);

create table distribution_list_member (
MemberID varchar(9), ListID varchar(50), LastName varchar(60), FirstName varchar(30), EmailAddress varchar(30), NotificationNumber varchar(50), ListName tinytext);

