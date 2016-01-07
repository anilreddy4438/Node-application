var express = require('express');
var app= express();
var mongojs = require('mongojs');
var db =mongojs('contactdata',['contactdata']);
var bodyParser = require('body-parser');
  app.use(express.static(__dirname  +"/public"));
app.use(bodyParser.json());
 app.get('/contactdata',function(req,res) {
  console.log("I Got get request");
  db.contactdata.find(function (err, docs) {
    //console.log(docs);
    res.json(docs);
  });
});
  app.post('/contactdata',function(req,res){
    console.log(res.body);
    db.contactdata.insert(req.body,function(err,doc){
res.json(doc);
    });
  });

  app.delete('/contactdata/:id',function(req,res){
    var id = req.params.id;
    id = id+""


    //console.log(id)
    db.contactdata.remove({_id: mongojs.ObjectId(id)},function(err,doc){
      res.json(doc);
      console.log(err)
    })
  });

  app.get('/contactdata/:id',function(req,res){
  var id = req.params.id;
    id = id+""
  console.log(id)
  db.contactdata.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
    res.json(doc);
    console.log(doc)
    console.log('got data');
  })
});


app.put('/contactdata/:id',function(req,res){
  var id =req.params.id;
  id = id+""
  db.contactdata.findAndModify({query:{_id: mongojs.ObjectId(id)},update: {$set: {name: req.body.name, message: req.body.message}} ,new :true}, function(err,doc){
    res.json(doc);
    console.log(doc)
    console.log('update data');
  })
})



app.listen(9000);
console.log("port 9000");