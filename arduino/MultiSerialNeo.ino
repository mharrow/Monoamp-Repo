/*
  Udoo Neo multple serial port

 Create comm link between Internal A9/M4 port to External Serial Port
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
  // read from Serial0, send to A9/M4 Serial
  if (Serial0.available()) {
    int inByte = Serial0.read();
    Serial.write(inByte);
  }

  // read from A9/M4 Serial, send to Serial0
  if (Serial.available()) {
    int inByte = Serial.read();
    Serial0.write(inByte);
  }
}
