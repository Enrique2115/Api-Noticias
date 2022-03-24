const express = require("express");
const rooutes = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
/// ----------------------------------------------
const config = require("../config.json");
const { v4 } = require("uuid");

//######################### rooutes ###################################

const storageftp = multer.diskStorage({
  destination: path.join(__dirname, "../ftp"),
  filename: (req, file, cb) => {
    cb(null, v4() + path.extname(file.originalname).toLowerCase());
  },
});

const Filercode = (req, file, cb) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const mytype = filetypes.test(file.mimetype);
  const extname = filetypes.test(path.extname(file.originalname));
  if (mytype && extname) {
    return cb(null, true);
  }
  cb("El archivo debe ser una imagen valida");
}

const insertImage = multer({
  storage: storageftp,
  //dest: "ftp",
  limits: { fieldSize: 2000000 },
  fileFilter: Filercode,
}).single("photo");

// ####################################################################

//readindex
// rooutes.get("/render/", (req, res) => {
//   //res.send(req.params.img)
//   res.render("index.ejs");
// });

//insert
rooutes.post("/insert", (req, res) => {
  insertImage(req, res, (err) => {
    if (err) return res.send(err);
    //console.log(req.file);
    var jsonresp = {
      url: config.apires.hostFtp + "/gftp/" + req.file.filename,
    };
    res.json(jsonresp);
  });
});

module.exports = rooutes;
