const express=require('express')
const path=require('path')
const router=express.Router()
const {getDb,saveDb}=require('./db')

router.get('/',function(req,res){
    res.send("Hello!!")
})
router.get('/todos',async(req,res)=>{
    console.log("/todos get")
    try{
        const db =await getDb()
        res.send(db.todos)
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
router.get('/todos/:id',async(req,res)=>{
    try{
        const db =await getDb()
        const todo=db.todos.find(todo=>todo.id===Number.parseInt(req.params.id))
        res.send(todo)
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
router.post('/todos',async(req,res)=>{
    console.log("/todos post")
    try{
        const db=await getDb()
        const todo=req.body
        if(!todo.title){
            return res.status(422).json({
                "error":"The title is required."
            })
        }
        const lastTodo=db.todos[db.todos.length-1]
        todo.id=lastTodo?lastTodo.id+1:1
        db.todos.push(todo)
        await saveDb(db)
        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
module.exports=router