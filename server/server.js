var Twit = require('twit');
var mongo = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;
var assert = require('assert');
var count = 0;

var fruits = ["http://stories.unhcr.org/hoseins-story-greece-p13163.html", "http://stories.unhcr.org/darrins-story-malta-p57769.html", "http://stories.unhcr.org/boglarka-balogh-journalist-p3845.html", "http://stories.unhcr.org/ahmets-story-cyprus-p52234.html"];
fLen = fruits.length;
text = "";
for (i = 0; i < fLen; i++) {
    text += fruits[i] + "\n";
}
var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  url = require('url'),
  SerialPort = require('serialport').SerialPort,
  // initialize serialport using the /dev/cu.usbmodem1411 serial port
  // remember to change this string if your arduino is using a different serial port
  sp = new SerialPort('/dev/cu.usbmodem1421', {
    baudRate: 115200
  }),
  // this var will contain the message string dispatched by arduino
  arduinoMessage = '',
  /**
   * helper function to load any app file required by client.html
   * @param  { String } pathname: path of the file requested to the nodejs server
   * @param  { Object } res: http://nodejs.org/api/http.html#http_class_http_serverresponse
   */
  readFile = function(pathname, res) {
    // an empty path returns client.html
    if (pathname === '/')
      pathname = 'client.html';

    fs.readFile('/Users/Neeraj/code/temp/nodejs-arduino-example/client/' + pathname, function(err, data) {
      if (err) {
        console.log(err);
        res.writeHead(500);
        return res.end('Error loading client.html');
      }
      res.writeHead(200);
      res.end(data);
    });
  },
  /**
   *
   * This function is used as proxy to print the arduino messages into the nodejs console and on the page
   * @param  { Buffer } buffer: buffer data sent via serialport
   * @param  { Object } socket: it's the socket.io instance managing the connections with the client.html page
   *
   */
  sendMessage = function(buffer, socket) {
    // concatenating the string buffers sent via usb port
    arduinoMessage += buffer.toString();

    // detecting the end of the string
    if (arduinoMessage.indexOf('\r') >= 0) {
      // log the message into the terminal
      // console.log(arduinoMessage);
      // send the message to the client
      socket.volatile.emit('notification', arduinoMessage);
      // reset the output string to an empty value
      arduinoMessage = '';
    }
  };

      text = fruits[0] + "\n";





  var T = new Twit({  // You need to setup your own twitter configuration here!
  access_token:"106980751-yJqMfncvPDjaFdHHSOcXV3k5VHR3etGuTsG3cwXk",
  access_token_secret:"UApghZ6EcT0x2U0FY4ozeyEDIzMc465RDIBqeK8yR53ln",
  consumer_key:"UW8VTaIGNXNVfPghG4Ln0GMgI",
  consumer_secret:"L7rBv7OSWDVgVA9cVptRehhOtKzTwI1o4p6U1wFqU4BopxZK9E"
});

T.post('statuses/update', { status: text });

var stream = T.stream('statuses/filter', {  track: 'flighttofreedom' });
stream.on('error',function(error){
  console.log(error);
});
// stream.on('limit', function (limitMessage) {
//   console.log("Limit:"+JSON.stringify(limitMessage));
// });
stream.on('tweet', function (tweet) {
  count++;
  var nameID = tweet.id_str;
  
text = fruits[1]+''
 text =  text.concat(' ');

var name = tweet.user.screen_name;
// sp.write('on' + '\r', function() {
  console.log(tweet.text);
        console.log(count);

          sp.write('A');
           sp.write('junk');
            sp.write('on' + '\r');

            var b64content = fs.readFileSync('/Users/Neeraj/Desktop/refugee2.jpg', { encoding: 'base64' })

    // Upload the media
    T.post('media/upload', { media_data: b64content }, uploaded);

    function uploaded(err, data, response) {

      // Now we can reference the media and post a tweet
      // with the media attached
      var mediaIdStr = data.media_id_string;
      var params = { status: '#fuckthis', media_ids: [mediaIdStr] }

        var replyText = '@'+name + ' '+text;
          T.post('statuses/update', { status: replyText, in_reply_to_status_id: nameID});

      // Post tweet
      //T.post('statuses/update', {in_reply_to_status_id: nameID, status:'@' + name + ' ' +text});
    };


  
  // if (count%3 == 0) {
  //     sp.write('B');
  //     console.log(count);
  //     console.log('written');
  // }
  // else {
  // }
 
  if ((tweet.text.indexOf("camp") !== -1)) {
    sp.write('B');  
       console.log(true); }





//   var url = 'mongodb://localhost:27017/test';
//     var resultArray = [];

// mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     var cursor = db.collection('user-data').find();
//     cursor.forEach(function(doc, err) {
//       assert.equal(null, err);
//       resultArray.push(doc);
//       console.log(resultArray);
//     }, function() {
//       db.close();
//     });
//   });

//  mongo.connect(url, function(err, db) {
//     assert.equal(null, err);
//     db.collection('user-data').insertOne(tweet, function(err, result) {
//       assert.equal(null, err);
//       console.log('Item inserted');
//       db.close();
//     });
//   });

 


      // console.log(tweet.text.indexOf("trump") !== -1);
      // if ((tweet.text.indexOf("trump") !== -1)) {
      //   console.log("hello");
      // }
     
// }); 
 });


// // creating a new websocket
// io.sockets.on('connection', function(socket) {
//   // listen all the serial port messages sent from arduino and passing them to the proxy function sendMessage
//   sp.on('data', function(data) {
//     sendMessage(data, socket);
//   });
//   // listen all the websocket "lightStatus" messages coming from the client.html page
//   socket.on('lightStatus', function(lightStatus) {
//     sp.write(lightStatus + '\r', function() {
//       // log the light status into the terminal
//       console.log('the light should be: ' + lightStatus);
//     });
//   });
// });

// just some debug listeners
sp.on('close', function(err) {
  console.log('Port closed!');
});

sp.on('error', function(err) {
  console.error('error', err);
});

sp.on('open', function() {
  console.log('Port opened!');
});


// L3T'S R0CK!!!
// creating the server ( localhost:8000 )
app.listen(8000);
// server handler
function handler(req, res) {
  readFile(url.parse(req.url).pathname, res);
}