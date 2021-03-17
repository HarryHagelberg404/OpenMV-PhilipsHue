const express = require('express')
const app = express()
const port = 3000

app.get('/', require("./routes/lightRoutes.js"))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})