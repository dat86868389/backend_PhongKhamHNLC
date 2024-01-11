-- Thêm bản ghi Role mặc định 
insert into `Role`(Name, Description)
select 'Admin', 'Vai trò quản trị viên'
where not exists (
	select 1 
	from `Role`
	where Name = 'Admin'
);

-- Thêm bản ghi User admin với tài khoản admin, mật khẩu 123
insert into `User`(RoleId, Name, Account, HashPassword, Status, IsDeleted)
select 1, 'Quản trị viên', 'admin', '202cb962ac59075b964b07152d234b70', 1, 0
where not exists (
	select 1 
	from `User`
	where Account = 'admin'
);