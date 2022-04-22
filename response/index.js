const express=require('express')
const app=express()
app.get('/',function(req,res){
    // console.log('url:',req.url);
    // console.log('method:',req.method)
    // console.log('headers:',req.headers)
    // console.log('query:',req.query)
    // res.statusCode=201
    res.cookie('av18','OK')
    res.cookie('a','123')
    // res.send({foo:'bar'})
    res.status(201).send('OK')
    // res.end()
})
app.listen(3000,function(){
    console.log('http://localhost:3000')
})