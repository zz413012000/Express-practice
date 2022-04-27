const express=require('express')
const router=express.Router() // 建立路由實體
const {getDb,saveDb}=require('./db')
router.get('/',function(req,res){
    res.send("Hello World")
})
router.get('/todos',async function(req,res){
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
router.get('/todos/:id',async function(req,res){
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
router.post('/todos',async function(req,res){
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
router.patch('/todos/:id',async function(req,res){//修改
    try{
        //取得資料
        const todo=req.body
        const db=await getDb()
        //匹配資料
        const ret=db.todos.find(todo => todo.id ===Number.parseInt(req.params.id))

        if(! ret){
            return res.status(404).end()
        }
        Object.assign(ret,todo) // 淺複製，將新的覆蓋到舊的，所以 db 會被修改
        //儲存資料
        await saveDb(db)
        res.status(200).json(ret)
        // res.status(200).json(await getDb())
        
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
router.delete('/todos/:id',async function(req,res){
    try{
        const todoId=Number.parseInt(req.params.id)
        const db=await getDb()
        const index=db.todos.findIndex(todo=>todo.id===todoId)
        if(index===-1){
            return res.status(404).end()
        }
        db.todos.splice(index,1)
        await saveDb(db)
        res.status(204).end()
    }catch(err){
        res.status(500).json({
            "error":err.message
        })
    }
})
module.exports=router