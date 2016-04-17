# send data (tx_data) to Monoprice Audio Distributions amp (MAD amp)
# receive data into array rx_data
import serial
import time
import sys
import json
	
ser = serial.Serial('/dev/ttyMCC',115200,timeout=1)
ser.flushOutput()
ser.flushInput()

# argv[1] contains data to transmit RS232 to MAD amp
tx_data = sys.argv[1]

# attach carriage return as command terminator
tx_data = (tx_data + chr(13))

ser.write(tx_data)

time.sleep(0.1)

target_count = 0

# rx_data will contain RS232 receive string from MAD amp
rx_data = ""

# setup target count based on length of return response from MAD amp
if ((tx_data[0]) == "<"):
	target_count = 1
	
if ((tx_data[0]) == "?"):
	target_count = 2

if ("?10" in tx_data):
	target_count = 7
	
hashtag = 0

# hashtag character is at start of each line and marks end of string

while (hashtag != target_count):
	for c in ser.read():
		if (c > (chr(13))):
			rx_data += c
		if c == '#':
			hashtag += 1
				
ser.close()

# print rx_data to console or Server - whomever called the program
print rx_data

      
    

