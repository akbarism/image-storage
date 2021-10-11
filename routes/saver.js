var express = require("express");
var router = express.Router();
const multer = require("multer");
const model = require("../models/index");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
});
router.get("/", async function (req, res, next) {
  try {
    const saver = await model.saver.findAll({});
    if (saver.length !== 0) {
      res.json({
        status: "OK",
        messages: "Berhasil mendapatkan data",
        data: saver,
      });
    } else {
      res.json({
        status: "ERROR",
        messages: "EMPTY",
        data: {},
      });
    }
  } catch (err) {
    res.json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});
router.get("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const saver = await model.saver.findOne({
      where: {
        id: id,
      },
    });
    if (saver.length !== 0) {
      res.json({
        status: "OK",
        messages: "Berhasil mendapatkan data",
        data: saver,
      });
    } else {
      res.json({
        status: "ERROR",
        messages: "EMPTY",
        data: {},
      });
    }
  } catch (err) {
    res.json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

router.post("/", upload.single("path"), async function (req, res, next) {
  console.log(model.saver);
  try {
    const saver = await model.saver.create({
      filename: req.file.filename,
      path: `http://localhost:3000/uploads/${req.file.filename}`,
    });
    if (saver) {
      res.status(200).json({
        status: "OK",
        messages: "saved",
        data: saver,
      });
    }
  } catch (err) {
    res.status(400).json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});
router.delete("/:id", async function (req, res, next) {
  try {
    const id = req.params.id;
    const saver = await model.saver.destroy({
      where: {
        id: id,
      },
    });
    if (saver.length !== 0) {
      res.json({
        status: "OK",
        messages: "Data terhapus!",
        data: saver,
      });
    } else {
      res.json({
        status: "ERROR",
        messages: "Data tidak di temukan",
        data: {},
      });
    }
  } catch (err) {
    res.json({
      status: "ERROR",
      messages: err.message,
      data: {},
    });
  }
});

module.exports = router;
