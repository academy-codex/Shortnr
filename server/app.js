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

// Main Page Get Request
app.get('/',(req,res)=>{
    
        res.sendFile(path.join(__dirname + '/public/landing.html'));  
});

// Url Query Request
app.post('/url',(req,res)=>{
    
    var link = req.body.url;
    
    Url.find({url:link}).then((urls)=>{
        
        if(urls.length === 0){
            // Not Found The Link
           
         Count.findOneAndUpdate({$inc:{value:1}}).then((counter)=>{
               var currentCount = counter.value+1; 
               var link = req.body.url;
               var url = new Url({
                  url:link,
                  id:currentCount  
               });   
                
              //res.send(url);
                url.save().then((data)=>{
                   var shortLink = "/" + coding.encode(data.id);
                   res.send(shortLink);
                });
            }).catch((e)=>{
             res.status(400).send(e);
         });
        }else{
            // Found The Link
            console.log('Found it');
            var link = urls[0];
            var id = link.id;
            
            var shortLink = "/" + coding.encode(id);
            res.send(shortLink);
        }    
        
        
    });
    
});

// Url Redirect Request
app.get('/url/:id',(req,res)=>{
    
   var id = req.params.id;
   var decodedId = coding.decode(id);
    
    Url.find({id:decodedId}).then((links)=>{
        if(links.length === 0)
            res.send("Incorrect URL"); 
        else{
            res.redirect("http://"+links[0].url);
        }
    }).catch((e)=>{
        res.status(400).send();
    });
});

app.listen(3000);