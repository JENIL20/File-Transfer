import express, { urlencoded } from "express"
import path from "path"
import fs from 'fs'
import multer from "multer"
import bodyParser from "body-parser"
import ip from "ip"
const app = express()

let foldername = "temp"
app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: false }))

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (!foldername) {
      foldername = temp
    }
    const balayAudPath = `./UPLOADS/${foldername}`
    fs.mkdirSync(balayAudPath, { recursive: true })
    return cb(null, balayAudPath);
  },
  filename: function (req, file, cb) {
    return cb(null, file.originalname)
  }
})
const upload = multer({ storage })
app.get('/get', (req, res) => {
  res.send(ip.address() + ":5000 for using this service from any device")
})
app.get('/', (req, res) => {
  res.render("index")
})
app.post('/upload', upload.array('files'), (req, res) => {
  console.log("folder=", req.body)
  res.redirect("/")
})
app.post('/set', (req, res) => {
  console.log(ip.address());
  foldername = req.body.folder
  console.log(foldername);
  res.redirect("/")
})

app.listen(5000, (req, res) => {
  console.log("listen at 5000")
})

