const express=require('express')
const app=express()
const router=require('./router')
const PORT=process.env.PORT || 3000

app.use(express.json())
app.use(express.urlencoded())

app.use(router)

app.listen(PORT,()=>{
    console.log(`The site is running at http://localhost:${PORT}`)
})