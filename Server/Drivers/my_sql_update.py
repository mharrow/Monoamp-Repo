import time
import sys
import MySQLdb

def main():
	# argv[1] madAmp database function request
	table = sys.argv[1]
	field = sys.argv[2]
	field_value = sys.argv[3]
	pk = sys.argv[4]
	pk_value = sys.argv[5]
	
	my_sql_update(table, field, field_value, pk, pk_value)
		 		
	# pass data to database query driver
	resp = my_sql_query(table,pk,pk_value)
		
	# print response to console or Server - whomever called the program
	print resp


def my_sql_update(table, field, field_value, pk, pk_value):
	# Open database connection
	db = MySQLdb.connect("localhost","root","udooer","madAmp")

	# prepare a cursor object
	cursor = db.cursor()
	
	# Name change requires quotes for text
	if (field.endswith("Name")):
		sql = "UPDATE {} SET {} = '{}' WHERE {} = {}".format(table, field, field_value, pk, pk_value)
		
	# attributes requires quotes for control field value	
	elif (table == "attributes"):
		sql = "UPDATE `{}` SET `{}` = {} WHERE `{}` = '{}'".format(table, field, field_value, pk, pk_value)
		
	# numerical update no quotes required	
	else:
		sql = "UPDATE {} SET {} = {} WHERE {} = {}".format(table, field, field_value, pk, pk_value)
	
	cursor.execute(sql)
	
	# commit changes in database
	db.commit()
	db.close()
		
	return


def my_sql_query(table, pk, pk_value):

	# Open database connection
	db = MySQLdb.connect("localhost","root","udooer","madAmp")

	# prepare a cursor object using cursor() method
	cursor = db.cursor()
	
	# prep query command
	if (table == "attributes"):
		sql = "SELECT * FROM `{}` WHERE `{}` = '{}'".format(table, pk, pk_value)
	else:
		sql = "SELECT * FROM `{}` WHERE `{}` = {}".format(table, pk, pk_value)

	# execute SQL query using execute() method
	cursor.execute(sql)
	
	# Fetch all rows using fetchall() method
	results = cursor.fetchall()
	
	# disconnect from server
	db.close()
	
	if (table == "zones"):
		zoneName,unitAddress,positionAddress,activeStatus = results[0]
		query_resp = table,zoneName,unitAddress,positionAddress,activeStatus
		
	elif (table == "sources"):
		sourceName,unitAddress,positionAddress = results[0]
		query_resp = table,sourceName,unitAddress,positionAddress
		
	else:
		control,visibleStatus,displayName,upIcon,downIcon,minvalue,maxvalue,typerange,offset = results[0]
		query_resp = table,control,visibleStatus,displayName,upIcon,downIcon,minvalue,maxvalue,typerange,offset
	
	return	query_resp


if __name__ == '__main__':
	main()				
