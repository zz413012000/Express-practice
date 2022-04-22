const express=require('express')
const app=express()
const myLogger=(req)=>{
    console.log(req.method,req.url,Date.now())
}
// req request object
// res response object
// next 函數，下一個 middleware
app.use((req,res,next)=>{ // middleware，可以匹配所有的請求，所有的請求開始前都要通過他
    console.log(req.method,req.url,Date.now())
    // console.log('hello')
    // req.foo='bar'
    // res.abc=()=>{
    //     console.log('abc')
    // }
    next()
})
function logOriginalUrl(req,res,next){
    console.log("Request Url:",req.originalUrl)
    next()
}
function logMethod(req,res,next){
    console.log('Request Type:',req.method)
    next()
}
let logStuff=[logOriginalUrl,logMethod]
app.get('/user/:id',logStuff,function(req,res,next){
    res.send('User Info')
})
// app.use('/user/:id',function(req,res,next){
//     console.log(`Request Url: ${req.originalUrl}`)
//     next()
// },function(req,res,next){
//     console.log(`Request Type: ${req.method}`)
//     next()
// })
// app.get('/user/:id',function(req,res,next){
//     console.log('Get /user/')
//     next()
// })
app.get('/user/:id',function(req,res,next){
    (req.params.id ==='0')? next('route'):next()    
},function(req,res,next){
    res.send('regular')
})
app.get('/user/:id',function(req,res,next){
    res.send('special')
})

app.get('/',function(req,res,next){ // 路由也是一種中間件
    // myLogger(req)
    // console.log(req.foo)
    res.send('Hello World!')
    // next()
})
app.get('/about',function(req,res,next){
    // myLogger(req)
    // res.abc()
    res.send('Hello World!')
    next()
})

app.post('/login',function(req,res){
    // myLogger(req)
    res.send('Hello World!')
})
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})