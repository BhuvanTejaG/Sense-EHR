var accountSID = 'ACc4b4091f730e4aa5b1dd1881ceb5cba3';
var authToken = '3d216bd3a519e1420943c8c453a9f58a';
var client = require('twilio')(accountSID,authToken);

module.exports.sendMessage = function(message,number) {
	console.log(number+" "+message);
    client.sendMessage({
        to: '+1'+number,
        from: '+16572328966',
        body: message
    },function(err, data) {
        if(err) {
            console.log("Entered into failure twilio");
            console.log(err);
        } else {
            console.log("Entered into success twilio");
            console.log(data);
        }
    })
}