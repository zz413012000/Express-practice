const fs =require('fs')
const { promisify }=require('util')  // 將 callback 形式的 API 轉換成 Promise 形式
const path=require('path')

const readFile=promisify(fs.readFile)
const writeFile=promisify(fs.writeFile)

const dbPath=path.join(__dirname,'./db.json') //得到 H:\CS\JS\Node\express_test\route\db.json 放進 dbPath
exports.getDb=async()=>{// 得到 JSON.parse 後的數據
    // fs.readFile()
    const data=await readFile(dbPath,'utf8')
    return JSON.parse(data)
}
exports.saveDb=async db=> {
    const data =JSON.stringify(db,null,2)//
    await writeFile(dbPath,data)
}