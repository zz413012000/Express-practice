const express=require('express')
// const fs=require("fs")
const { getDb,saveDb }=require("./db.js")
const app=express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/',function(req,res){
    res.send("Good Start")
})
app.get('/todos',async function(req,res){
    try{        
        const db=await getDb()
        res.status(200).json(db.todos)
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
app.post('/todos',async function(req,res){
    try{
        //1.取得資料
        const reqTodo=req.body
        //2.驗證
        if(!reqTodo.title){
            return res.status(422).json({
                "error":"The title is require."
            })
        }
        //3.新增
        const db=await getDb()
        
        console.log(db.todos.length)
        const lastTodo=db.todos[db.todos.length-1]
        if(lastTodo){
            reqTodo.id=db.todos.length+1
        }else if(!lastTodo){
            reqTodo.id=1
        }
        db.todos.push(reqTodo)
        await saveDb(db)
        const newDb=await getDb()
        res.status(200).json(newDb.todos)
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
app.patch('/todos/:id',async (req,res)=>{
    try{
        //取得資料
        //匹配資料
        //儲存資料
        const todo=req.body
        const db=await getDb()
        const resultTodo=db.todos.find(todo=>todo.id===Number.parseInt(req.params.id))
        if(!resultTodo){
            return res.status(404).end()
        }
        Object.assign(resultTodo,todo)
        await saveDb(db)
        res.status(200).json(todo)
        
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})

app.listen(3000,function(){
    console.log("http://localhost:3000")
})