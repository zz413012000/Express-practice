const express=require('express')
const fs=require('fs')
const { getDb,saveDb }=require('./db')
const router=require('./router')
const app=express()
/* node.js 收到 post 的 request body 會以 readable stream 形式呈現

解析 post 的 request body
使用 app.use(express.json()) 可以解析 json 格式的 post 的 request body
使用 app.use(express.urlencoded()) 可以解析 application/x-www-form-urlencoded
*/
app.use(express.json())
app.use(express.urlencoded())

app.use(router)
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})