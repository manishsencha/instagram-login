const express = require("express")
const mongoose = require("mongoose")
const db = require("./db")
const app = express()
const PORT = process.env.PORT || 3001
require("dotenv").config()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(express.static("client/build"))
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database")
  })
  .catch((e) => console.log(e))

app.get("/", (req, res) => {
  res.send("index.html")
})
app.post("/register", async (req, res) => {
  try {
    await db.create({
      username: req.body.username,
      password: req.body.password,
    })
    return res.sendStatus(200)
  } catch {
    return res.sendStatus(404)
  }
})
app.get("/get", async (req, res) => {
  const data = await db.find()
  return res.send(data)
})
app.listen(PORT, () =>
  console.log(`Server is running on http://localhost:${PORT}`)
)
