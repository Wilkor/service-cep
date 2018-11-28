var express = require('express');
var consulta = require('./consulta');

var app = express();

app.get('/user/:id',(req, res) =>{

  consulta((resposta) => {
    
   res.send(resposta)
  //  var arr = [];

    //for (var x in resposta) {
   //   arr.push(resposta[x]);
  //  }

  //  arr.map((element) => {

     // let resultJson = element[1];

    //  res.send(resultJson)
   // });


  },req.params.id)

})


app.listen(3000)