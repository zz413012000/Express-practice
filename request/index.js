const express=require('express')
const app=express()
app.get('/',function(req,res){
    console.log('url:',req.url);
    console.log('method:',req.method)
    console.log('headers:',req.headers)
    console.log(req.query)
    console.dir(req.query)
    res.send('Hello World !!')
})
app.listen(3000,function(){
    console.log('http://localhost:3000')
})