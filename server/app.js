var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');

var coding = require('./scripts/coding');

var {mongoose} = require('./db/mongoose');
var {Url} = require('./models/Url');
var {Count} = require('./models/counter');

var app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.get('/',(req,res)=>{
   
    res.sendFile(path.join(__dirname + '/public/landing.html'));
});

app.post('/url',(req,res)=>{
    
    var url = new Url({
        url:req.body.url,
        id:req.body.id
    });
    
    url.save().then((url)=>{
        res.send(url);
    }).catch((e)=>{
        res.status(400).send();
    })
    
    
});

app.get('/:id',(req,res)=>{
    
   var id = req.params.id;
   var decodedId = coding.decode(id);
       
   Url.findOne({id:decodedId}).then((url)=>{
       
   });     
});

app.listen(3000);