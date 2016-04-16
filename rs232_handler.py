import serial
import time
import sys


def main():
	# argv[1] data to transmit  to RS232 MAD amp
	tx_data = sys.argv[1]

	# attach carriage return as command terminator
	tx_data = (tx_data + chr(13))
	
	# check if first character in argv is command symbol < set status
	if ((tx_data[0]) == "<"):
		cmd_status = 1
	else:
		cmd_status = 0
	
	# pass tx_data and cmd_status to Serial Port return with response
	rx_data = rs232_driver(tx_data,cmd_status)
		
	# print response to console or Server - whomever called the program
	print rx_data
	

def rs232_driver(data_to_tx, status_cmd):
	
	# create data_buffer to receive RS232 string from MAD amp
	data_buffer = ''
	
	ser = serial.Serial('/dev/ttyMCC',115200,timeout=1)
	ser.flushOutput()
	ser.flushInput()

	# status_cmd == 0 then query else cmd == 1 send control command then query
	# hashtag and target_count setup loop to receive expected length of response
	# sleep time required between write(transmit) and read(receive)
	if status_cmd == 0:
		hashtag = 0
		target_count = 2
		ser.write(data_to_tx)
		time.sleep(0.08)
	
		while (hashtag != target_count):
			for c in ser.read():
				if (c > (chr(13))):
					data_buffer += c
				if c == '#':
					hashtag += 1
					
		ser.close()
					
		return data_buffer
	else:
		target_count = 1
		hashtag = 0
		ser.write(data_to_tx)
		time.sleep(0.08)
		
		while (hashtag != target_count):
			for c in ser.read():
				if (c > (chr(13))):
					data_buffer += c
				if c == '#':
					hashtag += 1
		
		# delete the buffer then recreate buffer pointing to null
		del data_buffer
		data_buffer = ''
		
		hashtag = 0
		target_count = 2
		
		# generate query_cmd from original data_to_tx
		query_cmd = ''.join(['?', data_to_tx[1:3], chr(13)])
		
		ser.write(query_cmd)
		time.sleep(0.08)
		
		while (hashtag != target_count):
			for c in ser.read():
				if (c > (chr(13))):
					data_buffer += c
				if c == '#':
					hashtag += 1
					
		ser.close()
					
		return data_buffer

	
if __name__ == '__main__':
	main()
