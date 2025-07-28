const express = require("express");

const myserver = express();

const port = 8000;

const user = [
  { id: 1, nama: "jason" },
  { id: 2, nama: "pol" },
];
const item = [];
const kendaraan = [
  { id: 1, kendaraan: "mobil", userid: 1 },
  { id: 2, kendaraan: "montor", userid: 2 },
  { id: 3, kendaraan: "pesawat", userid: 3 },
  { id: 4, kendaraan: "yatch", userid: 1 },
];
// tambah di array kendaraan ada user id jadi untuk membuat kendaraan user perlu mengirimkan user id nya 
//jika user id yang dikirmkan user tidak ditemukan dalam array user maka kirimkan respon "id user tidak ditemukan"

//delete edit dan get
//hanya user dengan user id yang sama yang bisa mengakses data kendaraan nya
// misalnya user id yg dikirim itu 3 maka kendaraan dengan user id 3 bisa diproses
myserver.use(express.json());
myserver.use(express.urlencoded({ extended: true }));

//menambah kendaraan bila user ada pada list
myserver.post("/kendaraan/add", (req, res) => {
  const iduser = +req.body.idUser;
  const namaKendaraan = req.body.namaKendaraan;
  let id = null;
  let penentu = false;

  if (kendaraan.length == 0) {
    id + 1;
  } else {
    id = kendaraan[kendaraan.length - 1].id + 1;
  }
  //check user id inputan ada tidak pada id pada array user
  for (let i = 0; i < user.length; i++) {
    //console.log(user[i].id)
    //console.log(iduser," ini id user")
    if (user[i].id === iduser) {
      penentu = true;
      // console.log("test masuk if")
    }
  }

  if (penentu === true) {
    kendaraan.push({ id: id, kendaraan: namaKendaraan, iduser: iduser });
    console.log(namaKendaraan);
    return res.send(kendaraan);
  } else {
    res.send("anda bukan owner");
  }
});

//BARU besok
// get, delete, update berdasarkan id param kendaraan dan hanya user id dari body yang dikirm dan
//sama data yang dimiliki sama kendaraan dengan id yang dikirm lewat params

// 1. usernya ngasi idnya saja, paramnya itu id kendaraan, terus kirim id usernya dan bandingkan sama id kendaraan, jika tidak sama tidak mau get.

// deklarasi
// cari id yang ingin kita get
// cek apakah sama id user dan kendaraanya?

//melihat kendaraan berdasarkan id user dan id kendaraan
myserver.get("/kendaraan/view/:id", (req, res) => {
  const userId = +req.body.IdUser;
  const idItem = +req.params.id;
  let indexketemu = null;
  let kondisi = false;

  for (let i = 0; i < kendaraan.length; i++) {
    if (kendaraan[i].userid === userId && kendaraan[i].id === idItem) {
      indexketemu = i;
      console.log(indexketemu);
      kondisi = true;
    }
  }
  //   if(indexketemu <user.length-1){
  //     res.send("user tidak ditemukan");
  //   }
  if (!kondisi) {
    return res.send("data tidak ada");
  }
  console.log(kendaraan[indexketemu]);
  res.send(kendaraan[indexketemu]);
});

// edit berdasarkan id user
myserver.put("/kendaraan/edit/:id", (req, res) => {
  const idKendaraan = +req.params.id;
  const idUser = +req.body.iduser;
  const kendaraanBaru = req.body.kendaraan;
  let hasilupdate = null;
  let berhasil = false;

  for (let i = 0; i < kendaraan.length; i++) {
    if (kendaraan[i].id === idKendaraan && kendaraan[i].userid === idUser) {
      hasilupdate = i;
      berhasil = true;
    }
  }
  if (!berhasil) {
    res.send("gagal update");
  } else {
    kendaraan[hasilupdate].kendaraan = kendaraanBaru;
    res.send(kendaraan);
  }
});

//delete berdasarkan id user
myserver.delete("/kendaraan/delete/:id", (req, res) => {
  const idKendaraan = +req.params.id;
  const idUser = +req.body.idUser;
  let berhasil = false;
  let IndexKetemu = null;

  for (let i = 0; i < kendaraan.length; i++) {
    if (kendaraan[i].id === idKendaraan && kendaraan[i].userid === idUser) {
      IndexKetemu = i;
      berhasil = true;
    }
  }

  console.log(IndexKetemu);
  if (!berhasil) {
    res.send("data tidak ada");
  } else {
    kendaraan.splice(IndexKetemu, 1);
    res.send(kendaraan);
  }
});

//meriksa server aktif?
myserver.get("/", (req, res) => {
  res.send("my server di express");
});

//melihat semua user
myserver.get("/user", (req, res) => {
  res.send(user);
});

//menambahkan user
//kalo gak ada user gimana caranya aku ngepush
// user dengan id 1,
// kalo sudah ada data user aku ngepush user
// dengan id terahkir + 1
myserver.post("/user", (req, res) => {
  const nama = req.body.nama;
  let id = null;

  if (user.length === 0) {
    id = 1;
  } else {
    //const user = [{id:1,nama:"kevin"},{id:2,nama:"cahya"}];

    console.log(user[user.length - 1].id + 1);
    id = user[user.length - 1].id + 1;
  }

  user.push({ id: id, nama: nama });
  res.send(user);
});

// get 1 user dengan id yang dikirim clue line 43 (clue iterasi)

myserver.post("/user/get/:id", (req, res) => {
  const id = +req.params.id;
  let indexNama = null;
  for (let i = 0; i < user.length; i++) {
    if (user[i].id === id) {
      indexNama = i;
    }
  }
  res.send(user[indexNama]);
});

//TUGAS BESOK

//crud tambah array lagi satu menggunakan line 33 dan  57 dan 116 (done)

//get semua kendaraan
myserver.get("/kendaraan", (req, res) => {
  res.send(kendaraan);
});

//get kendaraan spesifik
myserver.get("/kendaraan/:id", (req, res) => {
  let Arrayid = parseInt(req.params.id);
  let HasilIndex = null;

  for (let i = 0; i < kendaraan.length; i++) {
    if (kendaraan[i].id === Arrayid) {
      HasilIndex = i;
    }
  }
  console.log(HasilIndex);
  if (HasilIndex !== null) {
    res.send(kendaraan[HasilIndex]);
  } else {
    res.send("tidak ditemukan");
  }
});

//tambah kendaraan
myserver.post("/kendraan/upload", (req, res) => {
  const InputKendaraan = req.body.nama;
  let id = null;

  if (kendaraan.length === 0) {
    id = 1;
  } else {
    id = kendaraan[kendaraan.length - 1].id + 1;
  }
  console.log({ id: id, kendaraan: InputKendaraan });

  kendaraan.push([{ id: id, kendaraan: InputKendaraan }]);
  res.send(kendaraan);
});

//edit berdasarkan id menggunakan line 33 dan  57 dan 116

myserver.put("/kendaraan/edit/:id", (req, res) => {
  let idObj = parseInt(req.params.id);
  const namaBaru = req.body.kendaraan;
  let hasilIndex = null;

  for (let i = 0; i < kendaraan.length; i++) {
    if (kendaraan[i].id === idObj) {
      hasilIndex = i;
    }
  }

  console.log(hasilIndex);
  kendaraan[hasilIndex].kendaraan = namaBaru;
  res.send(kendaraan);
});

//delete berdasarkan id menggunakan line 33 dan  57 dan 116

myserver.delete("/kendaraan/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  let IndexKetemu = null;

  //melakukan pengecekan index array
  for (let i = 0; i < kendaraan.length; i++) {
    //jika objek id pada array sama dengan isi const id
    //maka hasil indek disimpan pada variabel index ketemu
    if (kendaraan[i].id === id) {
      IndexKetemu = i;
    }
  }
  console.log(IndexKetemu);

  //jika var indexketemu tidak sama dengan kosong (null)
  //maka hapus 1 element index lokasi index berdasarkan isi dari indexketemu
  if (IndexKetemu !== null) {
    kendaraan.splice(IndexKetemu, 1);
  }
  //jika tidak muncul respon id tidak ditemukan
  else {
    return res.send("id tidak ditemukan");
  }

  //output jika if berhasil akan memunculkan array object
  res.send(kendaraan);
});

//menghapus user
myserver.delete("/user/delete", (req, res) => {
  const id = req.body.id;
  const hapus = user.splice(id - 1, 1);

  res.send(" data user berhasil dihapus");
});

//mengedit user
myserver.put("/id/update", (req, res) => {
  const id = req.body.id;
  const namaBaru = req.body.baru;
  hasilUpdate = user.splice(id - 1, 1, namaBaru);

  res.send(`data berhasil diupdate : { ${user} }`);
});

//melihat semua items
myserver.get("/items", (req, res) => {
  res.send(item);
});

//menambahkan items
myserver.post("/items/upload", (req, res) => {
  const tambah = req.body.nama;

  item.push(tambah);
  res.send(item[item.length - 1] + " berhasil ditambah");
});

//update items
myserver.put("/user/update", (req, res) => {
  const NamaBaru = req.body.nama;
  const namalama = req.body.namalama;
  let indexNamaLama = null;
  for (let i = 0; i < user.length; i++) {
    console.log(user[i]);
    if (user[i] == namalama) {
      indexNamaLama = i;
    }
  }

  //const update = item.splice(id-1,1,NamaBaru);
  let hasil = user[indexNamaLama];
  user[indexNamaLama] = NamaBaru;
  console.log(NamaBaru);

  res.send(`data berhasil diupdate: { ${user} }`);
});

//delete item
myserver.delete("/items/delete", (req, res) => {
  const id = req.body.id;
  const hapus = item.splice(id - 1, 1);
  res.send("data items berhasil dihapus");
});

//1.delete berdarakan index nama
myserver.delete("/nama/delete", (req, res) => {
  const namaDelete = req.body.nama;
  let indexNamaHapus = null;

  for (let i = 0; i < user.length; i++) {
    if (user[i] == namaDelete) {
      indexNamaHapus = i;
    }
  }

  console.log(indexNamaHapus);
  if (indexNamaHapus !== null) {
    user.splice(indexNamaHapus, 1);
  } else {
    return res.send("nama tidak ditemukan");
  }

  return res.send(user);
});

//2.get index berdasarkan nama

myserver.post("/user/nama", (req, res) => {
  const nama = req.body.nama;
  let indexnama = null;

  for (let i = 0; i < user.length; i++) {
    if (user[i] == nama) {
      indexnama = i;
    }
  }
  res.send(`user ${nama} berada pada index ke:  ${indexnama}`);
});

myserver.listen(port, () => {
  console.log("server sudah berjalan di port:" + port);
});
