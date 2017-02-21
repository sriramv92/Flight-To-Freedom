var Twit = require('twit');

var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    assert = require('assert')
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true});
db = new Db('twitterstream', server);
var a = 'love';
var b = 'hate';

var T = new Twit({  // You need to setup your own twitter configuration here!
  access_token:"106980751-yJqMfncvPDjaFdHHSOcXV3k5VHR3etGuTsG3cwXk",
  access_token_secret:"UApghZ6EcT0x2U0FY4ozeyEDIzMc465RDIBqeK8yR53ln",
  consumer_key:"UW8VTaIGNXNVfPghG4Ln0GMgI",
  consumer_secret:"L7rBv7OSWDVgVA9cVptRehhOtKzTwI1o4p6U1wFqU4BopxZK9E"
});

T.stream('statuses/filter', {
    track: 'refugee'
}, function (stream) {
     stream.on('data', function (data) {
    console.log(data);
    console.log("\n\n\n\n");
    db.tweets.findAndModify({
        query: {'id': 'data.id'},
        update: { $set: data},
        upsert: true,
        new: true
    })
});
});