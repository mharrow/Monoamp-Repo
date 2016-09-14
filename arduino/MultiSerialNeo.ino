/*
  Udoo Neo multple serial port

 Receives from the main Serial port, sends to Serial0
 Receives from Serial0, sends to the main Serial.
 Serial = /dev/ttyMCC
 Serial0 RX - J4 pin 0
 Serial0 TX - J4 pin 1
 */


void setup() {
  // initialize both serial ports:
  Serial.begin(115200);
  Serial0.begin(9600);
}

void loop() {
  // read from port 1, send to port 0:
  if (Serial0.available()) {
    int inByte = Serial0.read();
    Serial.write(inByte);
  }

  // read from port 0, send to port 1:
  if (Serial.available()) {
    int inByte = Serial.read();
    Serial0.write(inByte);
  }
}
