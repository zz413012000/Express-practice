const fs =require('fs')
const { promisify }=require('util')
const path=require('path')

const readFile=promisify(fs.readFile)
const writeFile=promisify(fs.writeFile)
const dbPath=path.join(__dirname,'db.json')

exports.getDb=async()=>{
    const data=await readFile(dbPath,'utf8')
    return JSON.parse(data)
}
exports.saveDb=async db=>{
    const data=JSON.stringify(db,null,2)
    await writeFile(dbPath,data)
}

// fs.readFile('db.json','utf8',(err,data)=>{
//     if(err){
//         return res.status(500).json({
//             "error":err.message
//         })
//     }
//     const db=JSON.parse(data)
// })