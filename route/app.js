const express=require('express')
const fs=require('fs')
const { getDb,saveDb }=require('./db')
const app=express()
/* node.js 收到 post 的 request body 會以 readable stream 形式呈現

解析 post 的 request body
使用 app.use(express.json()) 可以解析 json 格式的 post 的 request body
使用 app.use(express.urlencoded()) 可以解析 application/x-www-form-urlencoded
*/
app.use(express.json())
app.use(express.urlencoded())
app.get('/',function(req,res){
    res.send("Hello World")
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
    // fs.readFile('./db.json','utf8',(err,data)=>{// 能用異步就不要用同步
        // if(err){
        //     return res.status(500).json({
        //         "error":err.message
        //     })
        // }
        // const db=JSON.parse(data)
        // console.log(db)
        // res.status(200).json(db.todos)
    // })
})
app.get('/todos/:id',async function(req,res){
    try{
        const db=await getDb()
        const todo= db.todos.find(todo=>todo.id==Number.parseInt(req.params.id))
        if(!todo){return res.status(404).end()}
        res.status(200).json(todo)
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
    // fs.readFile('./db.json','utf8',(err,data)=>{
    //     if(err){
    //         return res.status(500).json({
    //             err:err.message
    //         })
    //     }
    //     const db=JSON.parse(data)
    //     const todo=db.todos.find(todo=> todo.id==Number.parseInt(req.params.id))
    //     if(!todo){
    //         return res.status(404).end()
    //     }
    //     res.status(200).json(todo)
    // })
    // // res.send(`get /todos/${req.params.id}`)
})
app.post('/todos',async function(req,res){
    try{
        // 1.取得 user request 參數
        const todo=req.body
        // 2.驗證
        if(!todo.title){
            return res.status(422).json({ // 請求格式正確，但是還有語意錯誤，無法回應
                error:"The title is required."
            })
        }
        // 3.驗證通過，將資料存在 DB
        const db=await getDb()
        const lastTodo=db.todos[db.todos.length-1]
        todo.id=lastTodo?lastTodo.id+1:1
        db.todos.push(todo
            // {
            //     id:lastTodo?lastTodo.id+1:1,
            //     title:todo.title
            // }
        )
        await saveDb(db)
        // 4. 回傳 response
        res.status(200).json(todo)
        // res.send('post /todos')
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
app.patch('/todos/:id',function(req,res){//修改
    res.send('patch /todos')
})
app.delete('/todos/:id',function(req,res){
    res.send('delete /todos')
})
app.listen(3000,()=>{
    console.log('http://localhost:3000')
})