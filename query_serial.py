# send ?12<cr> query to Monoprice Audio Distributions amp
# receive data into array rx_data
import serial
import time
import sys
import json
	
ser = serial.Serial('/dev/ttyMCC',115200,timeout=1)
ser.flushOutput()
ser.flushInput()
tx_data = sys.argv[1]

#TODO: Handle read of two command types
tx_data = (tx_data + chr(13))

ser.write(tx_data)
time.sleep(0.1)

rx_data = ""
hashtag = 0

while (hashtag != 2):
	for c in ser.read():
		if (c > (chr(13))):
			rx_data += c
		if c == '#':
			hashtag += 1
				
ser.close()

print rx_data

      
    

