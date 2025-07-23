const express = require("express");

const myserver= express();

const port=8000

const user = [];
const item = [];


myserver.use(express.json())
myserver.use(express.urlencoded({extended:true}))

//meriksa server aktif?
myserver.get("/",(req,res)=>{
    res.send("my server di express")
})

//melihat semua user
myserver.get("/user",(req,res)=>{
    res.send(user);
})

//menambahkan user
myserver.post("/user",(req,res)=>{
    const body = req.body;
    console.log(body)
    user.push(req.body.nama)
    console.log(user + " berhasil diupload")
    let akhir = user.length - 1
    console.log(akhir)
    res.send(user[akhir] + " berhasil diupload")


})


//menghapus user
myserver.delete("/user/delete",(req,res)=>{
    const id = req.body.id;
    const hapus = user.splice(id-1, 1);

    res.send(" data user berhasil dihapus");
})


//mengedit user
myserver.put("/user/update",(req,res)=>{
    const id = req.body.id;
    const namaBaru = req.body.baru;
    hasilUpdate=user.splice(id-1,1,namaBaru);

    res.send(`data berhasil diupdate : { ${user} }`);
})




//melihat semua items
myserver.get("/items",(req,res)=>{

    res.send(item)
})

//menambahkan items
myserver.post("/items/upload",(req,res)=>{
    const tambah = req.body.nama;
    
    item.push(tambah);
    res.send(item[item.length-1] + " berhasil ditambah")

})

//update items
myserver.put("/items/update",(req,res)=>{
    const id = req.body.id;
    const NamaBaru = req.body.nama;

    const update = item.splice(id-1,1,NamaBaru);

    res.send(`data berhasil diupdate: { ${item} }`)

})

//delete item
myserver.delete("/items/delete",(req,res)=>{
    const id = req.body.id;
    const hapus = item.splice(id-1,1);
    res.send("data items berhasil dihapus")
})


myserver.listen(port, ()=>{
    console.log("server sudah berjalan di port:" + port)
})