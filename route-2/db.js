const fs=require('fs')
const {promisify}=require('util')
const path=require('path')

const readFile=promisify(fs.readFile)
const writeFile=promisify(fs.writeFile)
const dbPath=path.join(__dirname,"./db.json")

exports.getDb=async()=>{
    const db=await readFile(dbPath,"utf8")
    return JSON.parse(db)
}
exports.saveDb=async(db)=>{
    const data=JSON.stringify(db,null,2)
    await writeFile(dbPath,data)
}

