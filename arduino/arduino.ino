// pin of the button connected to the arduino board
const int buttonPin = 7;
// pin of the led light
// it's actually also the default arduino debug light
const int ledPin = 13;

// simple variables used to store the led and the button statuses
String buttonStatus = "off";
String ledStatus = "off";

unsigned long current = 0;
unsigned long prev = 0;
unsigned long startMillis = 0;


unsigned long start = 0;

unsigned long curr = 0;

unsigned long pr = 0;


// it will hold all the messages coming from the nodejs server
String inputString = "";

// whether the string received form nodejs is complete
// a string is considered complete by the carriage return '\r'
boolean stringComplete = false;

boolean twitter = false;

unsigned long previousMillis = 0;
const long interval = 1000;           // interval at which to blink (milliseconds)
// will store last time LED was updated

// it will hold all the messages coming from the nodejs server
boolean direction = false;
int speed = 50;
int speed1 = 50;

// whether the string received form nodejs is complete
// a string is considered complete by the carriage return '\r'
unsigned long startmillis;
const int motor1Pin = 13;    // H-bridge leg 1 (pin 2, 1A)
const int motor2Pin = 2;    // H-bridge leg 2 (pin 7, 2A)
const int enablePin = 3;

const int motor1Pin1 = 4;    // H-bridge leg 1 (pin 2, 1A)
const int motor2Pin1 = 5;    // H-bridge leg 2 (pin 7, 2A)
const int enablePin1 = 6;

const int motor1Pin2 = 7;    // H-bridge leg 1 (pin 2, 1A)
const int motor2Pin2 = 8;    // H-bridge leg 2 (pin 7, 2A)
const int enablePin2 = 9;

const int motor1Pin3 = 11;    // H-bridge leg 1 (pin 2, 1A)
const int motor2Pin3 = 12;    // H-bridge leg 2 (pin 7, 2A)
const int enablePin3 = 10;
/**

   arduino board setup

*/

void setup()
{
  // set the Baud Rate
  Serial.begin(115200);
  // set the input pin
  pinMode(buttonPin, INPUT);
  // initialize the LED pin as an output:
  pinMode(ledPin, OUTPUT);


  Serial.begin(115200);
  pinMode(13, OUTPUT);


  startmillis = millis();

  // set all the other pins you're using as outputs:
  pinMode(motor1Pin, OUTPUT);
  pinMode(motor2Pin, OUTPUT);
  pinMode(enablePin, OUTPUT);

  pinMode(motor1Pin1, OUTPUT);
  pinMode(motor2Pin1, OUTPUT);
  pinMode(enablePin1, OUTPUT);



  pinMode(motor1Pin2, OUTPUT);
  pinMode(motor2Pin2, OUTPUT);
  pinMode(enablePin2, OUTPUT);


  pinMode(motor1Pin3, OUTPUT);
  pinMode(motor2Pin3, OUTPUT);
  pinMode(enablePin3, OUTPUT);

}

/**

   Default arduino loop function
   it runs over and over again

*/

void loop()
{
  current = millis();

if (!twitter) {
  if ( current- start  < 8000 ) {
    motion5();
  }

   if (current- start > 8000 && current- start <16000 ) {
    motion4();
  }

   if (current- start > 15000 && current- start <21000  ) {
    motion6();
  }
  if (current- start > 12000) {
    start = millis();
  }

 
}
 if (current - prev > 10000) {
    twitter = false;
    
  }
  if (Serial.available()) { // only send data back if data has been sent
    char inChar = (char)Serial.read();


    if (inChar == 'A') {
//      digitalWrite(13, HIGH);
      inputString = "";
      prev = millis();
      twitter = true;


      Serial.flush();
    }


  }
 

  if (twitter) {
    motion1();
  }
}




void motion1(){
    unsigned long currentMillis = millis();

if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (direction == false) {
      setMotor(speed, true, 1);
      setMotor(speed, true, 3);
      setMotor(speed, true, 4);
        setMotor(speed, true, 2);


      

      direction = true;
    } else {
      setMotor(speed, false, 1);
      setMotor(speed, false, 3);
      setMotor(speed, false, 4);       
      setMotor(speed, false, 2);

      direction = false;

      if (currentMillis - startmillis > 6500) {
      }
    }

    // set the LED with the ledState of the variable:
  }
  
}

void motion4(){
    unsigned long currentMillis = millis();

if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (direction == false) {
      setMotor(speed, true, 1);
      


      

      direction = true;
    } else {
      setMotor(speed, false, 1);
  

      direction = false;

      if (currentMillis - startmillis > 6500) {
      }
    }

    // set the LED with the ledState of the variable:
  }
  
}
void motion5(){
    unsigned long currentMillis = millis();

if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (direction == false) {
      
        setMotor(speed, true, 2);


      

      direction = true;
    } else {
      
      setMotor(speed, false, 2);

      direction = false;

      if (currentMillis - startmillis > 6500) {
      }
    }

    // set the LED with the ledState of the variable:
  }
  
}
void motion6(){
    unsigned long currentMillis = millis();

if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (direction == false) {
      setMotor(speed, true, 3);
     


      

      direction = true;
    } else {
      setMotor(speed, false, 3);
    

      direction = false;

      if (currentMillis - startmillis > 6500) {
      }
    }

    // set the LED with the ledState of the variable:
  }
  
}
void motion2(){
    unsigned long currentMillis = millis();

if (currentMillis - previousMillis >= interval) {
    // save the last time you blinked the LED
    previousMillis = currentMillis;

    // if the LED is off turn it on and vice-versa:
    if (direction == false) {
      setMotor(speed1, true, 1);
      setMotor(speed1, true, 3);
      setMotor(speed1, true, 4);
        setMotor(speed1, true, 2);


      

      direction = true;
    } else {
      setMotor(speed1, false, 1);
      setMotor(speed1, false, 3);
      setMotor(speed1, false, 4);       
      setMotor(speed1, false, 2);

      direction = false;

      if (currentMillis - startmillis > 6500) {
      }
    }

    // set the LED with the ledState of the variable:
  }
  
}
void setMotor(int speed, boolean reverse, int motor_number)
{
  if (motor_number == 1) {
    analogWrite(enablePin, speed);
    digitalWrite(motor1Pin, ! reverse);
    digitalWrite(motor2Pin, reverse);
  }

  if (motor_number == 2) {
    analogWrite(enablePin1, speed);
    digitalWrite(motor1Pin1, ! reverse);
    digitalWrite(motor2Pin1, reverse);
  }
  if (motor_number == 3) {
    analogWrite(enablePin2, speed);
    digitalWrite(motor1Pin2, ! reverse);
    digitalWrite(motor2Pin2, reverse);
  }
  if (motor_number == 4) {
    analogWrite(enablePin3, speed);
    digitalWrite(motor1Pin3, ! reverse);
    digitalWrite(motor2Pin3, reverse);
  }
}
