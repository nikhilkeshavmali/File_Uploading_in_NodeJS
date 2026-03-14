const express = require("express");
const app = express();

const HOST = "127.0.0.1";
const PORT = 3000;

//middleware
app.use(express.static("public/"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//multer
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "public/upload/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage });

//DB
const connectDB = require("./config/db");
connectDB();

//schema
const userSchema = require("./model/userSchema");

//routes
app.get("/", (req, res) => {
  res.render("Home");
});

app.post("/saveform", upload.single("userProfile"), async (req, res) => {
  try {
    const { userName, userEmail, userPassword, userPhone } = req.body;

    const filename = req.file.filename;

    const result = new userSchema({
      userName,
      userEmail,
      userPassword,
      userPhone,
      userProfile: filename,
    });

    await result.save();

    res.send("Profile saved successfully");
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, HOST, () => {
  console.log(`Server running at http://${HOST}:${PORT}`);
});
