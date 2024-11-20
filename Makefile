DB_NAME=fullstackopen-13

connect-db:
	flyctl postgres connect -a $(DB_NAME)
