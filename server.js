var express     = require("express"),
    http         = require('http'),
    md5         = require('md5');

var app    = express();
var router = express.Router();


var port = 80;


/*
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

router.route('/data')
  .get(function(req, res) {
    console.log('Data post !');
    console.log(req.ip);
    res.json({ message: 'Data post !' });

  })
  .post(function(req, res) {
    console.log('Data post !');
    res.json({ message: 'Data post!' });
  });
app.use('/',express.static(__dirname + '/public/'));
app.use('/api', router);

*/


var appName       = 'HACKATON2016',
    pass          = 'hackATHon20!6CS',
    appUser       = 'reto1',
    sensorId      = 'SENSOR_HACKATHON',
    variableName  = 'temperatura';



/*
.addHeader("GG-Requester-Application", credentials.getApp())
.addHeader("GG-Request-Timestamp", currentTimestamp.toString())
.addHeader("GG-Request-Signature", md5String)
.addHeader("IOT-Authorized-User", credentials.getUser());



        String preToken = currentTimestamp + credentials.getSecret() + credentials.getApp();
       byte[] md5 = md5Generator.digest(preToken.getBytes());

*/



app.use('/',express.static(__dirname + '/public/'));


app.get('/data', function (req, res) {

  var currentTimestamp = new Date().getTime();
  var preToken = `${currentTimestamp}${pass}${appName}`;
  var hash = md5(preToken);
  console.log(currentTimestamp);
  console.log(preToken);
  console.log(hash);

  var options = {
      host: 'api.iotsens.com',
      path: `/v1/sensors/${sensorId}/variables/${variableName}/measures`,
      headers: {
        'GG-Requester-Application': appName,
        'GG-Request-Timestamp': currentTimestamp,
        'GG-Request-Signature': hash,
        'IOT-Authorized-User': appUser
      }
   };


   console.log(options.path);

  return http.get(options, function(response, callback ) {
       // Continuously update stream with data
       var body = '';
       response.on('data', function(d) {
           body += d;
       });
       response.on('end', function() {

           // Data reception is done, do whatever with it!
           var parsed = JSON.parse(body);
           //callback(parsed);
           //console.log(parsed);
           res.send(parsed);
           //res.send(body);
       });
       response.on('error', function(e){
         console.log(`error $e`);
       });
     });


  //res.send('Hello World!');
});

var server = app.listen(port, function () {
  console.log('Server listening at http://localhost:'+ port);
});
