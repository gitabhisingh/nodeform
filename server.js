var express = require('express'),
bodyParser = require('body-parser'),
fs = require('fs'),
app = express(),
port =  8081;

app.use(bodyParser.urlencoded({extended : true}));

app.use('/public', express.static('public'));

app.post('/form', function (req, res){
   //Console log the data sumitted
   res.send(JSON.stringify({'fName': req.body.fName, 'lName': req.body.lName, 'email': req.body.email, 'pass': req.body.pass, 'rpass': req.body.rpass}));
   //Send data to file
   addDataToJsonFile(req);
});

app.get('/', function (req, res){
   res.send('Form Example NodeJS');
});

app.get('/form', function (req, res) {
   res.sendFile(__dirname + '/index.html');
});

app.listen(port, function(){
   console.log('Running at Port no' + port + ' on ' + new Date() + '.');
});

function addDataToJsonFile(req){
   fs.readFile('public/data.json', 'utf8', (err, data) => {
      if(err){
         console.log(err);
      } else{
         var obj = ''

         if(data){
            obj = JSON.parse(data);
            console.log(data.toString());
         } else {
            obj = {
               data: []
            }
         }

         obj.data.push({'fName': req.body.fName, 'lName': req.body.lName, 'email': req.body.email, 'pass': req.body.pass, 'rpass': req.body.rpass});
         fs.writeFile('public/data.json', JSON.stringify(obj), 'utf8', (err) =>{
            if(err){
               throw err;
            }
            console.log('The File has been Appended.');
         });
      }
   });
}