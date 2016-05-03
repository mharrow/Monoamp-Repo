import time
import sys
import MySQLdb

def main():
	# argv[1] madAmp database function request
	db_data = sys.argv[1]

	# check if first character in argv is command symbol < set status
	if ((db_data[0]) == "<"):
		cmd_status = 1
	else:
		cmd_status = 0
	
	# pass d_data and cmd_status to database driver return with response
	resp_data = my_sql_driver(db_data,cmd_status)
		
	# print response to console or Server - whomever called the program
	print resp_data
	
	
def my_sql_driver(my_sql_data, status_cmd):
		
	if status_cmd == 1:	# this is a database modify command - simulate RS232 Control command
		address = my_sql_data[1:3]
		control_function = my_sql_data[3:5]
		new_value = my_sql_data[5:]
		
		my_sql_update(address, control_function, new_value)
				
	address = my_sql_data[1:3]
	query_resp = my_sql_query(address)
	
	return query_resp


def my_sql_update(address,control_function,new_value):
	# Open database connection
	db = MySQLdb.connect("localhost","root","udooer","rs232sim")

	# prepare a cursor object using cursor() method
	cursor = db.cursor()
	
	# execute SQL update
	sql = "update rs232sim.zones set {} = {} where AD = {}".format(control_function, new_value, address)
	
	cursor.execute(sql)
	
	# commit changes in database
	db.commit()
	return

def my_sql_query(address):

	# Open database connection
	db = MySQLdb.connect("localhost","root","udooer","rs232sim")

	# prepare a cursor object using cursor() method
	cursor = db.cursor()

	# execute SQL query using execute() method
	cursor.execute("SELECT * from zones where AD = %s",(address))
	
	# Fetch all rows using fetchall() method
	results = cursor.fetchall()
	
	# disconnect from server
	db.close()
	
	# assign multiple variables to tuple results[0]
	AD,PA,PR,MU,DT,VO,TR,BS,BL,CH,KP,index = results[0]
	
	# create response string - RS232 comm returns one string with all settings 
	query_resp = "?"+address+"#>"+str(AD).zfill(2)+str(PA).zfill(2)+str(PR).zfill(2)+\
		str(MU).zfill(2)+str(DT).zfill(2)+str(VO).zfill(2)+str(TR).zfill(2)+str(BS).zfill(2)+\
		str(BL).zfill(2)+str(CH).zfill(2)+str(KP).zfill(2)+"#"+chr(13)
	
	return query_resp

		
if __name__ == '__main__':
	main()				
